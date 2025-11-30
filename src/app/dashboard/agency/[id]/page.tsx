// import { auth } from '@clerk/nextjs/server';
// import { redirect, notFound } from 'next/navigation';
// import { loadAndMergeData } from '@/lib/csv-loader';
// import { checkViewLimit, incrementViewCount } from '../../../../lib/viewLimit';
// import Link from 'next/link';

// export default async function AgencyContactsPage({
//   params,
// }: {
//   params: Promise <{ id: string }>;
// }) {
//   const { userId } = await auth(); // ← Add await!

//   if (!userId) {
//     redirect('/sign-in');
//   }

//   const viewLimit = await checkViewLimit(userId);

//   if (!viewLimit.canView) {
//     return (
//       <div className="max-w-2xl mx-auto mt-10 p-6 bg-red-50 border border-red-200 rounded-lg">
//         <h2 className="text-2xl font-bold text-red-800 mb-4">
//           Daily Limit Reached
//         </h2>
//         <p className="text-red-700 mb-4">
//           You've reached your daily limit of {viewLimit.limit} agency contact views.
//         </p>
//         <p className="text-red-600 mb-6">
//           Your limit will reset tomorrow. Come back then to view more contacts!
//         </p>
//         <Link
//           href="/dashboard"
//           className="inline-block px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//         >
//           Back to Dashboard
//         </Link>
//       </div>
//     );
//   }

//   const agencies = await loadAndMergeData();
//   const agency = agencies.find((a) => a.id === params.id);

//   if (!agency) {
//     notFound();
//   }

//   await incrementViewCount(userId);

//   return (
//     <div className="max-w-7xl mx-auto">
//       <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
//         <p className="text-sm text-blue-800">
//           Views remaining today: <strong>{viewLimit.remaining - 1}</strong> / {viewLimit.limit}
//         </p>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow mb-6">
//         <h1 className="text-3xl font-bold mb-4">{agency.name}</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
//           <div>
//             <p className="mb-2"><strong>State:</strong> {agency.state} ({agency.state_code})</p>
//             <p className="mb-2"><strong>Type:</strong> {agency.type}</p>
//             <p className="mb-2"><strong>County:</strong> {agency.county}</p>
//           </div>
//           <div>
//             <p className="mb-2"><strong>Total Students:</strong> {agency.total_students}</p>
//             <p className="mb-2"><strong>Total Schools:</strong> {agency.total_schools}</p>
//             <p className="mb-2"><strong>Student/Teacher Ratio:</strong> {agency.student_teacher_ratio}</p>
//           </div>
//         </div>
//         {agency.website && (
//           <p className="mt-4">
//             <strong>Website:</strong>{' '}
//             <a href={agency.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
//               {agency.website}
//             </a>
//           </p>
//         )}
//       </div>

//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <div className="px-6 py-4 bg-gray-50 border-b">
//           <h2 className="text-2xl font-bold">
//             Contacts ({agency.contacts.length})
//           </h2>
//         </div>

//         {agency.contacts.length === 0 ? (
//           <div className="p-6 text-center text-gray-500">
//             No contacts found for this agency.
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {agency.contacts.map((contact) => (
//                   <tr key={contact.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {contact.first_name} {contact.last_name}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {contact.email ? (
//                         <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
//                           {contact.email}
//                         </a>
//                       ) : (
//                         <span className="text-gray-400">N/A</span>
//                       )}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {contact.phone || <span className="text-gray-400">N/A</span>}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {contact.title || <span className="text-gray-400">N/A</span>}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {contact.department || <span className="text-gray-400">N/A</span>}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       <div className="mt-6">
//         <Link href="/dashboard" className="text-blue-600 hover:underline">
//           ← Back to All Agencies
//         </Link>
//       </div>
//     </div>
//   );
// }

import { auth } from '@clerk/nextjs/server';
import { redirect, notFound } from 'next/navigation';
// FIXED: Changed to match the import that works in your DashboardPage
import { loadAndMergeData } from '../../../../utils/dataLoader'; 
import { checkViewLimit, incrementViewCount } from '@/lib/viewLimit';
import Link from 'next/link';

export default async function AgencyContactsPage({
  params,
}: {
  // FIXED: In Next.js 15, params is a Promise
  params: Promise<{ id: string }>;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  // FIXED: Await the params to get the ID
  const { id } = await params;

  const viewLimit = await checkViewLimit(userId);

  if (!viewLimit.canView) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-red-50 border border-red-200 rounded-lg">
        <h2 className="text-2xl font-bold text-red-800 mb-4">
          Daily Limit Reached
        </h2>
        <p className="text-red-700 mb-4">
          You've reached your daily limit of {viewLimit.limit} agency contact views.
        </p>
        <Link
          href="/dashboard"
          className="inline-block px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const agencies = await loadAndMergeData();
  
  // Debugging: Check if we actually found the ID
  // console.log("Searching for ID:", id);
  // console.log("Available IDs:", agencies.map(a => a.id).slice(0, 3)); 

  const agency = agencies.find((a) => a.id === id);

  if (!agency) {
    // This is what triggers the 404 page
    return notFound();
  }
  console.log("agency contacts", agency.contacts);
  // Only increment if agency exists and user has limit
  await incrementViewCount(userId);

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