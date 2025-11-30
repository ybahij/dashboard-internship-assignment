import Link from 'next/link';
import { loadAndMergeData, MergedAgencyData } from '../../../utils/dataLoader';

export default async function AgenciesPage() {
  const agencies: MergedAgencyData[] = await loadAndMergeData();

  return (
    <div className="container p-8">
      <h1 className="text-3xl font-bold mb-6">Available Agencies</h1>
      
      {/* Add basic styling to make the table look decent with Tailwind */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Contacts</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {agencies.map((agency) => (
            <tr key={agency.id}>
              <td className="px-6 py-4 whitespace-nowrap">{agency.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{agency.state_code}</td>
              <td className="px-6 py-4 whitespace-nowrap">{agency.contacts.length}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {/* Link points to the new dynamic route: /contacts/[agencyId] */}
                <Link href={`/contacts/${agency.id}`}>
                  <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700">
                    View Contacts
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
