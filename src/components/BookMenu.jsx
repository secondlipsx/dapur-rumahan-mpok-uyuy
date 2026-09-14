import React, { useRef, useEffect, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Plus, Check, Store, UtensilsCrossed } from 'lucide-react';

const Page = React.forwardRef((props, ref) => {
  const isEven = props.number % 2 === 0;
  return (
    <div 
      className="demo-page bg-amber-50/95 text-stone-800 h-full p-4 sm:p-6 shadow-xl flex flex-col justify-between relative overflow-hidden border-r border-amber-200/60" 
      ref={ref}
    >
      <div className={`absolute inset-y-0 ${isEven ? 'right-0 w-12 bg-gradient-to-l from-amber-200/40 to-transparent' : 'left-0 w-12 bg-gradient-to-r from-amber-200/40 to-transparent'} pointer-events-none z-10`} />
      <div className="relative z-0 h-full flex flex-col justify-between">
        {props.children}
      </div>
    </div>
  );
});

const CoverPage = React.forwardRef((props, ref) => {
  const isEven = props.number % 2 === 0;
  return (
    <div 
      className="demo-page bg-gradient-to-br from-amber-600 to-orange-700 text-white h-full p-5 sm:p-8 shadow-xl flex flex-col justify-between relative overflow-hidden border-2 border-amber-500/50" 
      ref={ref}
    >
      <div className={`absolute inset-y-0 ${isEven ? 'right-0 w-12 bg-gradient-to-l from-black/30 to-transparent' : 'left-0 w-12 bg-gradient-to-r from-black/30 to-transparent'} pointer-events-none z-10`} />
      <div className="relative z-10 h-full flex flex-col justify-between items-center text-center py-4">
        {props.children}
      </div>
    </div>
  );
});

