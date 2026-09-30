import { NextResponse } from "next/server";
import { initializeApp, getApps, getApp } from "firebase/app";
import { doc, getDoc, getFirestore, serverTimestamp, updateDoc } from "firebase/firestore";

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

function checkpointFrom(completed: number[]) {
  const has = (from: number, to: number) => {
    for (let i = from; i <= to; i += 1) if (!completed.includes(i)) return false;
    return true;
  };
  if (has(1, 12)) return 4;
  if (has(1, 9)) return 3;
  if (has(1, 6)) return 2;
  if (has(1, 3)) return 1;
  return 0;
}

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
  const progressoId = typeof fields.progressoId === "string" ? fields.progressoId.trim() : "";
  const desafio = Number(fields.desafio);
  const concluido = fields.concluido === true;

  if (!/^[A-Za-z0-9_-]{10,120}$/.test(progressoId) || !Number.isInteger(desafio) || desafio < 1 || desafio > 12) {
    return NextResponse.json({ error: "Progresso ou desafio inválido." }, { status: 400 });
  }

  try {
    const ref = doc(db, "progresso_s12", progressoId);
    const snapshot = await getDoc(ref);
    if (!snapshot.exists()) {
      return NextResponse.json({ error: "Mapa de progresso não encontrado." }, { status: 404 });
    }

    const data = snapshot.data();
    const previous = Array.isArray(data.desafiosConcluidos)
      ? data.desafiosConcluidos.filter((value): value is number => Number.isInteger(value) && value >= 1 && value <= 12)
      : [];

    const next = new Set(previous);
    if (concluido) next.add(desafio);
    else next.delete(desafio);

    const desafiosConcluidos = [...next].sort((a, b) => a - b);
    const checkpointAtual = checkpointFrom(desafiosConcluidos);
    const progressoPercentual = Math.round((desafiosConcluidos.length / 12) * 100);

    await updateDoc(ref, {
      desafiosConcluidos,
      checkpointAtual,
      progressoPercentual,
      atualizadoEm: serverTimestamp(),
    });

    return NextResponse.json({
      success: true,
      desafiosConcluidos,
      checkpointAtual,
      progressoPercentual,
    });
  } catch (error: unknown) {
    console.error("Erro ao atualizar progresso S12:", error);
    return NextResponse.json({ error: "Falha ao atualizar o progresso." }, { status: 500 });
  }
}
