
import { UserButton } from '@clerk/nextjs';
import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ReactNode } from 'react';

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

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col flex-shrink-0">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-8 text-white">Agency Portal</h2>

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