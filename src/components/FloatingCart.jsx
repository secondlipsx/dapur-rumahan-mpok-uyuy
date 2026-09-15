import React, { useState } from 'react';
import { ShoppingCart, X, MessageCircle, Trash2, Plus, Minus } from 'lucide-react';

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
  const [generalRequest, setGeneralRequest] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);

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

    let message = `# PESANAN: ${restaurantName ? restaurantName.toUpperCase() : 'RESTO'} #\n\n`;
    message += `* Nama: ${customerName}\n`;
    message += `* Lokasi: ${orderNote}\n`;
    if (generalRequest.trim()) message += `* Info: ${generalRequest}\n`;
    message += `* Waktu: ${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB\n\n`;
    
    message += `$ DAFTAR PESANAN:\n`;
    cart.forEach((item, index) => {
      let currentPrice = item.price;
      if (item.fried) currentPrice += 2000;

      message += `${index + 1}. ${item.name} (${item.qty}x)\n`;
      if (item.fried) message += `   - [VARIAN: GORENG MATANG]\n`;
      if (item.note) message += `   - [CATATAN: ${item.note}]\n`;
      message += `   - Subtotal: Rp ${(currentPrice * item.qty).toLocaleString('id-ID')}\n`;
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
    setOrderSuccess(true);
  };

  return (
    <>
      {/* Tombol Melayang Keranjang */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-2xl flex items-center justify-center relative transition-transform hover:scale-105 cursor-pointer"
        >
          <ShoppingCart size={24} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-md animate-bounce">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* Modal / Panel Keranjang */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end transition-opacity">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col animate-slide-left">
            
            {/* Header Modal */}
            <div className="bg-green-700 text-white p-4 flex justify-between items-center shadow-md">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <ShoppingCart size={20} /> Keranjang Pesanan
              </h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-green-800 p-2 rounded-full transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Isi Daftar Belanja */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                  <ShoppingCart size={48} className="mx-auto mb-3 opacity-30" />
                  <p className="font-medium">Keranjang Anda masih kosong</p>
                  <p className="text-sm">Yuk pilih menu favoritmu sekarang!</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    {cart.map((item, index) => {
                      let itemPrice = item.price;
                      if (item.fried) itemPrice += 2000;

                      return (
                        <div key={item.cartId || index} className="bg-gray-50 border border-gray-200 rounded-xl p-3 shadow-sm">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-bold text-gray-800">{item.name}</h4>
                              <p className="text-sm font-semibold text-green-700">
                                {formatRupiah(itemPrice)} {item.fried && <span className="text-xs text-orange-600 font-normal">(+Goreng)</span>}
                              </p>
                            </div>
                            <button 
                              onClick={() => removeFromCart(item.cartId)}
                              className="text-red-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                              title="Hapus item"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>

                          {/* Tombol Kuantitas & Opsi Goreng */}
                          <div className="mt-3 flex items-center justify-between border-t border-gray-200 pt-2">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.cartId, item.qty - 1)}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-700 w-7 h-7 rounded-lg flex items-center justify-center font-bold transition-colors cursor-pointer"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="font-bold text-sm w-6 text-center">{item.qty}</span>
                              <button
                                onClick={() => updateQuantity(item.cartId, item.qty + 1)}
                                className="bg-green-600 hover:bg-green-700 text-white w-7 h-7 rounded-lg flex items-center justify-center font-bold transition-colors cursor-pointer"
                              >
                                <Plus size={12} />
                              </button>
                            </div>

                            {/* Opsi Goreng jika tersedia */}
                            {item.allowFried && (
                              <label className="flex items-center gap-1.5 text-xs font-medium text-gray-700 cursor-pointer bg-orange-50 border border-orange-200 px-2 py-1 rounded-lg">
                                <input
                                  type="checkbox"
                                  checked={item.fried || false}
                                  onChange={() => toggleFried(item.cartId)}
                                  className="rounded text-orange-600 focus:ring-orange-500 w-3.5 h-3.5 cursor-pointer"
                                />
                                Goreng (+2rb)
                              </label>
                            )}
                          </div>

                          {/* Catatan Item Khusus */}
                          <div className="mt-2">
                            <input
                              type="text"
                              placeholder="Catatan khusus menu ini (cth: saus pisah)..."
                              value={item.note || ''}
                              onChange={(e) => updateItemNote(item.cartId, e.target.value)}
                              className="w-full text-xs bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-green-600"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Tombol Kosongkan Keranjang */}
                  <div className="text-right">
                    <button
                      onClick={clearCart}
                      className="text-xs text-red-500 hover:text-red-700 font-semibold underline cursor-pointer"
                    >
                      Kosongkan Seluruh Keranjang
                    </button>
                  </div>

                  {/* Form Pemesan */}
                  <form onSubmit={handleCheckout} className="space-y-3 pt-4 border-t border-gray-200">
                    <h3 className="font-bold text-gray-800 text-sm">Informasi Pemesan</h3>
                    
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Nama Pemesan *</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Taufiq Ismail"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-green-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Catatan / Lokasi Pengiriman *</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Kantor / Meja 3"
                        value={orderNote}
                        onChange={(e) => setOrderNote(e.target.value)}
                        className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-green-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Catatan Umum (Opsional)</label>
                      <input
                        type="text"
                        placeholder="Contoh: Tolong siapkan sendok ekstra"
                        value={generalRequest}
                        onChange={(e) => setGeneralRequest(e.target.value)}
                        className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-green-600"
                      />
                    </div>

                    {/* Total Harga & Tombol Kirim WhatsApp */}
                    <div className="pt-2">
                      <div className="flex justify-between items-center mb-3 bg-green-50 p-3 rounded-xl border border-green-200">
                        <span className="font-bold text-gray-700 text-sm">Total Pembayaran:</span>
                        <span className="font-extrabold text-green-700 text-lg">{formatRupiah(totalPrice)}</span>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] cursor-pointer"
                      >
                        <MessageCircle size={20} /> Kirim Pesanan via WhatsApp
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