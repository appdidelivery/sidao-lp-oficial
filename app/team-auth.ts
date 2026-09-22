import { createHmac, timingSafeEqual } from "node:crypto";

export const TEAM_COOKIE = "s12_team_access";
const SESSION_AGE_SECONDS = 60 * 60 * 12;

function secret() {
  const value = process.env.TEAM_SESSION_SECRET;
  if (!value) throw new Error("TEAM_SESSION_SECRET não configurado");
  return value;
}

export function createTeamSession() {
  const expires = Math.floor(Date.now() / 1000) + SESSION_AGE_SECONDS;
  const payload = String(expires);
  const signature = createHmac("sha256", secret()).update(payload).digest("hex");
  return { value: `${payload}.${signature}`, maxAge: SESSION_AGE_SECONDS };
}

export function isValidTeamSession(value?: string) {
  if (!value) return false;
  const [expiresText, signature, extra] = value.split(".");
  if (extra || !/^\d+$/.test(expiresText) || !/^[a-f0-9]{64}$/.test(signature ?? "")) return false;
  if (Number(expiresText) <= Math.floor(Date.now() / 1000)) return false;
  const expected = createHmac("sha256", secret()).update(expiresText).digest();
  return timingSafeEqual(expected, Buffer.from(signature, "hex"));
}
