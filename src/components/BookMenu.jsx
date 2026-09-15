import React, { useRef, useEffect, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Plus, Check, Store, UtensilsCrossed, AlertCircle, ChefHat, Soup } from 'lucide-react';

const Page = React.forwardRef((props, ref) => {
  return (
    <div 
      className="demo-page bg-[#fcfbf9] text-stone-800 h-full pt-4 pb-4 pl-4 pr-3 sm:pt-6 sm:pb-6 sm:pl-6 sm:pr-4 shadow-[inset_-8px_0_15px_-5px_rgba(0,0,0,0.05)] flex flex-col justify-between relative overflow-hidden border-r border-stone-200 cursor-grab active:cursor-grabbing" 
      ref={ref}
    >
      {/* Watermark Sketsa Koki di Halaman Isi */}
      <div 
        className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-[0.05] pointer-events-none z-0"
        style={{ backgroundImage: `url('/Chef girl.png')` }}
      />

      <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-stone-200/30 to-transparent pointer-events-none z-10" />
      <div className="relative z-10 h-full flex flex-col justify-between">
        {props.children}
      </div>
    </div>
  );
});

// Komponen Cover Depan yang Mewah
const CoverPage = React.forwardRef((props, ref) => {
  return (
    <div 
      className="demo-page bg-gradient-to-br from-[#414f26] via-[#2f3b1b] to-[#1d2510] text-white h-full p-6 sm:p-8 shadow-[inset_-12px_0_20px_-5px_rgba(0,0,0,0.5)] flex flex-col justify-between relative overflow-hidden border-4 border-[#61773a]/30 rounded-r-2xl cursor-grab active:cursor-grabbing" 
      ref={ref}
    >
      <div 
        className="absolute inset-0 bg-top bg-no-repeat bg-cover opacity-[0.12] mix-blend-luminosity pointer-events-none z-0 scale-105"
        style={{ backgroundImage: `url('/Chef girl.png')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1d2510] via-[#2f3b1b]/70 to-transparent pointer-events-none z-0" />

      {/* Bingkai Klasik Mewah */}
      <div className="absolute inset-3 border border-[#859d58]/30 rounded-xl pointer-events-none z-10 flex flex-col justify-between p-2">
        <div className="flex justify-between text-[#859d58]/50 text-[10px]"><span>❖</span><span>❖</span></div>
        <div className="flex justify-between text-[#859d58]/50 text-[10px]"><span>❖</span><span>❖</span></div>
      </div>

      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/40 to-transparent pointer-events-none z-20" />
      
      <div className="relative z-20 h-full flex flex-col justify-between items-center text-center py-4">
        <div className="space-y-1">
          <span className="text-[9px] uppercase tracking-[0.35em] text-[#d4dfc7] font-semibold px-4 py-1 rounded-full border border-[#61773a]/50 bg-[#273016]/80 shadow-xs">
            Edisi Spesial
          </span>
        </div>

        <div className="my-auto flex flex-col items-center w-full px-2">
          <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 shadow-lg border border-white/20">
            <Store className="w-7 h-7 text-[#d4dfc7]" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4dfc7] font-bold mb-1 opacity-90 font-mono">
            DAFTAR MENU
          </span>
          <h1 className="font-serif font-bold text-xl sm:text-2xl text-white tracking-wide mb-2 drop-shadow-md">
            {props.restaurantName}
          </h1>
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#859d58] to-transparent my-2"></div>
          <p className="font-serif italic text-[#d4dfc7] text-xs opacity-90">
            Sajian Lezat Khas Rumahan
          </p>
        </div>

        <p className="text-[10px] text-[#d4dfc7]/80 font-mono tracking-widest uppercase">
          Geser untuk mulai memesan ➔
        </p>
      </div>
    </div>
  );
});

// Komponen Cover Belakang Berisi Ucapan Terima Kasih & Tombol Tutup Buku
const BackCoverPage = React.forwardRef((props, ref) => {
  return (
    <div 
      className="demo-page bg-gradient-to-br from-[#414f26] via-[#2f3b1b] to-[#1d2510] text-white h-full p-6 sm:p-8 shadow-[inset_-12px_0_20px_-5px_rgba(0,0,0,0.5)] flex flex-col justify-between relative overflow-hidden border-4 border-[#61773a]/30 rounded-r-2xl cursor-grab active:cursor-grabbing" 
      ref={ref}
    >
      <div 
        className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-[0.12] mix-blend-luminosity pointer-events-none z-0"
        style={{ backgroundImage: `url('/Chef girl.png')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1d2510] via-[#2f3b1b]/70 to-transparent pointer-events-none z-0" />

      {/* Bingkai Klasik Mewah */}
      <div className="absolute inset-3 border border-[#859d58]/30 rounded-xl pointer-events-none z-10 flex flex-col justify-between p-2">
        <div className="flex justify-between text-[#859d58]/50 text-[10px]"><span>❖</span><span>❖</span></div>
        <div className="flex justify-between text-[#859d58]/50 text-[10px]"><span>❖</span><span>❖</span></div>
      </div>

      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/40 to-transparent pointer-events-none z-20" />

      <div className="relative z-20 h-full flex flex-col justify-between items-center text-center py-4">
        <div className="my-auto flex flex-col items-center w-full px-4">
          <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-3 shadow-md border border-white/20">
            <UtensilsCrossed className="w-6 h-6 text-[#d4dfc7]" />
          </div>
          <h3 className="font-serif font-bold text-lg sm:text-xl text-white tracking-wide mb-2">TERIMA KASIH</h3>
          <p className="font-serif italic text-[#d4dfc7] text-[11px] sm:text-xs max-w-xs mb-4 opacity-90">
            "Sampai jumpa kembali di kunjungan berikutnya!"
          </p>
          <div className="w-12 h-[2px] bg-[#859d58] rounded-full mb-6"></div>
          
          {/* Tombol Tutup Buku Menu */}
          <div 
            onClick={props.onStopPropagation}
            onDoubleClick={props.onStopPropagation}
            onMouseDown={props.onStopPropagation}
            onMouseUp={props.onMouseUp}
            onTouchStart={props.onStopPropagation}
            onTouchEnd={props.onStopPropagation}
            className="w-full flex justify-center"
          >
            <button
              onClick={props.onWindyClose}
              disabled={props.isWindyClosing}
              className="px-5 py-2.5 bg-[#61773a] hover:bg-[#526531] text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg border border-[#7a954a] transition-all active:scale-95 cursor-pointer w-full max-w-[220px]"
            >
              <span>{props.isWindyClosing ? 'Menutup...' : 'Tutup Buku Menu'}</span>
            </button>
          </div>
        </div>

        <p className="text-[9px] sm:text-[10px] text-[#d4dfc7]/80 font-mono uppercase tracking-wider">
          &copy; 2026 {props.restaurantName}
        </p>
      </div>
    </div>
  );
});

export default function BookMenu({ restaurantName, menu, addToCart, formatRupiah, cart = [] }) {
  const bookRef = useRef();
  const categories = [...new Set(menu.map(item => item.category))];

  const [isWindyClosing, setIsWindyClosing] = useState(false);

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

  const handleWindyClose = (e) => {
    e.stopPropagation();
    if (e.nativeEvent && e.nativeEvent.stopImmediatePropagation) {
      e.nativeEvent.stopImmediatePropagation();
    }

    const flip = bookRef.current?.pageFlip();
    if (!flip || isWindyClosing) return;

    setIsWindyClosing(true);

    const windInterval = setInterval(() => {
      const currentPage = flip.getCurrentPageIndex();
      if (currentPage > 0) {
        flip.flipPrev();
      } else {
        clearInterval(windInterval);
        setIsWindyClosing(false);
      }
    }, 200);
  };

  const handlePageFlip = (e) => {
    const pageIndex = e.data;
    const flip = bookRef.current?.pageFlip();
    if (!flip || isWindyClosing) return;

    const totalPagesCount = flip.getPageCount();
    if (pageIndex >= totalPagesCount - 1) {
      setTimeout(() => {
        flip.turn(0);
      }, 600);
    }
  };

  const stopEventPropagation = (e) => {
    e.stopPropagation();
    if (e.nativeEvent && e.nativeEvent.stopImmediatePropagation) {
      e.nativeEvent.stopImmediatePropagation();
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-[75vh] pt-2 pb-16 px-2 select-none bg-[#f4f1ea] rounded-3xl my-2 shadow-sm border border-[#e2dcd0] overflow-x-hidden">
      <div className="relative flex items-center justify-center w-full max-w-4xl">
        
        {/* Ring Binder */}
        {!pageSize.isMobile && (
          <div className="absolute left-1/2 -translate-x-1/2 top-3 bottom-3 w-9 flex flex-col justify-between items-center z-50 pointer-events-none hidden md:flex">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-7 h-5 bg-gradient-to-r from-stone-400 via-stone-100 to-stone-500 rounded-full shadow-[0_4px_8px_rgba(0,0,0,0.2)] border border-stone-500"></div>
            ))}
          </div>
        )}

        <div className="relative shadow-[0_20px_50px_rgba(75,93,45,0.2)] rounded-2xl overflow-hidden bg-[#3a4822] p-[3px] border border-[#4b5d2d] [transform:translateZ(0)] flex justify-center w-full">
          
          <HTMLFlipBook
            width={pageSize.width}
            height={pageSize.height}
            size="stretch"
            minWidth={260}
            maxWidth={450}
            minHeight={380}
            maxHeight={650}
            maxShadowOpacity={0.25}
            showCover={true}
            mobileScrollSupport={false}
            usePortrait={pageSize.isMobile}
            startPage={0}
            drawShadow={true}
            flippingTime={400}
            swipeDistance={50}
            clickEventForward={true}
            useMouseEvents={true}
            disableFlipByClick={false}
            showPageCorners={true}
            cornerAreaWidth={15}
            onFlip={handlePageFlip}
            ref={bookRef}
            className="shadow-2xl mx-auto"
          >
            {/* 1. Cover Depan */}
            <CoverPage number={1} restaurantName={restaurantName} />

            {/* 2. Selamat Datang */}
            <Page number={2}>
              <div className="flex flex-col h-full justify-center text-center px-3 pt-4">
                <div className="w-12 h-12 bg-[#eef2e6] rounded-2xl flex items-center justify-center mx-auto mb-3 text-[#4b5d2d] shadow-xs border border-[#d8d2c4]">
                  <UtensilsCrossed className="w-6 h-6" />
                </div>
                <h3 className="font-sans font-bold text-lg sm:text-xl text-stone-800 mb-2">Selamat Datang</h3>
                <p className="text-stone-600 text-[11px] sm:text-xs leading-relaxed mb-4 font-serif px-2">
                  Kami menyajikan hidangan terbaik yang diolah dengan bahan-bahan segar pilihan berkualitas tinggi untuk kepuasan Anda.
                </p>
                <div className="inline-block mx-auto text-[10px] text-[#4b5d2d] bg-[#eef2e6] px-3 py-1 rounded-full uppercase tracking-wider font-mono font-semibold border border-[#d8d2c4]">
                  Silakan geser halaman ➔
                </div>
              </div>
              <div className="text-right text-[9px] text-stone-400 font-mono pr-3">P. 2</div>
            </Page>

            {/* 3. Daftar Kategori Menu */}
            {categories.map((cat, index) => {
              const items = menu.filter(item => item.category === cat);
              const pageNum = index + 3;
              return (
                <Page key={index} number={pageNum}>
                  <div className="pt-1 flex flex-col h-full pr-2">
                    <div className="border-b border-[#d8d2c4] pb-2 mb-2 flex justify-between items-center bg-[#f4f1ea]/80 px-2.5 rounded-lg shrink-0">
                      <h3 className="font-sans font-bold text-base sm:text-lg text-[#3a4822] uppercase tracking-wide">{cat}</h3>
                      <span className="text-[10px] font-mono text-[#556b2f] bg-white px-2 py-0.5 rounded shadow-2xs border border-[#d8d2c4]">P. {pageNum}</span>
                    </div>

                    <div className="space-y-2.5 overflow-y-auto pr-3 flex-1 max-h-[390px]">
                      {items.length === 0 ? (
                        <p className="text-center py-8 text-stone-400 font-serif italic text-xs">Belum ada hidangan.</p>
                      ) : (
                        items.map((item) => {
                          const cartItem = cart.find(ci => ci.id === item.id);
                          const currentQtyInCart = cartItem ? cartItem.qty : 0;
                          
                          let maxStock = 99;
                          if (item.desc) {
                            const match = item.desc.match(/(?:stok|tersedia)\D*(\d+)/i);
                            if (match) maxStock = parseInt(match[1], 10);
                          }

                          const isOutOfStock = currentQtyInCart >= maxStock;
                          
                          return (
                            <div key={item.id} className="bg-white/95 backdrop-blur-xs p-3 rounded-xl border border-stone-200 flex flex-col justify-between shadow-2xs hover:shadow-sm transition-shadow space-y-2 cursor-default mr-2">
                              <div>
                                <div className="flex justify-between items-start gap-2">
                                  <h4 className="font-sans font-bold text-stone-900 text-xs sm:text-sm leading-snug">{item.name}</h4>
                                  <span className="font-bold text-[#4b5d2d] text-xs sm:text-sm whitespace-nowrap bg-[#eef2e6] px-2 py-0.5 rounded-md border border-[#d8d2c4]">
                                    {formatRupiah(item.price)}
                                  </span>
                                </div>
                                <p className="text-stone-500 text-[10px] sm:text-[11px] mt-0.5 line-clamp-2 leading-relaxed font-sans">{item.desc}</p>
                              </div>
                              
                              <div className="flex justify-between items-center pt-1 border-t border-stone-100">
                                <div className="flex items-center space-x-1 text-[10px] font-mono text-stone-600 bg-stone-50 px-2 py-0.5 rounded-md border border-stone-200">
                                  <AlertCircle className="w-3 h-3 text-[#4b5d2d]" />
                                  <span>Sisa: {Math.max(0, maxStock - currentQtyInCart)}</span>
                                </div>

                                <div 
                                  className="mr-1"
                                  onClick={stopEventPropagation}
                                  onDoubleClick={stopEventPropagation}
                                  onMouseDown={stopEventPropagation}
                                  onMouseUp={stopEventPropagation}
                                  onTouchStart={stopEventPropagation}
                                  onTouchEnd={stopEventPropagation}
                                >
                                  <button
                                    onClick={(e) => {
                                      stopEventPropagation(e);
                                      e.preventDefault();
                                      if (!isOutOfStock) addToCart(item);
                                    }}
                                    disabled={isOutOfStock}
                                    className={`px-3.5 py-1.5 rounded-xl text-[10px] sm:text-xs font-semibold flex items-center space-x-1.5 transition-all duration-300 shadow-sm cursor-pointer ${
                                      isOutOfStock 
                                        ? "bg-stone-100 text-stone-400 cursor-not-allowed border border-stone-200" 
                                        : cartItem 
                                          ? "bg-gradient-to-r from-[#5f7935] to-[#4b5d2d] hover:from-[#52682e] hover:to-[#3d4c24] text-white shadow-md border border-[#72923f]/50 scale-102" 
                                          : "bg-[#4b5d2d] hover:bg-[#3a4822] text-white active:scale-95 border border-[#5f7935]/40"
                                    }`}
                                  >
                                    {isOutOfStock ? (
                                      <span>Habis</span>
                                    ) : cartItem ? (
                                      <>
                                        <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
                                          <Check className="w-3 h-3 text-[#d4dfc7]" />
                                        </div>
                                        <span className="tracking-wide">Dipilih ({cartItem.qty})</span>
                                      </>
                                    ) : (
                                      <>
                                        <Plus className="w-3 h-3 text-white" />
                                        <span className="tracking-wide">Pilih</span>
                                      </>
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  <div className="text-center text-[9px] sm:text-[10px] text-stone-400 font-mono tracking-wider uppercase pt-2 border-t border-stone-200 shrink-0 pr-3">
                    {restaurantName}
                  </div>
                </Page>
              );
            })}

            {/* 4. Halaman Penyeimbang 1 */}
            <Page number={categories.length + 3}>
              <div className="flex flex-col h-full justify-between py-6 px-4 text-center relative">
                <div className="my-auto space-y-3 z-10 bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-stone-100 shadow-xs">
                  <div className="w-12 h-12 bg-[#eef2e6] rounded-2xl flex items-center justify-center mx-auto text-[#4b5d2d] shadow-xs border border-[#d8d2c4]">
                    <ChefHat className="w-6 h-6" />
                  </div>
                  <h4 className="font-sans font-bold text-stone-800 text-sm tracking-wider uppercase">Dapur & Kualitas</h4>
                  <div className="w-8 h-[2px] bg-[#61773a] mx-auto rounded-full"></div>
                  <p className="font-serif italic text-stone-600 text-xs sm:text-sm leading-relaxed px-2">
                    "Diracik langsung dari dapur hangat kami, memadukan resep otentik rumahan dengan standar kebersihan dan higienitas tinggi."
                  </p>
                </div>

                <div className="flex justify-between items-center text-[9px] text-stone-400 font-mono pt-2 border-t border-stone-100 z-10 pr-3">
                  <span>{restaurantName}</span>
                  <span>P. {categories.length + 3}</span>
                </div>
              </div>
            </Page>

            {/* Halaman Penyeimbang 2 */}
            <Page number={categories.length + 4}>
              <div className="flex flex-col h-full justify-between py-6 px-4 text-center relative">
                <div className="my-auto space-y-3 z-10 bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-stone-100 shadow-xs">
                  <div className="w-12 h-12 bg-[#eef2e6] rounded-2xl flex items-center justify-center mx-auto text-[#4b5d2d] shadow-xs border border-[#d8d2c4]">
                    <Soup className="w-6 h-6" />
                  </div>
                  <h4 className="font-sans font-bold text-stone-800 text-sm tracking-wider uppercase">Cita Rasa Istimewa</h4>
                  <div className="w-8 h-[2px] bg-[#61773a] mx-auto rounded-full"></div>
                  <p className="font-serif italic text-stone-600 text-xs sm:text-sm leading-relaxed px-2">
                    "Setiap sajian menceritakan kehangatan keluarga. Terima kasih telah menjadikan kami bagian dari momen bersantap Anda."
                  </p>
                </div>

                <div className="flex justify-between items-center text-[9px] text-stone-400 font-mono pt-2 border-t border-stone-100 z-10 pr-3">
                  <span>Catatan</span>
                  <span>P. {categories.length + 4}</span>
                </div>
              </div>
            </Page>

            {/* 5. Cover Belakang */}
            <BackCoverPage 
              number={categories.length + 5} 
              restaurantName={restaurantName} 
              onWindyClose={handleWindyClose} 
              isWindyClosing={isWindyClosing}
              onStopPropagation={stopEventPropagation}
            />

          </HTMLFlipBook>
        </div>

      </div>
    </div>
  );
}