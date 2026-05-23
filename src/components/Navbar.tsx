import React from "react";
import { Sparkles, Compass, Hotel, Info, Home as HomeIcon, Menu, X, Plane, ChevronDown } from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOrderDropdownOpen, setIsOrderDropdownOpen] = React.useState(false);

  const navItems = [
    { id: "home", label: "Beranda", icon: <HomeIcon className="w-4 h-4" /> },
    { id: "destinasi", label: "Destinasi Wisata", icon: <Compass className="w-4 h-4" /> },
    { id: "tentang-kami", label: "Tentang Kami", icon: <Info className="w-4 h-4" /> },
    { id: "ai-assistant", label: "Rencana AI", icon: <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />, isSpecial: true }
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-slate-200 px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* LOGO with Dark Blue, Light Blue, and Pink Gradient */}
        <div 
          className="flex items-center space-x-2 cursor-pointer group"
          onClick={() => { setActiveTab("home"); setIsOpen(false); setIsOrderDropdownOpen(false); }}
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-sky-600 to-pink-500 p-[2px] flex items-center justify-center shadow-lg shadow-sky-500/15">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center overflow-hidden">
              <Compass className="w-5 h-5 text-sky-500 group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-tr from-sky-450 to-pink-500 opacity-20 blur-sm group-hover:opacity-50 transition-opacity"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black bg-gradient-to-r from-sky-600 via-sky-500 to-pink-500 bg-clip-text text-transparent font-display tracking-tight leading-none pb-0.5">
              Gogo Tour
            </span>
            <span className="text-[9px] uppercase font-bold tracking-widest text-sky-600 -mt-0.5 font-sans">
              Business & Leisure
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setIsOrderDropdownOpen(false); }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 relative ${
                activeTab === item.id
                  ? item.isSpecial
                    ? "bg-gradient-to-r from-sky-500/10 to-pink-500/10 text-pink-600 border border-pink-200"
                    : "bg-sky-50 text-sky-600 border border-sky-100"
                  : "text-slate-655 text-slate-600 hover:text-sky-650 hover:bg-slate-100/70"
              }`}
            >
              <span className={item.isSpecial ? "text-pink-500" : activeTab === item.id ? "text-sky-500" : "text-slate-400"}>
                {item.icon}
              </span>
              <span>{item.label}</span>
              {activeTab === item.id && (
                <span className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-gradient-to-r from-sky-500 to-pink-400 rounded-full" />
              )}
            </button>
          ))}
          
          {/* Top Order Menu Dropdown Option */}
          <div className="relative">
            <button 
              onClick={() => setIsOrderDropdownOpen(!isOrderDropdownOpen)}
              className="ml-4 px-5 py-2 rounded-lg bg-gradient-to-r from-sky-500 via-sky-600 to-pink-500 hover:brightness-110 active:scale-95 transition-all text-white font-bold text-sm shadow-md shadow-pink-500/15 flex items-center space-x-1.5 cursor-pointer"
            >
              <span>Pesan Sekarang</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOrderDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {isOrderDropdownOpen && (
              <>
                {/* Backdrop overlay listener to close dropdown */}
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsOrderDropdownOpen(false)}
                />
                
                {/* Floating Selection Box */}
                <div className="absolute right-0 mt-3.5 w-64 bg-white border border-slate-200 rounded-xl shadow-xl z-20 overflow-hidden divide-y divide-slate-100 animate-fadeIn">
                  <button 
                    onClick={() => {
                      setActiveTab("tour-booking");
                      setIsOrderDropdownOpen(false);
                    }}
                    className="w-full flex items-start space-x-3.5 p-3.5 hover:bg-pink-50/20 active:bg-pink-50/15 transition-colors text-left group/btn"
                  >
                    <div className="p-2 bg-pink-50 text-pink-500 rounded-lg group-hover/btn:bg-pink-500 group-hover/btn:text-white transition-colors">
                      <Plane className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-900 group-hover/btn:text-pink-600 transition-colors">Booking Paket Tur</span>
                      <span className="block text-[10px] text-slate-500 mt-0.5 leading-relaxed">Ekspedisi wisata premium terkurasi di Asia & Eropa</span>
                    </div>
                  </button>

                  <button 
                    onClick={() => {
                      setActiveTab("hotel");
                      setIsOrderDropdownOpen(false);
                    }}
                    className="w-full flex items-start space-x-3.5 p-3.5 hover:bg-sky-50/20 active:bg-sky-50/15 transition-colors text-left group/btn"
                  >
                    <div className="p-2 bg-sky-50 text-sky-500 rounded-lg group-hover/btn:bg-sky-500 group-hover/btn:text-white transition-colors">
                      <Hotel className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-slate-900 group-hover/btn:text-sky-600 transition-colors">Pemesanan Hotel</span>
                      <span className="block text-[10px] text-slate-500 mt-0.5 leading-relaxed">Penyediaan Suite Room partner Bintang 5 Premium</span>
                    </div>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-slate-600 hover:text-sky-500 hover:bg-slate-100 focus:outline-none"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 p-4 bg-white border border-slate-200 rounded-xl space-y-4 animate-fadeIn shadow-xl">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-sm font-semibold transition-colors ${
                  activeTab === item.id
                    ? "bg-sky-50 text-sky-600 border-l-4 border-sky-500"
                    : "text-slate-700 hover:bg-slate-50 hover:text-sky-500"
                }`}
              >
                <span className={activeTab === item.id ? "text-sky-500" : "text-slate-400"}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2.5">
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-4">Layanan Order Sekarang</p>
            <div className="grid grid-cols-2 gap-2 px-1">
              <button 
                onClick={() => {
                  setActiveTab("tour-booking");
                  setIsOpen(false);
                }}
                className="flex items-center justify-center space-x-1.5 py-2.5 px-2 rounded-xl bg-pink-50 hover:bg-pink-100/70 border border-pink-100 text-pink-600 font-bold text-xs transition-all active:scale-[0.98]"
              >
                <Plane className="w-3.5 h-3.5 shrink-0" />
                <span>Booking Tur</span>
              </button>
              <button 
                onClick={() => {
                  setActiveTab("hotel");
                  setIsOpen(false);
                }}
                className="flex items-center justify-center space-x-1.5 py-2.5 px-2 rounded-xl bg-sky-50 hover:bg-sky-100/70 border border-sky-100 text-sky-600 font-bold text-xs transition-all active:scale-[0.98]"
              >
                <Hotel className="w-3.5 h-3.5 shrink-0" />
                <span>Pesan Hotel</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
