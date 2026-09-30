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

type Answer = {
  id: string;
  value: string;
};

const requiredQuestions = new Set([
  "perfil",
  "frequencia",
  "dificuldade",
  "posicionamento",
  "decisoes",
  "pes",
  "pos_erro",
]);

const allowedProfiles = new Set(["amador", "base", "responsavel"]);
const allowedFocus = new Set(["base_segura", "dominio_gol", "goleiro_moderno", "blindagem_mental"]);

function calculateResult(answerMap: Record<string, string>) {
  const scores: Record<string, number> = {
    base_segura: 0,
    dominio_gol: 0,
    goleiro_moderno: 0,
    blindagem_mental: 0,
  };

  const difficulty = answerMap.dificuldade;
  if (difficulty === "pegada_posicionamento") scores.base_segura += 4;
  if (difficulty === "um_contra_um_bola_aerea") scores.dominio_gol += 4;
  if (difficulty === "jogo_pes_leitura") scores.goleiro_moderno += 4;
  if (difficulty === "erro_pressao") scores.blindagem_mental += 4;

  if (["baixa", "media"].includes(answerMap.posicionamento)) scores.base_segura += answerMap.posicionamento === "baixa" ? 3 : 1;
  if (["baixa", "media"].includes(answerMap.decisoes)) scores.dominio_gol += answerMap.decisoes === "baixa" ? 3 : 1;
  if (["baixa", "media"].includes(answerMap.pes)) scores.goleiro_moderno += answerMap.pes === "baixa" ? 3 : 1;
  if (["demoro", "oscilo"].includes(answerMap.pos_erro)) scores.blindagem_mental += answerMap.pos_erro === "demoro" ? 3 : 1;

  const order = ["base_segura", "dominio_gol", "goleiro_moderno", "blindagem_mental"];
  const foco = order.reduce((best, key) => scores[key] > scores[best] ? key : best, order[0]);

  let nivel = "essencial";
  if (
    answerMap.perfil === "base" &&
    ["3_ou_mais", "2"].includes(answerMap.frequencia) &&
    answerMap.posicionamento !== "baixa" &&
    answerMap.decisoes !== "baixa"
  ) {
    nivel = "base_performance";
  }

  return { foco, nivel, scores };
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
  const answers = Array.isArray(fields.answers) ? fields.answers : [];
  const answerMap: Record<string, string> = {};

  for (const raw of answers) {
    if (typeof raw !== "object" || raw === null) continue;
    const answer = raw as Partial<Answer>;
    if (typeof answer.id !== "string" || typeof answer.value !== "string") continue;
    answerMap[answer.id] = answer.value;
  }

  const received = new Set(Object.keys(answerMap));
  if ([...requiredQuestions].some((id) => !received.has(id))) {
    return NextResponse.json({ error: "Responda todas as perguntas do diagnóstico." }, { status: 400 });
  }
  if (!allowedProfiles.has(answerMap.perfil)) {
    return NextResponse.json({ error: "Perfil inválido." }, { status: 400 });
  }

  const { foco, nivel, scores } = calculateResult(answerMap);
  if (!allowedFocus.has(foco)) {
    return NextResponse.json({ error: "Não foi possível calcular o resultado." }, { status: 400 });
  }

  const utm = typeof fields.utm === "object" && fields.utm !== null
    ? fields.utm as Record<string, unknown>
    : {};

  try {
    const docRef = await addDoc(collection(db, "diagnosticos_s12"), {
      perfil: answerMap.perfil,
      respostas: answerMap,
      foco,
      nivel,
      scores,
      origem: typeof fields.origem === "string" ? fields.origem.slice(0, 500) : "academias12.com.br",
      utm: {
        source: typeof utm.source === "string" ? utm.source.slice(0, 100) : "",
        medium: typeof utm.medium === "string" ? utm.medium.slice(0, 100) : "",
        campaign: typeof utm.campaign === "string" ? utm.campaign.slice(0, 150) : "",
        content: typeof utm.content === "string" ? utm.content.slice(0, 150) : "",
        term: typeof utm.term === "string" ? utm.term.slice(0, 150) : "",
      },
      criadoEm: serverTimestamp(),
    });

    return NextResponse.json({
      success: true,
      id: docRef.id,
      foco,
      nivel,
    });
  } catch (error: unknown) {
    console.error("Erro ao salvar diagnóstico no Firestore:", error);
    return NextResponse.json({ error: "Falha ao salvar o diagnóstico." }, { status: 500 });
  }
}
