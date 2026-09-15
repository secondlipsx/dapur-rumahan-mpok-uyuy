import React, { useRef, useEffect, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Plus, Check, Store, UtensilsCrossed, AlertCircle, ChefHat, Soup } from 'lucide-react';

const Page = React.forwardRef((props, ref) => {
  return (
    <div 
      className="demo-page bg-[#fcfbf9] text-stone-900 h-full pt-5 pb-5 pl-5 pr-4 sm:pt-7 sm:pb-7 sm:pl-7 sm:pr-5 shadow-[inset_-10px_0_20px_-5px_rgba(0,0,0,0.06)] flex flex-col justify-between relative overflow-hidden border-r border-[#e2dcd0] cursor-default" 
      ref={ref}
    >
      {/* Watermark Sketsa Koki di Halaman Isi */}
      <div 
        className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-[0.03] pointer-events-none z-0"
        style={{ backgroundImage: `url('/Chef girl.png')` }}
      />

      <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-stone-300/20 to-transparent pointer-events-none z-10" />
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
      className="demo-page bg-gradient-to-br from-[#3a4822] via-[#273016] to-[#151c0b] text-white h-full p-6 sm:p-8 shadow-[inset_-12px_0_25px_-5px_rgba(0,0,0,0.6)] flex flex-col justify-between relative overflow-hidden border-4 border-[#61773a]/40 rounded-r-2xl cursor-default" 
      ref={ref}
    >
      <div 
        className="absolute inset-0 bg-top bg-no-repeat bg-cover opacity-[0.15] mix-blend-luminosity pointer-events-none z-0 scale-105"
        style={{ backgroundImage: `url('/Chef girl.png')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#151c0b] via-[#273016]/80 to-transparent pointer-events-none z-0" />

      {/* Bingkai Klasik Mewah */}
      <div className="absolute inset-3.5 border border-[#859d58]/40 rounded-xl pointer-events-none z-10 flex flex-col justify-between p-2">
        <div className="flex justify-between text-[#859d58]/60 text-xs"><span>✦</span><span>✦</span></div>
        <div className="flex justify-between text-[#859d58]/60 text-xs"><span>✦</span><span>✦</span></div>
      </div>

      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/50 to-transparent pointer-events-none z-20" />
      
      <div className="relative z-20 h-full flex flex-col justify-between items-center text-center py-6">
        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#d4dfc7] font-serif px-5 py-1.5 rounded-full border border-[#61773a]/60 bg-[#273016]/90 shadow-sm">
            BUKU MENU
          </span>
        </div>

        <div className="my-auto flex flex-col items-center w-full px-2">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-5 shadow-xl border border-white/20">
            <Store className="w-8 h-8 text-[#d4dfc7]" />
          </div>
          <span className="text-[11px] uppercase tracking-[0.35em] text-[#d4dfc7] font-serif mb-2 opacity-90">
            DAFTAR HIDANGAN
          </span>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-white tracking-wide mb-3 drop-shadow-md">
            {props.restaurantName}
          </h1>
          <div className="w-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#859d58] to-transparent my-2"></div>
          <p className="font-serif italic text-[#d4dfc7] text-sm opacity-90">
            Sajian Mahakarya Cita Rasa Rumahan
          </p>
        </div>

        <p className="text-[10px] text-[#d4dfc7]/80 font-mono tracking-[0.2em] uppercase">
          Sentuh Pojok Buku untuk Membuka ➔
        </p>
      </div>
    </div>
  );
});

// Komponen Cover Belakang Berisi Ucapan Terima Kasih & Tombol Tutup Buku
const BackCoverPage = React.forwardRef((props, ref) => {
  return (
    <div 
      className="demo-page bg-gradient-to-br from-[#3a4822] via-[#273016] to-[#151c0b] text-white h-full p-6 sm:p-8 shadow-[inset_-12px_0_25px_-5px_rgba(0,0,0,0.6)] flex flex-col justify-between relative overflow-hidden border-4 border-[#61773a]/40 rounded-r-2xl cursor-default" 
      ref={ref}
    >
      <div 
        className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-[0.15] mix-blend-luminosity pointer-events-none z-0"
        style={{ backgroundImage: `url('/Chef girl.png')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#151c0b] via-[#273016]/80 to-transparent pointer-events-none z-0" />

      {/* Bingkai Klasik Mewah */}
      <div className="absolute inset-3.5 border border-[#859d58]/40 rounded-xl pointer-events-none z-10 flex flex-col justify-between p-2">
        <div className="flex justify-between text-[#859d58]/60 text-xs"><span>✦</span><span>✦</span></div>
        <div className="flex justify-between text-[#859d58]/60 text-xs"><span>✦</span><span>✦</span></div>
      </div>

      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/50 to-transparent pointer-events-none z-20" />

      <div className="relative z-20 h-full flex flex-col justify-between items-center text-center py-6">
        <div className="my-auto flex flex-col items-center w-full px-4">
          <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 shadow-xl border border-white/20">
            <UtensilsCrossed className="w-7 h-7 text-[#d4dfc7]" />
          </div>
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-white tracking-wide mb-2">TERIMA KASIH</h3>
          <p className="font-serif italic text-[#d4dfc7] text-xs sm:text-sm max-w-xs mb-5 opacity-90 leading-relaxed">
            "Suatu kehormatan bagi kami dapat menyajikan hidangan terbaik untuk Anda. Sampai jumpa kembali!"
          </p>
          <div className="w-16 h-[1.5px] bg-[#859d58] rounded-full mb-6"></div>
          
          {/* Tombol Tutup Buku Menu */}
          <div className="w-full flex justify-center">
            <button
              onClick={props.onWindyClose}
              disabled={props.isWindyClosing}
              className="px-6 py-3 bg-[#61773a] hover:bg-[#526531] text-white rounded-xl text-xs font-bold uppercase tracking-[0.2em] shadow-xl border border-[#7a954a] transition-all active:scale-95 cursor-pointer w-full max-w-[240px] font-serif"
            >
              <span>{props.isWindyClosing ? 'Menutup Buku...' : 'Tutup Buku Menu'}</span>
            </button>
          </div>
        </div>

        <p className="text-[10px] text-[#d4dfc7]/80 font-mono tracking-[0.25em] uppercase">
          &copy; 2026 {props.restaurantName}
        </p>
      </div>
    </div>
  );
});

export default function BookMenu({ restaurantName, menu, addToCart, formatRupiah, cart = [] }) {
  const bookRef = useRef();

  const ITEMS_PER_PAGE = 3;
  const menuPages = [];
  for (let i = 0; i < menu.length; i += ITEMS_PER_PAGE) {
    menuPages.push(menu.slice(i, i + ITEMS_PER_PAGE));
  }

  const [isWindyClosing, setIsWindyClosing] = useState(false);

  const [pageSize, setPageSize] = useState({
    width: window.innerWidth < 768 ? 320 : 390,
    height: window.innerWidth < 768 ? 530 : 610,
    isMobile: window.innerWidth < 768
  });

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setPageSize({
        width: mobile ? Math.min(window.innerWidth - 40, 340) : 390,
        height: mobile ? 530 : 610,
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

        <div className="relative shadow-[0_20px_50px_rgba(75,93,45,0.25)] rounded-2xl overflow-hidden bg-[#3a4822] p-[3px] border border-[#4b5d2d] [transform:translateZ(0)] flex justify-center w-full">
          
          <HTMLFlipBook
            width={pageSize.width}
            height={pageSize.height}
            size="stretch"
            minWidth={260}
            maxWidth={450}
            minHeight={400}
            maxHeight={700}
            maxShadowOpacity={0.25}
            showCover={true}
            mobileScrollSupport={false}
            usePortrait={pageSize.isMobile}
            startPage={0}
            drawShadow={true}
            flippingTime={250}
            swipeDistance={50}
            clickEventForward={false}
            useMouseEvents={true}
            disableFlipByClick={true}
            showPageCorners={true}
            cornerAreaWidth={40}
            onFlip={handlePageFlip}
            ref={bookRef}
            className="shadow-2xl mx-auto"
          >
            {/* 1. Cover Depan */}
            <CoverPage number={1} restaurantName={restaurantName} />

            {/* 2. Halaman Selamat Datang */}
            <Page number={2}>
              <div className="flex flex-col h-full justify-center text-center px-4 pt-4">
                <div className="w-16 h-16 bg-[#eef2e6] rounded-3xl flex items-center justify-center mx-auto mb-4 text-[#4b5d2d] shadow-md border border-[#d8d2c4]">
                  <UtensilsCrossed className="w-8 h-8" />
                </div>
                <h3 className="font-serif font-bold text-2xl text-stone-900 mb-3 tracking-wide">Selamat Datang</h3>
                <p className="font-serif italic text-stone-600 text-sm sm:text-base leading-relaxed mb-6 px-2">
                  "Menghadirkan kehangatan cita rasa rumahan dengan standar pelayanan terbaik untuk momen spesial Anda."
                </p>
                <div className="inline-block mx-auto text-xs text-[#4b5d2d] bg-[#eef2e6] px-5 py-2 rounded-full uppercase tracking-[0.2em] font-serif font-bold border border-[#d8d2c4] shadow-xs">
                  Sentuh Pojok Halaman ➔
                </div>
              </div>
              <div className="text-right text-xs text-stone-400 font-mono pr-3">H. 2</div>
            </Page>

            {/* 3. Lembaran Menu */}
            {menuPages.map((pageItems, index) => {
              const pageNum = index + 3;
              return (
                <Page key={index} number={pageNum}>
                  <div className="pt-1 flex flex-col h-full pr-1 justify-between pb-1">
                    <div>
                      {/* Header Halaman Menu Mewah */}
                      <div className="border-b border-[#d8d2c4] pb-2.5 mb-4 flex justify-between items-center bg-[#f4f1ea]/90 px-4 rounded-xl shrink-0 shadow-2xs">
                        <h3 className="font-serif font-bold text-sm sm:text-base text-[#3a4822] uppercase tracking-[0.15em]">
                          Katalog Hidangan
                        </h3>
                        <span className="text-[11px] font-mono text-[#556b2f] bg-white px-3 py-0.5 rounded-lg shadow-2xs border border-[#d8d2c4]">
                          H. {pageNum}
                        </span>
                      </div>

                      {/* Kontainer Kartu Menu */}
                      <div className="space-y-3.5">
                        {pageItems.map((item) => {
                          const cartItem = cart.find(ci => ci.id === item.id);
                          const currentQtyInCart = cartItem ? cartItem.qty : 0;
                          
                          let maxStock = 99;
                          if (item.desc) {
                            const match = item.desc.match(/(?:stok|tersedia)\D*(\d+)/i);
                            if (match) maxStock = parseInt(match[1], 10);
                          }

                          const isOutOfStock = currentQtyInCart >= maxStock;
                          
                          return (
                            <div key={item.id} className="bg-white/95 backdrop-blur-xs p-4 rounded-2xl border-2 border-[#dcd6c8] flex flex-col justify-between shadow-[0_4px_15px_rgba(0,0,0,0.04)] hover:shadow-md transition-all space-y-2.5 cursor-default mr-1">
                              <div>
                                <div className="flex justify-between items-start gap-2">
                                  <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base leading-snug tracking-wide">
                                    {item.name}
                                  </h4>
                                  <span className="font-mono font-extrabold text-[#4b5d2d] text-xs sm:text-sm whitespace-nowrap bg-[#eef2e6] px-3 py-1 rounded-xl border border-[#d8d2c4] shadow-2xs">
                                    {formatRupiah(item.price)}
                                  </span>
                                </div>
                                <p className="font-serif text-stone-600 text-xs sm:text-sm mt-1.5 line-clamp-2 leading-relaxed italic opacity-90">
                                  {item.desc}
                                </p>
                              </div>
                              
                              <div className="flex justify-between items-center pt-2 border-t border-stone-200/80">
                                <div className="flex items-center space-x-1.5 text-[11px] font-mono text-stone-700 bg-stone-100 px-2.5 py-1 rounded-xl border border-stone-200">
                                  <AlertCircle className="w-3.5 h-3.5 text-[#4b5d2d]" />
                                  <span>Tersedia: <strong className="text-stone-900">{Math.max(0, maxStock - currentQtyInCart)}</strong></span>
                                </div>

                                <div>
                                  <button
                                    onClick={() => {
                                      if (!isOutOfStock) addToCart(item);
                                    }}
                                    disabled={isOutOfStock}
                                    className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-serif font-bold flex items-center space-x-1.5 transition-all duration-300 shadow-sm cursor-pointer ${
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
                                        <Plus className="w-3.5 h-3.5 text-white" />
                                        <span className="tracking-wide">Pilih</span>
                                      </>
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Footer Halaman Menu */}
                    <div className="text-center text-[10px] text-stone-400 font-mono tracking-[0.2em] uppercase pt-3 border-t border-stone-200 shrink-0 mt-2">
                      {restaurantName}
                    </div>
                  </div>
                </Page>
              );
            })}

            {/* Halaman Penyeimbang 1 */}
            <Page number={menuPages.length + 3}>
              <div className="flex flex-col h-full justify-between py-8 px-4 text-center relative">
                <div className="my-auto space-y-4 z-10 bg-white/90 backdrop-blur-xs p-6 rounded-3xl border border-stone-200 shadow-sm">
                  <div className="w-14 h-14 bg-[#eef2e6] rounded-2xl flex items-center justify-center mx-auto text-[#4b5d2d] shadow-sm border border-[#d8d2c4]">
                    <ChefHat className="w-7 h-7" />
                  </div>
                  <h4 className="font-serif font-bold text-stone-900 text-lg tracking-wide uppercase">Filosofi Dapur</h4>
                  <div className="w-12 h-[1.5px] bg-[#61773a] mx-auto rounded-full"></div>
                  <p className="font-serif italic text-stone-700 text-xs sm:text-sm leading-relaxed px-2">
                    "Setiap menu diracik dengan penuh ketulusan, memadukan resep rahasia keluarga dan bahan-bahan premium pilihan."
                  </p>
                </div>

                <div className="flex justify-between items-center text-xs text-stone-400 font-mono pt-3 border-t border-stone-200 z-10 pr-2">
                  <span>{restaurantName}</span>
                  <span>H. {menuPages.length + 3}</span>
                </div>
              </div>
            </Page>

            {/* Halaman Penyeimbang 2 */}
            <Page number={menuPages.length + 4}>
              <div className="flex flex-col h-full justify-between py-8 px-4 text-center relative">
                <div className="my-auto space-y-4 z-10 bg-white/90 backdrop-blur-xs p-6 rounded-3xl border border-stone-200 shadow-sm">
                  <div className="w-14 h-14 bg-[#eef2e6] rounded-2xl flex items-center justify-center mx-auto text-[#4b5d2d] shadow-sm border border-[#d8d2c4]">
                    <Soup className="w-7 h-7" />
                  </div>
                  <h4 className="font-serif font-bold text-stone-900 text-lg tracking-wide uppercase">Cita Rasa Autentik</h4>
                  <div className="w-12 h-[1.5px] bg-[#61773a] mx-auto rounded-full"></div>
                  <p className="font-serif italic text-stone-700 text-xs sm:text-sm leading-relaxed px-2">
                    "Kepuasan Anda adalah kebanggaan kami. Nikmati kelezatan di setiap gigitan."
                  </p>
                </div>

                <div className="flex justify-between items-center text-xs text-stone-400 font-mono pt-3 border-t border-stone-200 z-10 pr-2">
                  <span>Catatan</span>
                  <span>H. {menuPages.length + 4}</span>
                </div>
              </div>
            </Page>

            {/* 4. Cover Belakang */}
            <BackCoverPage 
              number={menuPages.length + 5} 
              restaurantName={restaurantName} 
              onWindyClose={handleWindyClose} 
              isWindyClosing={isWindyClosing}
            />

          </HTMLFlipBook>
        </div>

      </div>
    </div>
  );
}