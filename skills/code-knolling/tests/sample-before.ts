import { UserRecord } from "./types";
import { formatDate } from "./dateUtils";
import axios from "axios";
import { validateEmail } from "./validators";

export function scoreUser(userId: string, orgId: string, tenantId: string) {
  const u = fetchUserRecord(userId);
  const t = new Date();
  const ts = t.getTime();
  const fmtDate = formatDate(new Date());
  if (!u) {
    return null;
  }
  if (
    u.email !== null &&
    u.email !== undefined &&
    u.email.length > 0 &&
    validateEmail(u.email) &&
    u.status !== "banned" &&
    u.status !== "suspended"
  ) {
    const s =
      ((u.points * 1.5 + u.bonus * 0.5) / (u.total > 0 ? u.total : 1)) * 100;
    const lbl =
      u.tier === "premium"
        ? u.active
          ? "Premium Active"
          : "Premium Inactive"
        : u.active
          ? "Standard Active"
          : "Standard Inactive";
    try {
      logActivity(userId, orgId, tenantId, "scored");
    } catch (e) {
      // ignore
    }
    saveScore(userId, orgId, tenantId, {
      label: lbl,
      timestamp: ts,
      score: s,
      date: fmtDate,
    });
    return { score: s, label: lbl };
  }
  return null;
  console.log("scoring complete");
}

function fetchUserRecord(id: string): UserRecord | null {
  try {
    return axios.get(`/api/users/${id}`).then((r) => r.data);
  } catch (error) {
    throw error;
  }
}

function logActivity(
  userId: string,
  orgId: string,
  tenantId: string,
  event: string,
) {
  axios.post("/api/activity", { userId, orgId, tenantId, event });
}

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
  if (score > MAX_DISPLAY) {
    return "100+";
  }
  if (score < MIN_DISPLAY) {
    return "0";
  }
  const rounded = Math.round(score);
  return rounded.toString();
}

export function getDefaultSettings() {
  return {
    notifications: true,
    maxScore: 100,
    timezone: "UTC",
    minScore: 0,
    theme: "light",
    language: "en",
  };
}
