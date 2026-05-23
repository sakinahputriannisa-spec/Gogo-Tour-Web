import React, { useState, useEffect } from "react";
import { HOTELS, DESTINATIONS, formatRupiah } from "../data";
import { BookingFormState } from "../types";
import { Hotel as HotelIcon, Star, Check, Calendar, Users, Moon, Briefcase, FileText, Sparkles, Building2, MapPin, Download } from "lucide-react";
import { downloadAsFile } from "../utils/download";

interface HotelBookingProps {
  preselectedCountryId?: string;
}

export const HotelBooking: React.FC<HotelBookingProps> = ({ preselectedCountryId }) => {
  // Try to find if we can pre-match hotel for a preselected country
  let initialHotelId = HOTELS[0].id;
  let initialCountryId = DESTINATIONS[0].id;

  if (preselectedCountryId) {
    const matchedDest = DESTINATIONS.find(d => d.id === preselectedCountryId);
    if (matchedDest) {
      initialCountryId = matchedDest.id;
      // find a hotel in this country
      const matchedHotel = HOTELS.find(h => h.country.toLowerCase() === matchedDest.name.toLowerCase());
      if (matchedHotel) {
        initialHotelId = matchedHotel.id;
      }
    }
  }

  // Booking Form State - keeping interface compatible by specifying includeTour: false, includeHotel: true
  const [formData, setFormData] = useState<BookingFormState>({
    fullName: "",
    email: "",
    phone: "",
    selectedCountryId: initialCountryId,
    selectedHotelId: initialHotelId,
    startDate: new Date(Date.now() + 7 * 86450000).toISOString().split("T")[0], // 1 week from now
    numberOfPeople: 2,
    numberOfNights: 3,
    includeTour: false,
    includeHotel: true,
    isBusinessTrip: true,
    notes: "",
    paymentMethod: "bank-transfer"
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
  const [bookingCode, setBookingCode] = useState<string>("");
  const [finalInvoice, setFinalInvoice] = useState<{
    hotelCost: number;
    subtotal: number;
    corporateDiscount: number;
    grandTotal: number;
  } | null>(null);

  // Monitor preselected country ID updates
  useEffect(() => {
    if (preselectedCountryId) {
      const matchedDest = DESTINATIONS.find(d => d.id === preselectedCountryId);
      if (matchedDest) {
        const matchedHotel = HOTELS.find(h => h.country.toLowerCase() === matchedDest.name.toLowerCase());
        setFormData(prev => ({
          ...prev,
          selectedCountryId: matchedDest.id,
          selectedHotelId: matchedHotel ? matchedHotel.id : prev.selectedHotelId,
          includeTour: false
        }));
      }
    }
  }, [preselectedCountryId]);

  const selectedHotel = HOTELS.find(h => h.id === formData.selectedHotelId) || HOTELS[0];
  const selectedDest = DESTINATIONS.find(d => d.id === formData.selectedCountryId) || DESTINATIONS[0];

  // Dynamic calculations for hotel cost only
  useEffect(() => {
    let hotelCost = 0;
    // Calculate rooms needed (1 room fits 2 people)
    const roomsNeeded = Math.ceil(formData.numberOfPeople / 2);
    
    if (selectedHotel) {
      hotelCost = selectedHotel.pricePerNight * formData.numberOfNights * roomsNeeded;
    }

    const subtotal = hotelCost;
    const corporateDiscount = formData.isBusinessTrip ? subtotal * 0.10 : 0; // 10% B2B corporate discount
    const grandTotal = subtotal - corporateDiscount;

    setFinalInvoice({
      hotelCost,
      subtotal,
      corporateDiscount,
      grandTotal
    });
  }, [
    formData.selectedHotelId,
    formData.numberOfPeople,
    formData.numberOfNights,
    formData.isBusinessTrip,
    selectedHotel
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

  const handleSelectHotelCard = (hotelId: string) => {
    const hotelObj = HOTELS.find(h => h.id === hotelId);
    if (hotelObj) {
      // Auto match the country too
      const matchingDest = DESTINATIONS.find(d => d.name.toLowerCase() === hotelObj.country.toLowerCase());
      setFormData(prev => ({
        ...prev,
        selectedHotelId: hotelId,
        selectedCountryId: matchingDest ? matchingDest.id : prev.selectedCountryId
      }));
    }
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert("Harap lengkapi nama, email, dan telepon Anda terlebih dahulu.");
      return;
    }
    const derivedCode = `GOGO-HOTEL-${Math.floor(10000 + Math.random() * 90000)}`;
    setBookingCode(derivedCode);
    setBookingSuccess(true);
  };

  const handleDownloadHotelInvoice = () => {
    if (!finalInvoice) return;
    const fileContent = `==================================================\n` +
                        `             GOGO TOUR HOTEL RESERVATION          \n` +
                        `==================================================\n` +
                        `KODE TRANSAKSI: ${bookingCode}\n` +
                        `Tanggal       : ${new Date().toLocaleDateString()}\n` +
                        `Status        : RECONCILING WITH HOTEL PARTNER\n` +
                        `--------------------------------------------------\n` +
                        `Pelanggan     : ${formData.fullName}\n` +
                        `Telepon/WA    : ${formData.phone}\n` +
                        `Email         : ${formData.email}\n` +
                        `--------------------------------------------------\n` +
                        `Rincian Hotel & Akomodasi:\n` +
                        `Hotel         : ${selectedHotel.name}\n` +
                        `Lintas Negara : ${selectedHotel.country}\n` +
                        `Tanggal Check-in: ${formData.startDate}\n` +
                        `Jumlah Tamu   : ${formData.numberOfPeople} Orang\n` +
                        `Kamar Dipesan : ${roomsCount} Kamar\n` +
                        `Durasi Menginap: ${formData.numberOfNights} Malam\n` +
                        `Metode Bayar  : ${getPaymentLabel(formData.paymentMethod)}\n` +
                        `--------------------------------------------------\n` +
                        `Rincian Biaya:\n` +
                        `Biaya Kamar Dasar     : ${formatRupiah(finalInvoice.hotelCost)}\n` +
                        (formData.isBusinessTrip ? `Diskon B2B Korporasi (10%): -${formatRupiah(finalInvoice.corporateDiscount)}\n` : "") +
                        `--------------------------------------------------\n` +
                        `TOTAL TAGIHAN         : ${formatRupiah(finalInvoice.grandTotal)}\n` +
                        `==================================================\n` +
                        `Terima kasih telah mempercayai Gogo Tour Indonesia!\n` +
                        `Reservasi Anda akan dikirim asisten VIP pribadi langsung.\n` +
                        `==================================================`;
    downloadAsFile(fileContent, `GogoTour_HotelInvoice_${bookingCode}.txt`);
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      selectedCountryId: DESTINATIONS[0].id,
      selectedHotelId: HOTELS[0].id,
      startDate: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
      numberOfPeople: 2,
      numberOfNights: 3,
      includeTour: false,
      includeHotel: true,
      isBusinessTrip: true,
      notes: "",
      paymentMethod: "bank-transfer"
    });
    setBookingCode("");
    setBookingSuccess(false);
  };

  const roomsCount = Math.ceil(formData.numberOfPeople / 2);

  return (
    <div className="py-12 bg-white px-4 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Title */}
        <div className="text-center md:max-w-xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center space-x-1.5 bg-sky-50 border border-sky-100 px-3 py-1 rounded-full text-xs font-semibold text-sky-600">
            <Building2 className="w-3.5 h-3.5 text-sky-500 animate-pulse" />
            <span>Reservasi Premium Gogo Tour</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-display">
            Pemesanan Hotel Premium
          </h2>
          <p className="text-slate-500 font-light text-sm">
            Pesan akomodasi bintang 5 mewah di destinasi utama pilihan Asia & Eropa dengan tarif khusus korporasi terlindungi.
          </p>
        </div>

        {bookingSuccess ? (
          /* SUCCESS STATE */
          <div className="max-w-xl mx-auto bg-white border border-slate-200 p-8 rounded-3xl shadow-2xl text-center space-y-6 animate-fadeIn">
            <div className="w-16 h-16 bg-gradient-to-tr from-sky-500 to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-pink-500/15">
              <Check className="w-8 h-8 text-white stroke-[3]" />
            </div>

            <h3 className="text-2xl font-black text-slate-900 font-display">Booking Hotel Berhasil!</h3>
            
            <div className="text-left bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs space-y-3.5 text-slate-700">
              <p className="font-bold text-sky-600 text-sm border-b border-slate-200 pb-2 flex justify-between">
                <span>KODE RESERVASI HOTEL:</span>
                <span className="font-mono">{bookingCode}</span>
              </p>
              <div className="grid grid-cols-2 gap-y-2">
                <div>Nama Lengkap:</div>
                <div className="font-semibold text-slate-900 text-right">{formData.fullName}</div>
                
                <div>No. Telepon:</div>
                <div className="font-semibold text-slate-900 text-right">{formData.phone}</div>

                <div>Negara / Lokasi:</div>
                <div className="font-semibold text-slate-900 text-right">{selectedDest.name}</div>
                
                <div>Akomodasi Hotel:</div>
                <div className="font-semibold text-slate-900 text-right truncate max-w-[180px]">{selectedHotel.name}</div>

                <div>Tanggal Check-In:</div>
                <div className="font-semibold text-slate-900 text-right">{formData.startDate}</div>

                <div>Jumlah Tamu:</div>
                <div className="font-semibold text-slate-900 text-right">{formData.numberOfPeople} orang</div>

                <div>Jumlah Kamar:</div>
                <div className="font-semibold text-slate-900 text-right">{roomsCount} Kamar (Twin/Double)</div>

                <div>Durasi Menginap:</div>
                <div className="font-semibold text-slate-900 text-right">{formData.numberOfNights} malam</div>

                <div>Tipe Transaksi:</div>
                <div className="font-semibold text-slate-900 text-right text-sky-600 font-extrabold">{getPaymentLabel(formData.paymentMethod)}</div>
              </div>

              {finalInvoice && (
                <div className="pt-3 border-t border-slate-200 space-y-1.5">
                  <div className="flex justify-between text-slate-650 text-slate-600">
                    <span>Sewa Kamar ({roomsCount} Kamar • {formData.numberOfNights} Malam):</span>
                    <span className="font-semibold">{formatRupiah(finalInvoice.subtotal)}</span>
                  </div>
                  {formData.isBusinessTrip && (
                    <div className="flex justify-between text-pink-600 font-semibold">
                      <span>Diskon Dinas Korporat (10%):</span>
                      <span>-{formatRupiah(finalInvoice.corporateDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-bold text-slate-900 pt-1 border-t border-slate-200">
                    <span className="text-sky-700 font-bold">Total Pembayaran Hotel:</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-pink-500 font-black text-base">{formatRupiah(finalInvoice.grandTotal)}</span>
                  </div>
                </div>
              )}
            </div>

            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              E-Voucher hotel beserta invoice penagihan resmi telah dikirim ke <strong className="text-slate-800 font-semibold">{formData.email}</strong>. Concierge hotel kami akan berkoordinasi langsung untuk penjemputan bandara atau permintaan khusus kamar Anda.
            </p>

            <div className="pt-2">
              <button
                onClick={handleReset}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-pink-500 hover:brightness-110 text-white font-extrabold text-xs shadow-lg shadow-pink-500/10 transition-all cursor-pointer"
              >
                Buat Pemesanan Hotel Baru
              </button>
            </div>
          </div>
        ) : (
          /* CORE BOOKING INTERFACE */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Hotel Cards Selection */}
            <div className="lg:col-span-12 xl:col-span-7 space-y-6">
              <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2 font-display">
                <HotelIcon className="w-5 h-5 text-sky-500" />
                <span>1. Pilih Hotel Bintang 5 Mewah</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[700px] overflow-y-auto pr-2">
                {HOTELS.map((hotel) => {
                  const isChecked = formData.selectedHotelId === hotel.id;
                  return (
                    <div 
                      key={hotel.id}
                      onClick={() => handleSelectHotelCard(hotel.id)}
                      className={`cursor-pointer bg-white border rounded-2xl overflow-hidden transition-all flex flex-col justify-between ${
                        isChecked 
                          ? "ring-2 ring-sky-500 border-sky-500 shadow-xl bg-sky-50/10" 
                          : "border-slate-200 hover:border-sky-305"
                      }`}
                    >
                      <div>
                        {/* Thumbnail */}
                        <div className="relative h-40">
                          <img
                            src={hotel.image}
                            alt={hotel.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                          <span className="absolute top-2.5 right-2.5 bg-slate-900/80 border border-sky-500/20 text-[10px] font-bold px-2.5 py-0.5 rounded-md text-sky-300 flex items-center space-x-1">
                            <MapPin className="w-2.5 h-2.5" />
                            <span>{hotel.city}, {hotel.country}</span>
                          </span>
                        </div>

                        {/* Text */}
                        <div className="p-4 space-y-2">
                          <div className="flex justify-between items-start">
                            <h4 className="font-bold text-slate-900 text-sm leading-tight line-clamp-1 font-display">{hotel.name}</h4>
                            <div className="flex text-amber-500">
                              {[...Array(hotel.stars)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-current shrink-0" />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-slate-500 font-normal line-clamp-2 leading-relaxed">{hotel.description}</p>
                          
                          {/* Amenities */}
                          <div className="flex flex-wrap gap-1 pt-1">
                            {hotel.amenities.slice(0, 3).map((amenity, i) => (
                              <span key={i} className="text-[9px] bg-slate-50 text-slate-600 border border-slate-100 px-1.5 py-0.5 rounded font-medium">
                                {amenity}
                              </span>
                            ))}
                            {hotel.amenities.length > 3 && (
                              <span className="text-[9px] text-sky-650 font-bold px-1">+ {hotel.amenities.length - 3} lagi</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Footer Cost select */}
                      <div className="p-4 pt-1 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between mt-2">
                        <div>
                          <span className="text-[10px] text-slate-500 block font-bold uppercase leading-none mb-0.5">Tarif Korporat</span>
                          <span className="text-sm font-bold text-sky-600 leading-none">{formatRupiah(hotel.pricePerNight)}</span>
                          <span className="text-[9px] text-slate-400 block leading-none">/ kamar / malam</span>
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

            {/* Right: Booking Form & Invoice dynamic calculator */}
            <div className="lg:col-span-12 xl:col-span-5 relative">
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl shadow-xl space-y-5 sticky top-24">
                
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <h3 className="text-lg font-bold text-slate-905 flex items-center space-x-2 font-display">
                    <FileText className="w-5 h-5 text-pink-500" />
                    <span>2. Formulir Reservasi Hotel</span>
                  </h3>
                  <span className="text-[10px] uppercase font-bold font-mono text-sky-605 bg-sky-50 border border-sky-100 px-2 py-0.5 rounded text-sky-600">
                    Rupiah (Rp)
                  </span>
                </div>

                <form onSubmit={handleSubmitBooking} className="space-y-4">
                  {/* Personal details */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-505 text-slate-600 mb-1">Nama Lengkap Traveler (Sesuai Paspor / KTP)</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        placeholder="Contoh: Ir. Aditia Wijaya"
                        className="w-full bg-white text-slate-800 px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-all text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Email Kantor / Pribadi</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="aditia@perusahaan.com"
                          className="w-full bg-white text-slate-800 px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-all text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Nomor WhatsApp Aktif</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          placeholder="0812XXXXXXXX"
                          className="w-full bg-white text-slate-800 px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-all text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Date & Rooms config */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-1">
                      <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center space-x-1">
                        <Users className="w-3 h-3 text-sky-500 shrink-0" />
                        <span>Tamu (Pax)</span>
                      </label>
                      <input
                        type="number"
                        name="numberOfPeople"
                        min="1"
                        max="20"
                        value={formData.numberOfPeople}
                        onChange={handleInputChange}
                        className="w-full bg-white text-slate-800 px-3 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-all text-xs text-center font-bold shadow-sm"
                      />
                    </div>
                    
                    <div className="col-span-1">
                      <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center space-x-1">
                        <Moon className="w-3 h-3 text-pink-500 shrink-0" />
                        <span>Malam</span>
                      </label>
                      <input
                        type="number"
                        name="numberOfNights"
                        min="1"
                        max="30"
                        value={formData.numberOfNights}
                        onChange={handleInputChange}
                        className="w-full bg-white text-slate-800 px-3 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-all text-xs text-center font-bold shadow-sm"
                      />
                    </div>

                    <div className="col-span-1">
                      <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-sky-500 shrink-0" />
                        <span>Check-In</span>
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        className="w-full bg-white text-slate-800 p-2 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-all text-[10px] text-center shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Selection Select Options Linked */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Negara Lokasi Hotel</label>
                      <select
                        name="selectedCountryId"
                        value={formData.selectedCountryId}
                        onChange={handleInputChange}
                        className="w-full bg-white text-slate-805 px-3 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none text-xs shadow-sm"
                      >
                        {DESTINATIONS.map(d => (
                          <option key={d.id} value={d.id}>{d.name} ({d.continent})</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Pilihan Hotel Mewah</label>
                      <select
                        name="selectedHotelId"
                        value={formData.selectedHotelId}
                        onChange={handleInputChange}
                        className="w-full bg-white text-slate-805 px-3 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none text-xs shadow-sm"
                      >
                        {HOTELS.map(h => (
                          <option key={h.id} value={h.id}>{h.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Program & Discount Option Toggle */}
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2.5 text-xs shadow-sm">
                    <span className="block text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mb-1">Program & Diskon</span>

                    <label className="flex items-center space-x-2.5 cursor-pointer block">
                      <input
                        type="checkbox"
                        name="isBusinessTrip"
                        checked={formData.isBusinessTrip}
                        onChange={handleInputChange}
                        className="w-4 h-4 rounded border-slate-300 bg-white text-pink-500 focus:ring-pink-550 focus:ring-offset-2"
                      />
                      <span className="text-pink-600 font-bold flex items-center">
                        <Briefcase className="w-3.5 h-3.5 mr-1 text-pink-500" />
                        Klaim Potongan Dinas Kantor (Diskon 10%)
                      </span>
                    </label>
                  </div>

                  {/* Transaction Mode Options */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs space-y-3 shadow-sm">
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

                  {/* Extra Remarks */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Permintaan Khusus Kamar (Opsional)</label>
                    <textarea
                      name="notes"
                      value={formData.notes || ""}
                      onChange={handleInputChange}
                      placeholder="Contoh: Double bed, high floor, ramah disabilitas, late check-in..."
                      className="w-full bg-white text-slate-800 px-3.5 py-2 rounded-xl border border-slate-200 focus:border-sky-505 focus:outline-none transition-all text-xs h-16 resize-none shadow-sm"
                    ></textarea>
                  </div>

                  {/* Invoice Calculations - Hotel only */}
                  {finalInvoice && (
                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 text-xs shadow-sm">
                      <div className="flex justify-between text-slate-500 font-medium">
                        <span>Lama Menginap:</span>
                        <span className="text-slate-800 font-semibold">{formData.numberOfNights} Malam</span>
                      </div>
                      <div className="flex justify-between text-slate-500 font-medium">
                        <span>Kebutuhan Kamar ({formData.numberOfPeople} Tamu):</span>
                        <span className="text-slate-800 font-semibold">{roomsCount} Kamar</span>
                      </div>
                      <div className="flex justify-between text-slate-500 font-medium">
                        <span>Subtotal Sewa Kamar:</span>
                        <span className="text-slate-800 font-semibold">{formatRupiah(finalInvoice.subtotal)}</span>
                      </div>
                      
                      {formData.isBusinessTrip && finalInvoice.corporateDiscount > 0 && (
                        <div className="flex justify-between text-pink-600 font-bold">
                          <span>Potongan Dinas Lapangan (10%):</span>
                          <span>-{formatRupiah(finalInvoice.corporateDiscount)}</span>
                        </div>
                      )}

                      <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-xs">
                        <span className="font-extrabold text-sky-700">Total Biaya Hotel:</span>
                        <div className="text-right">
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-pink-500 text-lg font-black block leading-none pb-0.5">
                            {formatRupiah(finalInvoice.grandTotal)}
                          </span>
                          <span className="text-[9px] text-slate-400 block font-semibold">Semua Pajak Sudah Termasuk</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-500 to-pink-500 hover:brightness-110 text-white font-extrabold text-sm shadow-xl shadow-pink-500/15 transform active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Ajukan Reservasi Hotel Mandiri</span>
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
