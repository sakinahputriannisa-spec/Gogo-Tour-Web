import React, { useState } from "react";
import { DESTINATIONS, formatRupiah } from "../data";
import { 
  Search, MapPin, CheckCircle, Compass, ShieldCheck, ArrowRight, 
  ChevronDown, ChevronUp, FileText, Map, Award, Sparkles, 
  Clock, Shield, Building2, HelpCircle 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface DestinationListProps {
  onSelectDestinationForBooking: (destinationId: string) => void;
}

type TabType = "details" | "itinerary" | "facilities" | "more";

export const DestinationList: React.FC<DestinationListProps> = ({ 
  onSelectDestinationForBooking 
}) => {
  const [activeContinent, setActiveContinent] = useState<"Semua" | "Asia" | "Eropa">("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  // Track active submenu tab per destination ID
  const [activeTabs, setActiveTabs] = useState<Record<string, TabType | null>>({});

  // Additional explicit toggle states inside tabs to fulfill specific interactive button needs
  const [viewDestinations, setViewDestinations] = useState<Record<string, boolean>>({});
  const [viewFacilities, setViewFacilities] = useState<Record<string, boolean>>({});

  // Filter destinations based on selection and search query
  const filteredDestinations = DESTINATIONS.filter((dest) => {
    const matchesContinent = activeContinent === "Semua" || dest.continent === activeContinent;
    const matchesSearch = 
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.cities.some(city => city.toLowerCase().includes(searchQuery.toLowerCase())) ||
      dest.touristSpots.some(spot => spot.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesContinent && matchesSearch;
  });

  const toggleTab = (destId: string, tab: TabType) => {
    setActiveTabs(prev => {
      const current = prev[destId];
      return {
        ...prev,
        [destId]: current === tab ? null : tab
      };
    });
  };

  const toggleViewDestinations = (destId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setViewDestinations(prev => ({
      ...prev,
      [destId]: !prev[destId]
    }));
  };

  const toggleViewFacilities = (destId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setViewFacilities(prev => ({
      ...prev,
      [destId]: !prev[destId]
    }));
  };

  return (
    <div className="py-12 bg-slate-50/45 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center md:max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center space-x-1.5 bg-sky-50 border border-sky-100/85 px-4 py-1.5 rounded-full text-xs font-semibold text-sky-600 shadow-sm">
            <Compass className="w-3.5 h-3.5 text-sky-500 animate-spin-slow" />
            <span>Katalog Perjalanan Gogo Tour & MICE</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Pariwisata Eksotis & Protokoler VIP
          </h2>
          <p className="text-slate-500 font-light text-sm max-w-lg mx-auto leading-relaxed">
            Eksplorasi destinasi unggulan di Asia dan Eropa yang dikemas secara eksklusif dengan kenyamanan maksimal dan jaminan harga transparan.
          </p>
        </div>

        {/* Filters and Search Bar Container */}
        <div className="mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-3.5 border border-slate-200/80 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          {/* Continent Filter Button Group */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/50 max-w-sm w-full md:w-auto">
            {(["Semua", "Asia", "Eropa"] as const).map((continent) => (
              <button
                key={continent}
                onClick={() => setActiveContinent(continent)}
                className={`flex-1 md:flex-none px-5 py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all duration-200 ${
                  activeContinent === continent
                    ? "bg-gradient-to-r from-sky-500 to-pink-500 text-white shadow-md shadow-pink-500/10"
                    : "text-slate-500 hover:text-slate-850"
                }`}
              >
                {continent}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari negara, kota, atau tempat wisata..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50/50 text-slate-800 pl-11 pr-4 py-2.5 rounded-xl border border-slate-200/90 focus:bg-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-none transition-all text-sm font-normal placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Destinations Render */}
        {filteredDestinations.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-250 shadow-sm max-w-md mx-auto">
            <Compass className="w-12 h-12 text-slate-300 mx-auto mb-4 animate-pulse" />
            <h3 className="text-base font-bold text-slate-700">Tidak ada destinasi</h3>
            <p className="text-slate-400 font-light text-xs mt-1">Gunakan kata kunci pencarian negara atau kota lainnya.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {filteredDestinations.map((dest) => {
              const activeTab = activeTabs[dest.id] || null;
              const isSpotsVisible = viewDestinations[dest.id] || false;
              const isBenefitsVisible = viewFacilities[dest.id] || false;

              return (
                <div 
                  key={dest.id}
                  className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-slate-300/80 group"
                >
                  <div>
                    {/* Destination Thumbnail with Continent/Price Tag */}
                    <div className="relative h-60 overflow-hidden">
                      <img
                        src={dest.thumbnail}
                        alt={`${dest.name} Travel`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/15 to-transparent"></div>
                      
                      {/* Continent Badge */}
                      <span className="absolute top-4 left-4 bg-slate-900/85 backdrop-blur-md text-sky-300 border border-sky-500/10 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                        {dest.continent}
                      </span>

                      {/* Flag or Title overlay */}
                      <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between gap-4">
                        <div>
                          <h3 className="text-2xl font-black text-white tracking-tight font-display">{dest.name}</h3>
                          <div className="flex items-center text-sky-200 text-xs mt-1 space-x-1.5 font-medium">
                            <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                            <span>{dest.cities.join(" • ")}</span>
                          </div>
                        </div>
                        <div className="text-right bg-slate-950/90 backdrop-blur-md border border-slate-800 px-3 py-2 rounded-2xl shrink-0">
                          <span className="text-[9px] text-slate-450 text-slate-400 block font-bold uppercase tracking-wider leading-none mb-1">Mulai Dari</span>
                          <span className="text-base font-extrabold text-pink-400 leading-none">{formatRupiah(dest.pricePerPerson)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Descriptive content */}
                    <div className="p-6 space-y-4">
                      <p className="text-slate-500 font-light text-xs leading-relaxed">
                        {dest.description}
                      </p>

                      {/* Interactive menu buttons row: 4 consistent menus beneath package info */}
                      <div className="grid grid-cols-4 gap-1.5 pt-2.5 border-t border-slate-100">
                        {/* Tab 1: Package Details */}
                        <button
                          onClick={() => toggleTab(dest.id, "details")}
                          className={`flex flex-col items-center justify-center p-2 rounded-xl border text-[10px] font-bold tracking-tight transition-all gap-1 ${
                            activeTab === "details"
                              ? "bg-sky-50 border-sky-200 text-sky-600 shadow-sm"
                              : "bg-slate-50/50 border-slate-200/60 text-slate-500 hover:bg-slate-50 hover:text-slate-850"
                          }`}
                        >
                          <FileText className="w-4 h-4 shrink-0 text-sky-500" />
                          <span>Detail Paket</span>
                        </button>

                        {/* Tab 2: Itinerary / Spots visited */}
                        <button
                          onClick={() => toggleTab(dest.id, "itinerary")}
                          className={`flex flex-col items-center justify-center p-2 rounded-xl border text-[10px] font-bold tracking-tight transition-all gap-1 ${
                            activeTab === "itinerary"
                              ? "bg-pink-50 border-pink-100 text-pink-600 shadow-sm"
                              : "bg-slate-50/50 border-slate-200/60 text-slate-500 hover:bg-slate-50 hover:text-slate-850"
                          }`}
                        >
                          <Map className="w-4 h-4 shrink-0 text-pink-500" />
                          <span>Rencana Rute</span>
                        </button>

                        {/* Tab 3: Facilities / VIP */}
                        <button
                          onClick={() => toggleTab(dest.id, "facilities")}
                          className={`flex flex-col items-center justify-center p-2 rounded-xl border text-[10px] font-bold tracking-tight transition-all gap-1 ${
                            activeTab === "facilities"
                              ? "bg-emerald-50 border-emerald-100 text-emerald-600 shadow-sm"
                              : "bg-slate-50/50 border-slate-200/60 text-slate-500 hover:bg-slate-50 hover:text-slate-850"
                          }`}
                        >
                          <Award className="w-4 h-4 shrink-0 text-emerald-500" />
                          <span>Fasilitas VIP</span>
                        </button>

                        {/* Tab 4: View More / Info Tambahan */}
                        <button
                          onClick={() => toggleTab(dest.id, "more")}
                          className={`flex flex-col items-center justify-center p-2 rounded-xl border text-[10px] font-bold tracking-tight transition-all gap-1 ${
                            activeTab === "more"
                              ? "bg-indigo-50 border-indigo-100 text-indigo-600 shadow-sm"
                              : "bg-slate-50/50 border-slate-200/60 text-slate-500 hover:bg-slate-50 hover:text-slate-850"
                          }`}
                        >
                          <Sparkles className="w-4 h-4 shrink-0 text-indigo-500" />
                          <span>Selengkapnya</span>
                        </button>
                      </div>

                      {/* Smooth Collapsible / Expandable Panel for Tab Contents */}
                      <AnimatePresence mode="wait">
                        {activeTab && (
                          <motion.div
                            key={activeTab}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="mt-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3.5 text-xs text-slate-700">
                              
                              {/* DISPLAY DETAILS MODULE */}
                              {activeTab === "details" && (
                                <div className="space-y-3">
                                  <div className="flex items-center space-x-2 border-b border-slate-200/60 pb-2">
                                    <FileText className="w-4 h-4 text-sky-600" />
                                    <h4 className="font-bold text-slate-900 text-xs">Spesifikasi Layanan Wisata ({dest.name})</h4>
                                  </div>
                                  <div className="grid grid-cols-2 gap-3.5 text-[11px]">
                                    <div className="bg-white p-2.5 rounded-xl border border-slate-200/50 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
                                      <span className="text-[9px] text-slate-400 block uppercase font-bold">Durasi Utama</span>
                                      <span className="font-bold text-slate-855 text-slate-800">7 Hari / 6 Malam (All-In)</span>
                                    </div>
                                    <div className="bg-white p-2.5 rounded-xl border border-slate-200/50 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
                                      <span className="text-[9px] text-slate-400 block uppercase font-bold">Akomodasi Partner</span>
                                      <span className="font-bold text-slate-855 text-slate-800">Hotel Bintang 5 Premium</span>
                                    </div>
                                    <div className="bg-white p-2.5 rounded-xl border border-slate-200/50 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
                                      <span className="text-[9px] text-slate-400 block uppercase font-bold">Tiket Penerbangan</span>
                                      <span className="font-bold text-slate-855 text-slate-800">Premium / Business Class</span>
                                    </div>
                                    <div className="bg-white p-2.5 rounded-xl border border-slate-200/50 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
                                      <span className="text-[9px] text-slate-400 block uppercase font-bold">Dukungan Imigrasi</span>
                                      <span className="font-bold text-slate-855 text-emerald-600">Free Visa Assitance</span>
                                    </div>
                                  </div>
                                  <p className="text-[10px] text-slate-450 leading-relaxed font-light">
                                    Paket ini dirancang khusus untuk memenuhi standar bepergian eksekutif korporasidan perorangan. Menyajikan perjalanan lancar tanpa hambatan logistik & administrasi.
                                  </p>
                                </div>
                              )}

                              {/* DISPLAY ITINERARY (WITH ACCORDION FOR touristSpots) */}
                              {activeTab === "itinerary" && (
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                                    <div className="flex items-center space-x-2">
                                      <Map className="w-4 h-4 text-pink-500" />
                                      <h4 className="font-bold text-slate-900 text-xs">Destinasi Wisata Yang Dikunjungi</h4>
                                    </div>
                                    <span className="text-[10px] font-medium text-slate-400">{dest.touristSpots.length} Tempat</span>
                                  </div>
                                  
                                  {/* COLLAPSIBLE ACCORDION CONTAINER */}
                                  <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-sm space-y-2.5">
                                    <button 
                                      onClick={(e) => toggleViewDestinations(dest.id, e)}
                                      className="w-full flex items-center justify-between py-2 px-3 bg-slate-50 rounded-lg hover:bg-slate-100/80 transition-all text-left group/btn"
                                    >
                                      <span className="font-bold text-xs text-slate-700 flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5 text-pink-500" />
                                        {isSpotsVisible ? "Tutup Rute & Objek Wisata" : "Lihat Destinasi Wisata"}
                                      </span>
                                      <div className={`p-1 bg-white rounded border border-slate-200 transition-transform ${isSpotsVisible ? "rotate-180 text-pink-500" : "text-slate-400 group-hover/btn:text-slate-700"}`}>
                                        <ChevronDown className="w-3.5 h-3.5" />
                                      </div>
                                    </button>

                                    <AnimatePresence>
                                      {isSpotsVisible ? (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: "auto", opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          transition={{ duration: 0.2 }}
                                          className="overflow-hidden"
                                        >
                                          <div className="pt-2.5 pl-2 space-y-3.5 border-l-2 border-dashed border-pink-100 ml-3.5">
                                            {dest.touristSpots.map((spot, index) => (
                                              <div key={index} className="relative flex items-start gap-3.5 animate-fadeIn">
                                                {/* Bullet node dot */}
                                                <div className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-pink-500 border-2 border-white shadow-sm ring-4 ring-pink-100" />
                                                <div className="space-y-0.5">
                                                  <span className="text-[9px] uppercase font-bold text-slate-400">Rute 0{index + 1}</span>
                                                  <p className="text-xs font-semibold text-slate-800 leading-tight">{spot}</p>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </motion.div>
                                      ) : (
                                        <p className="text-[11px] text-slate-400 text-center py-2 italic">
                                          Klik tombol di atas untuk melihat detail rute perjalanan hari-demi-hari.
                                        </p>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                </div>
                              )}

                              {/* DISPLAY BENEFITS (WITH EXPANDABLE GRID) */}
                              {activeTab === "facilities" && (
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                                    <div className="flex items-center space-x-2">
                                      <Award className="w-4 h-4 text-emerald-600" />
                                      <h4 className="font-bold text-slate-900 text-xs font-display">Keuntungan Eksklusif & Fasilitas VIP</h4>
                                    </div>
                                  </div>

                                  {/* COMPLIANT ACCORDION WORKFLOW FOR BENEFITS AS ASKED */}
                                  <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-sm space-y-2.5">
                                    <button 
                                      onClick={(e) => toggleViewFacilities(dest.id, e)}
                                      className="w-full flex items-center justify-between py-2 px-3 bg-slate-50 rounded-lg hover:bg-slate-100/80 transition-all text-left group/btn"
                                    >
                                      <span className="font-bold text-xs text-slate-700 flex items-center gap-1.5">
                                        <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                                        {isBenefitsVisible ? "Sembunyikan Program VIP" : "Lihat Fasilitas VIP"}
                                      </span>
                                      <div className={`p-1 bg-white rounded border border-slate-200 transition-transform ${isBenefitsVisible ? "rotate-180 text-emerald-500" : "text-slate-400 group-hover/btn:text-slate-700"}`}>
                                        <ChevronDown className="w-3.5 h-3.5" />
                                      </div>
                                    </button>

                                    <AnimatePresence>
                                      {isBenefitsVisible ? (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: "auto", opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          transition={{ duration: 0.2 }}
                                          className="overflow-hidden"
                                        >
                                          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                                            {dest.benefits.map((benefit, index) => (
                                              <div 
                                                key={index} 
                                                className="flex items-start space-x-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 hover:border-emerald-200 transition-colors"
                                              >
                                                <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                                <span className="text-slate-700 font-normal leading-tight">{benefit}</span>
                                              </div>
                                            ))}
                                          </div>
                                        </motion.div>
                                      ) : (
                                        <p className="text-[11px] text-slate-400 text-center py-2 italic">
                                          Klik tombol di atas untuk membuka daftar 6 keuntungan protokoler VIP Anda.
                                        </p>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                </div>
                              )}

                              {/* DISPLAY VIEW MORE MODULE */}
                              {activeTab === "more" && (
                                <div className="space-y-3">
                                  <div className="flex items-center space-x-2 border-b border-slate-200/60 pb-2">
                                    <Sparkles className="w-4 h-4 text-indigo-500" />
                                    <h4 className="font-bold text-slate-900 text-xs">Ketentuan Tambahan & Kebijakan Gogo</h4>
                                  </div>
                                  <div className="space-y-2.5 text-[11px] font-light leading-relaxed text-slate-655 text-slate-600">
                                    <div className="flex items-start gap-1.5">
                                      <Shield className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                                      <span><strong>Asuransi Perlindungan Perjalanan</strong>: Memberikan cakupan pengobatan medis internasional kelas premium senilai €50.000 (Schengen Passport Standard).</span>
                                    </div>
                                    <div className="flex items-start gap-1.5">
                                      <Building2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                                      <span><strong>Kebijakan Reschedule B2b Mandiri</strong>: Gratis penjadwalan ulang tanggal keberangkatan hingga jangka waktu H-7 tanpa dikenakan potongan biaya penalti hotel.</span>
                                    </div>
                                    <div className="flex items-start gap-1.5">
                                      <HelpCircle className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                                      <span><strong>Penyediaan Layanan Pramutamu</strong>: Anda akan dimasukkan ke grup WhatsApp prioritas yang berisi asisten dwibahasa di negara destinasi 5 hari sebelum terbang.</span>
                                    </div>
                                  </div>
                                </div>
                              )}

                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Booking CTA trigger at bottom */}
                  <div className="p-6 pt-0 border-t border-slate-100 bg-slate-50/40 flex flex-col sm:flex-row items-center justify-between gap-4 gap-y-2 mt-2">
                    <div className="flex items-center space-x-1 text-[10px] text-slate-500 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Harga Transparan All-In & Perlindungan Korporasi</span>
                    </div>
                    <button
                      onClick={() => onSelectDestinationForBooking(dest.id)}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-pink-500 hover:brightness-110 active:brightness-95 text-white font-extrabold text-xs shadow-md shadow-pink-500/10 flex items-center justify-center space-x-1.5 transition-all active:scale-[0.98] cursor-pointer"
                    >
                      <span>Booking Paket {dest.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
