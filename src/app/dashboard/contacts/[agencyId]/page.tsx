
"use server";
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { auth } from "@clerk/nextjs/server"; 
import prisma from '../../../../lib/prisma'; // Make sure you created this file
import { loadAndMergeData } from '../../../../utils/dataLoader';
import { ContactRow } from '../../../../utils/dataLoader'; // Import ContactRow interface

const DAILY_LIMIT = 50;

/**
 * Checks the user's view count in the database and increments it if within limits.
 * @param userId The Clerk user ID.
 * @returns The updated view status object.
 */
async function getUserViewStatus(userId: string) {
  // Use UTC to prevent timezone issues on Vercel servers
  const today = new Date();
  const startOfDayUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));

  let userLimitRecord = await prisma.userViewLimit.findUnique({
    where: { userId },
  });

  let currentCount = 0;

  if (!userLimitRecord || new Date(userLimitRecord.date) < startOfDayUTC) {
    // New day or first visit: create/reset the record to 1 view
    userLimitRecord = await prisma.userViewLimit.upsert({
      where: { userId },
      update: { viewCount: 1, date: new Date() },
      create: { userId, viewCount: 1, date: new Date(), DAILY_LIMIT: DAILY_LIMIT },
    });
    currentCount = 1;
  } else {
    currentCount = userLimitRecord.viewCount;
    // User is within the limit: increment the count in the database
    if (currentCount < DAILY_LIMIT) {
       await prisma.userViewLimit.update({
        where: { userId },
        data: { viewCount: { increment: 1 } },
      });
      currentCount += 1; // Reflect the incremented value locally
    }
  }

  return {
    isLimitExceeded: currentCount > DAILY_LIMIT,
    viewsRemaining: Math.max(0, DAILY_LIMIT - currentCount),
    dailyLimit: DAILY_LIMIT,
  };
}


interface ContactPageProps {
  params: {
    agencyId: string;
  };
}

export default async function AgencyContactsPage({ params }: ContactPageProps) {
  // 1. Check Authentication
  const { userId } = auth();
  if (!userId) {
      redirect("/sign-in"); 
  }

  // 2. Check and update the view limit using the database (The core logic)
  const viewStatus = await getUserViewStatus(userId);
  
  // 3. Load the agency data using 'fs' on the server
  const allAgencies = await loadAndMergeData();
  const currentAgency = allAgencies.find(agency => agency.id === params.agencyId);

  if (!currentAgency) {
    notFound(); 
  }

  // 4. Render the UI based on the database status
  return (
    <div className="container p-8">
      {/* Link back to the new /agencies root page */}
      <Link href="/agencies">
        <button className="mb-4 px-4 py-2 border rounded-md">Back to Agencies</button>
      </Link>
      
      <h1 className="text-2xl font-bold">Contacts for {currentAgency.name}</h1>
      <p className="mb-4">Views remaining today: {viewStatus.viewsRemaining}</p>

      {viewStatus.isLimitExceeded ? (
        // RENDER THE UPGRADE PROMPT
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          <h2>Daily Limit Exceeded</h2>
          <p>You have viewed your daily limit of 50 contacts. Please upgrade to view more.</p>
        </div>
      ) : (
        // RENDER THE ACTUAL CONTACTS TABLE
        <table className="min-w-full">
          <thead>
            <tr>
              <th>First Name</th><th>Last Name</th><th>Title</th><th>Email</th><th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {currentAgency.contacts.map((contact: ContactRow) => (
              <tr key={contact.id}>
                <td>{contact.first_name}</td>
                <td>{contact.last_name}</td>
                <td>{contact.title}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
