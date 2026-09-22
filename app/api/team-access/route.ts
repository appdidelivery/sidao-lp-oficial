import { createHash, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { createTeamSession, TEAM_COOKIE } from "@/app/team-auth";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json({ error: "Origem inválida" }, { status: 403 });
  }
  const body: unknown = await request.json().catch(() => null);
  const password = typeof body === "object" && body !== null && "password" in body ? body.password : null;
  const expected = process.env.TEAM_ACCESS_PASSWORD;
  if (typeof password !== "string" || password.length > 128 || !expected) {
    return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
  }
  const actualHash = createHash("sha256").update(password).digest();
  const expectedHash = createHash("sha256").update(expected).digest();
  if (!timingSafeEqual(actualHash, expectedHash)) {
    return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
  }
  const session = createTeamSession();
  const response = NextResponse.json({ success: true });
  response.cookies.set(TEAM_COOKIE, session.value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: session.maxAge,
  });
  return response;
}
