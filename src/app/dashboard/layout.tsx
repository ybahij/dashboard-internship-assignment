// "use client";

// import { UserButton, useUser } from "@clerk/nextjs";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathname = usePathname();
//   const { user } = useUser();

//   const navItems = [
//     { href: "/dashboard", label: "Dashboard" },
//     { href: "/dashboard/agencies", label: "Agencies" },
//     { href: "/dashboard/contacts", label: "Contacts" },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center">
//               <Link href="/dashboard" className="text-xl font-bold text-indigo-600">
//                 Dashboard
//               </Link>
//             </div>
//             <nav className="hidden md:flex space-x-8">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.href}
//                   href={item.href}
//                   className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
//                     pathname === item.href
//                       ? "text-indigo-600 bg-indigo-50"
//                       : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
//                   }`}
//                 >
//                   {item.label}
//                 </Link>
//               ))}
//             </nav>
//             <div className="flex items-center space-x-4">
//               <span className="text-sm text-gray-600">{user?.emailAddresses[0]?.emailAddress}</span>
//               <UserButton afterSignOutUrl="/" />
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Mobile navigation */}
//       <nav className="md:hidden bg-white border-b border-gray-200 px-4 py-2">
//         <div className="flex space-x-4 overflow-x-auto">
//           {navItems.map((item) => (
//             <Link
//               key={item.href}
//               href={item.href}
//               className={`px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap ${
//                 pathname === item.href
//                   ? "text-indigo-600 bg-indigo-50"
//                   : "text-gray-600"
//               }`}
//             >
//               {item.label}
//             </Link>
//           ))}
//         </div>
//       </nav>

//       {/* Main content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {children}
//       </main>
//     </div>
//   );
// }


"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Layout, Building2, Users, LogOut } from 'lucide-react';
import { UserButton, useUser } from '@clerk/nextjs';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useUser();

  const navItems = [
    { href: '/dashboard/agencies', label: 'Agencies', icon: Building2 },
    { href: '/dashboard/contacts', label: 'Contacts', icon: Users },
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Layout className="w-6 h-6 text-blue-400" />
            AgencyDash
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-700">
            <div className="flex items-center gap-3 mb-4">
                {/* Clerk User Button handles logout automatically */}
                <UserButton showName />
            </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-8 py-4 sticky top-0 z-10">
           <h2 className="text-xl font-semibold text-slate-800">
             Welcome, {user?.firstName}
           </h2>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}