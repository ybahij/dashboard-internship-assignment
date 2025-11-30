
import { auth } from '@clerk/nextjs/server';
import { redirect, notFound } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { loadAndMergeData } from '../../../../utils/dataLoader'; 
import { checkViewLimit, incrementViewCount } from '@/lib/viewLimit';
import Link from 'next/link';

export default async function AgencyContactsPage({
  params,
}: {

  params: Promise<{ id: string }>;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const { id } = await params;

  const viewLimit = await checkViewLimit(userId);

if (!viewLimit.canView) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-8 bg-white border border-gray-200 rounded-xl shadow-lg text-center">
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Unlock Unlimited Access
        </h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          You have reached your daily limit of {viewLimit.limit} contact views. Upgrade to our Pro plan to view unlimited agency contacts and export data.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/dashboard" className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">
            Back to Dashboard
          </Link>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-md">
            Upgrade to Pro
          </button>
        </div>
      </div>
    );
  }

  const agencies = await loadAndMergeData();
  
  const agency = agencies.find((a) => a.id === id);

  if (!agency) {
    return notFound();
  }
  console.log("agency contacts", agency.contacts);

  await incrementViewCount(userId);
  revalidatePath('/dashboard');

  return (
    <div className="max-w-7xl mx-auto">
      {/* View Count Banner */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex justify-between items-center">
        <p className="text-sm text-blue-800">
          Views remaining today: <strong>{viewLimit.remaining - 1}</strong> / {viewLimit.limit}
        </p>
        <Link href="/dashboard" className="text-sm text-blue-600 hover:underline">
          Back to list
        </Link>
      </div>

      {/* Agency Details Card */}
      <div className="bg-white p-6 rounded-lg shadow mb-6 border border-gray-100">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">{agency.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <div className="space-y-2">
            <p><span className="font-semibold text-gray-900">State:</span> {agency.state} ({agency.state_code})</p>
            <p><span className="font-semibold text-gray-900">Type:</span> {agency.type}</p>
            <p><span className="font-semibold text-gray-900">County:</span> {agency.county}</p>
          </div>
          <div className="space-y-2">
            <p><span className="font-semibold text-gray-900">website:</span> {agency.website}</p>
            <p><span className="font-semibold text-gray-900">Total Students:</span> {agency.total_students?.toLocaleString()}</p>
            <p><span className="font-semibold text-gray-900">Total Schools:</span> {agency.total_schools?.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            Contacts ({agency.contacts.length})
          </h2>
        </div>

        {agency.contacts.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No contacts found for this agency.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {["Name", "Email", "Phone", "Title", "Department"].map((header) => (
                    <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {agency.contacts.map((contact, index) => (
                  <tr key={contact.id || index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {contact.first_name} {contact.last_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {contact.email ? (
                        <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                          {contact.email}
                        </a>
                      ) : <span className="text-gray-400">-</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {contact.phone || <span className="text-gray-400">-</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {contact.title || <span className="text-gray-400">-</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {contact.department || <span className="text-gray-400">-</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}