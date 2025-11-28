"use client";

import { useEffect, useState } from "react";

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
}

interface ContactsResponse {
  contacts: Contact[];
  viewCount: number;
  remainingViews: number;
  dailyLimit: number;
  limitExceeded: boolean;
  error?: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [limitExceeded, setLimitExceeded] = useState(false);
  const [viewCount, setViewCount] = useState(0);
  const [remainingViews, setRemainingViews] = useState(50);
  const [dailyLimit, setDailyLimit] = useState(50);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("/api/contacts");
        const data: ContactsResponse = await response.json();

        setViewCount(data.viewCount);
        setRemainingViews(data.remainingViews);
        setDailyLimit(data.dailyLimit);

        if (response.status === 429 || data.limitExceeded) {
          setLimitExceeded(true);
          setContacts([]);
        } else {
          setContacts(data.contacts);
          setLimitExceeded(false);
        }
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (limitExceeded) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
          <p className="mt-2 text-gray-600">Browse contact directory</p>
        </div>

        {/* Upgrade Prompt */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg p-8 text-white">
          <div className="flex flex-col items-center text-center">
            <div className="bg-white/20 rounded-full p-4 mb-6">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Daily Limit Reached</h2>
            <p className="text-lg mb-2">
              You&apos;ve reached your daily limit of {dailyLimit} contact views.
            </p>
            <p className="text-white/80 mb-6">
              Views used today: {viewCount} / {dailyLimit}
            </p>
            <button className="bg-white text-indigo-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-md">
              Upgrade to view more
            </button>
            <p className="text-sm text-white/70 mt-4">
              Your limit will reset at midnight UTC
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
          <p className="mt-2 text-gray-600">Browse contact directory</p>
        </div>
        <div className="text-right">
          <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-500">Daily Views</p>
            <p className="text-lg font-semibold text-gray-900">
              {viewCount} / {dailyLimit}
            </p>
            <p className="text-xs text-gray-400">{remainingViews} remaining</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-indigo-600 font-medium">
                        {contact.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">{contact.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">{contact.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    {contact.company}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {remainingViews <= 10 && remainingViews > 0 && (
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-sm text-yellow-800">
              Only {remainingViews} views remaining today.{" "}
              <button className="font-medium underline hover:no-underline">
                Upgrade for unlimited access
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
