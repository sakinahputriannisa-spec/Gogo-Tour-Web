import React, { useState } from "react";
import { Plane, Globe, Shield, Ticket, Luggage, Star, Award, ChevronRight, CheckCircle2, AlertCircle, Sparkles, Download } from "lucide-react";
import { DESTINATIONS } from "../data";
import { downloadAsFile } from "../utils/download";

interface Airline {
  id: string;
  name: string;
  homepage: string;
  logoColor: string;
  brandGradient: string;
  badgeTextColor: string;
  rating: number;
  description: string;
  originCountry: string;
  focusRegion: string;
  luggageAllowance: string;
  cabinClasses: string[];
  exclusivePerks: string[];
  funFact: string;
}

const PARTNER_AIRLINES: Airline[] = [
  {
    id: "sq",
    name: "Singapore Airlines",
    homepage: "https://www.singaporeair.com",
    logoColor: "bg-amber-500",
    brandGradient: "from-blue-900 to-[#102a43]",
    badgeTextColor: "text-amber-400 border-amber-500/30",
    rating: 5,
    description: "Maskapai bintang 5 terbaik global. Dikenal dengan layanan legendaris 'Singapore Girl' serta kabin termewah untuk rute penerbangan jarak jauh maupun regional Asia Tenggara.",
    originCountry: "Singapura",
    focusRegion: "Asia, Eropa, Global",
    luggageAllowance: "Hingga 30kg (Ekonomi), 40kg (Bisnis), 50kg (First Class)",
    cabinClasses: ["Suite", "First Class", "Business Class", "Premium Economy", "Economy Class"],
    exclusivePerks: [
      "Check-in otomatis kelompok & jaminan kursi berdampingan",
      "Pilihan Menu Makanan Halal (MoML) premium bersertifikat tanpa biaya tambahan",
      "Akses Eksklusif KrisFlyer Gold Lounge di Changi Terminal 3 bagi VIP Gogo Tour",
      "Tambahan Bagasi Ekstra korporat khusus up to 10kg gratis"
    ],
    funFact: "Singapore Airlines merupakan maskapai pertama di dunia yang mengoperasikan pesawat super superjumbo Airbus A380."
  },
  {
    id: "ga",
    name: "Garuda Indonesia",
    homepage: "https://www.garuda-indonesia.com",
    logoColor: "bg-emerald-600",
    brandGradient: "from-teal-800 to-emerald-950",
    badgeTextColor: "text-emerald-400 border-emerald-500/30",
    rating: 5,
    description: "Flag carrier kebanggaan Indonesia yang memenangkan penghargaan 'World's Best Cabin Crew' berkali-kali. Menyajikan keramahan khas budaya kepulauan Nusantara.",
    originCountry: "Indonesia",
    focusRegion: "Domestik, Asia, Australia, Eropa (Transit)",
    luggageAllowance: "Hingga 30kg (Ekonomi), 40kg (Bisnis)",
    cabinClasses: ["First Class", "Business Class", "Economy Class"],
    exclusivePerks: [
      "Jalur Fast-Track Imigrasi khusus keberangkatan internasional di Bandara Soekarno-Hatta T3",
      "Akses Premium Garuda Indonesia Terminal Lounge di Cengkareng",
      "Kebijakan pengubahan jadwal (Rescheduling) & pengembalian dana (Refund) VIP kilat",
      "Signature Welcome Drink khas Nusantara (Jus Martabe) menyambut delegasi Anda"
    ],
    funFact: "Garuda Indonesia dinamai oleh Presiden RI Pertama, Ir. Soekarno, mengutip sebaris puisi ciptaan Noto Soeroto."
  },
  {
    id: "qr",
    name: "Qatar Airways",
    homepage: "https://www.qatarairways.com",
    logoColor: "bg-purple-800",
    brandGradient: "from-purple-900 to-[#2d122b]",
    badgeTextColor: "text-pink-400 border-pink-500/30",
    rating: 5,
    description: "Peraih gelar 'Airline of the Year' terkemuka dunia. Menawarkan kabin Qsuite legendaris dengan pintu privasi penuh serta rute tak terbatas ke gerbang utama Eropa.",
    originCountry: "Qatar (Doha)",
    focusRegion: "Eropa, Timur Tengah, Amerika",
    luggageAllowance: "Hingga 25kg (Ekonomi), 40kg (Bisnis), 50kg (First Class)",
    cabinClasses: ["First Class", "Qsuite Business", "Economy Class"],
    exclusivePerks: [
      "Akses Al Maha Meet & Assist Service saat mendarat di bandara terbaik dunia Doha Hamad Airport",
      "Voucher khusus Wi-Fi Super-Fast 100Mbps tanpa batas di seluruh armada Boeing 777 dan A350",
      "Fasilitas transit premium gratis (menginap di hotel Doha) untuk durasi singgah di atas 8 jam",
      "Prioritas bagasi merah (VIP Tagging) tiba pertama di ban berjalan tujuan Eropa"
    ],
    funFact: "Maskapai ini mengoperasikan armada penerbangan termuda di dunia dengan rata-rata usia pesawat di bawah lima tahun."
  },
  {
    id: "ek",
    name: "Emirates",
    homepage: "https://www.emirates.com",
    logoColor: "bg-red-650",
    brandGradient: "from-red-900 to-slate-900",
    badgeTextColor: "text-red-400 border-red-500/30",
    rating: 5,
    description: "Operator pesawat Airbus A380 dua lantai terbesar di jagat raya. Menyediakan standar kemewahan yang ikonik, spa pancuran air panas, bar atas awan, hingga kuliner adiwana.",
    originCountry: "Uni Emirat Arab (Dubai)",
    focusRegion: "Eropa, Timur Tengah, Amerika, Afrika",
    luggageAllowance: "Hingga 30kg (Ekonomi), 40kg (Bisnis), 50kg (First Class)",
    cabinClasses: ["First Class Private Suites", "Business Class", "Premium Economy", "Economy Class"],
    exclusivePerks: [
      "Layanan gratis supir pribadi ber-AC antar-jemput dari bandara luar negeri ke hotel tujuan",
      "Akses lounge mewah tak bertepi milik Emirates di Terminal 3 Dubai dengan spa mandi gratis",
      "Akses ke sistem multimedia ICE peraih penghargaan hiburan terbaik dunia selama 17 tahun berturut-turut",
      "Voucher diskon bebas bea (Duty Free) belanja di atas pesawat"
    ],
    funFact: "Armada A380 Emirates memuat bar lounge eksklusif di dek atas khusus bagi para penumpang kelas Bisnis dan utama."
  },
  {
    id: "jl",
    name: "Japan Airlines",
    homepage: "https://www.jal.co.jp",
    logoColor: "bg-red-600",
    brandGradient: "from-rose-900 to-stone-900",
    badgeTextColor: "text-rose-400 border-rose-500/30",
    rating: 5,
    description: "Membawa filosofi ketulusan pelayanan tradisional terbaik khas Negeri Sakura (Omotenashi). Menyuguhkan kursi ekonomi terluas sedunia yang sangat ramah kaki.",
    originCountry: "Jepang (Tokyo)",
    focusRegion: "Asia Timur, Amerika, regional Jepang",
    luggageAllowance: "Hingga 2 koper x 23kg (Ekonomi), 3 koper x 32kg (Bisnis)",
    cabinClasses: ["JAL Suite", "JAL Sky Suite Business", "Premium Economy", "JAL Sky Wider Economy"],
    exclusivePerks: [
      "Fasilitas drop-bagasi prioritas di Bandara Soekarno-Hatta T3 & Haneda",
      "Sajian bento legendaris otentik Jepang halal berlisensi resmi pariwisata Tokyo",
      "Akses internet Wi-Fi gratis di kabin bagi traveler korporat bersponsor Gogo Tour",
      "Koleksi amenity kit elegan rancangan desainer butik mewah Tokyo"
    ],
    funFact: "Japan Airlines memiliki logo ikonik bernama 'Tsurumaru' yang menggambarkan burung bangau mahkota merah dengan sayap melingkar."
  },
  {
    id: "tk",
    name: "Turkish Airlines",
    homepage: "https://www.turkishairlines.com",
    logoColor: "bg-red-650",
    brandGradient: "from-rose-850 to-amber-950",
    badgeTextColor: "text-orange-400 border-orange-500/30",
    rating: 5,
    description: "Menghubungkan peradaban dunia lintas selat Bosphorus. Maskapai global dengan jaringan jangkauan destinasi negara terbanyak di permukaan bumi saat ini.",
    originCountry: "Turki (Istanbul)",
    focusRegion: "Eropa Timur, Eropa Barat, Timur Tengah, Afrika",
    luggageAllowance: "Hingga 30kg (Ekonomi), 40kg (Bisnis)",
    cabinClasses: ["Business Class", "Economy Class"],
    exclusivePerks: [
      "Sajian hidangan segar 'Flying Chefs' yang disiapkan langsung oleh koki profesional bersertifikasi",
      "Tiket tur kota Istanbul gratis (Touristanbul) bagi rombongan korporat yang bertransit panjang",
      "Pemberian set mainan anak ramah lingkungan berbahan kayu tersertifikasi",
      "Akomodasi hotel bintang 5 transit gratis di Istanbul jika durasi transfer melebihi 9 jam"
    ],
    funFact: "Turkish Airlines melayani penerbangan terjauh langsung dari Istanbul ke benua Australia (Melbourne)."
  },
  {
    id: "nh",
    name: "All Nippon Airways",
    homepage: "https://www.ana.co.jp",
    logoColor: "bg-blue-600",
    brandGradient: "from-blue-800 to-indigo-950",
    badgeTextColor: "text-blue-400 border-blue-500/30",
    rating: 5,
    description: "Raksasa penerbangan bintang 5 asal jepang yang terkenal dengan tingkat presisi ketepatan waktu penerbangan mendekati 99.8% serta kebersihan kabin mutlak.",
    originCountry: "Jepang (Tokyo)",
    focusRegion: "Asia, Amerika, Pasifik",
    luggageAllowance: "Hingga 2 koper x 23kg (Ekonomi), 2 koper x 32kg (Bisnis)",
    cabinClasses: ["The Suite (First)", "The Room (Business)", "Premium Economy", "Economy Class"],
    exclusivePerks: [
      "Akses eksklusif ANA Lounge kelas dunia di Tokyo Narita & Haneda",
      "Penanganan bagasi super cepat (Priority Baggage Delivery) setara pemegang status Star Alliance Gold",
      "Kabin Suite pribadi 'The Room' terlebar di dunia untuk perjalanan istirahat bisnis paripurna",
      "Makanan sup mi ramen khas Jepang otentik gratis tersedia di tengah penerbangan"
    ],
    funFact: "ANA mengoperasikan pesawat bertema khusus resmi dari serial film legendaris Star Wars terlengkap di dunia."
  }
];

