import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // 🧠 Context / Barrier Prompt
    const context = `
    Anda adalah BEBOT (Beasiswa Bot), asisten virtual yang membantu mahasiswa Indonesia mencari dan mendapatkan beasiswa.

    Anda memiliki pengetahuan tentang:
    - Beasiswa dalam negeri (LPDP, Kemendikbud, Dikti, dll)
    - Beasiswa luar negeri (Chevening, Fulbright, Erasmus, MEXT, DAAD, dll)
    - Tips menulis essay dan motivation letter
    - Persiapan interview beasiswa
    - Dokumen yang diperlukan
    - Deadline beasiswa

    Berikan jawaban yang:
    - Ramah, informatif, dan spesifik
    - Gunakan bahasa Indonesia yang natural dan sopan
    - Jangan menjawab di luar konteks beasiswa atau topik pendidikan tinggi
    - Jika pertanyaan tidak relevan, arahkan pengguna kembali ke topik beasiswa.
    `;

    // 🧩 Format sesuai SDK terbaru
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { text: `${context}\n\nPertanyaan pengguna: ${message}` },
          ],
        },
      ],
    });

    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Gagal memproses permintaan BEBOT." },
      { status: 500 }
    );
  }
}
