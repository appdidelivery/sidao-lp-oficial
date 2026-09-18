import { NextResponse } from 'next/server';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Configuração flexível: Use suas variáveis de ambiente padrão do Next.js
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Singleton para evitar múltiplas instâncias no hot-reload do Next.js
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, email, whatsapp } = body;

    // Validação básica de segurança
    if (!nome || !email || !whatsapp) {
      return NextResponse.json(
        { error: 'Dados incompletos. Nome, email e whatsapp são obrigatórios.' },
        { status: 400 }
      );
    }

    // Inserção no Firestore
    const docRef = await addDoc(collection(db, 'leads_s12'), {
      nome,
      email,
      whatsapp,
      origem: 'Landing Page S12 (Live)',
      criadoEm: serverTimestamp(),
    });

    return NextResponse.json(
      { success: true, message: 'Lead capturado com sucesso', id: docRef.id },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Erro ao salvar lead no Firestore:', error);
    return NextResponse.json(
      { error: 'Falha interna ao processar o lead.' },
      { status: 500 }
    );
  }
}