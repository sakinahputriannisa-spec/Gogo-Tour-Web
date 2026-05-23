import React, { useState } from "react";
import { ArrowRight, Star, Sliders, ChevronDown, CheckCircle, Plane, Hotel } from "lucide-react";

interface HeroProps {
  onExploreDestinations: () => void;
  onExploreAI: () => void;
  onOrderNowSelect: (tab: string) => void;
  heroImagePath: string;
}

export const Hero: React.FC<HeroProps> = ({ 
  onExploreDestinations, 
  onExploreAI,
  onOrderNowSelect,
  heroImagePath 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-16 px-4">
      {/* Background Image with Rich Deep Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImagePath}
          alt="B breathtaking Swiss Alps sunrise nature-scenery by gogo tour"
          className="w-full h-full object-cover select-none scale-105 filter brightness-[0.75]"
          referrerPolicy="no-referrer"
        />
        {/* Soft Pink glow from top right & Blue glow from bottom left */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-slate-950/80"></div>
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-sky-500/15 rounded-full blur-[120px] pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Brand Message */}
        <div className="lg:col-span-7 text-left space-y-6">
          <div className="inline-flex items-center space-x-2 bg-slate-900/80 backdrop-blur-md border border-sky-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-sky-400 shadow-md">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-ping"></span>
            <span>Premium B2B & Executive Travel Planner</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight font-display">
            Eksplorasi Bisnis & <br />
            <span className="bg-gradient-to-r from-sky-450 via-sky-300 to-pink-400 bg-clip-text text-transparent">
              Liburan Premium
            </span> <br />
            di Asia & Eropa
          </h1>

          <p className="text-slate-200 text-lg max-w-2xl font-light leading-relaxed">
            Rencanakan perjalanan bisnis korporat serta liburan mewah Anda bersama <strong className="font-bold text-sky-300 font-display">Gogo Tour</strong>. Nikmati keuntungan hotel bintang 5 terkurasi, ruang kerja eksekutif, dan asisten lokal bahasa Indonesia 24 jam dengan kalkulasi Rupiah yang transparan.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
            {/* Order Now (Pesan Sekarang) Menu Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-sky-500 via-sky-600 to-pink-500 hover:brightness-110 text-white font-bold text-center transition-all duration-300 transform active:scale-95 shadow-lg shadow-pink-500/20 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Pesan Sekarang</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-30" 
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  <div className="absolute left-0 mt-3 w-72 bg-slate-900/95 backdrop-blur-xl border border-sky-550/20 border-slate-700/80 rounded-2xl shadow-2xl z-40 overflow-hidden divide-y divide-slate-800 animate-fadeIn text-left">
                    <button
                      onClick={() => {
                        onOrderNowSelect("tour-booking");
                        setIsDropdownOpen(false);
                      }}
                      className="w-full flex items-start space-x-3.5 p-4 hover:bg-pink-500/10 active:bg-pink-500/5 transition-colors text-left group/item"
                    >
                      <div className="p-2.5 bg-pink-550/10 bg-pink-500/15 text-pink-400 rounded-xl group-hover/item:bg-pink-500 group-hover/item:text-white transition-all">
                        <Plane className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block text-sm font-bold text-white group-hover/item:text-pink-450 group-hover/item:text-pink-400 transition-colors">Booking Paket Tur</span>
                        <span className="block text-[11px] text-slate-300 mt-1 leading-normal">Pilih destinasi premium di Asia & Eropa dengan rute lengkap VIP</span>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        onOrderNowSelect("hotel");
                        setIsDropdownOpen(false);
                      }}
                      className="w-full flex items-start space-x-3.5 p-4 hover:bg-sky-500/10 active:bg-sky-500/5 transition-colors text-left group/item"
                    >
                      <div className="p-2.5 bg-sky-550/10 bg-sky-500/15 text-sky-400 rounded-xl group-hover/item:bg-sky-505 group-hover/item:bg-sky-500 group-hover/item:text-white transition-all">
                        <Hotel className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block text-sm font-bold text-white group-hover/item:text-sky-455 group-hover/item:text-sky-400 transition-colors">Pemesanan Hotel</span>
                        <span className="block text-[11px] text-slate-300 mt-1 leading-normal">Pesan kamar suite partner Bintang 5 termewah secara langsung</span>
                      </div>
                    </button>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={onExploreDestinations}
              className="px-6 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-205 text-slate-200 border border-slate-800 hover:border-slate-700 transition-all text-center flex items-center justify-center space-x-2"
            >
              <span>Paket Destinasi</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreAI}
              className="px-6 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-sky-500/30 hover:border-sky-400 transition-all text-center flex items-center justify-center space-x-2 backdrop-blur-md"
            >
              <span>Rencana AI</span>
              <span className="inline-block bg-pink-500 text-white text-[9px] px-2 py-0.5 rounded-full font-bold animate-pulse">
                Pintar
              </span>
            </button>
          </div>

          {/* Key Advantages Checklist */}
          <div className="grid grid-cols-2 gap-y-2 gap-x-4 pt-6 text-sm text-slate-300">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-pink-400 shrink-0" />
              <span>Dukungan Protokol VIP</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Kalkulasi Rupiah (Rp) Pas</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Hotel Bintang 5 Garansi</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-pink-400 shrink-0" />
              <span>Bebas Biaya Tersembunyi</span>
            </div>
          </div>
        </div>

        {/* Right Column: Promotional Interactive Glass Card */}
        <div className="lg:col-span-5">
          <div className="bg-slate-900/80 border border-sky-500/20 p-6 rounded-2xl backdrop-blur-md shadow-2xl relative overflow-hidden group">
            {/* Design highlight bars */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sky-500 via-sky-300 to-pink-500"></div>

            <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-500/10 rounded-full blur-2xl pointer-events-none"></div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold font-mono text-pink-400 uppercase tracking-widest">Penawaran Korporat Terbaik</span>
              <div className="flex items-center text-amber-400 text-sm font-semibold bg-amber-500/10 px-2 py-1 rounded">
                <Star className="w-3.5 h-3.5 fill-current mr-1" />
                <span>4.9 / 5</span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">Tur Super Eksekutif Swiss - Alps</h3>
            <p className="text-sm text-slate-300 mb-4 font-light">
              Nikmati perjalanan impian menakjubkan ke Zurich, Geneva, hingga Zermatt yang bebas polusi. Disertai First Class Swiss Travel Pass dan resort spa pegunungan bintang 5 kelas atas.
            </p>

            {/* Quick Price Information */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-sky-950 mb-6 flex justify-between items-center">
              <div>
                <span className="text-xs text-slate-400 block">Mulai Dari (All-In)</span>
                <span className="text-2xl font-black text-white">Rp 68.000.000</span>
                <span className="text-[10px] text-slate-400 block font-light">per pax • Pajak Termausk</span>
              </div>
              <div className="text-right">
                <span className="text-xs bg-sky-500/10 text-sky-300 border border-sky-400/20 px-2 py-1 rounded block mb-1">Pariwisata + Bisnis</span>
                <span className="text-xs text-pink-400 font-semibold block">Sisa Slot: 4 Kursi</span>
              </div>
            </div>

            <button
              onClick={onExploreDestinations}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500/30 to-pink-500/30 hover:from-sky-500/50 hover:to-pink-500/50 text-white font-bold text-sm border border-sky-500/30 transition-all flex items-center justify-center space-x-2"
            >
              <span>Lihat Detail & Itinerary</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Wave element representing travel */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-950 to-transparent z-0 pointer-events-none"></div>
    </div>
  );
};
