// import { UserButton } from '@clerk/nextjs';
// import { auth, currentUser } from '@clerk/nextjs/server';
// import { redirect } from 'next/navigation';
// import Link from 'next/link';
// import { ReactNode } from 'react';
// import { getViewStats } from '@/lib/viewLimit';
// import "../globals.css";

// export default async function DashboardLayout({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   const { userId } = await auth(); // ← Add await!

//   if (!userId) {
//     redirect('/sign-in');
//   }

//   const user = await currentUser();
//   const viewStats = await getViewStats(userId);

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <aside className="w-64 bg-gray-900 text-white flex flex-col">
//         <div className="p-6">
//           <h2 className="text-2xl font-bold mb-8">Agency Portal</h2>

//           {/* View Stats */}
//           <div className="mb-6 p-4 bg-gray-800 rounded-lg">
//             <p className="text-xs text-gray-400 mb-2">Daily Contact Views</p>
//             <p className="text-3xl font-bold mb-2">
//               {viewStats.remaining}
//             </p>
//             <p className="text-sm text-gray-400 mb-3">
//               of {viewStats.limit} remaining
//             </p>
//             <div className="w-full bg-gray-700 rounded-full h-2">
//               <div
//                 className="bg-blue-500 h-2 rounded-full transition-all"
//                 style={{ width: `${((viewStats.limit - viewStats.remaining) / viewStats.limit) * 100}%` }}
//               />
//             </div>
//           </div>

//           <nav className="space-y-2">
//             <Link
//               href="/dashboard"
//               className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-800 transition"
//             >
//               <span>📊</span>
//               <span>All Agencies</span>
//             </Link>
//           </nav>
//         </div>

//         {/* User Section */}
//         <div className="mt-auto p-6 border-t border-gray-800">
//           <div className="flex items-center gap-3">
//             <UserButton afterSignOutUrl="/sign-in" />
//             <div className="flex-1 min-w-0">
//               <p className="text-sm font-medium truncate">
//                 {user?.firstName} {user?.lastName}
//               </p>
//               <p className="text-xs text-gray-400 truncate">
//                 {user?.emailAddresses[0]?.emailAddress}
//               </p>
//             </div>
//           </div>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-8 overflow-auto">
//         {children}
//       </main>
//     </div>
//   );
// }

import { UserButton } from '@clerk/nextjs';
import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ReactNode } from 'react';
import { getViewStats } from '@/lib/viewLimit';
// REMOVE THIS IMPORT: import "../globals.css";  <-- Import this in app/layout.tsx only!

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const user = await currentUser();
  const viewStats = await getViewStats(userId);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col flex-shrink-0">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-8 text-white">Agency Portal</h2>

          {/* View Stats Card */}
          <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
            <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Daily Limits</p>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-2xl font-bold text-white">{viewStats.remaining}</span>
              <span className="text-sm text-gray-400">/ {viewStats.limit}</span>
            </div>
            
            <div className="w-full bg-gray-700 rounded-full h-1.5 mb-1">
              <div
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  viewStats.remaining === 0 ? 'bg-red-500' : 'bg-blue-500'
                }`}
                style={{ width: `${((viewStats.limit - viewStats.remaining) / viewStats.limit) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 text-right">views used</p>
          </div>

          <nav className="space-y-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-all border border-gray-700/50"
            >
              <span>📊</span>
              <span className="font-medium">All Agencies</span>
            </Link>
          </nav>
        </div>

        {/* User Section - Fixed Alignment */}
        <div className="mt-auto p-4 border-t border-gray-800 bg-gray-900">
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-800/50 transition-colors">
            <div className="bg-white rounded-full flex items-center justify-center p-0.5">
               {/* If this button is still invisible, ensure you have 
                  <ClerkProvider> in your app/layout.tsx file!
               */}
               <UserButton showName={false} />
            </div>
            <div className="flex-1 min-w-0 overflow-hidden">
              <p className="text-sm font-medium text-white truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {user?.emailAddresses[0]?.emailAddress}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto bg-gray-50 p-8">
        {children}
      </main>
    </div>
  );
}