import React, { useState, useEffect } from 'react';
import { Store, BookOpen, Settings, Lock, X, LogOut, Utensils } from 'lucide-react';

export default function Navbar({ restaurantName, viewMode, setViewMode, isAdminLoggedIn, setIsAdminLoggedIn }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!isAdminLoggedIn) return;
    let timeoutId;
    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsAdminLoggedIn(false);
        setViewMode('customer');
        alert('Sesi admin telah berakhir karena tidak ada aktivitas selama 1 menit.');
      }, 60000); 
    };

    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    events.forEach(event => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [isAdminLoggedIn, setIsAdminLoggedIn, setViewMode]);

  const handleKelolaClick = () => {
    if (isAdminLoggedIn) {
      setViewMode('admin');
    } else {
      setShowLoginModal(true);
      setPin('');
      setError(false);
    }
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setViewMode('customer');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (pin === '240922') {
      setIsAdminLoggedIn(true);
      setViewMode('admin');
      setShowLoginModal(false);
    } else {
      setError(true);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#fcfbf9]/95 backdrop-blur-md border-b border-[#e2dcd0] shadow-xs">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          
          {/* Logo & Label Sederhana (Nama resto di navbar dihilangkan agar lega) */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#4b5d2d] to-[#273016] rounded-2xl flex items-center justify-center shadow-md border border-[#61773a]/40 shrink-0">
              <Utensils className="w-4 h-4 text-[#d4dfc7]" />
            </div>
            <div>
              <span className="block text-[8px] uppercase font-mono tracking-[0.2em] text-[#556b2f] font-bold">
                Digital Menu
              </span>
              <span className="font-serif font-bold text-stone-900 text-sm sm:text-base tracking-wide">
                Dapur Rumahan
              </span>
            </div>
          </div>

          {/* Tombol Navigasi */}
          <div className="flex items-center space-x-2 shrink-0 bg-[#f4f1ea] p-1.5 rounded-2xl border border-[#e2dcd0] shadow-inner">
            <button
              onClick={() => setViewMode('customer')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 transition-all duration-300 cursor-pointer ${
                viewMode === 'customer'
                  ? 'bg-[#4b5d2d] text-white shadow-md'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Buku Menu</span>
            </button>

            <button
              onClick={handleKelolaClick}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 transition-all duration-300 cursor-pointer ${
                viewMode === 'admin'
                  ? 'bg-[#4b5d2d] text-white shadow-md'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Kelola</span>
            </button>

            {isAdminLoggedIn && (
              <button
                onClick={handleLogout}
                className="px-2.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-1 bg-red-700 hover:bg-red-800 text-white transition-all shadow-sm cursor-pointer"
                title="Keluar dari Admin"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Keluar</span>
              </button>
            )}
          </div>

        </div>
      </header>

      {/* Modal Popup Login PIN Admin */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[9999] bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#f4f1ea] rounded-2xl max-w-xs w-full p-6 shadow-2xl border border-[#d8d2c4] flex flex-col relative animate-fadeIn">
            <button 
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-[#eef2e6] text-stone-600 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-[#4b5d2d] rounded-2xl flex items-center justify-center mx-auto mb-2 text-white shadow-md border border-[#61773a]/40">
                <Lock className="w-6 h-6 text-[#d4dfc7]" />
              </div>
              <h3 className="font-serif font-bold text-stone-800 text-base">Akses Khusus Admin</h3>
              <p className="text-stone-600 text-xs mt-1 font-serif">Masukkan PIN untuk masuk ke mode kelola.</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-3">
              <div>
                <input 
                  type="password" 
                  maxLength="6"
                  placeholder="Masukkan PIN" 
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full px-3 py-2.5 text-center tracking-widest bg-white rounded-xl border border-[#d8d2c4] text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#4b5d2d]"
                  autoFocus
                />
                {error && <p className="text-red-600 text-[10px] text-center mt-1 font-semibold">PIN salah! Coba lagi</p>}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#4b5d2d] hover:bg-[#3a4822] text-white rounded-xl font-bold text-xs uppercase tracking-wider transition shadow-sm cursor-pointer"
              >
                Masuk
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}