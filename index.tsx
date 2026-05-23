/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Navbar } from './src/components/Navbar';
import { Hero } from './src/components/Hero';
import { DestinationList } from './src/components/DestinationList';
import { HotelBooking } from './src/components/HotelBooking';
import { TourBooking } from './src/components/TourBooking';
import { AboutUs } from './src/components/AboutUs';
import { AIPresenter } from './src/components/AIPresenter';
import { AirlinePartners } from './src/components/AirlinePartners';
import { Compass, Sparkles, Shield, HeartHandshake, CreditCard, Building, Mail, Phone, PlaneTakeoff, ChevronRight } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab ] = useState<string>("home");
  const [preselectedCountryId, setPreselectedCountryId] = useState<string | undefined>(undefined);

  // Scroll to top upon shifting tabs
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleSelectDestinationForBooking = (destinationId: string) => {
    setPreselectedCountryId(destinationId);
    setActiveTab("tour-booking");
  };

  const handleExploreDestinations = () => {
    setActiveTab("destinasi");
  };

  const handleExploreAI = () => {
    setActiveTab("ai-assistant");
  };

  // The generated scenery image name from workspace
  const heroImagePath = "/src/assets/images/gogo_hero_scenery_1779461072858.png";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between selection:bg-pink-500 selection:text-white">
      <div>
        {/* Navigation Bar */}
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Dynamic Tab Screens */}
        <div className="animate-fadeIn">
          {activeTab === "home" && (
            <>
              {/* Hero Showcase with natural scenery */}
              <Hero 
                onExploreDestinations={handleExploreDestinations} 
                onExploreAI={handleExploreAI}
                onOrderNowSelect={(tabId) => setActiveTab(tabId)}
                heroImagePath={heroImagePath}
              />
              
              {/* Quick statistics / core trust items */}
              <div className="bg-white border-y border-slate-200 py-10 px-4 shadow-sm">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-sky-500/10 rounded-xl border border-sky-200 text-sky-600 shrink-0">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm mb-1">Proteksi Finansial & Visa</h4>
                      <p className="text-xs text-slate-600 font-normal leading-relaxed">Seluruh invoice bergaransi dan didukung pengurusan dokumen imigrasi korporat secara kilat.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-pink-500/10 rounded-xl border border-pink-200 text-pink-600 shrink-0">
                      <HeartHandshake className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm mb-1">Pramutamu Korporat 24 Jam</h4>
                      <p className="text-xs text-slate-600 font-normal leading-relaxed">Asisten lokal bahasa Indonesia siaga 24 jam membantu perubahan jadwal & reservasi rapat darurat.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-sky-500/10 rounded-xl border border-sky-200 text-sky-600 shrink-0">
                      <PlaneTakeoff className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm mb-1">Armada VIP Bandara</h4>
                      <p className="text-xs text-slate-600 font-normal leading-relaxed">Layanan penjemputan mobil premium (Mercedes-Benz/Tesla) dari pintu kedatangan ke lobi hotel.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Official Airline Partners Promo Banner on Home page */}
              <div className="bg-gradient-to-tr from-slate-900 via-slate-950 to-slate-900 border-y border-slate-800 text-white py-12 px-6 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10 text-left">
                  <div className="space-y-3.5 max-w-3xl">
                    <span className="inline-block text-[10px] uppercase font-bold tracking-widest text-sky-400 bg-sky-500/10 border border-sky-400/25 px-2.5 py-1 rounded-full">
                      Aliansi Penerbangan Global
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black font-display text-white">
                      Kemitraan Maskapai Bintang 5 Internasional
                    </h3>
                    <p className="text-xs md:text-sm text-slate-300 font-light leading-relaxed">
                      Kami berpartner resmi dengan maskapai kelas atas dunia seperti <span className="font-semibold text-white">Singapore Airlines</span>, <span className="font-semibold text-white">Garuda Indonesia</span>, <span className="font-semibold text-white">Qatar Airways</span>, <span className="font-semibold text-white">Emirates</span>, JAL, ANA, dan Turkish Airlines demi menyediakan jatah bagasi melimpah, makanan halal, serta kepastian terbang VIP.
                    </p>
                  </div>
                  <div className="shrink-0">
                    <button 
                      onClick={() => setActiveTab("maskapai")}
                      className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 via-sky-600 to-pink-500 text-white font-bold text-xs shadow-md shadow-pink-500/10 hover:brightness-110 active:scale-95 transition-all text-center flex items-center space-x-1.5 cursor-pointer"
                    >
                      <span>Lihat Mitra & Homepage</span>
                      <ChevronRight className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Destination Teasers banner */}
              <div className="py-16 max-w-7xl mx-auto px-4 text-center space-y-12">
                <div className="space-y-3">
                  <h2 className="text-3xl font-black text-slate-900 font-display">Eksplorasi Katalog Gogo Tour</h2>
                  <p className="text-sm text-slate-500 font-light max-w-md mx-auto">Lihat daftar lengkap negara Asia dilingkupi kemegahan dan Eropa berselimut keindahan sejarah.</p>
                </div>
                
                <DestinationList onSelectDestinationForBooking={handleSelectDestinationForBooking} />
              </div>
            </>
          )}

          {activeTab === "destinasi" && (
            <div className="pt-4">
              <DestinationList onSelectDestinationForBooking={handleSelectDestinationForBooking} />
            </div>
          )}

          {activeTab === "tour-booking" && (
            <div className="pt-4">
              <TourBooking preselectedCountryId={preselectedCountryId} />
            </div>
          )}

          {activeTab === "hotel" && (
            <div className="pt-4">
              <HotelBooking preselectedCountryId={preselectedCountryId} />
            </div>
          )}

          {activeTab === "tentang-kami" && (
            <div className="pt-4">
              <AboutUs />
            </div>
          )}

          {activeTab === "maskapai" && (
            <div className="pt-4">
              <AirlinePartners />
            </div>
          )}

          {activeTab === "ai-assistant" && (
            <div className="pt-4">
              <AIPresenter />
            </div>
          )}
        </div>
      </div>

      {/* Structured Executive Corporate Footer */}
      <footer className="bg-slate-900 border-t border-slate-200 pt-16 pb-8 px-4 text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-850">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 to-pink-500 p-[1px] flex items-center justify-center">
                <div className="w-full h-full bg-slate-900 rounded-[7px] flex items-center justify-center">
                  <Compass className="w-4 h-4 text-sky-400" />
                </div>
              </div>
              <span className="text-lg font-black bg-gradient-to-r from-sky-450 to-pink-400 bg-clip-text text-transparent font-display">
                Gogo Tour
              </span>
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              Pelopor solusi perjalanan bisnis (Corporate MICE) dan liburan premium kelas atas di seluruh negara Asia dan Eropa semenjak tahun 2017. Terdaftar resmi di Kementerian Pariwisata RI.
            </p>
            
            <div className="flex space-x-3 text-slate-400 text-xs">
              <span className="hover:text-sky-400 cursor-pointer transition-colors">LinkedIn</span> • 
              <span className="hover:text-pink-400 cursor-pointer transition-colors">Instagram</span> • 
              <span className="hover:text-sky-400 cursor-pointer transition-colors">Twitter</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-display">Pranala Pintar</h4>
            <ul className="text-xs text-slate-300 space-y-2 font-light">
              <li>
                <button onClick={() => setActiveTab("home")} className="hover:text-sky-450 transition-colors">Beranda</button>
              </li>
              <li>
                <button onClick={() => setActiveTab("destinasi")} className="hover:text-sky-450 transition-colors">Daftar Destinasi Asia-Eropa</button>
              </li>
              <li>
                <button onClick={() => setActiveTab("tour-booking")} className="hover:text-sky-450 transition-colors">Booking Paket Tur</button>
              </li>
              <li>
                <button onClick={() => setActiveTab("hotel")} className="hover:text-sky-400 transition-colors">Booking Hotel Premium</button>
              </li>
              <li>
                <button onClick={() => setActiveTab("tentang-kami")} className="hover:text-sky-400 transition-colors">Tentang Kami</button>
              </li>
              <li>
                <button onClick={() => setActiveTab("ai-assistant")} className="hover:text-pink-400 transition-colors flex items-center">
                  <span>Rancang Rencana (Gemini AI)</span>
                  <span className="ml-1 scale-75 text-[8px] bg-pink-500 text-white px-1.5 py-0.5 rounded-full font-bold">New</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Representative */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-pink-400 font-display">Hubungi Representatif</h4>
            <div className="text-xs text-slate-300 space-y-2.5 font-light">
              <p className="flex items-start space-x-2">
                <Building className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                <span>Noble House Lt. 32, Dr. Ide Anak Agung Gde Agung, Mega Kuningan, Jakarta Selatan</span>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                <span>corporate@gogotour.com</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>+62-21-5088-9900</span>
              </p>
            </div>
          </div>

          {/* Security and Payments Highlights */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-display">Pramutamu bersertifikasi</h4>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              Semua transaksi dan perlindungan data pelanggan dijamin aman bersertifikasi enkripsi SSL 256-bit standar industri perbankan nasional.
            </p>
            {/* Payment methods icon representation */}
            <div className="flex flex-wrap gap-2 text-slate-300">
              <span className="bg-slate-950 border border-slate-800 px-2 py-1 rounded text-[10px] font-bold font-mono">BCA VA</span>
              <span className="bg-slate-950 border border-slate-800 px-2 py-1 rounded text-[10px] font-bold font-mono">Mandiri</span>
              <span className="bg-slate-950 border border-slate-800 px-2 py-1 rounded text-[10px] font-bold font-mono">VISA</span>
              <span className="bg-slate-950 border border-slate-800 px-2 py-1 rounded text-[10px] font-bold font-mono">Mastercard</span>
            </div>
          </div>

        </div>

        {/* Copy Rights bar */}
        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 font-light gap-4">
          <span>© 2026 PT Gogo Tour Indonesia. Seluruh hak cipta dilindungi undang-undang.</span>
          <div className="flex space-x-4">
            <span className="hover:text-slate-300 cursor-pointer transition-colors">Syarat & Ketentuan</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer transition-colors">Kebijakan Privasi</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer transition-colors">Pusat Bantuan MICE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
