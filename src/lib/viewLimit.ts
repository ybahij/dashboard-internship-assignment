import { prisma } from './prisma';

const DAILY_LIMIT = 50;

/**
 * Check if user can view agency contacts
 * Automatically resets count if it's a new day
 */
export async function checkViewLimit(userId: string) {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Find or create user record
  let userLimit = await prisma.userViewLimit.findUnique({
    where: { userId },
  });

  if (!userLimit) {
    // First time user - create record
    userLimit = await prisma.userViewLimit.create({
      data: {
        userId,
        viewCount: 0,
        lastReset: startOfToday,
        dailyLimit: DAILY_LIMIT,
      },
    });
  }

  // Check if we need to reset the count (new day)
  const lastResetDate = new Date(userLimit.lastReset);
  if (lastResetDate < startOfToday) {
    // New day - reset count
    userLimit = await prisma.userViewLimit.update({
      where: { userId },
      data: {
        viewCount: 0,
        lastReset: startOfToday,
      },
    });
  }

  // Check if user has views remaining
  const canView = userLimit.viewCount < DAILY_LIMIT;
  const remaining = DAILY_LIMIT - userLimit.viewCount;

  return {
    canView,
    remaining,
    viewCount: userLimit.viewCount,
    limit: DAILY_LIMIT,
  };
}

/**
 * Increment the view count for a user
 */
export async function incrementViewCount(userId: string) {
  const { canView } = await checkViewLimit(userId);

  if (!canView) {
    throw new Error('Daily view limit exceeded');
  }

  await prisma.userViewLimit.update({
    where: { userId },
    data: {
      viewCount: {
        increment: 1,
      },
    },
  });
}

/**
 * Get user's current view stats
 */
export async function getViewStats(userId: string) {
  const { canView, remaining, viewCount, limit } = await checkViewLimit(userId);

  return {
    canView,
    remaining,
    viewCount,
    limit,
  };
}