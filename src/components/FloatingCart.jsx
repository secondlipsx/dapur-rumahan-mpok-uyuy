import React, { useState } from 'react';
import { ShoppingBag, X, Plus, Minus, CheckCircle2, MessageCircle, Flame } from 'lucide-react';

export default function FloatingCart({ cart, updateCartQty, setCart, formatRupiah, restaurantName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [orderNote, setOrderNote] = useState('');
  const [generalRequest, setGeneralRequest] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  // Fungsi untuk mengubah opsi (Digoreng Matang / Catatan) per item di keranjang
  const updateItemOption = (index, field, value) => {
    setCart(prevCart => {
      return prevCart.map((item, i) => {
        if (i === index) {
          const updatedItem = { ...item };
          if (field === 'fried') {
            const wasFried = updatedItem.fried || false;
            updatedItem.fried = value;
            if (value && !wasFried) {
              updatedItem.price += 2000;
            } else if (!value && wasFried) {
              updatedItem.price -= 2000;
            }
          } else if (field === 'note') {
            updatedItem.note = value;
          }
          return updatedItem;
        }
        return item;
      });
    });
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!customerName || !orderNote) {
      alert('Mohon isi Nama Pemesan dan Catatan/Lokasi terlebih dahulu.');
      return;
    }

    let message = `🍽️ *PESANAN - ${restaurantName ? restaurantName.toUpperCase() : 'RESTO'}*\n\n`;
    
    message += `👤 *Pemesan:* ${customerName}\n`;
    message += `📍 *Catatan/Lokasi:* ${orderNote}\n`;
    if (generalRequest.trim()) {
      message += `📝 *Catatan Umum:* ${generalRequest}\n`;
    }
    message += `⏰ *Waktu Pemesanan:* ${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB\n\n`;
    
    message += `📋 *Menu Pesanan:*\n`;
    cart.forEach((item) => {
      message += `• ${item.name} (${item.qty}x)\n`;
      if (item.fried) message += `   └ Varian: Digoreng Matang (+Rp 2.000)\n`;
      if (item.note) message += `   └ Catatan: "${item.note}"\n`;
      message += `   └ Subtotal: *${formatRupiah(item.price * item.qty)}*\n`;
    });

    message += `\n💰 *Total:* *${formatRupiah(totalPrice)}*\n\n`;
    message += `_Mohon segera diproses ya, terima kasih!_ 🙏`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = '6283875535702'; 
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    setOrderSuccess(true);
  };

  const resetOrder = () => {
    setCart([]);
    setGeneralRequest('');
    setOrderSuccess(false);
    setIsOpen(false);
  };

  return (
    <>
      {/* Tombol Floating Cart Mewah */}
      {totalItems > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center space-x-3.5 px-6 py-3.5 bg-gradient-to-r from-[#4b5d2d] via-[#3a4822] to-[#273016] text-white rounded-full shadow-[0_10px_30px_rgba(75,93,45,0.4)] hover:shadow-[0_15px_40px_rgba(75,93,45,0.6)] border border-[#859d58]/40 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 cursor-pointer"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/20 shadow-inner group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-5 h-5 text-[#d4dfc7]" />
              <span className="absolute -top-1 -right-1 bg-[#859d58] text-[#1d2510] font-mono font-bold text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-md border border-white/40">
                {totalItems}
              </span>
            </div>

            <div className="flex flex-col text-left">
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#d4dfc7] font-mono font-semibold opacity-90">
                Keranjang
              </span>
              <span className="font-serif font-bold text-sm sm:text-base text-white tracking-wide drop-shadow-xs">
                {formatRupiah(totalPrice)}
              </span>
            </div>
          </button>
        </div>
      )}

      {/* Modal Detail Keranjang */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] bg-stone-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#fcfbf9] rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-[#e2dcd0] flex flex-col relative max-h-[90vh] overflow-hidden">
            
            {/* Tombol Tutup */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-stone-100 text-stone-500 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {orderSuccess ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 bg-[#eef2e6] rounded-full flex items-center justify-center mx-auto text-[#4b5d2d] border border-[#d8d2c4]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif font-bold text-xl text-stone-900">Pesanan Berhasil Dikirim!</h3>
                <p className="text-stone-600 text-xs font-serif leading-relaxed px-4">
                  Aplikasi WhatsApp telah terbuka menuju nomor pemesanan. Silakan kirimkan pesan pesanan Anda.
                </p>
                <button
                  onClick={resetOrder}
                  className="mt-4 px-6 py-2.5 bg-[#4b5d2d] hover:bg-[#3a4822] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer shadow-md"
                >
                  Selesai / Pesan Lagi
                </button>
              </div>
            ) : (
              <>
                {/* Header Modal */}
                <div className="flex items-center space-x-3 mb-4 border-b border-stone-200 pb-3">
                  <div className="w-10 h-10 bg-[#eef2e6] rounded-xl flex items-center justify-center text-[#4b5d2d] border border-[#d8d2c4]">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#556b2f] font-mono font-bold block">
                      Konfirmasi Pesanan
                    </span>
                    <h3 className="font-serif font-bold text-stone-900 text-lg">Keranjang Belanja</h3>
                  </div>
                </div>

                {/* Daftar Item di Keranjang */}
                <div className="space-y-3 overflow-y-auto max-h-[260px] pr-1 mb-4">
                  {cart.length === 0 ? (
                    <p className="text-center py-6 text-stone-400 font-serif italic text-xs">Keranjang masih kosong.</p>
                  ) : (
                    cart.map((item, index) => (
                      <div key={index} className="bg-white p-3.5 rounded-2xl border border-stone-200/80 shadow-2xs space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-sans font-bold text-stone-900 text-xs sm:text-sm">{item.name}</h4>
                            <span className="font-bold text-[#4b5d2d] text-xs font-mono block mt-0.5">
                              {formatRupiah(item.price * item.qty)}
                            </span>
                          </div>

                          {/* Kontrol Kuantitas */}
                          <div className="flex items-center space-x-2 bg-stone-50 p-1 rounded-xl border border-stone-200">
                            <button
                              onClick={() => updateCartQty(item.id, -1)}
                              className="w-6 h-6 bg-white hover:bg-stone-200 text-stone-700 rounded-lg flex items-center justify-center shadow-2xs transition cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono font-bold text-xs text-stone-800 w-4 text-center">{item.qty}</span>
                            <button
                              onClick={() => updateCartQty(item.id, 1)}
                              className="w-6 h-6 bg-white hover:bg-stone-200 text-stone-700 rounded-lg flex items-center justify-center shadow-2xs transition cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Opsi Tambahan Per Menu di Keranjang */}
                        <div className="pt-2 border-t border-stone-100 space-y-2">
                          <label className="flex items-center space-x-2 text-[11px] font-medium text-stone-700 cursor-pointer">
                            <input 
                              type="checkbox"
                              checked={item.fried || false}
                              onChange={(e) => updateItemOption(index, 'fried', e.target.checked)}
                              className="rounded border-stone-300 text-[#4b5d2d] focus:ring-[#4b5d2d] w-3.5 h-3.5 cursor-pointer"
                            />
                            <span className="flex items-center space-x-1">
                              <Flame className="w-3 h-3 text-amber-600" />
                              <span>Digoreng Matang (+Rp 2.000)</span>
                            </span>
                          </label>

                          <input 
                            type="text"
                            placeholder="Catatan khusus menu ini (cth: saus pisah, pedas sedang)..."
                            value={item.note || ''}
                            onChange={(e) => updateItemOption(index, 'note', e.target.value)}
                            className="w-full px-2.5 py-1 text-[11px] bg-stone-50 rounded-lg border border-stone-200 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#4b5d2d]"
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Form Input Detail Pemesan */}
                {cart.length > 0 && (
                  <form onSubmit={handleCheckout} className="space-y-2.5 pt-2 border-t border-stone-200">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] uppercase font-mono font-semibold text-stone-600 mb-1">Nama Pemesan</label>
                        <input
                          type="text"
                          required
                          placeholder="cth: Taufiq"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#4b5d2d]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-mono font-semibold text-stone-600 mb-1">Catatan / Lokasi</label>
                        <input
                          type="text"
                          required
                          placeholder="cth: Kantor / Meja 3"
                          value={orderNote}
                          onChange={(e) => setOrderNote(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#4b5d2d]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-mono font-semibold text-stone-600 mb-1">Catatan Tambahan Umum (Opsional)</label>
                      <input
                        type="text"
                        placeholder="cth: Bumbu dipisah"
                        value={generalRequest}
                        onChange={(e) => setGeneralRequest(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#4b5d2d]"
                      />
                    </div>

                    {/* Total Pembayaran & Tombol Kirim WhatsApp */}
                    <div className="pt-2 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-mono">Total Bayar</span>
                        <span className="font-serif font-bold text-base text-[#4b5d2d]">{formatRupiah(totalPrice)}</span>
                      </div>

                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-gradient-to-r from-emerald-700 to-emerald-900 hover:from-emerald-800 hover:to-emerald-950 text-white rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center space-x-2 transition-all shadow-md cursor-pointer shrink-0"
                      >
                        <MessageCircle className="w-4 h-4 text-emerald-300" />
                        <span>Kirim via WhatsApp</span>
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}

          </div>
        </div>
      )}
    </>
  );
}