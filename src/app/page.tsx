// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import Link from "next/link";

// export default async function Home() {
//   const { userId } = await auth();

//   if (userId) {
//     redirect("/dashboard");
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
//       <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
//         <div className="text-center">
//           <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
//             <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//             </svg>
//           </div>
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Agency & Contact Dashboard
//           </h1>
//           <p className="text-gray-600 mb-8">
//             Manage your agencies and contacts all in one place. Sign in to get started.
//           </p>
//           <div className="space-y-4">
//             <Link
//               href="/sign-in"
//               className="block w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors"
//             >
//               Sign In
//             </Link>
//             <Link
//               href="/sign-up"
//               className="block w-full bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg border-2 border-indigo-600 hover:bg-indigo-50 transition-colors"
//             >
//               Create Account
//             </Link>
//           </div>
//           <p className="text-xs text-gray-500 mt-6">
//             Free tier includes 50 contact views per day
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect('/dashboard/agencies');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6">
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-lg w-full text-center space-y-6">
        <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
          <ShieldCheck size={40} />
        </div>
        
        <h1 className="text-3xl font-bold text-slate-900">Agency Portal</h1>
        <p className="text-slate-500">
          Secure access to our global agency directory and employee contact database.
        </p>

        <Link 
          href="/dashboard/agencies" 
          className="inline-flex items-center justify-center gap-2 w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all"
        >
          Enter Dashboard <ArrowRight size={20} />
        </Link>
      </div>
    </main>
  );
}