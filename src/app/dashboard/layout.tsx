
import { UserButton, auth, currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ReactNode } from 'react';
import { getViewStats } from '@/lib/viewLimit';

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const user = await currentUser();
  const viewStats = await getViewStats(userId);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-8">Agency Portal</h2>

          {/* View Stats */}
          <div className="mb-6 p-4 bg-gray-800 rounded-lg">
            <p className="text-xs text-gray-400 mb-2">Daily Contact Views</p>
            <p className="text-3xl font-bold mb-2">
              {viewStats.remaining}
            </p>
            <p className="text-sm text-gray-400 mb-3">
              of {viewStats.limit} remaining
            </p>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${((viewStats.limit - viewStats.remaining) / viewStats.limit) * 100}%` }}
              />
            </div>
          </div>

          <nav className="space-y-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-800 transition"
            >
              <span>📊</span>
              <span>All Agencies</span>
            </Link>
          </nav>
        </div>

        {/* User Section */}
        <div className="mt-auto p-6 border-t border-gray-800">
          <div className="flex items-center gap-3">
            <UserButton afterSignOutUrl="/sign-in" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {user?.emailAddresses[0]?.emailAddress}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}