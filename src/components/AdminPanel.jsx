import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Save, X, Utensils, Store } from 'lucide-react';

export default function AdminPanel({ restaurantName, setRestaurantName, menu, setMenu, formatRupiah }) {
  const [tempRestoName, setTempRestoName] = useState(restaurantName);
  const [isEditingResto, setIsEditingResto] = useState(false);

  // State untuk form tambah menu baru
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newDesc, setNewDesc] = useState('');

  // State untuk edit menu
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editDesc, setEditDesc] = useState('');

  // Daftar kategori unik yang otomatis diambil dari data menu yang ada + tambahan opsi umum jika kosong
  const existingCategories = [...new Set(menu.map(item => item.category))];
  const defaultCategories = ['Makanan Utama', 'Minuman', 'Cemilan', 'Dessert'];
  const categoriesList = [...new Set([...defaultCategories, ...existingCategories])];

  // Simpan Nama Restoran
  const handleSaveRestoName = (e) => {
    e.preventDefault();
    if (tempRestoName.trim()) {
      setRestaurantName(tempRestoName);
      setIsEditingResto(false);
    }
  };

  // Tambah Menu Baru
  const handleAddMenu = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newPrice) return;

    // Gunakan kategori pilihan dropdown, jika kosong ambil kategori pertama
    const categoryToUse = newCategory || categoriesList[0];

    const newItem = {
      id: Date.now(),
      name: newName,
      category: categoryToUse,
      price: Number(newPrice),
      desc: newDesc || '-'
    };

    setMenu([...menu, newItem]);
    setNewName('');
    setNewCategory('');
    setNewPrice('');
    setNewDesc('');
  };

  // Hapus Menu
  const handleDeleteMenu = (id) => {
    if (window.confirm('Yakin ingin menghapus menu ini?')) {
      setMenu(menu.filter(item => item.id !== id));
    }
  };

  // Mulai Edit Menu
  const handleStartEdit = (item) => {
    setEditingId(item.id);
    setEditName(item.name);
    setEditCategory(item.category);
    setEditPrice(item.price);
    setEditDesc(item.desc);
  };

  // Simpan Edit Menu
  const handleSaveEdit = (id) => {
    setMenu(menu.map(item => {
      if (item.id === id) {
        return {
          ...item,
          name: editName,
          category: editCategory,
          price: Number(editPrice),
          desc: editDesc
        };
      }
      return item;
    }));
    setEditingId(null);
  };

  return (
    <div className="space-y-6 pt-2 pb-16">
      
      {/* Bagian Pengaturan Nama Restoran */}
      <div className="bg-stone-900 text-amber-50 p-5 rounded-2xl shadow-xl border border-amber-500/20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Store className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-sm tracking-wide">Pengaturan Nama Restoran</h3>
          </div>
          {!isEditingResto && (
            <button
              onClick={() => setIsEditingResto(true)}
              className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition"
            >
              Ubah Nama
            </button>
          )}
        </div>

        {isEditingResto ? (
          <form onSubmit={handleSaveRestoName} className="flex gap-2">
            <input
              type="text"
              value={tempRestoName}
              onChange={(e) => setTempRestoName(e.target.value)}
              className="flex-1 bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1"
            >
              <Save className="w-4 h-4" />
              <span>Simpan</span>
            </button>
            <button
              type="button"
              onClick={() => setIsEditingResto(false)}
              className="px-3 py-2 bg-stone-700 hover:bg-stone-600 text-white rounded-xl text-xs transition"
            >
              Batal
            </button>
          </form>
        ) : (
          <p className="text-amber-200/80 font-serif text-base">{restaurantName}</p>
        )}
      </div>

      {/* Bagian Tambah Menu Baru */}
      <div className="bg-stone-900 text-amber-50 p-5 rounded-2xl shadow-xl border border-amber-500/20">
        <div className="flex items-center space-x-2 mb-4">
          <Plus className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-sm tracking-wide">Tambah Menu Baru</h3>
        </div>

        <form onSubmit={handleAddMenu} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Nama Menu"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
            
            {/* Kategori Berupa Dropdown */}
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="" disabled>Pilih Kategori</option>
              {categoriesList.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Harga (angka saja)"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              className="bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          <textarea
            placeholder="Deskripsi singkat hidangan..."
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none h-16"
          ></textarea>

          <button
            type="submit"
            className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition shadow"
          >
            Tambahkan ke Menu Buku
          </button>
        </form>
      </div>

      {/* Daftar Menu Kelola */}
      <div className="bg-stone-900 text-amber-50 p-5 rounded-2xl shadow-xl border border-amber-500/20">
        <div className="flex items-center space-x-2 mb-4">
          <Utensils className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-sm tracking-wide">Daftar & Pengelolaan Menu ({menu.length} Item)</h3>
        </div>

        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
          {menu.map((item) => (
            <div key={item.id} className="bg-stone-800/80 p-3.5 rounded-xl border border-stone-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              
              {editingId === item.id ? (
                // Mode Edit Item
                <div className="w-full space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="bg-stone-900 border border-stone-600 rounded-lg px-2 py-1.5 text-xs text-white"
                    />
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      className="bg-stone-900 border border-stone-600 rounded-lg px-2 py-1.5 text-xs text-white"
                    >
                      {categoriesList.map((cat, idx) => (
                        <option key={idx} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      className="bg-stone-900 border border-stone-600 rounded-lg px-2 py-1.5 text-xs text-white"
                    />
                  </div>
                  <input
                    type="text"
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-600 rounded-lg px-2 py-1.5 text-xs text-white"
                  />
                  <div className="flex justify-end space-x-2 pt-1">
                    <button
                      onClick={() => handleSaveEdit(item.id)}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold"
                    >
                      Simpan
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-3 py-1 bg-stone-700 hover:bg-stone-600 text-white rounded-lg text-xs"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              ) : (
                // Mode Tampil Item Normal
                <>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-bold text-xs sm:text-sm text-white">{item.name}</h4>
                      <span className="bg-amber-900/60 text-amber-300 text-[10px] px-2 py-0.5 rounded-md font-mono border border-amber-700/50">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-stone-400 text-[11px] mt-0.5 line-clamp-1">{item.desc}</p>
                    <span className="text-orange-400 font-bold text-xs mt-1 block font-mono">
                      {formatRupiah(item.price)}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 self-end sm:self-center">
                    <button
                      onClick={() => handleStartEdit(item)}
                      className="p-1.5 bg-stone-700 hover:bg-amber-600 text-amber-200 hover:text-white rounded-lg transition"
                      title="Edit Menu"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteMenu(item.id)}
                      className="p-1.5 bg-stone-700 hover:bg-red-600 text-red-300 hover:text-white rounded-lg transition"
                      title="Hapus Menu"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </>
              )}

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}