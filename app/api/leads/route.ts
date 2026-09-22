import { NextResponse } from "next/server";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const allowedProfiles = new Set([
  "Goleiro Amador",
  "Atleta de Base",
  "Preparador de Goleiros / Físico",
]);

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json({ error: "Origem inválida." }, { status: 403 });
  }
  const body: unknown = await request.json().catch(() => null);
  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
  }
  const fields = body as Record<string, unknown>;
  const nome = typeof fields.nome === "string" ? fields.nome.trim() : "";
  const whatsapp = typeof fields.whatsapp === "string" ? fields.whatsapp.trim() : "";
  const perfil = fields.perfil;
  const digits = whatsapp.replace(/\D/g, "");
  if (nome.length < 2 || nome.length > 100 || digits.length < 10 || digits.length > 13 || !allowedProfiles.has(String(perfil))) {
    return NextResponse.json({ error: "Confira os dados informados." }, { status: 400 });
  }

  try {
    const docRef = await addDoc(collection(db, "leads_s12"), {
      nome,
      whatsapp: digits,
      perfil,
      origem: "Landing Page S12 (Live)",
      criadoEm: serverTimestamp(),
    });
    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error: unknown) {
    console.error("Erro ao salvar lead no Firestore:", error);
    return NextResponse.json({ error: "Falha interna ao processar o lead." }, { status: 500 });
  }
}
