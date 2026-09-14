import React, { useState } from 'react';
import { ShoppingBag, X, Plus, Minus, Send, User } from 'lucide-react';

export default function FloatingCart({ cart, updateCartQty, setCart, formatRupiah, restaurantName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [isInputtingName, setIsInputtingName] = useState(false);

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  // Fungsi untuk mengirim pesanan ke WhatsApp
  const handleSendToWhatsApp = (e) => {
    e.preventDefault();
    if (!customerName.trim()) return;

    // Format nomor WhatsApp tujuan (ubah 08... menjadi format internasional 62...)
    const phoneNo = '6283875535702'; 

    // Susun isi pesan WhatsApp
    let message = `Halo ${restaurantName}, saya ingin memesan:\n\n`;
    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}* (${item.qty}x) - ${formatRupiah(item.price * item.qty)}\n`;
    });
    message += `\n*Total Pembayaran: ${formatRupiah(totalPrice)}*`;
    message += `\n\nNama Pemesan: *${customerName}*`;

    // Encode teks agar aman untuk URL WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNo}?text=${encodedMessage}`;

    // Buka WhatsApp di tab baru
    window.open(whatsappUrl, '_blank');

    // Reset keranjang dan tutup modal setelah dikirim
    setCart([]);
    setCustomerName('');
    setIsInputtingName(false);
    setIsOpen(false);
  };

  if (totalItems === 0) return null;

  return (
    <>
      {/* Tombol Floating Keranjang */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-3 rounded-full shadow-lg flex items-center space-x-3 transition-all transform hover:scale-105 border border-amber-500/40"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-amber-100" />
            <span className="absolute -top-2 -right-2 bg-orange-900 text-amber-200 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-amber-500">
              {totalItems}
            </span>
          </div>
          <div className="text-left">
            <span className="text-[10px] uppercase font-mono tracking-wider block text-amber-100 opacity-90 leading-none">Keranjang</span>
            <span className="text-sm font-bold text-white tracking-wide">{formatRupiah(totalPrice)}</span>
          </div>
        </button>
      </div>

      {/* Modal Keranjang & Input Nama */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-amber-50 rounded-2xl max-w-md w-full p-5 shadow-2xl border border-amber-200 flex flex-col max-h-[85vh]">
            
            {/* Header Modal */}
            <div className="flex justify-between items-center pb-3 border-b border-amber-200">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-amber-700" />
                <h3 className="font-sans font-bold text-stone-900 text-base">
                  {isInputtingName ? 'Konfirmasi Pemesan' : 'Pesanan Anda'}
                </h3>
              </div>
              <button 
                onClick={() => {
                  setIsOpen(false);
                  setIsInputtingName(false);
                }}
                className="p-1 rounded-full hover:bg-amber-200/50 text-stone-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Isi Modal */}
            <div className="py-4 space-y-3 overflow-y-auto flex-1 pr-1">
              {isInputtingName ? (
                /* Form Input Nama Pemesan */
                <form onSubmit={handleSendToWhatsApp} id="whatsapp-form" className="py-4 space-y-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-stone-700">Nama Penerima / Pemesan:</label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
                      <input
                        type="text"
                        placeholder="Contoh: Budi Santoso"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-amber-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
                        required
                        autoFocus
                      />
                    </div>
                  </div>
                  <p className="text-[11px] text-stone-500 italic">
                    Setelah klik tombol kirim, Anda akan diarahkan langsung ke aplikasi WhatsApp resmi restoran kami.
                  </p>
                </form>
              ) : (
                /* Daftar Belanjaan Di Keranjang */
                cart.map((item) => (
                  <div key={item.id} className="bg-white p-3 rounded-xl border border-amber-200/80 flex justify-between items-center shadow-sm">
                    <div className="pr-2 flex-1">
                      <h4 className="font-bold text-stone-900 text-xs">{item.name}</h4>
                      <span className="text-orange-600 font-bold text-xs">{formatRupiah(item.price * item.qty)}</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200">
                      <button 
                        onClick={() => updateCartQty(item.id, -1)}
                        className="p-1 text-stone-600 hover:text-red-600 transition"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-xs font-bold text-stone-900 w-4 text-center">{item.qty}</span>
                      <button 
                        onClick={() => updateCartQty(item.id, 1)}
                        className="p-1 text-stone-600 hover:text-emerald-600 transition"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Modal & Tombol Aksi */}
            <div className="pt-3 border-t border-amber-200 space-y-3">
              {!isInputtingName && (
                <div className="flex justify-between items-center text-sm font-bold text-stone-900">
                  <span>Total Pembayaran:</span>
                  <span className="text-amber-800 text-base font-mono">{formatRupiah(totalPrice)}</span>
                </div>
              )}

              {isInputtingName ? (
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsInputtingName(false)}
                    className="w-1/3 py-2.5 bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-xl font-bold text-xs transition"
                  >
                    Kembali
                  </button>
                  <button
                    type="submit"
                    form="whatsapp-form"
                    className="w-2/3 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center space-x-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim ke WhatsApp</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsInputtingName(true)}
                  className="w-full py-3 bg-amber-700 hover:bg-amber-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition shadow-md active:scale-95 flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Pesan Sekarang</span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
}