export default function BookMenu({ restaurantName, menu, addToCart, formatRupiah, cart = [] }) {
  const bookRef = useRef();
  const categories = [...new Set(menu.map(item => item.category))];
  
  const [pageSize, setPageSize] = useState({
    width: window.innerWidth < 768 ? 320 : 380,
    height: window.innerWidth < 768 ? 480 : 540,
    isMobile: window.innerWidth < 768
  });

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setPageSize({
        width: mobile ? Math.min(window.innerWidth - 40, 340) : 380,
        height: mobile ? 480 : 540,
        isMobile: mobile
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-[75vh] pt-1 pb-16 px-2 select-none bg-transparent overflow-x-hidden">
      <div className="relative flex items-center justify-center w-full max-w-4xl">
        
        {/* Ring Binder (Hanya Desktop/Tablet) */}
        {!pageSize.isMobile && (
          <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-8 flex flex-col justify-between items-center z-50 pointer-events-none hidden md:flex">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-6 h-4 bg-gradient-to-r from-stone-300 via-stone-100 to-stone-400 rounded-full shadow-[0_4px_8px_rgba(0,0,0,0.3)] border border-stone-400"></div>
            ))}
          </div>
        )}

        <div className="relative shadow-[0_20px_50px_rgba(245,158,11,0.2)] rounded-lg overflow-hidden bg-amber-100 [transform:translateZ(0)] flex justify-center w-full">
          <HTMLFlipBook
            width={pageSize.width}
            height={pageSize.height}
            size="stretch"
            minWidth={260}
            maxWidth={450}
            minHeight={380}
            maxHeight={650}
            maxShadowOpacity={0.3}
            showCover={false}
            mobileScrollSupport={false}
            usePortrait={pageSize.isMobile}
            startPage={0}
            drawShadow={true}
            flippingTime={800}
            swipeDistance={30}
            clickEventForward={false}
            useMouseEvents={true}
            disableFlipByClick={true}
            showPageCorners={false}
            ref={bookRef}
            className="shadow-2xl mx-auto"
          >
            {/* 1. Cover Depan */}
            <CoverPage number={1}>
              <span className="text-[9px] uppercase tracking-[0.3em] text-amber-100 font-bold px-2.5 py-1 rounded-full border border-amber-400/50 bg-amber-800/30">
                Menu Spesial
              </span>
              <div className="my-auto flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 shadow-inner border border-amber-300/40">
                  <Store className="w-8 h-8 sm:w-10 sm:h-10 text-amber-200" />
                </div>
                <h1 className="font-sans font-black text-xl sm:text-2xl text-white tracking-widest mb-2 px-2 drop-shadow">{restaurantName}</h1>
                <div className="w-10 h-[2px] bg-amber-300 my-2"></div>
                <p className="font-serif italic text-amber-100 text-[11px] tracking-wider">
                  Sajian Lezat Khas Rumahan
                </p>
              </div>
              <p className="text-[10px] text-amber-200 font-mono tracking-widest uppercase">
                Geser untuk mulai memesan
              </p>
            </CoverPage>

            {/* 2. Selamat Datang */}
            <Page number={2}>
              <div className="flex flex-col h-full justify-center text-center px-2 pt-4">
                <UtensilsCrossed className="w-7 h-7 sm:w-8 sm:h-8 text-amber-600 mx-auto mb-3 opacity-90" />
                <h3 className="font-sans font-bold text-lg sm:text-xl text-stone-900 mb-2 tracking-wide">Selamat Datang</h3>
                <p className="text-stone-600 text-[11px] sm:text-xs leading-relaxed mb-3 font-serif">
                  Kami menyajikan hidangan terbaik yang diolah dengan bahan-bahan segar pilihan berkualitas tinggi untuk kepuasan Anda.
                </p>
                <div className="text-[9px] sm:text-[10px] text-amber-700 uppercase tracking-widest font-mono font-semibold">
                  Silakan geser halaman
                </div>
              </div>
              <div className="text-right text-[9px] text-stone-400 font-mono">P. 2</div>
            </Page>

            {/* 3. Daftar Kategori Menu */}
            {categories.map((cat, index) => {
              const items = menu.filter(item => item.category === cat);
              const pageNum = index + 3;
              return (
                <Page key={index} number={pageNum}>
                  <div className="pt-4">
                    <div className="border-b border-amber-200 pb-2 mb-2 flex justify-between items-center">
                      <h3 className="font-sans font-black text-base sm:text-lg text-amber-800 tracking-wider uppercase">{cat}</h3>
                      <span className="text-[9px] sm:text-[10px] font-mono text-stone-400">P. {pageNum}</span>
                    </div>

                    <div className="space-y-2.5 max-h-[330px] sm:max-h-[390px] overflow-y-auto pr-1">
                      {items.length === 0 ? (
                        <p className="text-center py-8 text-stone-400 font-serif italic text-xs">Belum ada hidangan.</p>
                      ) : (
                        items.map((item) => {
                          const isInCart = cart.some(cartItem => cartItem.id === item.id);
                          
                          return (
                            <div key={item.id} className="bg-white/90 backdrop-blur-sm p-3 rounded-xl border border-amber-200/70 flex flex-col justify-between shadow-sm space-y-2">
                              <div>
                                <div className="flex justify-between items-start">
                                  <h4 className="font-sans font-bold text-stone-900 text-xs sm:text-sm tracking-wide">{item.name}</h4>
                                  <span className="font-bold text-orange-600 text-xs sm:text-sm">
                                    {formatRupiah(item.price)}
                                  </span>
                                </div>
                                <p className="text-stone-600 text-[10px] sm:text-[11px] mt-1 line-clamp-2">{item.desc}</p>
                              </div>
                              
                              {/* Tombol Ringkas di Kanan Bawah Card */}
                              <div className="flex justify-end pt-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    addToCart(item);
                                  }}
                                  className={`px-3.5 py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold flex items-center space-x-1.5 transition-all duration-300 ease-out active:scale-95 shadow-sm ${
                                    isInCart 
                                      ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                                      : "bg-amber-500 hover:bg-amber-600 text-white"
                                  }`}
                                >
                                  {isInCart ? (
                                    <>
                                      <Check className="w-3.5 h-3.5 text-white" />
                                      <span>Dipilih</span>
                                    </>
                                  ) : (
                                    <>
                                      <Plus className="w-3.5 h-3.5 text-white" />
                                      <span>Pilih</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  <div className="text-center text-[9px] sm:text-[10px] text-stone-400 font-mono tracking-widest uppercase pt-2 border-t border-amber-200/60">
                    {restaurantName}
                  </div>
                </Page>
              );
            })}

            {/* 4. Halaman Penyeimbang */}
            <Page number={categories.length + 3}>
              <div className="flex flex-col h-full justify-center text-center px-2 pt-4">
                <p className="font-serif italic text-stone-500 text-xs sm:text-sm">
                  "Terima kasih telah mempercayakan pengalaman kuliner Anda kepada kami."
                </p>
              </div>
              <div className="text-right text-[9px] text-stone-400 font-mono">Note</div>
            </Page>

            {/* 5. Cover Belakang */}
            <CoverPage number={categories.length + 4}>
              <div className="my-auto flex flex-col items-center">
                <h3 className="font-sans font-bold text-lg sm:text-xl text-white tracking-widest mb-2">TERIMA KASIH</h3>
                <p className="font-serif italic text-amber-100 text-[11px] sm:text-xs max-w-xs mb-3">
                  "Selamat menikmati hidangan, semoga hari Anda menyenangkan."
                </p>
                <div className="w-8 h-[1px] bg-amber-300 my-2"></div>
              </div>
              <p className="text-[9px] sm:text-[10px] text-amber-200 font-mono uppercase tracking-widest">
                &copy; 2026 {restaurantName}
              </p>
            </CoverPage>

          </HTMLFlipBook>
        </div>
      </div>
    </div>
  );
}