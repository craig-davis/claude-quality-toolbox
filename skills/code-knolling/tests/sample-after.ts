// Pass 1: third-party before local
import axios from "axios";

import { validateEmail } from "./validators";
import { formatDate } from "./dateUtils";
import { UserRecord } from "./types";

// Pass 2: magic numbers extracted to named constants
const POINTS_WEIGHT = 1.5;
const BONUS_WEIGHT = 0.5;
const SCORE_SCALE = 100;

export function scoreUser(userId: string, orgId: string, tenantId: string) {
  // TODO [Pass 5]: userId/orgId/tenantId travel together across scoreUser, logActivity,
  // and saveScore — consider extracting into a UserContext type
  const user = fetchUserRecord(userId);
  const now = new Date(); // Pass 2: new Date() called once, reused below
  const timestamp = now.getTime();
  const formattedDate = formatDate(now);

  // Pass 1: blank line after guard clause return
  if (!user) {
    return null;
  }

  // Pass 2: long boolean condition broken into named intermediates
  const hasValidEmail =
    user.email != null && user.email.length > 0 && validateEmail(user.email);
  const isEligible =
    hasValidEmail && user.status !== "banned" && user.status !== "suspended";

  if (!isEligible) {
    return null;
  }

  // Pass 3: complex calculation broken into named steps
  const weightedPoints = user.points * POINTS_WEIGHT;
  const weightedBonus = user.bonus * BONUS_WEIGHT;
  const denominator = user.total > 0 ? user.total : 1;
  const score = ((weightedPoints + weightedBonus) / denominator) * SCORE_SCALE;

  // Pass 3: nested ternary expanded to full conditional
  let label: string;
  if (user.tier === "premium") {
    label = user.active ? "Premium Active" : "Premium Inactive";
  } else {
    label = user.active ? "Standard Active" : "Standard Inactive";
  }

  // TODO [Pass 5]: error swallowed here but fetchUserRecord propagates — inconsistent error handling strategy
  try {
    logActivity(userId, orgId, tenantId, "scored");
  } catch (e) {
    // ignore
  }

  // Pass 4: object keys ordered primary first; one arg per line
  saveScore(userId, orgId, tenantId, {
    score,
    label,
    timestamp,
    date: formattedDate,
  });

  // Pass 1: blank line before final return
  return { score, label };
}

// TODO [Pass 5]: throws errors — inconsistent with logActivity which swallows them
function fetchUserRecord(id: string): UserRecord | null {
  try {
    return axios.get(`/api/users/${id}`).then((r) => r.data);
  } catch (error) {
    throw error;
  }
}

// TODO [Pass 5]: userId/orgId/tenantId appear here and in saveScore — candidate for UserContext type
function logActivity(
  userId: string,
  orgId: string,
  tenantId: string,
  event: string,
) {
  axios.post("/api/activity", { userId, orgId, tenantId, event });
}

// TODO [Pass 5]: userId/orgId/tenantId appear here and in logActivity — candidate for UserContext type
function saveScore(
  userId: string,
  orgId: string,
  tenantId: string,
  data: Record<string, unknown>,
) {
  axios.put(`/api/scores/${userId}`, { orgId, tenantId, ...data });
}

export function formatScore(score: number) {
  const MAX_DISPLAY = 100;
  const MIN_DISPLAY = 0;

  // Pass 1: blank line after conditional return
  if (score > MAX_DISPLAY) {
    return "100+";
  }

  if (score < MIN_DISPLAY) {
    return "0";
  }

  const rounded = Math.round(score);

  // Pass 1: blank line before final return
  return rounded.toString();
}

export function getDefaultSettings() {
  // Pass 4: required/primary fields first, optional/secondary after;
  // Pass 4: values aligned into a column
  return {
    maxScore: 100,
    minScore: 0,
    theme: "light",
    language: "en",
    timezone: "UTC",
    notifications: true,
  };
}
