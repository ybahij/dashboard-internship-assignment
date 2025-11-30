import Link from 'next/link';
import { loadAndMergeData, MergedAgencyData } from '../../../../utils/dataLoader';
// You will import auth here later to implement the view limit:
// import { auth } from "@clerk/nextjs/server";

interface ContactPageProps {
  params: {
    agencyId: string; // Matches the folder name [agencyId]
  };
}

export default async function AgencyContactsPage({ params }: ContactPageProps) {
  // const { userId } = auth();

  const allAgencies = await loadAndMergeData();
  const currentAgency = allAgencies.find(agency => agency.id === params.agencyId);

  if (!currentAgency) {
    return <div className="container">Agency not found.</div>;
  }

  // NOTE: This is where you would check the user's view count limit
  // before displaying the full contact details. 
  // For now, we display them all.

  return (
    <div className="container">
      <Link href="/dashboard/agencies">
        <button style={{ marginBottom: '20px' }}>Back to Agencies</button>
      </Link>
      
      <h1>Contacts for {currentAgency.name}</h1>

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Title</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {currentAgency.contacts.map((contact) => (
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
    </div>
  );
}
