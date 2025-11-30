// import { loadAndMergeData } from '../../utils/dataLoader';
// import Link from 'next/link';

// export default async function DashboardPage() {
//   // Load data server-side
//   const agencies = await loadAndMergeData();

//   return (
//     <div>
//       <h1>All Agencies</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>State</th>
//             <th>Type</th>
//             <th>Total Students</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {agencies.map((agency) => (
//             <tr key={agency.id}>
//               <td>{agency.name}</td>
//               <td>{agency.state}</td>
//               <td>{agency.type}</td>
//               <td>{agency.total_students}</td>
//               <td>
//                 <Link href={`/dashboard/agency/${agency.id}`}>
//                   <button>View Contacts</button>
//                 </Link>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import { loadAndMergeData } from '../../utils/dataLoader';
import Link from 'next/link';

export default async function DashboardPage() {
  // Load data server-side
  const agencies = await loadAndMergeData();

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">All Agencies</h1>
        <span className="text-sm text-gray-500">{agencies.length} results found</span>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  State
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Students
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {agencies.map((agency) => (
                <tr key={agency.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {agency.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {agency.state}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {agency.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {agency.total_students.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/dashboard/agency/${agency.id}`}>
                      <button className="text-blue-600 hover:text-blue-900 font-medium hover:underline">
                        View Contacts &rarr;
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}