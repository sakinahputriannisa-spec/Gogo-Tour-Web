import React, { useState, useEffect } from "react";
import { DESTINATIONS, formatRupiah } from "../data";
import { Compass, CheckCircle, Calendar, Users, Briefcase, FileText, Sparkles, MapPin, Check, ArrowRight, ShieldCheck, Plane, Award, Sparkle } from "lucide-react";

interface TourBookingProps {
  preselectedCountryId?: string;
}

export const TourBooking: React.FC<TourBookingProps> = ({ preselectedCountryId }) => {
  // Locate a valid initial destination
  let initialCountryId = DESTINATIONS[0].id;
  if (preselectedCountryId) {
    const matchedDest = DESTINATIONS.find(d => d.id === preselectedCountryId);
    if (matchedDest) {
      initialCountryId = matchedDest.id;
    }
  }

  // Booking Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    selectedCountryId: initialCountryId,
    startDate: new Date(Date.now() + 14 * 86450000).toISOString().split("T")[0], // 2 weeks from now
    numberOfPeople: 2,
    flightClass: "business" as "economy" | "business" | "first",
    packageClass: "executive" as "standard" | "executive" | "presidential",
    isBusinessTrip: true,
    notes: "",
    paymentMethod: "bank-transfer" as string
  });

  const PAYMENT_METHODS = [
    { id: "bank-transfer", name: "Transfer Bank (VA)", description: "BCA, Mandiri, BNI, BRI dll" },
    { id: "credit-card", name: "Kartu Kredit VIP", description: "Visa, Mastercard, JCB Premium" },
    { id: "qris", name: "QRIS / E-Wallet", description: "GoPay, OVO, ShopeePay, Dana" },
    { id: "corporate-billing", name: "Corporate Billing (B2B)", description: "Invoice langsung ke divisi keuangan" }
  ];

  const getPaymentLabel = (methodId?: string) => {
    switch (methodId) {
      case "bank-transfer": return "Transfer Bank (VA)";
      case "credit-card": return "Kartu Kredit VIP";
      case "qris": return "QRIS / E-Wallet";
      case "corporate-billing": return "Corporate Billing (B2B)";
      default: return "Transfer Bank (VA)";
    }
  };

  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [activeContinent, setActiveContinent] = useState<"Semua" | "Asia" | "Eropa">("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const [priceInvoice, setPriceInvoice] = useState<{
    baseTourCost: number;
    flightAddon: number;
    packageTierAddon: number;
    subtotal: number;
    corporateDiscount: number;
    grandTotal: number;
  } | null>(null);

  // Monitor preselected changes
  useEffect(() => {
    if (preselectedCountryId) {
      const matchedDest = DESTINATIONS.find(d => d.id === preselectedCountryId);
      if (matchedDest) {
        setFormData(prev => ({
          ...prev,
          selectedCountryId: matchedDest.id
        }));
      }
    }
  }, [preselectedCountryId]);

  const selectedDest = DESTINATIONS.find(d => d.id === formData.selectedCountryId) || DESTINATIONS[0];

  // Dynamic invoice calculations
  useEffect(() => {
    if (!selectedDest) return;

    const baseTourCost = selectedDest.pricePerPerson * formData.numberOfPeople;

    // Flight Tier pricing per person
    let flightPerPerson = 0;
    if (formData.flightClass === "business") {
      flightPerPerson = 22000000; // Rp 22JT
    } else if (formData.flightClass === "first") {
      flightPerPerson = 55000000; // Rp 55JT
    }
    const flightAddon = flightPerPerson * formData.numberOfPeople;

    // Package Level flat pricing
    let packageTierAddon = 0;
    if (formData.packageClass === "executive") {
      packageTierAddon = 9500000 * formData.numberOfPeople; // Custom Executive VIP add-ons
    } else if (formData.packageClass === "presidential") {
      packageTierAddon = 24000000 * formData.numberOfPeople; // Luxury presidential treatment
    }

    const subtotal = baseTourCost + flightAddon + packageTierAddon;
    const corporateDiscount = formData.isBusinessTrip ? subtotal * 0.10 : 0; // 10% B2B discount
    const grandTotal = subtotal - corporateDiscount;

    setPriceInvoice({
      baseTourCost,
      flightAddon,
      packageTierAddon,
      subtotal,
      corporateDiscount,
      grandTotal
    });
  }, [
    formData.selectedCountryId,
    formData.numberOfPeople,
    formData.flightClass,
    formData.packageClass,
    formData.isBusinessTrip,
    selectedDest
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const selectPackageCard = (destId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedCountryId: destId
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert("Harap lengkapi formulir pendaftaran Anda terlebih dahulu.");
      return;
    }
    setBookingSuccess(true);
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      selectedCountryId: DESTINATIONS[0].id,
      startDate: new Date(Date.now() + 14 * 86450000).toISOString().split("T")[0],
      numberOfPeople: 2,
      flightClass: "business",
      packageClass: "executive",
      isBusinessTrip: true,
      notes: "",
      paymentMethod: "bank-transfer"
    });
    setBookingSuccess(false);
  };

  // Filter package options for the list selection tool
  const filteredPackages = DESTINATIONS.filter((dest) => {
    const matchesContinent = activeContinent === "Semua" || dest.continent === activeContinent;
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dest.cities.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesContinent && matchesSearch;
  });

  return (
    <div className="py-12 bg-white px-4 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Title Container */}
        <div className="text-center md:max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center space-x-1.5 bg-sky-50 border border-sky-100 px-3.5 py-1.5 rounded-full text-xs font-semibold text-sky-600">
            <Plane className="w-3.5 h-3.5 text-sky-500 animate-pulse" />
            <span>Reservasi Paket Perjalanan Dinas & Liburan</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
            Booking Paket Perjalanan Terpadu
          </h2>
          <p className="text-slate-500 font-light text-sm">
            Tentukan destinasi impian Anda, pilih kelas pesawat, rancang tingkat layanan VIP, dan biarkan agen pramutamu kami memproses administrasi visa dan logistik Anda.
          </p>
        </div>

        {bookingSuccess ? (
          /* SUCCESS SCREEN DISPLAY */
          <div className="max-w-xl mx-auto bg-white border border-slate-200 p-8 rounded-3xl shadow-2xl text-center space-y-6 animate-fadeIn">
            <div className="w-16 h-16 bg-gradient-to-tr from-sky-500 to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-pink-500/20">
              <Check className="w-8 h-8 text-white stroke-[3.5]" />
            </div>

            <h3 className="text-2xl font-black text-slate-900 font-display">Rencana Perjalanan Sukses Dipesan!</h3>
            
            <div className="text-left bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs space-y-3.5 text-slate-705">
              <p className="font-extrabold text-sky-600 text-sm border-b border-slate-200 pb-2 flex justify-between">
                <span>NOMOR BOOKING KANTOR:</span>
                <span className="font-mono">GOGO-TOUR-TRIP-{Math.floor(10000 + Math.random() * 90000)}</span>
              </p>
              
              <div className="grid grid-cols-2 gap-y-2">
                <div>Nama Traveler Utama:</div>
                <div className="font-bold text-slate-900 text-right">{formData.fullName}</div>
                
                <div>No. WhatsApp:</div>
                <div className="font-mono text-slate-900 text-right">{formData.phone}</div>

                <div>Negara Tujuan:</div>
                <div className="font-bold text-slate-900 text-right text-sky-600">{selectedDest.name} ({selectedDest.continent})</div>

                <div>Tanggal Berangkat:</div>
                <div className="font-bold text-slate-900 text-right">{formData.startDate}</div>

                <div>Jumlah Anggota (Pax):</div>
                <div className="font-bold text-slate-900 text-right">{formData.numberOfPeople} orang</div>

                <div>Tingkat Tiket Pesawat:</div>
                <div className="font-bold text-slate-900 text-right capitalize">{formData.flightClass} Class</div>

                <div>Tingkat Fasilitas VIP:</div>
                <div className="font-bold text-slate-900 text-right capitalize">{formData.packageClass} Tier</div>

                <div>Tipe Transaksi:</div>
                <div className="font-bold text-slate-900 text-right text-sky-655 text-sky-600 font-extrabold">{getPaymentLabel(formData.paymentMethod)}</div>
              </div>

              {priceInvoice && (
                <div className="pt-3.5 border-t border-slate-200 space-y-2">
                  <div className="flex justify-between text-slate-600">
                    <span>Biaya Kamar & Tur Dasar ({formData.numberOfPeople} Pax):</span>
                    <span className="font-semibold">{formatRupiah(priceInvoice.baseTourCost)}</span>
                  </div>
                  {priceInvoice.flightAddon > 0 && (
                    <div className="flex justify-between text-slate-600">
                      <span>Tambahan Tiket Penerbangan ({formData.flightClass}):</span>
                      <span className="font-semibold">+{formatRupiah(priceInvoice.flightAddon)}</span>
                    </div>
                  )}
                  {priceInvoice.packageTierAddon > 0 && (
                    <div className="flex justify-between text-slate-600">
                      <span>Tambahan Fasilitas VIP ({formData.packageClass}):</span>
                      <span className="font-semibold">+{formatRupiah(priceInvoice.packageTierAddon)}</span>
                    </div>
                  )}
                  {formData.isBusinessTrip && (
                    <div className="flex justify-between text-pink-600 font-bold border-t border-dashed border-slate-200 pt-2">
                      <span>Klaim Potongan Dinas B2B (10%):</span>
                      <span>-{formatRupiah(priceInvoice.corporateDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                    <span className="text-sky-700 font-extrabold flex items-center">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 mr-1 shrink-0" />
                      Total IDR All-In:
                    </span>
                    <span className="text-xl font-black bg-gradient-to-r from-sky-600 to-pink-500 bg-clip-text text-transparent">{formatRupiah(priceInvoice.grandTotal)}</span>
                  </div>
                </div>
              )}
            </div>

            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              Invoice resmi korporasi Anda untuk pengusulan pendanaan (reimbursement) telah dikirim langsung ke <strong className="text-slate-850 font-semibold">{formData.email}</strong>. Travel Consultant kami akan menghubungi nomor WhatsApp Anda dalam waktu 5-10 menit untuk menjadwalkan courier penjemputan berkas paspor fisik guna pengurusan visa gratis.
            </p>

            <button
              onClick={handleReset}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-500 to-pink-500 text-white font-extrabold text-sm shadow-xl hover:brightness-110 active:scale-95 transition-all"
            >
              Ajukan Reservasi Tur Lainnya
            </button>
          </div>
        ) : (
          /* CORE SELECTOR GRID */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Side: Package selector grid */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h3 className="text-lg font-bold text-slate-905 flex items-center space-x-2 font-display">
                  <Compass className="w-5 h-5 text-sky-500" />
                  <span>1. Pilih Paket Tur Negara Tujuan</span>
                </h3>

                {/* Filters */}
                <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-lg border border-slate-200">
                  {(["Semua", "Asia", "Eropa"] as const).map(continent => (
                    <button
                      key={continent}
                      onClick={() => setActiveContinent(continent)}
                      className={`px-3 py-1.5 rounded-md text-[10px] font-bold tracking-wide uppercase transition-all ${
                        activeContinent === continent
                          ? "bg-white text-slate-900 shadow-sm"
                          : "text-slate-505 text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      {continent}
                    </button>
                  ))}
                </div>
              </div>

              {/* Package card grid selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[700px] overflow-y-auto pr-2">
                {filteredPackages.map((dest) => {
                  const isChecked = formData.selectedCountryId === dest.id;
                  return (
                    <div
                      key={dest.id}
                      onClick={() => selectPackageCard(dest.id)}
                      className={`cursor-pointer bg-white border rounded-2xl overflow-hidden transition-all flex flex-col justify-between ${
                        isChecked 
                          ? "ring-2 ring-sky-500 border-sky-500 shadow-xl bg-sky-50/10"
                          : "border-slate-200 hover:border-sky-300"
                      }`}
                    >
                      <div>
                        {/* Thumbnail */}
                        <div className="relative h-40">
                          <img
                            src={dest.thumbnail}
                            alt={dest.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                          
                          <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm border border-sky-500/10 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md text-sky-305 text-sky-300">
                            {dest.continent}
                          </span>

                          <div className="absolute bottom-3 left-4 right-4">
                            <h4 className="text-lg font-black text-white leading-tight font-display">{dest.name}</h4>
                            <p className="text-[10px] text-sky-200 block truncate font-medium">{dest.cities.join(" • ")}</p>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 space-y-2">
                          <p className="text-xs text-slate-500 leading-relaxed font-light line-clamp-2">{dest.description}</p>
                          
                          {/* Highlights */}
                          <div className="space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                            <span className="block text-[9px] uppercase font-bold text-slate-400">Rute Unggulan:</span>
                            <div className="text-[10px] text-slate-705 font-medium line-clamp-1 truncate">
                              {dest.touristSpots.slice(0, 2).join(", ")}...
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Footer price tag */}
                      <div className="p-4 pt-1 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center mt-2">
                        <div>
                          <span className="text-[9px] text-slate-405 text-slate-405 block font-bold uppercase leading-none mb-0.5">Mulai Dari (All-In)</span>
                          <span className="text-sm font-black text-pink-600 leading-none">{formatRupiah(dest.pricePerPerson)}</span>
                          <span className="text-[9px] text-slate-400 block leading-none">/ orang</span>
                        </div>
                        
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                          isChecked 
                            ? "bg-gradient-to-r from-sky-500 to-pink-500 border-transparent text-white"
                            : "border-slate-300 text-transparent"
                        }`}>
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Side: Quote form calculation */}
            <div className="lg:col-span-12 xl:col-span-5 relative">
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl shadow-xl space-y-5 sticky top-24">
                
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <h3 className="text-lg font-bold text-slate-905 flex items-center space-x-2 font-display">
                    <FileText className="w-5 h-5 text-pink-500" />
                    <span>2. Konfigurasi Order</span>
                  </h3>
                  <span className="text-[9px] uppercase font-bold text-pink-600 bg-pink-50 border border-pink-200 px-2 py-0.5 rounded">
                    Rupiah (IDR)
                  </span>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* Lead traveler */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Nama Pemohon (Sesuai KTP/Paspor)</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Ir. Gunawan Santosa, M.B.A."
                      className="w-full bg-white text-slate-800 px-3 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none text-xs"
                    />
                  </div>

                  {/* Email & Whatsapp details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-605 mb-1">Email Korespondensi</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="gunawan@corporate.co.id"
                        className="w-full bg-white text-slate-800 px-3 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-605 mb-1">WhatsApp Sinyal Aktif</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="081299908888"
                        className="w-full bg-white text-slate-800 px-3 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none text-xs"
                      />
                    </div>
                  </div>

                  {/* Pax count & departure date */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center space-x-1">
                        <Users className="w-3.5 h-3.5 text-sky-500" />
                        <span>Jumlah Traveler (Pax)</span>
                      </label>
                      <input
                        type="number"
                        name="numberOfPeople"
                        min="1"
                        max="100"
                        value={formData.numberOfPeople}
                        onChange={handleInputChange}
                        className="w-full bg-white text-slate-800 px-3 py-2 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none text-xs font-bold text-center shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5 text-pink-500" />
                        <span>Tanggal Mulai Tur</span>
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        className="w-full bg-white text-slate-800 p-1.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none text-xs text-center shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Ticket level class and premium custom services */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-xs font-semibold text-slate-605 mb-1">Tiket Penerbangan</label>
                      <select
                        name="flightClass"
                        value={formData.flightClass}
                        onChange={handleInputChange}
                        className="w-full bg-white text-slate-800 px-3 py-2 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none text-xs"
                      >
                        <option value="economy">Economy Class (Default)</option>
                        <option value="business">Business Class (+Rp22JT/Pax)</option>
                        <option value="first">First Class (+Rp55JT/Pax)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-605 mb-1">Fasilitas & Layanan VIP</label>
                      <select
                        name="packageClass"
                        value={formData.packageClass}
                        onChange={handleInputChange}
                        className="w-full bg-white text-slate-800 px-3 py-2 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none text-xs"
                      >
                        <option value="standard">Standard (No VIP perks)</option>
                        <option value="executive">Executive VIP (+Rp9,5JT/Pax)</option>
                        <option value="presidential">Presidential Luxury (+Rp24JT/Pax)</option>
                      </select>
                    </div>
                  </div>

                  {/* Add benefits preview based on selected options */}
                  <div className="bg-white p-3.5 rounded-2xl border border-slate-200 text-[11px] text-slate-600 space-y-2 shadow-sm">
                    <span className="block text-[9px] uppercase font-extrabold text-slate-400 tracking-wider">Garansi Keuntungan VIP B2B Gogo Tour:</span>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{formData.packageClass === "standard" ? "Termasuk Asuransi Medis Asing" : "Sewa Mobil VIP Premium & Pemandu 24 Jam"}</span>
                    </div>
                    {formData.flightClass !== "economy" && (
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="text-sky-700 font-bold">Fast-Track Bandara Imigrasi & Akses Lounge VIP</span>
                      </div>
                    )}
                    
                    <label className="flex items-center space-x-2.5 cursor-pointer border-t border-slate-100 pt-2 block mt-1">
                      <input
                        type="checkbox"
                        name="isBusinessTrip"
                        checked={formData.isBusinessTrip}
                        onChange={handleInputChange}
                        className="w-4 h-4 rounded border-slate-300 text-pink-500 focus:ring-pink-500"
                      />
                      <span className="text-pink-600 font-bold flex items-center">
                        <Briefcase className="w-3.5 h-3.5 mr-1" />
                        Ajukan Rapat Kantor / Dinas (Diskon Kemitraan 10%)
                      </span>
                    </label>
                  </div>

                  {/* Transaction Mode Options */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 text-xs space-y-3 shadow-sm">
                    <span className="block text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">3. Metode Transaksi / Pembayaran</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {PAYMENT_METHODS.map((method) => {
                        const isSelected = formData.paymentMethod === method.id;
                        return (
                          <button
                            key={method.id}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method.id }))}
                            className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all duration-200 cursor-pointer ${
                              isSelected
                                ? "ring-2 ring-sky-500 border-transparent bg-sky-50/15"
                                : "border-slate-200 hover:border-slate-300 bg-white"
                            }`}
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className="text-[11px] font-bold text-slate-900">{method.name}</span>
                              <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                                isSelected ? "bg-sky-500 border-transparent text-white" : "border-slate-300"
                              }`}>
                                {isSelected && <Check className="w-2.5 h-2.5 text-white stroke-[3.5]" />}
                              </div>
                            </div>
                            <span className="text-[9.5px] text-slate-500 mt-1.5 leading-normal">{method.description}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Pengaturan Kamar & Catatan Tambahan (Opsional)</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Contoh: Minta pengantaran paspor fisik, butuh guide ramah muslim, atau translator mandarin..."
                      className="w-full bg-white text-slate-800 px-3 py-2 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none text-xs h-16 resize-none"
                    ></textarea>
                  </div>

                  {/* Price Calculations */}
                  {priceInvoice && (
                    <div className="bg-white p-4 rounded-xl border border-slate-205 border-slate-200 text-xs space-y-2 shadow-sm">
                      <div className="flex justify-between text-slate-500 font-medium">
                        <span>Biaya Tur ({formData.numberOfPeople} Pax • {selectedDest.name}):</span>
                        <span className="text-slate-800 font-semibold">{formatRupiah(priceInvoice.baseTourCost)}</span>
                      </div>
                      
                      {priceInvoice.flightAddon > 0 && (
                        <div className="flex justify-between text-slate-500 font-medium">
                          <span>Tambahan Kelas Tiket ({formData.flightClass}):</span>
                          <span className="text-slate-800 font-semibold">+{formatRupiah(priceInvoice.flightAddon)}</span>
                        </div>
                      )}

                      {priceInvoice.packageTierAddon > 0 && (
                        <div className="flex justify-between text-slate-500 font-medium">
                          <span>Tambahan Proteksi VIP ({formData.packageClass}):</span>
                          <span className="text-slate-800 font-semibold">+{formatRupiah(priceInvoice.packageTierAddon)}</span>
                        </div>
                      )}

                      {formData.isBusinessTrip && priceInvoice.corporateDiscount > 0 && (
                        <div className="flex justify-between text-pink-600 font-extrabold border-t border-dashed border-slate-150 pt-1">
                          <span>Diskon Anggota Bisnis (10%):</span>
                          <span>-{formatRupiah(priceInvoice.corporateDiscount)}</span>
                        </div>
                      )}

                      <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-xs">
                        <span className="font-extrabold text-sky-700">Estimasi Total Investasi:</span>
                        <div className="text-right">
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-pink-500 text-lg font-black block leading-none pb-0.5">
                            {formatRupiah(priceInvoice.grandTotal)}
                          </span>
                          <span className="text-[9px] text-slate-400 block font-medium">Sudah Termasuk Seluruh Pajak</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-500 to-pink-500 hover:brightness-110 text-white font-extrabold text-sm shadow-xl shadow-pink-500/15 transform active:scale-[0.98] transition-all flex items-center justify-center space-x-1"
                  >
                    <span>Lanjutkan Booking Paket Aman</span>
                    <ArrowRight className="w-4 h-4 text-white ml-1" />
                  </button>
                </form>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
