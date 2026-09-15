import React, { useState } from 'react';
import { ShoppingBag, X, MessageSquare, Trash2, Plus, Minus } from 'lucide-react';

export default function FloatingCart({
  cart,
  updateQuantity,
  removeFromCart,
  clearCart,
  restaurantName,
  toggleFried,
  updateItemNote
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [orderNote, setOrderNote] = useState('');

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  
  const totalPrice = cart.reduce((sum, item) => {
    let itemPrice = item.price;
    if (item.fried) itemPrice += 2000;
    return sum + itemPrice * item.qty;
  }, 0);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!customerName || !orderNote) {
      alert('Mohon isi Nama Pemesan dan Catatan/Lokasi terlebih dahulu.');
      return;
    }

    // Format Pesanan Persis Seperti Contoh yang Diinginkan
    let message = `# PESANAN: ${restaurantName ? restaurantName.toUpperCase() : 'RESTO'} #\n\n`;
    message += `* Nama Pemesan: ${customerName}\n`;
    message += `* Lokasi Pengantaran: ${orderNote}\n`;
    message += `* Waktu Pesan: ${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB\n\n`;
    
    message += `# DAFTAR PESANAN:\n`;
    
    cart.forEach((item, index) => {
      let currentPrice = item.price;
      if (item.fried) currentPrice += 2000;

      message += `${index + 1}. ${item.name} (${item.qty}x)\n`;
      if (item.fried) message += `   * [VARIAN: GORENG MATANG]\n`;
      if (item.note && item.note.trim()) message += `   * [CATATAN: ${item.note.trim()}]\n`;
      message += `   $ Subtotal: Rp ${(currentPrice * item.qty).toLocaleString('id-ID')}\n`;
      if (index < cart.length - 1) message += `\n`;
    });

    message += `\n========================================\n`;
    message += `$ TOTAL PEMBAYARAN: Rp ${totalPrice.toLocaleString('id-ID')}\n`;
    message += `========================================\n\n`;
    message += `Mohon segera diproses, terima kasih!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = '6283875535702'; 
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-br from-[#4b5d2d] to-[#273016] text-[#d4dfc7] hover:text-white p-4 rounded-full shadow-[0_10px_25px_rgba(75,93,45,0.4)] flex items-center justify-center relative transition-all duration-300 hover:scale-110 border border-[#61773a]/50 cursor-pointer group"
          title="Buka Keranjang Pesanan"
        >
          <ShoppingBag size={22} className="transition-transform group-hover:-rotate-12" />
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-[#859d58] text-stone-900 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-md border border-white animate-bounce font-mono">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm z-50 flex justify-end transition-all animate-fadeIn">
          <div className="bg-[#fcfbf9] w-full max-w-md h-full shadow-2xl flex flex-col border-l border-[#e2dcd0] animate-slide-left">
            
            <div className="bg-[#3a4822] text-white p-5 flex justify-between items-center shadow-md border-b border-[#4b5d2d]">
              <div>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#d4dfc7] font-mono font-semibold">
                  Ringkasan Pesanan
                </span>
                <h2 className="font-serif font-bold text-lg text-white flex items-center gap-2 mt-0.5">
                  <ShoppingBag size={18} className="text-[#859d58]" /> Keranjang Anda
                </h2>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-stone-300 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-24 text-stone-400">
                  <div className="w-16 h-16 bg-[#f4f1ea] rounded-3xl flex items-center justify-center mx-auto mb-4 border border-[#e2dcd0] text-stone-400">
                    <ShoppingBag size={32} className="opacity-40" />
                  </div>
                  <p className="font-serif font-bold text-stone-700 text-base">Keranjang Anda masih kosong</p>
                  <p className="text-xs text-stone-500 mt-1 font-serif">Silakan pilih menu lezat kami dari buku menu.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    {cart.map((item, index) => {
                      let itemPrice = item.price;
                      if (item.fried) itemPrice += 2000;

                      return (
                        <div key={item.cartId || index} className="bg-white border border-[#e2dcd0] rounded-2xl p-4 shadow-2xs hover:shadow-sm transition-all space-y-3">
                          <div className="flex justify-between items-start gap-2">
                            <div>
                              <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base leading-tight">
                                {item.name}
                              </h4>
                              <p className="text-xs font-semibold text-[#4b5d2d] mt-0.5 font-mono">
                                {formatRupiah(itemPrice)} {item.fried && <span className="text-[10px] text-amber-700 font-normal italic">(+Goreng Rp 2k)</span>}
                              </p>
                            </div>
                            <button 
                              onClick={() => removeFromCart(item.cartId)}
                              className="text-stone-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                              title="Hapus item"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>

                          <div className="flex items-center justify-between border-t border-stone-100 pt-2.5">
                            <div className="flex items-center gap-2 bg-[#f4f1ea] p-1 rounded-xl border border-[#e2dcd0]">
                              <button
                                onClick={() => updateQuantity(item.cartId, item.qty - 1)}
                                className="bg-white hover:bg-stone-200 text-stone-700 w-7 h-7 rounded-lg flex items-center justify-center shadow-2xs transition-colors cursor-pointer font-bold"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="font-mono font-bold text-sm w-6 text-center text-stone-800">{item.qty}</span>
                              <button
                                onClick={() => updateQuantity(item.cartId, item.qty + 1)}
                                className="bg-[#4b5d2d] hover:bg-[#3a4822] text-white w-7 h-7 rounded-lg flex items-center justify-center shadow-2xs transition-colors cursor-pointer font-bold"
                              >
                                <Plus size={12} />
                              </button>
                            </div>

                            {/* Opsi Goreng (+2rb) */}
                            <label className="flex items-center gap-1.5 text-[11px] font-medium text-stone-700 cursor-pointer bg-amber-50 border border-amber-200/60 px-2.5 py-1 rounded-xl">
                              <input
                                type="checkbox"
                                checked={item.fried || false}
                                onChange={() => toggleFried(item.cartId)}
                                className="rounded text-[#4b5d2d] focus:ring-[#4b5d2d] w-3.5 h-3.5 cursor-pointer"
                              />
                              Goreng (+2rb)
                            </label>
                          </div>

                          <div>
                            <input
                              type="text"
                              placeholder="Catatan khusus menu (cth: saus pisah)..."
                              value={item.note || ''}
                              onChange={(e) => updateItemNote(item.cartId, e.target.value)}
                              className="w-full text-xs bg-[#fcfbf9] border border-[#e2dcd0] rounded-xl px-3 py-2 text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#4b5d2d] font-serif"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="text-right pt-1">
                    <button
                      onClick={clearCart}
                      className="text-xs text-stone-500 hover:text-red-600 font-serif underline transition-colors cursor-pointer"
                    >
                      Kosongkan Keranjang
                    </button>
                  </div>

                  <form onSubmit={handleCheckout} className="space-y-3.5 pt-4 border-t border-[#e2dcd0]">
                    <h3 className="font-serif font-bold text-stone-800 text-sm tracking-wide">Informasi Pemesan</h3>
                    
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-1">Nama Pemesan *</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Taufiq Ismail"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full text-sm bg-white border border-[#e2dcd0] rounded-xl px-3 py-2.5 text-stone-800 focus:outline-none focus:border-[#4b5d2d] shadow-2xs font-serif"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-1">Catatan / Lokasi Pengiriman *</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Kantor / Meja 3"
                        value={orderNote}
                        onChange={(e) => setOrderNote(e.target.value)}
                        className="w-full text-sm bg-white border border-[#e2dcd0] rounded-xl px-3 py-2.5 text-stone-800 focus:outline-none focus:border-[#4b5d2d] shadow-2xs font-serif"
                      />
                    </div>

                    <div className="pt-3">
                      <div className="flex justify-between items-center mb-4 bg-[#f4f1ea] p-3.5 rounded-2xl border border-[#e2dcd0]">
                        <span className="font-serif font-bold text-stone-700 text-sm">Total Pembayaran:</span>
                        <span className="font-serif font-extrabold text-[#4b5d2d] text-lg font-mono">{formatRupiah(totalPrice)}</span>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#4b5d2d] hover:bg-[#3a4822] text-white font-bold py-3.5 px-4 rounded-2xl shadow-lg flex items-center justify-center gap-2.5 transition-all transform hover:scale-[1.01] active:scale-95 cursor-pointer border border-[#61773a]/40"
                      >
                        <MessageSquare size={18} /> Kirim Pesanan via WhatsApp
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
}