export const AirlinePartners: React.FC = () => {
  const [selectedAirline, setSelectedAirline] = useState<Airline>(PARTNER_AIRLINES[0]);
  const [activeRegion, setActiveRegion] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Simulated Baggage Calculator state
  const [calcClass, setCalcClass] = useState<string>("Economy");
  const [luggageWeight, setLuggageWeight] = useState<number>(23);
  const [cabinBaggage, setCabinBaggage] = useState<number>(7);
  
  // Boarding Pass Mockup generator State
  const [userName, setUserName] = useState<string>("");
  const [userDest, setUserDest] = useState<string>("Tokyo, Jepang");
  const [selectedPassClass, setSelectedPassClass] = useState<string>("Business Class");
  const [boardingGate, setBoardingGate] = useState<string>("B12");
  const [seatNo, setSeatNo] = useState<string>("11K");
  const [boardingPassCount, setBoardingPassCount] = useState<number>(0);
  const [showPass, setShowPass] = useState<boolean>(false);

  // Filter logic
  const filteredAirlines = PARTNER_AIRLINES.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          a.originCountry.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          a.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeRegion === "all") return matchesSearch;
    if (activeRegion === "asia") return matchesSearch && a.focusRegion.toLowerCase().includes("asia");
    if (activeRegion === "eropa") return matchesSearch && a.focusRegion.toLowerCase().includes("eropa");
    return matchesSearch;
  });

  const handleCreateBoardingPass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) {
      alert("Silakan masukkan nama lengkap pelancong VIP terlebih dahulu.");
      return;
    }
    // Randomize seat and gate
    const gates = ["A04", "B12", "C19", "D08", "E01", "F15"];
    const seats = ["02A", "05D", "11K", "14F", "18B", "22C"];
    setBoardingGate(gates[Math.floor(Math.random() * gates.length)]);
    setSeatNo(seats[Math.floor(Math.random() * seats.length)]);
    setBoardingPassCount(prev => prev + 1);
    setShowPass(true);
  };

  const handleDownloadBoardingPass = () => {
    const ticketNo = `GT-${100000 + boardingPassCount}`;
    const fileContent = `==================================================\n` +
                        `       GOGO TOUR VIP BOARDING PASS TICKET        \n` +
                        `==================================================\n` +
                        `ID Tiket     : ${ticketNo}\n` +
                        `Status       : MENUNGGU VERIFIKASI (SIAP CETAK)\n` +
                        `Maskapai     : ${selectedAirline.name}\n` +
                        `Kelas        : ${selectedPassClass}\n` +
                        `--------------------------------------------------\n` +
                        `Nama Traveler: ${userName}\n` +
                        `Pemberangkatan: Jakarta (CGK)\n` +
                        `Tujuan Akhir : ${userDest}\n` +
                        `--------------------------------------------------\n` +
                        `Gate         : ${boardingGate} | Seat: ${seatNo} | Zone: Z1\n` +
                        `==================================================\n` +
                        `Silakan bawa file cetak asisten VIP ke counter check-in.\n` +
                        `Gogo Tour Indonesia - Luxury Tour & VIP Travel Solutions\n` +
                        `==================================================`;
    downloadAsFile(fileContent, `GogoTour_BoardingPass_${userName.replace(/[^a-zA-Z0-9]/g, "_")}.txt`);
  };

  return (
    <div className="py-12 bg-slate-50 px-4 font-sans text-left text-slate-800">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top visual Header block */}
        <div className="bg-gradient-to-tr from-slate-900 via-slate-950 to-slate-900 rounded-3xl p-8 md:p-12 border border-slate-800 shadow-2xl relative overflow-hidden text-white">
          <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-1.5 bg-sky-500/10 border border-sky-500/30 px-3.5 py-1 rounded-full text-xs font-bold text-sky-400">
              <Plane className="w-3.5 h-3.5 text-sky-400 rotate-45" />
              <span>Mitra Maskapai Resmi Premium Gogo Tour</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight font-display">
              Terbang Nyaman Dengan <br />
              <span className="bg-gradient-to-r from-sky-400 via-sky-300 to-pink-500 bg-clip-text text-transparent">
                Akurasi & Integritas Tinggi
              </span>
            </h1>
            
            <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed">
              Seluruh tur Gogo Tour menggunakan penerbangan bertaraf bintang 5 internasional demi menjamin jadwal penyerahan dokumen, transit yang mulus, kenyamanan istirahat di atas awan, serta jaminan alokasi bagasi melimpah tanpa repot.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-sky-400" />
                <span>Asuransi Delay Terintegrasi</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Ticket className="w-3.5 h-3.5 text-pink-400" />
                <span>E-Ticket Resmi Terverifikasi</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-sky-400" />
                <span>Aliansi Global Terkemuka</span>
              </span>
            </div>
          </div>
        </div>

        {/* Directory & Interactive Layout Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Explorer Filters & Selector List (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-905 text-slate-900 text-sm font-display uppercase tracking-wider">Cari Maskapai</h3>
              
              {/* Search Bar Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ketik nama maskapai / negara..."
                  className="w-full bg-slate-50 text-slate-800 text-xs p-3 pl-4 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500 font-medium placeholder-slate-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Geographic Region Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  onClick={() => setActiveRegion("all")}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all cursor-pointer ${
                    activeRegion === "all"
                      ? "bg-slate-900 border-slate-900 text-white"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Semua
                </button>
                <button
                  onClick={() => setActiveRegion("asia")}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all cursor-pointer ${
                    activeRegion === "asia"
                      ? "bg-sky-500 border-sky-500 text-white"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Fokus Asia
                </button>
                <button
                  onClick={() => setActiveRegion("eropa")}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all cursor-pointer ${
                    activeRegion === "eropa"
                      ? "bg-pink-500 border-pink-500 text-white"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Fokus Eropa
                </button>
              </div>
            </div>

            {/* Airlines Selection List */}
            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {filteredAirlines.length === 0 ? (
                <div className="text-center p-8 bg-white border border-slate-200 rounded-2xl">
                  <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-500 font-light">Tidak ada maskapai yang cocok.</p>
                </div>
              ) : (
                filteredAirlines.map((airline) => (
                  <button
                    key={airline.id}
                    onClick={() => setSelectedAirline(airline)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group cursor-pointer ${
                      selectedAirline.id === airline.id
                        ? "bg-white border-sky-500 shadow-md ring-1 ring-sky-500/20"
                        : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3.5 h-3.5 rounded-full ${airline.logoColor} shrink-0`}></div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 leading-snug">{airline.name}</h4>
                        <span className="text-[10px] text-slate-500">{airline.originCountry}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <span className="text-[10px] font-mono font-medium text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">buka info</span>
                      <ChevronRight className={`w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform ${selectedAirline.id === airline.id ? "text-sky-500" : ""}`} />
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* Quick Live Airline Verification Widget */}
            <div className="bg-gradient-to-tr from-sky-50 to-indigo-50 border border-sky-100 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-sky-600" />
                <h4 className="text-xs font-bold text-slate-900 font-display">Akses Pintar Homepage Resmi</h4>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed font-light">
                Perlu melakukan verifikasi kode booking tiket, pesan makanan diet khusus, atau check-in online langsung sebelum hari keberangkatan?
              </p>
              <div className="bg-white/80 border border-sky-100 rounded-xl p-3 text-[10px] text-slate-700 space-y-1.5 font-light">
                <div className="flex items-center justify-between">
                  <span>Nama Maskapai:</span>
                  <strong className="font-bold text-slate-900">{selectedAirline.name}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Link Homepage Resmi:</span>
                  <a 
                    href={selectedAirline.homepage} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-semibold text-sky-600 hover:underline break-all"
                    referrerPolicy="no-referrer"
                  >
                    {selectedAirline.homepage.replace("https://", "")}
                  </a>
                </div>
              </div>
              <a
                href={selectedAirline.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs text-center block shadow-sm shadow-sky-600/10 transition-all cursor-pointer"
                referrerPolicy="no-referrer"
              >
                Buka Homepage {selectedAirline.name}
              </a>
            </div>
          </div>

          {/* Right Column: Dynamic Deep-dive Airline Detail Presentation (lg:col-span-8) */}
          <div className="lg:col-span-8">
            
            {/* Main Airline Profile Dashboard */}
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm h-full flex flex-col justify-between">
              {/* Giant abstract boarding gate header background based on airline gradient */}
              <div className={`bg-gradient-to-r ${selectedAirline.brandGradient} text-white px-6 py-8 relative overflow-hidden text-left flex-shrink-0`}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="space-y-2">
                    <span className={`inline-block text-[10px] border px-2.5 py-0.5 rounded-full uppercase tracking-wider font-extrabold ${selectedAirline.badgeTextColor}`}>
                      Mitra Bintang 5 • {selectedAirline.originCountry}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-extrabold font-display leading-tight">{selectedAirline.name}</h2>
                    <p className="text-slate-300 text-xs font-light max-w-xl leading-relaxed">{selectedAirline.description}</p>
                  </div>
                  
                  {/* Digital Rating stamp */}
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl flex items-center gap-2 text-white shrink-0">
                    <div className="text-right">
                      <span className="block text-[9px] uppercase tracking-wide text-slate-300 font-bold">Skytrax</span>
                      <strong className="block text-sm font-black text-rose-400 font-display">RATING</strong>
                    </div>
                    <div className="bg-white p-2 rounded-xl text-slate-900 font-black text-base leading-none">
                      5★
                    </div>
                  </div>
                </div>
              </div>

              {/* Body stats block */}
              <div className="p-6 md:p-8 space-y-8 text-left grow flex flex-col justify-center">
                {/* Highlight Specs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Kategori Rute</span>
                    <strong className="text-xs text-slate-900 block font-bold">{selectedAirline.focusRegion}</strong>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Batas Bagasi Cuma-Cuma</span>
                    <strong className="text-xs text-sky-600 block font-bold">{selectedAirline.luggageAllowance}</strong>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Pilihan Kelas Kabin</span>
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {selectedAirline.cabinClasses.map((cl, i) => (
                        <span key={i} className="text-[9px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-medium">{cl.replace(" Class", "")}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Exclusive Gogo Tour Perks List */}
                <div className="space-y-4 pt-2">
                  <h3 className="font-bold text-slate-900 text-sm font-display uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-pink-500" />
                    <span>Perk & Hak Istimewa VIP Khusus Gogo Tour</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedAirline.exclusivePerks.map((perk, i) => (
                      <div key={i} className="flex items-start space-x-3 bg-slate-50 border border-slate-150 p-4 rounded-xl">
                        <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-700 font-normal leading-relaxed">{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fun facts block */}
                <div className="bg-slate-900 text-slate-200 p-5 rounded-2xl border border-slate-800 space-y-2 relative overflow-hidden mt-2">
                  <div className="absolute right-3 top-3 opacity-10">
                    <Sparkles className="w-16 h-16 text-white" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-pink-400 block font-mono">Tahukah Anda?</span>
                  <p className="text-xs font-light leading-relaxed">{selectedAirline.funFact}</p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Section Divider: VIP Assistant Utilities */}
        <div className="pt-8 border-t border-slate-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-left max-w-4xl">
            <div className="space-y-1.5">
              <div className="inline-flex items-center space-x-1.5 bg-pink-50 text-pink-700 px-3 py-1 rounded-full text-xs font-bold border border-pink-100">
                <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                <span>Smart Travel Desk</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold font-display text-slate-900 tracking-tight">VIP Travel Utilities & Asisten Penerbangan</h2>
              <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-light">
                Gunakan simulator di bawah untuk menghasilkan rancangan pas naik (Boarding Pass) premium Anda, atau cek standar kelayakan bagasi koper besar dan jinjing sebelum check-in bandara.
              </p>
            </div>
          </div>
        </div>

        {/* Balanced Side-by-Side Utilities Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* VIP Boarding Pass Generator Panel */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 text-left h-full flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-pink-500" />
                <h3 className="font-bold text-slate-900 text-base font-display">VIP Boarding Pass Generator</h3>
              </div>
              <p className="text-xs text-slate-500 font-normal">
                Visualisasikan boarding pass VIP Gogo Tour dengan mengisi nama delegasi Anda di maskapai terpilih.
              </p>
            </div>

            <form onSubmit={handleCreateBoardingPass} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5 col-span-1 sm:col-span-3">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wide block">Nama Pelancong Utama</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Ronald Sitorus"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full bg-slate-50 text-slate-800 text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="space-y-1.5 col-span-1 sm:col-span-2">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wide block">Destinasi Internasional</label>
                  <select
                    className="w-full bg-slate-50 text-slate-800 text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500 cursor-pointer font-medium"
                    value={userDest}
                    onChange={(e) => setUserDest(e.target.value)}
                  >
                    {DESTINATIONS.map((dest) => {
                      const mainCity = dest.cities[0];
                      const displayOption = `${mainCity}, ${dest.name}`;
                      return (
                        <option key={dest.id} value={displayOption}>
                          {dest.name} ({mainCity})
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="space-y-1.5 col-span-1">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wide block">Kelas VIP</label>
                  <select
                    className="w-full bg-slate-50 text-slate-800 text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500 cursor-pointer font-medium"
                    value={selectedPassClass}
                    onChange={(e) => setSelectedPassClass(e.target.value)}
                  >
                    <option value="First Class Suite">First Class</option>
                    <option value="Business Class Prestige">Business Class</option>
                    <option value="Premium Economy Elite">Premium Eco</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-slate-900 to-slate-850 hover:to-slate-900 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-pink-400" />
                <span>Pancarkan Tiket VIP Boarding Pass</span>
              </button>
            </form>

            {/* Generated pass ticket display */}
            <div className="mt-4 grow flex flex-col justify-end">
              {showPass ? (
                <div className="animate-fadeIn">
                  <div className="border border-indigo-200 border-dashed rounded-2xl overflow-hidden shadow-lg bg-white relative">
                    <div className="bg-slate-950 text-slate-400 text-[9px] py-1.5 px-4 font-mono justify-between flex items-center">
                      <span className="font-semibold text-sky-400 uppercase">Gogo Tour VIP pass</span>
                      <span>No. GT-{100000 + boardingPassCount}</span>
                    </div>

                    <div className={`bg-gradient-to-r ${selectedAirline.brandGradient} text-white p-5 text-left space-y-4`}>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] uppercase font-bold text-sky-350 text-sky-300">{selectedAirline.name} • {selectedPassClass}</span>
                        <Plane className="w-4 h-4 text-pink-400 rotate-45" />
                      </div>

                      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        <div>
                          <span className="block text-[7px] text-slate-400 uppercase font-mono">Nama Penumpang</span>
                          <span className="block text-xs font-black truncate">{userName}</span>
                        </div>
                        <div>
                          <span className="block text-[7px] text-slate-400 uppercase font-mono">Pemberangkatan</span>
                          <span className="block text-[11px] font-bold">Jakarta (CGK)</span>
                        </div>
                        <div>
                          <span className="block text-[7px] text-slate-400 uppercase font-mono">Tujuan Akhir</span>
                          <span className="block text-[11px] font-bold">{userDest}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1 font-mono text-center">
                          <div className="bg-white/15 rounded p-0.5 text-center">
                            <span className="block text-[6px] text-slate-300 uppercase">Gate</span>
                            <span className="block text-[10px] font-bold">{boardingGate}</span>
                          </div>
                          <div className="bg-white/15 rounded p-0.5 text-center">
                            <span className="block text-[6px] text-slate-300 uppercase">Seat</span>
                            <span className="block text-[10px] font-bold">{seatNo}</span>
                          </div>
                          <div className="bg-white/15 rounded p-0.5 text-center">
                            <span className="block text-[6px] text-slate-300 uppercase">Zone</span>
                            <span className="block text-[10px] font-bold">Z1</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 text-[8px] text-slate-500 py-2 px-4 text-center border-t border-slate-100 flex justify-between font-mono">
                      <span>Rancangan Visual Paket VIP Gogo Tour</span>
                      <span className="font-bold text-emerald-600">MENUNGGU VERIFIKASI</span>
                    </div>
                  </div>
                  
                  {/* Download Ticket Button */}
                  <button
                    type="button"
                    onClick={handleDownloadBoardingPass}
                    className="w-full mt-3 py-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-700 font-extrabold text-[11px] transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Tiket Boarding Pass (TXT)</span>
                  </button>
                </div>
              ) : (
                <div className="border border-slate-200 border-dashed rounded-2xl p-8 text-center bg-slate-50 flex flex-col items-center justify-center space-y-2 h-[180px]">
                  <Sparkles className="w-8 h-8 text-slate-300" />
                  <p className="text-xs text-slate-400 font-light">
                    Isi form di atas untuk membuat visualisasi pas naik eksklusif Anda.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Luggage Allowance Check-In Tool Panel */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 text-left h-full flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Luggage className="w-5 h-5 text-sky-500" />
                <h3 className="font-bold text-slate-900 text-base font-display">Simulasi Bagasi Penerbangan</h3>
              </div>
              <p className="text-xs text-slate-500 font-light">
                Verifikasi kesesuaian estimasi muat koper Anda dengan ketentuan cuma-cuma dari {selectedAirline.name}.
              </p>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-700 font-bold uppercase tracking-wider">Pilih Kelas Tiket:</span>
                  <span className="text-sky-600 font-bold">{calcClass}</span>
                </div>
                <div className="flex gap-2">
                  {["Economy", "Business", "First / Suite"].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => {
                        setCalcClass(level);
                        if (level === "Economy") setLuggageWeight(23);
                        else if (level === "Business") setLuggageWeight(35);
                        else setLuggageWeight(45);
                      }}
                      className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        calcClass === level 
                          ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-700 font-semibold">Berat Bagasi Terdaftar (Koper Utama):</span>
                  <span className="font-bold text-slate-900 font-mono">{luggageWeight} Kg</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  value={luggageWeight}
                  onChange={(e) => setLuggageWeight(Number(e.target.value))}
                  className="w-full accent-pink-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>5kg</span>
                  <span>30kg</span>
                  <span>60kg</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-700 font-semibold">Berat Tas Jinjing (Kabin bawaan):</span>
                  <span className="font-bold text-slate-900 font-mono">{cabinBaggage} Kg</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  value={cabinBaggage}
                  onChange={(e) => setCabinBaggage(Number(e.target.value))}
                  className="w-full accent-sky-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>1kg</span>
                  <span>7kg</span>
                  <span>15kg</span>
                </div>
              </div>
            </div>

            {/* Results indicator */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex flex-col justify-between space-y-3 mt-4">
              <div className="space-y-2">
                <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 block font-mono">Analisis Kelayakan</span>
                
                <div className="flex items-center justify-between text-xs text-slate-700">
                  <span>Bagasi Utama ({luggageWeight} Kg):</span>
                  {luggageWeight <= (calcClass === "Economy" ? 30 : calcClass === "Business" ? 40 : 50) ? (
                    <span className="text-[10px] bg-emerald-50 border border-emerald-200 text-emerald-600 font-bold px-2 py-0.5 rounded">GRATIS</span>
                  ) : (
                    <span className="text-[10px] bg-rose-50 border border-rose-200 text-rose-600 font-bold px-2 py-0.5 rounded">MELEBIHI BATAS</span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-700">
                  <span>Tas Jinjing Kabin ({cabinBaggage} Kg):</span>
                  {cabinBaggage <= 7 ? (
                    <span className="text-[10px] bg-emerald-50 border border-emerald-200 text-emerald-600 font-bold px-2 py-0.5 rounded font-medium">LOLOS</span>
                  ) : (
                    <span className="text-[10px] bg-amber-50 border border-amber-200 text-amber-600 font-bold px-2 py-0.5 rounded font-medium">BIAYA EKSTRA</span>
                  )}
                </div>
              </div>

              <div className="bg-white border border-slate-150 rounded-xl p-3 text-[11px] text-slate-600 leading-relaxed font-light">
                {luggageWeight <= (calcClass === "Economy" ? 30 : calcClass === "Business" ? 40 : 50) && cabinBaggage <= 7 ? (
                  <p>
                    🎉 Bagasi Anda berkategori <strong className="font-bold text-emerald-600">Lolos Regulasi</strong>! Seluruh biaya telah tercakup dalam tiket VIP di Gogo Tour.
                  </p>
                ) : (
                  <p className="text-rose-700 font-normal">
                    ⚠ Perhatian: Berat muatan Anda melebihi regulasi cuma-cuma {selectedAirline.name}. Silakan kurangi berat isi atau upgrade kuota melalui asisten Gogo Tour.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
