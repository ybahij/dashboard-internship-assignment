import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import * as fs from 'fs';
// @ts-ignore: no type declarations for 'csv-parser'
import csv from 'csv-parser';
const AGENCIES_FILE_PATH = './data/agencies.csv';
const EMPLOYEES_FILE_PATH = './data/employees.csv';
// In-memory storage for view counts (in production, use a database like Redis)
// Format: { [userId]: { count: number, date: string } }
const viewCounts: Map<string, { count: number; date: string }> = new Map();

const DAILY_VIEW_LIMIT = 50;

// Sample contacts data
const contacts = [
  { id: 1, name: "John Smith", email: "john.smith@example.com", phone: "555-0101", company: "Tech Corp" },
  { id: 2, name: "Sarah Johnson", email: "sarah.j@example.com", phone: "555-0102", company: "Creative Agency" },
  { id: 3, name: "Michael Brown", email: "m.brown@example.com", phone: "555-0103", company: "Media House" },
  { id: 4, name: "Emily Davis", email: "emily.d@example.com", phone: "555-0104", company: "Innovation Inc" },
  { id: 5, name: "David Wilson", email: "d.wilson@example.com", phone: "555-0105", company: "Summit Group" },
  { id: 6, name: "Lisa Anderson", email: "lisa.a@example.com", phone: "555-0106", company: "Digital First" },
  { id: 7, name: "James Taylor", email: "j.taylor@example.com", phone: "555-0107", company: "Global Media" },
  { id: 8, name: "Jennifer Martinez", email: "j.martinez@example.com", phone: "555-0108", company: "Tech Solutions" },
  { id: 9, name: "Robert Garcia", email: "r.garcia@example.com", phone: "555-0109", company: "Design Studio" },
  { id: 10, name: "Amanda Miller", email: "a.miller@example.com", phone: "555-0110", company: "Marketing Pro" },
];

function getTodayDate(): string {
  return new Date().toISOString().split("T")[0];
}

function getUserViewCount(userId: string): { count: number; remainingViews: number } {
  const today = getTodayDate();
  const userViews = viewCounts.get(userId);

  if (!userViews || userViews.date !== today) {
    // Reset count for new day
    return { count: 0, remainingViews: DAILY_VIEW_LIMIT };
  }

  return {
    count: userViews.count,
    remainingViews: Math.max(0, DAILY_VIEW_LIMIT - userViews.count),
  };
}

function incrementViewCount(userId: string): void {
  const today = getTodayDate();
  const userViews = viewCounts.get(userId);

  if (!userViews || userViews.date !== today) {
    viewCounts.set(userId, { count: 1, date: today });
  } else {
    viewCounts.set(userId, { count: userViews.count + 1, date: today });
  }
}

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { count, remainingViews } = getUserViewCount(userId);

  if (count >= DAILY_VIEW_LIMIT) {
    return NextResponse.json(
      {
        error: "Daily limit exceeded",
        limitExceeded: true,
        viewCount: count,
        remainingViews: 0,
        dailyLimit: DAILY_VIEW_LIMIT,
        contacts: [],
      },
      { status: 429 }
    );
  }

  // Increment view count
  incrementViewCount(userId);

  return NextResponse.json({
    contacts,
    viewCount: count + 1,
    remainingViews: remainingViews - 1,
    dailyLimit: DAILY_VIEW_LIMIT,
    limitExceeded: false,
  });
}
