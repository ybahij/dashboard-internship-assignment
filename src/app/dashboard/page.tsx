import { loadAndMergeData } from '../../utils/dataLoader';
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { getViewStats } from '@/lib/viewLimit';

export const dynamic = 'force-dynamic'; 

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) return null;

  const [agencies, viewStats] = await Promise.all([
    loadAndMergeData(),
    getViewStats(userId)
  ]);

  return (
    <div className="max-w-7xl mx-auto">
      
      {/* NEW: Stats Card at the top of the content */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
           <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">Daily Views Remaining</h3>
           <div className="flex items-baseline gap-2">
             <span className="text-4xl font-bold text-gray-900">{viewStats.remaining}</span>
             <span className="text-gray-400">/ {viewStats.limit}</span>
           </div>
           <div className="w-full bg-gray-100 rounded-full h-2 mt-4">
              <div
                className={`h-2 rounded-full transition-all ${viewStats.remaining === 0 ? 'bg-red-500' : 'bg-blue-500'}`}
                style={{ width: `${((viewStats.limit - viewStats.remaining) / viewStats.limit) * 100}%` }}
              />
           </div>
        </div>
      </div>

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
                    {agency.total_students ? parseInt(agency.total_students).toLocaleString() : '-'}
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