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

  const addToCart = (item) => {
    setCart(prevCart => {
      // Cek apakah item dengan ID, varian (fried), dan catatan (note) yang sama sudah ada di keranjang
      const existingIndex = prevCart.findIndex(
        cartItem => cartItem.id === item.id && cartItem.fried === item.fried && cartItem.note === item.note
      );

      if (existingIndex > -1) {
        return prevCart.map((cartItem, idx) => 
          idx === existingIndex ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem
        );
      }
      return [...prevCart, { ...item, qty: 1 }];
    });
  };

  const updateCartQty = (id, delta) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === id) {
          const newQty = item.qty + delta;
          return newQty > 0 ? { ...item, qty: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f6f0] via-[#f2eee3] to-[#e6dfd1] text-stone-800 font-sans pb-24 selection:bg-[#4b5d2d] selection:text-white">
      {/* Navbar menerima restaurantName terbaru */}
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

      {viewMode === 'customer' && (
        <FloatingCart 
          cart={cart} 
          updateCartQty={updateCartQty} 
          setCart={setCart} 
          formatRupiah={formatRupiah} 
          restaurantName={restaurantName}
        />
      )}
    </div>
  );
}