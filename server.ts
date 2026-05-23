import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route for generating itineraries
  app.post("/api/gemini/generate", async (req, res) => {
    const { destination, durationDays, focus, notes } = req.body;

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");

    const prompt = `
Kamu adalah AI Travel Planner Expert profesional dari Gogo Tour Indonesia. Rancanglah rencana perjalanan (itinerary) premium untuk perjalanan ke kota/negara: "${destination}" dengan durasi ${durationDays} hari.
Fokus perjalanan ini adalah: "${focus}".
Saran & kebutuhan khusus dari klien: "${notes || "Tidak ada kebutuhan khusus"}".

Ketentuan Tanggapan:
1. Gunakan Bahasa Indonesia yang sangat sopan, profesional, dan persuasif, cocok untuk pimpinan perusahaan maupun individu eksekutif.
2. Deskripsikan rencana per hari (Hari 1 s.d Hari ${durationDays}) dengan sub-judul yang menarik.
3. Sebutkan setidaknya 1 rekomendasi hotel bintang 5 termewah yang relevan dan rincian fasilitas VIP (seperti akses ke Airport Executive Lounge atau kendaraan Mercedes-Benz pribadi).
4. Tulis semua estimasi biaya perjalanan, tiket masuk, hingga akomodasi pariwisata dalam format mata uang Rupiah (IDR).
5. Buat kesimpulan ringkas di bagian bawah mengenai mengapa Gogo Tour adalah partner terbaik untuk mengeksekusi rencana perjalanan ini.
`;

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("Kunci API Gemini (GEMINI_API_KEY) belum terkonfigurasi di panel Settings > Secrets aplikasi Anda.");
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const responseStream = await ai.models.generateContentStream({
        model: "gemini-3.5-flash",
        contents: prompt,
      });

      for await (const chunk of responseStream) {
        if (chunk.text) {
          res.write(chunk.text);
        }
      }
      res.end();
    } catch (error: any) {
      console.error("Gemini stream error:", error);
      res.write(`ERROR: ${error.message || "Terjadi kesalahan di server."}`);
      res.end();
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
