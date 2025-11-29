// import Link from "next/link";

// export default function DashboardPage() {
//   return (
//     <div>
//       <h1 className="text-3xl font-bold text-gray-900 mb-8">Welcome to Dashboard</h1>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Agencies Card */}
//         <Link href="/dashboard/agencies" className="block">
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
//             <div className="flex items-center">
//               <div className="flex-shrink-0 bg-indigo-100 rounded-lg p-3">
//                 <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                 </svg>
//               </div>
//               <div className="ml-4">
//                 <h2 className="text-xl font-semibold text-gray-900">Agencies</h2>
//                 <p className="text-gray-500">View and manage agency information</p>
//               </div>
//             </div>
//           </div>
//         </Link>

//         {/* Contacts Card */}
//         <Link href="/dashboard/contacts" className="block">
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
//             <div className="flex items-center">
//               <div className="flex-shrink-0 bg-green-100 rounded-lg p-3">
//                 <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                 </svg>
//               </div>
//               <div className="ml-4">
//                 <h2 className="text-xl font-semibold text-gray-900">Contacts</h2>
//                 <p className="text-gray-500">Browse contact directory (50 views/day limit)</p>
//               </div>
//             </div>
//           </div>
//         </Link>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { User, MapPin, Phone, Mail, Layout, LogOut, ShieldAlert, ChevronRight, Building2, Users } from 'lucide-react';

// --- MOCK DATA ---
// Generating randomized agencies and contacts as per assignment context
const AGENCIES = Array.from({ length: 15 }, (_, i) => ({
  id: `ag-${i}`,
  city: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte'][i],
  address: `${Math.floor(Math.random() * 900) + 100} Market St`,
  status: Math.random() > 0.2 ? 'Active' : 'Inactive'
}));

const CONTACTS = Array.from({ length: 100 }, (_, i) => ({
  id: `ct-${i}`,
  name: `Employee ${i + 1}`,
  role: ['Agent', 'Manager', 'Director', 'Assistant'][Math.floor(Math.random() * 4)],
  agencyId: AGENCIES[Math.floor(Math.random() * AGENCIES.length)].id,
  // Sensitive data is what we "protect" with the limit
  email: `employee.${i+1}@agency.com`,
  phone: `+1 (555) 01${Math.floor(Math.random() * 89) + 10}`
}));

// --- TYPES ---

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleLogout: () => void;
}

interface LoginScreenProps {
  onLogin: () => void;
}

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ContactsTableProps {
  onReveal: (id: string) => boolean;
  revealedIds: Set<string>;
}

// --- COMPONENTS ---

