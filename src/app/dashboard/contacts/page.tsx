// "use client";

// import { useEffect, useState } from "react";

// interface Contact {
//   id: number;
//   name: string;
//   email: string;
//   phone: string;
//   company: string;
// }

// interface ContactsResponse {
//   contacts: Contact[];
//   viewCount: number;
//   remainingViews: number;
//   dailyLimit: number;
//   limitExceeded: boolean;
//   error?: string;
// }

// export default function ContactsPage() {
//   const [contacts, setContacts] = useState<Contact[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [limitExceeded, setLimitExceeded] = useState(false);
//   const [viewCount, setViewCount] = useState(0);
//   const [remainingViews, setRemainingViews] = useState(50);
//   const [dailyLimit, setDailyLimit] = useState(50);

//   useEffect(() => {
//     const fetchContacts = async () => {
//       try {
//         const response = await fetch("/api/contacts");
//         const data: ContactsResponse = await response.json();

//         setViewCount(data.viewCount);
//         setRemainingViews(data.remainingViews);
//         setDailyLimit(data.dailyLimit);

//         if (response.status === 429 || data.limitExceeded) {
//           setLimitExceeded(true);
//           setContacts([]);
//         } else {
//           setContacts(data.contacts);
//           setLimitExceeded(false);
//         }
//       } catch (error) {
//         console.error("Failed to fetch contacts:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchContacts();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
//       </div>
//     );
//   }

//   if (limitExceeded) {
//     return (
//       <div>
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
//           <p className="mt-2 text-gray-600">Browse contact directory</p>
//         </div>

//         {/* Upgrade Prompt */}
//         <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg p-8 text-white">
//           <div className="flex flex-col items-center text-center">
//             <div className="bg-white/20 rounded-full p-4 mb-6">
//               <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold mb-2">Daily Limit Reached</h2>
//             <p className="text-lg mb-2">
//               You&apos;ve reached your daily limit of {dailyLimit} contact views.
//             </p>
//             <p className="text-white/80 mb-6">
//               Views used today: {viewCount} / {dailyLimit}
//             </p>
//             <button className="bg-white text-indigo-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-md">
//               Upgrade to view more
//             </button>
//             <p className="text-sm text-white/70 mt-4">
//               Your limit will reset at midnight UTC
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="mb-8 flex justify-between items-start">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
//           <p className="mt-2 text-gray-600">Browse contact directory</p>
//         </div>
//         <div className="text-right">
//           <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
//             <p className="text-sm text-gray-500">Daily Views</p>
//             <p className="text-lg font-semibold text-gray-900">
//               {viewCount} / {dailyLimit}
//             </p>
//             <p className="text-xs text-gray-400">{remainingViews} remaining</p>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Name
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Email
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Phone
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Company
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {contacts.map((contact) => (
//               <tr key={contact.id} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="flex items-center">
//                     <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
//                       <span className="text-indigo-600 font-medium">
//                         {contact.name.split(" ").map((n) => n[0]).join("")}
//                       </span>
//                     </div>
//                     <div className="ml-4">
//                       <div className="text-sm font-medium text-gray-900">{contact.name}</div>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm text-gray-600">{contact.email}</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm text-gray-600">{contact.phone}</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
//                     {contact.company}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {remainingViews <= 10 && remainingViews > 0 && (
//         <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//           <div className="flex items-center">
//             <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//             </svg>
//             <p className="text-sm text-yellow-800">
//               Only {remainingViews} views remaining today.{" "}
//               <button className="font-medium underline hover:no-underline">
//                 Upgrade for unlimited access
//               </button>
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


"use client"; // Required for useState and localStorage

import { useEffect, useState } from 'react';
import { Mail, Phone, ShieldAlert } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State for rate limiting
  const [viewCount, setViewCount] = useState(0);
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // 1. Fetch Data on Mount
  useEffect(() => {
    fetch('/api/contacts')
      .then(res => res.json())
      .then(data => {
        setContacts(data);
        setLoading(false);
      });

    // Load saved count from local storage
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('lastViewDate');
    const savedCount = parseInt(localStorage.getItem('dailyViewCount') || '0');

    if (savedDate !== today) {
      setViewCount(0); // Reset for new day
      localStorage.setItem('lastViewDate', today);
    } else {
      setViewCount(savedCount);
    }
  }, []);

  // 2. Handle Reveal Logic
  const handleReveal = (id: string) => {
    if (revealedIds.has(id)) return; // Already seen

    if (viewCount >= 50) {
      setShowUpgradeModal(true);
      return;
    }

    // Increment View
    const newCount = viewCount + 1;
    setViewCount(newCount);
    localStorage.setItem('dailyViewCount', newCount.toString());

    // Add to revealed set
    const newRevealed = new Set(revealedIds);
    newRevealed.add(id);
    setRevealedIds(newRevealed);
  };

  if (loading) return <div className="p-10 text-center">Loading contacts...</div>;

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Employee Contacts</h1>
        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-200">
            Daily Views: <span className={viewCount >= 50 ? "text-red-600" : ""}>{viewCount}</span>/50
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-600">Name</th>
              <th className="px-6 py-4 font-semibold text-slate-600">Role</th>
              <th className="px-6 py-4 font-semibold text-slate-600">Contact Info</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {contacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">{contact.name}</td>
                <td className="px-6 py-4 text-slate-500">{contact.role}</td>
                <td className="px-6 py-4">
                  {revealedIds.has(contact.id) ? (
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2 text-slate-700">
                        <Mail size={14} className="text-slate-400" /> {contact.email}
                      </div>
                      <div className="flex items-center gap-2 text-slate-700">
                        <Phone size={14} className="text-slate-400" /> {contact.phone}
                      </div>
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleReveal(contact.id)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 rounded-md text-sm font-medium transition-all"
                    >
                      <ShieldAlert size={14} /> Reveal Info
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl max-w-md w-full shadow-2xl text-center">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Limit Reached</h3>
            <p className="text-slate-500 mb-6">You have viewed 50 contacts today. Upgrade to Pro to view more.</p>
            <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium">Upgrade to Pro</button>
                <button onClick={() => setShowUpgradeModal(false)} className="w-full text-slate-500 py-2">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}