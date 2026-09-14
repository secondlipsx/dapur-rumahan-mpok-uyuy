import React, { useState, useEffect } from 'react';
import { Store, BookOpen, Settings, Lock, X, LogOut } from 'lucide-react';

export default function Navbar({ restaurantName, viewMode, setViewMode, isAdminLoggedIn, setIsAdminLoggedIn }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  // Auto-logout timer (1 menit / 60,000 ms) saat admin login
  useEffect(() => {
    if (!isAdminLoggedIn) return;

    let timeoutId;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      // Set waktu 60 detik (1 menit)
      timeoutId = setTimeout(() => {
        setIsAdminLoggedIn(false);
        setViewMode('customer');
        alert('Sesi admin telah berakhir karena tidak ada aktivitas selama 1 menit.');
      }, 60000); 
    };

    // Event listener untuk mendeteksi aktivitas pengguna
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    events.forEach(event => window.addEventListener(event, resetTimer));

    resetTimer(); // Inisialisasi awal timer

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
    // PIN Default Admin: 1234
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
      <header className="sticky top-0 z-50 bg-amber-50/90 backdrop-blur-md border-b border-amber-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          
          {/* Logo & Nama Restoran */}
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center shadow-md shrink-0">
              <Store className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <span className="block text-[10px] uppercase font-mono tracking-widest text-amber-700 font-semibold">
                Rumah Makan
              </span>
              <h1 className="font-sans font-black text-base sm:text-lg text-stone-900 tracking-tight truncate">
                {restaurantName}
              </h1>
            </div>
          </div>

          {/* Tombol Navigasi */}
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => setViewMode('customer')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all shadow-sm ${
                viewMode === 'customer'
                  ? 'bg-amber-800 text-white shadow-amber-900/20'
                  : 'bg-white text-stone-700 hover:bg-amber-100/50 border border-amber-200'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Buku Menu</span>
            </button>

            <button
              onClick={handleKelolaClick}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all shadow-sm ${
                viewMode === 'admin'
                  ? 'bg-amber-800 text-white shadow-amber-900/20'
                  : 'bg-white text-stone-700 hover:bg-amber-100/50 border border-amber-200'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Kelola</span>
            </button>

            {/* Tombol Keluar (Hanya muncul jika admin sudah login) */}
            {isAdminLoggedIn && (
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white transition shadow-sm"
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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-amber-50 rounded-2xl max-w-xs w-full p-6 shadow-2xl border border-amber-200 flex flex-col relative">
            <button 
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-amber-200/50 text-stone-600 transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-2 text-white shadow-md">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-stone-900 text-base">Akses Khusus Admin</h3>
              <p className="text-stone-600 text-xs mt-1">Masukkan PIN untuk masuk ke mode kelola.</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-3">
              <div>
                <input 
                  type="password" 
                  maxLength="6"
                  placeholder="Masukkan PIN" 
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full px-3 py-2 text-center tracking-widest bg-white rounded-xl border border-amber-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
                  autoFocus
                />
                {error && <p className="text-red-600 text-[10px] text-center mt-1 font-semibold">PIN salah! Coba lagi (Default: 1234)</p>}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition shadow"
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