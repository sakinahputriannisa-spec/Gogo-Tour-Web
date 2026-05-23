import React, { useState } from "react";
import { TESTIMONIALS } from "../data";
import { Award, ShieldCheck, Headphones, Star, Mail, MapPin, Phone, Building, CheckCircle2 } from "lucide-react";

export const AboutUs: React.FC = () => {
  const [companyName, setCompanyName] = useState("");
  const [repPhone, setRepPhone] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSubmitCallback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !repPhone.trim()) return;
    setIsSent(true);
  };
  return (
    <div className="py-12 bg-white px-4 font-sans text-left text-slate-800">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Section */}
        <div className="text-center md:max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-1.5 bg-pink-50 border border-pink-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-pink-600">
            <Building className="w-3.5 h-3.5 text-pink-500" />
            <span>Kredibilitas Gogo Tour</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Solusi Perjalanan Bisnis & Korporat Terpercaya
          </h2>
          <p className="text-slate-500 font-light text-sm">
            Gogo Tour lahir untuk menjembatani efisiensi dinas profesional dengan kenyamanan pariwisata premium di seluruh kawasan Asia dan Eropa.
          </p>
        </div>

        {/* Core Pillars / Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 relative overflow-hidden group hover:border-sky-450 hover:shadow-lg transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-bl-[100px] pointer-events-none"></div>
            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center mb-5 text-sky-655 text-sky-600">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">Protocol VIP Internasional</h3>
            <p className="text-xs text-slate-600 font-normal leading-relaxed">
              Kami bekerja sama langsung dengan otoritas imigrasi dan operator bandara untuk menyediakan Fast-Track Visa, VIP Airport Lounge, serta penjemputan mobil komersial premium kelas satu di bandara Asia dan Eropa.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 relative overflow-hidden group hover:border-pink-400 hover:shadow-lg transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 rounded-bl-[100px] pointer-events-none"></div>
            <div className="w-12 h-12 rounded-xl bg-pink-50 border border-pink-200 flex items-center justify-center mb-5 text-pink-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">Jaminan Harga Rupiah</h3>
            <p className="text-xs text-slate-600 font-normal leading-relaxed">
              Selamat tinggal kekhawatiran fluktuasi nilai tukar valuta asing secara mendadak. Seluruh tagihan kami dikalkulasi final dalam Rupiah (Rp) tanpa adanya biaya siluman, pajak tersembunyi, atau kenaikan musiman mendadak.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 relative overflow-hidden group hover:border-sky-405 hover:shadow-lg transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-bl-[100px] pointer-events-none"></div>
            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center mb-5 text-sky-600">
              <Headphones className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">Pramutamu Aktif 24/7</h3>
            <p className="text-xs text-slate-600 font-normal leading-relaxed">
              Jadwal bisnis Anda bergeser secara tidak terduga? Tim Concierge Gogo Tour bersertifikasi selalu siaga 24 jam untuk melakukan rescheduling tiket pesawat korporat dwi-bahasa dalam waktu kurang dari satu jam secara tangkas.
            </p>
          </div>

        </div>

        {/* Corporate Trust Statistics Bar */}
        <div className="bg-slate-55 bg-slate-50 rounded-3xl border border-slate-200 p-8 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center shadow-sm">
          <div>
            <span className="block text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-sky-400 font-display">10,000+</span>
            <span className="block text-xs uppercase text-slate-500 tracking-wider font-extrabold mt-1">Klien Korporat</span>
          </div>
          <div>
            <span className="block text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-pink-400 font-display">98%+</span>
            <span className="block text-xs uppercase text-slate-500 tracking-wider font-extrabold mt-1">Indeks Kepuasan</span>
          </div>
          <div>
            <span className="block text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-sky-400 font-display">12+</span>
            <span className="block text-xs uppercase text-slate-500 tracking-wider font-extrabold mt-1">Negara Terintegrasi</span>
          </div>
          <div>
            <span className="block text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-pink-400 font-display">5-Star</span>
            <span className="block text-xs uppercase text-slate-500 tracking-wider font-extrabold mt-1">Garansi Standard Hotel</span>
          </div>
        </div>

        {/* User Testimonials Section */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-900 font-display">Apa Kata Klien Eksekutif Kami</h3>
            <p className="text-sm text-slate-500 font-light max-w-lg mx-auto mt-2">
              Cerita nyata dari para pemimpin teknologi dan industri di Indonesia yang telah bertualang bersama Gogo Tour.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((test, idx) => (
              <div key={idx} className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col justify-between space-y-4 relative shadow-sm hover:shadow-md transition-shadow">
                <div className="space-y-3">
                  {/* Rating Stars */}
                  <div className="flex text-amber-500">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-655 text-slate-600 font-normal italic leading-relaxed">
                    "{test.text}"
                  </p>
                </div>

                <div className="flex items-center space-x-3 pt-3 border-t border-slate-100">
                  <img
                    src={test.avatar}
                    alt={test.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-100"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 font-display">{test.name}</h5>
                    <p className="text-[10px] text-slate-500">{test.role} • <span className="text-sky-600 font-bold">{test.company}</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact info and booking office location */}
        <div className="bg-gradient-to-tr from-sky-50 via-white to-pink-50 rounded-3xl border border-slate-200 p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center shadow-md">
          <div className="space-y-4">
            <h3 className="text-2xl font-extrabold text-slate-900 font-display">Hubungi Kantor Pusat Kami</h3>
            <p className="text-sm text-slate-600 font-normal leading-relaxed">
              Grup korporasi, kementerian, atau asosiasi bisnis membutuhkan penawaran RFP (Request For Proposal) khusus? Tim tender kami siap menyusunkan penawaran komersial terbaik dalam 1x24 jam.
            </p>
            
            <div className="space-y-2 text-xs text-slate-600 font-normal">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-pink-500 shrink-0" />
                <span>Noble House Lt. 32, Dr. Ide Anak Agung Gde Agung, Mega Kuningan, Jakarta Selatan, 12950</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-sky-500 shrink-0" />
                <span>corporate@gogotour.com / sales@gogotour.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-sky-500 shrink-0" />
                <span>+62-21-5088-9900 (Hotline Korporat WhatsApp)</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
            <h4 className="font-bold text-slate-900 text-sm font-display">Butuh Callback Penawaran?</h4>
            {isSent ? (
              <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-xl space-y-3 text-center animate-fadeIn">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <div className="space-y-1">
                  <h5 className="text-xs font-bold text-slate-900">Permintaan Callback Diterima!</h5>
                  <p className="text-[11px] text-slate-655 text-slate-600 leading-relaxed font-normal">
                    Terima kasih. Hubungan Korporat Gogo Tour akan menghubungi representatif dari <strong className="text-slate-805">{companyName}</strong> di nomor <strong className="text-slate-805">{repPhone}</strong> dalam kurun waktu 5 menit.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsSent(false);
                    setCompanyName("");
                    setRepPhone("");
                  }}
                  className="text-[10px] text-sky-600 hover:text-sky-700 font-bold underline cursor-pointer"
                >
                  Kirim Permintaan Baru
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitCallback} className="grid grid-cols-1 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Nama Perusahaan Anda"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="bg-slate-50 text-slate-800 text-xs p-3 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500 transition-colors"
                />
                <input
                  type="tel"
                  required
                  placeholder="Nomor Telepon Representatif"
                  value={repPhone}
                  onChange={(e) => setRepPhone(e.target.value)}
                  className="bg-slate-50 text-slate-800 text-xs p-3 rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500 transition-colors"
                />
                <button 
                  type="submit"
                  className="py-3 rounded-lg bg-gradient-to-r from-sky-500 to-pink-500 text-white text-xs font-bold shadow-md shadow-pink-500/10 hover:brightness-110 active:scale-[0.99] transition-all text-center cursor-pointer"
                >
                  Minta Telepon Hubungan Korporat
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
