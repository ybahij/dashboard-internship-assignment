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


import { MapPin } from 'lucide-react';

// Static mock data for agencies
const AGENCIES = Array.from({ length: 15 }, (_, i) => ({
  id: `ag-${i}`,
  city: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte'][i],
  address: `${Math.floor(Math.random() * 900) + 100} Market St`,
  status: Math.random() > 0.2 ? 'Active' : 'Inactive'
}));

export default function AgenciesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Partner Agencies</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-600">City / Agency</th>
              <th className="px-6 py-4 font-semibold text-slate-600">Address</th>
              <th className="px-6 py-4 font-semibold text-slate-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {AGENCIES.map((agency) => (
              <tr key={agency.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-blue-100 text-blue-600 flex items-center justify-center">
                      <MapPin size={16} />
                    </div>
                    <span className="font-medium text-slate-900">{agency.city}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-500">{agency.address}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    agency.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {agency.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}