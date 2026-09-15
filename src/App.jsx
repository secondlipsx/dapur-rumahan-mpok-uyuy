import React, { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { initialRestaurantName, initialMenu } from './data/initialData';
import Navbar from './components/Navbar';
import BookMenu from './components/BookMenu';
import AdminPanel from './components/AdminPanel';
import FloatingCart from './components/FloatingCart';

export default function App() {
  const [restaurantName, setRestaurantName] = useLocalStorage('resto_name', initialRestaurantName);
  const [menu, setMenu] = useLocalStorage('resto_menu', initialMenu);
  const [viewMode, setViewMode] = useState('customer');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);

  // Fungsi Tambah ke Keranjang dengan penanganan varian & allowFried yang aman
  const addToCart = (item) => {
    setCart(prevCart => {
      const isFried = item.fried || false;
      const cartId = `${item.id}-${isFried ? 'fried' : 'normal'}-${item.note || ''}`;
      
      const existingIndex = prevCart.findIndex(cartItem => cartItem.cartId === cartId);

      if (existingIndex > -1) {
        return prevCart.map((cartItem, idx) => 
          idx === existingIndex ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem
        );
      }
      return [...prevCart, { ...item, fried: isFried, allowFried: item.allowFried ?? true, cartId, qty: 1 }];
    });
  };

  // Fungsi Update Kuantitas berdasarkan cartId
  const updateQuantity = (cartId, newQty) => {
    setCart(prevCart => {
      if (newQty <= 0) {
        return prevCart.filter(item => item.cartId !== cartId);
      }
      return prevCart.map(item => 
        item.cartId === cartId ? { ...item, qty: newQty } : item
      );
    });
  };

  // Fungsi Hapus Item dari Keranjang
  const removeFromCart = (cartId) => {
    setCart(prevCart => prevCart.filter(item => item.cartId !== cartId));
  };

  // Fungsi Kosongkan Seluruh Keranjang
  const clearCart = () => {
    setCart([]);
  };

  // Fungsi Toggle Varian Goreng di Keranjang
  const toggleFried = (cartId) => {
    setCart(prevCart => prevCart.map(item => {
      if (item.cartId === cartId) {
        const newFried = !item.fried;
        const newCartId = `${item.id}-${newFried ? 'fried' : 'normal'}-${item.note || ''}`;
        return { ...item, fried: newFried, cartId: newCartId };
      }
      return item;
    }));
  };

  // Fungsi Update Catatan Spesifik per Item di Keranjang
  const updateItemNote = (cartId, newNote) => {
    setCart(prevCart => prevCart.map(item => {
      if (item.cartId === cartId) {
        const newCartId = `${item.id}-${item.fried ? 'fried' : 'normal'}-${newNote || ''}`;
        return { ...item, note: newNote, cartId: newCartId };
      }
      return item;
    }));
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f6f0] via-[#f2eee3] to-[#e6dfd1] text-stone-800 font-sans pb-24 selection:bg-[#4b5d2d] selection:text-white">
      {/* Navbar */}
      <Navbar 
        restaurantName={restaurantName} 
        viewMode={viewMode} 
        setViewMode={setViewMode} 
        isAdminLoggedIn={isAdminLoggedIn}
        setIsAdminLoggedIn={setIsAdminLoggedIn}
      />

      <main className="max-w-4xl mx-auto px-4 py-3 transition-all duration-500">
        {viewMode === 'customer' ? (
          <BookMenu 
            restaurantName={restaurantName}
            menu={menu} 
            cart={cart}
            addToCart={addToCart} 
            formatRupiah={formatRupiah} 
          />
        ) : (
          <AdminPanel 
            restaurantName={restaurantName} 
            setRestaurantName={setRestaurantName} 
            menu={menu} 
            setMenu={setMenu} 
            formatRupiah={formatRupiah} 
          />
        )}
      </main>

      {/* Floating Cart */}
      {viewMode === 'customer' && (
        <FloatingCart 
          cart={cart} 
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          toggleFried={toggleFried}
          updateItemNote={updateItemNote}
          setCart={setCart} 
          formatRupiah={formatRupiah} 
          restaurantName={restaurantName}
        />
      )}
    </div>
  );
}