// 1. Navigation Sidebar
const Sidebar = ({ activeTab, setActiveTab, handleLogout }: SidebarProps) => (
  <div className="w-64 bg-slate-900 text-white flex flex-col h-full">
    <div className="p-6 border-b border-slate-700">
      <h1 className="text-xl font-bold flex items-center gap-2">
        <Layout className="w-6 h-6 text-blue-400" />
        AgencyDash
      </h1>
    </div>
    
    <nav className="flex-1 p-4 space-y-2">
      <button 
        onClick={() => setActiveTab('agencies')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'agencies' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
      >
        <Building2 size={20} />
        Agencies
      </button>
      <button 
        onClick={() => setActiveTab('contacts')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'contacts' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
      >
        <Users size={20} />
        Contacts
      </button>
    </nav>

    <div className="p-4 border-t border-slate-700">
      <div className="flex items-center gap-3 mb-4 px-2">
        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs">
          JD
        </div>
        <div className="text-sm">
          <p className="font-medium">John Doe</p>
          <p className="text-slate-500 text-xs">Free Tier</p>
        </div>
      </div>
      <button 
        onClick={handleLogout}
        className="w-full flex items-center gap-2 text-red-400 hover:text-red-300 text-sm px-2"
      >
        <LogOut size={16} />
        Sign Out
      </button>
    </div>
  </div>
);

// 2. Login Screen (Simulating Clerk)
const LoginScreen = ({ onLogin }: LoginScreenProps) => (
  <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
      <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <ShieldAlert size={32} />
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome Back</h2>
      <p className="text-slate-500 mb-8">Please sign in to access the dashboard</p>
      
      <button 
        onClick={onLogin}
        className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
      >
        Sign in with Clerk
        <ChevronRight size={16} />
      </button>
      <p className="mt-4 text-xs text-slate-400">
        (In the real app, this redirects to Clerk Auth)
      </p>
    </div>
  </div>
);

// 3. Upgrade Modal
const UpgradeModal = ({ isOpen, onClose }: UpgradeModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl max-w-md w-full overflow-hidden shadow-2xl">
        <div className="bg-blue-600 p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-1">Daily Limit Reached</h3>
          <p className="text-blue-100 text-sm">You've viewed 50 contacts today.</p>
        </div>
        <div className="p-6">
          <p className="text-slate-600 mb-6 text-center">
            Upgrade to our Pro plan to unlock unlimited contact views and export features.
          </p>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors">
            Upgrade Now ($19/mo)
          </button>
          <button 
            onClick={onClose}
            className="w-full mt-3 text-slate-400 hover:text-slate-600 text-sm font-medium"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
};

// 4. Main App Component
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('agencies');
  const [viewCount, setViewCount] = useState(0);
  const [showUpgrade, setShowUpgrade] = useState(false);
  
  // We use a set to track which IDs have been "revealed" so we don't count re-views
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());

  // Simulate persistent "Daily" limit
  useEffect(() => {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('lastViewDate');
    const savedCount = parseInt(localStorage.getItem('dailyViewCount') || '0');

    if (savedDate !== today) {
      // Reset if new day
      setViewCount(0);
      localStorage.setItem('lastViewDate', today);
    } else {
      setViewCount(savedCount);
    }
  }, []);

  const handleRevealContact = (id: string) => {
    if (revealedIds.has(id)) return true; // Already revealed, no cost

    if (viewCount >= 50) {
      setShowUpgrade(true);
      return false;
    }

    const newCount = viewCount + 1;
    setViewCount(newCount);
    localStorage.setItem('dailyViewCount', newCount.toString());
    
    const newRevealed = new Set(revealedIds);
    newRevealed.add(id);
    setRevealedIds(newRevealed);
    return true;
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        handleLogout={() => setIsAuthenticated(false)} 
      />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-8 py-4 sticky top-0 z-10 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-800 capitalize">{activeTab}</h2>
          <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-200">
            Daily Views: <span className={viewCount >= 50 ? "text-red-500 font-bold" : "font-bold"}>{viewCount}</span>/50
          </div>
        </header>

        <div className="p-8">
          {activeTab === 'agencies' ? (
            <AgenciesTable />
          ) : (
            <ContactsTable 
              onReveal={handleRevealContact} 
              revealedIds={revealedIds} 
            />
          )}
        </div>
      </main>

      <UpgradeModal isOpen={showUpgrade} onClose={() => setShowUpgrade(false)} />
    </div>
  );
};

// --- SUB-VIEWS ---

const AgenciesTable = () => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
    <table className="w-full text-left">
      <thead className="bg-slate-50 border-b border-slate-200">
        <tr>
          <th className="px-6 py-4 font-semibold text-slate-600">City / Agency</th>
          <th className="px-6 py-4 font-semibold text-slate-600">Address</th>
          <th className="px-6 py-4 font-semibold text-slate-600">Status</th>
          <th className="px-6 py-4 font-semibold text-slate-600 text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {AGENCIES.map((agency) => (
          <tr key={agency.id} className="hover:bg-slate-50 transition-colors">
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
            <td className="px-6 py-4 text-right">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View Details</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ContactsTable = ({ onReveal, revealedIds }: ContactsTableProps) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
    <div className="p-4 bg-yellow-50 border-b border-yellow-100 text-yellow-800 text-sm flex items-center gap-2">
      <ShieldAlert size={16} />
      <span>Contact information is protected. Click "Reveal" to view details. Counts towards daily limit.</span>
    </div>
    <table className="w-full text-left">
      <thead className="bg-slate-50 border-b border-slate-200">
        <tr>
          <th className="px-6 py-4 font-semibold text-slate-600">Name</th>
          <th className="px-6 py-4 font-semibold text-slate-600">Role</th>
          <th className="px-6 py-4 font-semibold text-slate-600">Contact Info</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {CONTACTS.map((contact) => {
          const isRevealed = revealedIds.has(contact.id);
          
          return (
            <tr key={contact.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm font-bold">
                    {contact.name.charAt(0)}
                  </div>
                  <span className="font-medium text-slate-900">{contact.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-slate-500">{contact.role}</td>
              <td className="px-6 py-4">
                {isRevealed ? (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <Mail size={14} className="text-slate-400" />
                      {contact.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <Phone size={14} className="text-slate-400" />
                      {contact.phone}
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={() => onReveal(contact.id)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 rounded-md text-sm font-medium transition-all"
                  >
                    <ShieldAlert size={14} />
                    Reveal Contact Info
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export default App;