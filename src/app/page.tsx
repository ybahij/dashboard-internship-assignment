
import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect('/dashboard/');
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