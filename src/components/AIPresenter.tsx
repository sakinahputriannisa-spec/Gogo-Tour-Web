import React, { useState } from "react";
import { ItineraryRequest } from "../types";
import { Sparkles, Calendar, Target, HelpCircle, ArrowRight, Clipboard, RefreshCw, Send, AlertTriangle, Download } from "lucide-react";
import { downloadAsFile } from "../utils/download";

export const AIPresenter: React.FC = () => {
  const [formData, setFormData] = useState<ItineraryRequest>({
    destination: "Zurich, Swiss",
    durationDays: 4,
    focus: "MICE (Meeting & Exhibition)",
    notes: "Butuh asisten penerjemah bahasa Jerman-Indonesia dan privat wifi privat berkecepatan tinggi."
  });

  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState("");
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDownloadItinerary = () => {
    if (!aiResult) return;
    const header = `==================================================\n` +
                   `          GOGO TOUR PREMIUM AI ITINERARY          \n` +
                   `==================================================\n` +
                   `Destinasi    : ${formData.destination}\n` +
                   `Durasi       : ${formData.durationDays} Hari\n` +
                   `Fokus Agenda : ${formData.focus}\n` +
                   `Dokumen diunduh : ${new Date().toLocaleString()}\n` +
                   `==================================================\n\n`;
    const footer = `\n\n==================================================\n` +
                   `Gogo Tour Indonesia - World-Class Business Travel Planner\n` +
                   `==================================================`;
    downloadAsFile(header + aiResult + footer, `GogoTour_Itinerary_${formData.destination.replace(/[^a-zA-Z0-9]/g, "_")}.txt`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerateItinerary = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAiResult("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/gemini/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          destination: formData.destination,
          durationDays: formData.durationDays,
          focus: formData.focus,
          notes: formData.notes
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Gagal menghubungi AI Server.");
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("Gagal membaca hasil dari AI Server.");
      }

      const decoder = new TextDecoder("utf-8");
      let accumulatedText = "";

      while (true) {
        const { value, done } = await reader.read();
        if (value) {
          const chunkText = decoder.decode(value, { stream: !done });
          
          if (chunkText.startsWith("ERROR:")) {
            throw new Error(chunkText.replace("ERROR:", "").trim());
          }
          
          accumulatedText += chunkText;
          setAiResult(accumulatedText);
        }
        if (done) {
          break;
        }
      }

    } catch (error: any) {
      console.error("Kesalahan Gemini API:", error);
      setErrorMessage(
        error?.message || "Terjadi kegagalan komunikasi dengan jaringan AI. Silakan periksa koneksi internet Anda atau coba lagi nanti."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    if (!aiResult) return;
    navigator.clipboard.writeText(aiResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-12 bg-white px-4 font-sans text-left text-slate-800">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Title */}
        <div className="text-center md:max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-1.5 bg-pink-50 border border-pink-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-pink-600">
            <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-pulse" />
            <span>Kecerdasan Buatan Gogo Tour</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-display">
            Perencana Itinerary AI Instan
          </h2>
          <p className="text-slate-500 font-light text-sm">
            Tebus kerumitan menyusun jadwal. Biarkan mesin AI kami meracik rencana perjalanan dinas berbalut liburan impian Anda ke Asia maupun Eropa dalam hitungan detik.
          </p>
        </div>

        {/* Action Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Input parameters */}
          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 p-6 rounded-2xl shadow-xl space-y-5">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-3 flex items-center space-x-2 font-display">
              <Sparkles className="w-5 h-5 text-sky-500" />
              <span>Rancang Kebutuhan Anda</span>
            </h3>

            <form onSubmit={handleGenerateItinerary} className="space-y-4 text-xs font-normal">
              {/* Destination */}
              <div>
                <label className="block font-semibold text-slate-500 mb-1">Destinasi Kota & Negara (Asia/Eropa)</label>
                <input
                  type="text"
                  name="destination"
                  required
                  value={formData.destination}
                  onChange={handleInputChange}
                  placeholder="Contoh: Paris (Prancis), Tokyo (Jepang)"
                  className="w-full bg-white text-slate-800 px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-sky-505 focus:outline-none transition-all"
                />
              </div>

              {/* Grid Layout Info */}
              <div className="grid grid-cols-2 gap-4">
                {/* Duration */}
                <div>
                  <label className="block font-semibold text-slate-600 mb-1 flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-pink-500" />
                    <span>Durasi Perjalanan</span>
                  </label>
                  <select
                    name="durationDays"
                    value={formData.durationDays}
                    onChange={handleInputChange}
                    className="w-full bg-white text-slate-800 px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-sky-505 focus:outline-none font-medium"
                  >
                    {[3, 4, 5, 6, 7, 8, 9, 10, 12, 14].map((d) => (
                      <option key={d} value={d}>{d} Hari</option>
                    ))}
                  </select>
                </div>

                {/* Focus */}
                <div>
                  <label className="block font-semibold text-slate-600 mb-1 flex items-center space-x-1">
                    <Target className="w-3.5 h-3.5 text-sky-500" />
                    <span>Fokus Agenda</span>
                  </label>
                  <select
                    name="focus"
                    value={formData.focus}
                    onChange={handleInputChange}
                    className="w-full bg-white text-slate-800 px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-sky-505 focus:outline-none font-medium"
                  >
                    <option value="MICE (Meeting & Exhibition)">MICE / Rapat Dinas</option>
                    <option value="Bisnis">Kunjungan Bisnis / Kerja</option>
                    <option value="Leisure">Full Wisata & Rekreasi</option>
                    <option value="Eksplorasi Budaya">Budaya & Sejarah Luar</option>
                  </select>
                </div>
              </div>

              {/* Additional notes */}
              <div>
                <label className="block font-semibold text-slate-600 mb-1 flex items-center space-x-1">
                  <HelpCircle className="w-3.5 h-3.5 text-pink-500" />
                  <span>Kebutuhan Tambahan (Opsional)</span>
                </label>
                <textarea
                  name="notes"
                  value={formData.notes || ""}
                  onChange={handleInputChange}
                  placeholder="Contoh: Butuh asisten lokal yang paham daerah pegunungan, reservasi restoran vegan..."
                  className="w-full bg-white text-slate-800 px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-sky-505 focus:outline-none h-24 resize-none leading-relaxed"
                ></textarea>
              </div>

              {/* Prompt warning of real API calls */}
              <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-start space-x-2 shadow-sm">
                <Sparkles className="w-4 h-4 text-pink-500 shrink-0 mt-0.5 animate-pulse" />
                <p className="text-[10px] text-slate-500 leading-normal font-light">
                  Mesin AI akan terhubung langsung ke server <strong className="text-slate-850 font-bold">Gemini</strong> milik Google untuk meracik detail pariwisata & kebutuhan VIP secara instan dalam hitungan detik.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-500 to-pink-500 hover:brightness-110 disabled:opacity-50 text-white font-extrabold text-xs shadow-lg shadow-pink-500/15 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>AI Sedang Meracik Jadwal Anda...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-white" />
                    <span>Dapatkan Itinerary Premium Anda</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right: AI Output Display */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-205 border-slate-200 rounded-2xl p-6 shadow-xl flex flex-col h-[520px] justify-between relative overflow-hidden">
            {/* Top highlight bar */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sky-500 to-pink-500"></div>

            <div className="flex justify-between items-center pb-3 border-b border-slate-200 mb-4 z-10">
              <span className="text-xs font-bold font-mono text-sky-655 text-sky-600 flex items-center space-x-1">
                <span>ITINERARY GENERATED BY GOGO TOUR AI</span>
              </span>
              
              {aiResult && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyToClipboard}
                    className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-55 border border-slate-205 text-slate-600 hover:text-slate-900 transition-colors text-[10px] font-bold flex items-center space-x-1 shadow-sm cursor-pointer"
                  >
                    <Clipboard className="w-3 h-3" />
                    <span>{copied ? "Tersalin!" : "Salin Jadwal"}</span>
                  </button>
                  <button
                    onClick={handleDownloadItinerary}
                    className="px-3 py-1.5 rounded-lg bg-pink-50 hover:bg-pink-100 border border-pink-200 text-pink-600 hover:text-pink-700 transition-colors text-[10px] font-bold flex items-center space-x-1 shadow-sm cursor-pointer"
                  >
                    <Download className="w-3 h-3" />
                    <span>Unduh File (.txt)</span>
                  </button>
                </div>
              )}
            </div>

            {/* Error Area or AI response field */}
            <div className="flex-1 overflow-y-auto pr-2 text-xs font-light text-slate-700 space-y-4 leading-relaxed font-normal">
              {errorMessage ? (
                <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl space-y-2 flex flex-col items-center text-center justify-center py-10 mt-6 shadow-sm">
                  <AlertTriangle className="w-8 h-8 text-rose-500" />
                  <h4 className="font-extrabold text-sm">Kesalahan AI Engine</h4>
                  <p className="max-w-md">{errorMessage}</p>
                </div>
              ) : aiResult ? (
                /* Dynamic Render output */
                <div className="whitespace-pre-line text-slate-800 text-sm font-sans space-y-4">
                  {aiResult}
                </div>
              ) : (
                /* Empty placeholder state */
                <div className="h-full flex flex-col items-center justify-center text-center text-slate-450 space-y-3 py-16">
                  <Sparkles className="w-10 h-10 text-slate-300 animate-pulse" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-500 font-display">Rencana Perjalanan Menunggu Dinilai</h4>
                    <p className="text-xs max-w-sm mt-1 font-sans">Lengkapi formulir di sebelah kiri dan klik tombol Kirim untuk memulai otomatisasi cerdas.</p>
                  </div>
                </div>
              )}
            </div>

            {aiResult && (
              <div className="mt-4 pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500">
                <span>Ingin memesan akomodasi ini langsung di Rupiah?</span>
                <span className="text-pink-600 font-bold flex items-center hover:underline cursor-pointer">
                  Silakan pindah ke Tab Pemesanan Hotel
                  <ArrowRight className="w-3 h-3 ml-1" />
                </span>
              </div>
            )}
            
          </div>

        </div>

      </div>
    </div>
  );
};
