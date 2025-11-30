// // Sample agencies data
// const agencies = [
//   {
//     id: 1,
//     name: "Creative Digital Agency",
//     location: "New York, NY",
//     industry: "Marketing",
//     employees: 45,
//     founded: 2015,
//   },
//   {
//     id: 2,
//     name: "Tech Solutions Inc.",
//     location: "San Francisco, CA",
//     industry: "Technology",
//     employees: 120,
//     founded: 2010,
//   },
//   {
//     id: 3,
//     name: "Global Media Partners",
//     location: "Los Angeles, CA",
//     industry: "Media",
//     employees: 78,
//     founded: 2012,
//   },
//   {
//     id: 4,
//     name: "Innovation Labs",
//     location: "Austin, TX",
//     industry: "Research & Development",
//     employees: 32,
//     founded: 2018,
//   },
//   {
//     id: 5,
//     name: "Summit Consulting Group",
//     location: "Chicago, IL",
//     industry: "Consulting",
//     employees: 65,
//     founded: 2008,
//   },
//   {
//     id: 6,
//     name: "Digital First Agency",
//     location: "Seattle, WA",
//     industry: "Digital Marketing",
//     employees: 28,
//     founded: 2019,
//   },
// ];

// export default function AgenciesPage() {
//   return (
//     <div>
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">Agencies</h1>
//         <p className="mt-2 text-gray-600">Browse our partner agencies</p>
//       </div>

//       <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Agency Name
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Location
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Industry
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Employees
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Founded
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {agencies.map((agency) => (
//               <tr key={agency.id} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm font-medium text-gray-900">{agency.name}</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm text-gray-600">{agency.location}</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
//                     {agency.industry}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                   {agency.employees}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                   {agency.founded}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


import Link from 'next/link';
import { loadAndMergeData, MergedAgencyData } from '../../../utils/dataLoader.js';

export default async function AgenciesPage() {
  const agencies: MergedAgencyData[] = await loadAndMergeData();

  return (
    <div className="container">
      <h1>Agencies Dashboard</h1>
      <p>View all agencies and their associated contacts.</p>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>State</th>
            <th>Total Contacts</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {agencies.map((agency) => (
            <tr key={agency.id}>
              <td>{agency.name}</td>
              <td>{agency.state_code}</td>
              <td>{agency.contacts.length}</td>
              <td>
                {/* Link to the dynamic contact details page */}
                <Link href={`/dashboard/contacts/${agency.id}`}>
                  <button>
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
