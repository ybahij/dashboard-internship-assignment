import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agency & Contact Dashboard",
  description: "Dashboard for managing agencies and contacts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Check if Clerk is configured
  const clerkConfigured = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!clerkConfigured) {
    return (
      <html lang="en">
        <body className="antialiased">
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
              <h1 className="text-xl font-bold text-gray-900 mb-4">Setup Required</h1>
              <p className="text-gray-600 mb-4">
                Please configure your Clerk authentication keys.
              </p>
              <p className="text-sm text-gray-500">
                Copy <code className="bg-gray-100 px-1">.env.local.example</code> to{" "}
                <code className="bg-gray-100 px-1">.env.local</code> and add your Clerk keys.
              </p>
            </div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
