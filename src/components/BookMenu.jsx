import React, { useRef, useEffect, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import {
  Plus,
  Check,
  Store,
  UtensilsCrossed,
  AlertCircle,
  ChefHat,
  Soup
} from 'lucide-react';


// ============================================================
// PAGE
// ============================================================

const Page = React.forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className="
        demo-page
        bg-[#fcfbf9]
        text-stone-900
        h-full
        p-3
        sm:p-4
        shadow-[inset_-10px_0_20px_-5px_rgba(0,0,0,0.06)]
        flex
        flex-col
        justify-between
        relative
        overflow-hidden
        border-r
        border-[#e2dcd0]
        cursor-default
      "
    >
      {/* Watermark */}
      <div
        className="
          absolute
          inset-0
          bg-center
          bg-no-repeat
          bg-contain
          opacity-[0.03]
          pointer-events-none
          z-0
        "
        style={{
          backgroundImage: `url('/Chef girl.png')`
        }}
      />

      {/* Shadow sisi halaman */}
      <div
        className="
          absolute
          inset-y-0
          right-0
          w-8
          bg-gradient-to-l
          from-stone-300/20
          to-transparent
          pointer-events-none
          z-10
        "
      />

      <div className="relative z-10 h-full flex flex-col justify-between pointer-events-auto">
        {props.children}
      </div>
    </div>
  );
});


// ============================================================
// COVER DEPAN
// ============================================================

const CoverPage = React.forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className="
        demo-page
        bg-gradient-to-br
        from-[#3a4822]
        via-[#273016]
        to-[#151c0b]
        text-white
        h-full
        p-4
        sm:p-6
        shadow-[inset_-12px_0_25px_-5px_rgba(0,0,0,0.6)]
        flex
        flex-col
        justify-between
        relative
        overflow-hidden
        border-4
        border-[#61773a]/40
        rounded-r-2xl
        cursor-default
      "
    >
      <div
        className="
          absolute
          inset-0
          bg-top
          bg-no-repeat
          bg-cover
          opacity-[0.15]
          mix-blend-luminosity
          pointer-events-none
          z-0
          scale-105
        "
        style={{
          backgroundImage: `url('/Chef girl.png')`
        }}
      />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-[#151c0b]
          via-[#273016]/80
          to-transparent
          pointer-events-none
          z-0
        "
      />

      <div
        className="
          absolute
          inset-3
          border
          border-[#859d58]/40
          rounded-xl
          pointer-events-none
          z-10
          flex
          flex-col
          justify-between
          p-2
        "
      >
        <div className="flex justify-between text-[#859d58]/60 text-xs">
          <span>✦</span>
          <span>✦</span>
        </div>
        <div className="flex justify-between text-[#859d58]/60 text-xs">
          <span>✦</span>
          <span>✦</span>
        </div>
      </div>

      <div
        className="
          relative
          z-20
          h-full
          flex
          flex-col
          justify-between
          items-center
          text-center
          py-3
          pointer-events-auto
        "
      >
        <div>
          <span
            className="
              text-[11px]
              uppercase
              tracking-[0.3em]
              text-[#d4dfc7]
              font-serif
              px-3.5
              py-1.5
              rounded-full
              border
              border-[#61773a]/60
              bg-[#273016]/90
              shadow-sm
              font-bold
            "
          >
            BUKU MENU
          </span>
        </div>

        <div className="my-auto flex flex-col items-center w-full px-2">
          <div
            className="
              w-14
              h-14
              bg-white/10
              backdrop-blur-md
              rounded-xl
              flex
              items-center
              justify-center
              mb-3
              shadow-xl
              border
              border-white/20
            "
          >
            <Store className="w-7 h-7 text-[#d4dfc7]" />
          </div>

          <span
            className="
              text-[11px]
              uppercase
              tracking-[0.3em]
              text-[#d4dfc7]
              font-serif
              mb-1.5
              opacity-90
              font-bold
            "
          >
            DAFTAR HIDANGAN
          </span>

          <h1
            className="
              font-serif
              font-bold
              text-xl
              sm:text-2xl
              text-white
              tracking-wide
              mb-2.5
              drop-shadow-md
            "
          >
            {props.restaurantName}
          </h1>

          <div
            className="
              w-14
              h-[1.5px]
              bg-gradient-to-r
              from-transparent
              via-[#859d58]
              to-transparent
              my-1.5
            "
          />

          <p
            className="
              font-serif
              italic
              text-[#d4dfc7]
              text-xs
              sm:text-sm
              opacity-90
            "
          >
            Sajian Mahakarya Cita Rasa Rumahan
          </p>
        </div>

        <p
          className="
            text-[10px]
            text-[#d4dfc7]/90
            font-mono
            tracking-[0.15em]
            uppercase
            font-bold
          "
        >
          Sentuh Pojok Buku untuk Membuka ➔
        </p>
      </div>
    </div>
  );
});


// ============================================================
// COVER BELAKANG
// ============================================================

const BackCoverPage = React.forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className="
        demo-page
        bg-gradient-to-br
        from-[#3a4822]
        via-[#273016]
        to-[#151c0b]
        text-white
        h-full
        p-4
        sm:p-6
        shadow-[inset_-12px_0_25px_-5px_rgba(0,0,0,0.6)]
        flex
        flex-col
        justify-between
        relative
        overflow-hidden
        border-4
        border-[#61773a]/40
        rounded-r-2xl
        cursor-default
      "
    >
      <div
        className="
          absolute
          inset-0
          bg-top
          bg-no-repeat
          bg-cover
          opacity-[0.15]
          mix-blend-luminosity
          pointer-events-none
          z-0
        "
        style={{
          backgroundImage: `url('/Chef girl.png')`
        }}
      />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-[#151c0b]
          via-[#273016]/80
          to-transparent
          pointer-events-none
          z-0
        "
      />

      <div
        className="
          absolute
          inset-3
          border
          border-[#859d58]/40
          rounded-xl
          pointer-events-none
          z-10
          flex
          flex-col
          justify-between
          p-2
        "
      >
        <div className="flex justify-between text-[#859d58]/60 text-xs">
          <span>✦</span>
          <span>✦</span>
        </div>
        <div className="flex justify-between text-[#859d58]/60 text-xs">
          <span>✦</span>
          <span>✦</span>
        </div>
      </div>

      <div
        className="
          relative
          z-50
          h-full
          flex
          flex-col
          justify-between
          items-center
          text-center
          py-3
          pointer-events-none
        "
      >
        <div
          className="
            my-auto
            flex
            flex-col
            items-center
            w-full
            px-2
            pointer-events-auto
          "
        >
          <div
            className="
              w-12
              h-12
              bg-white/10
              backdrop-blur-md
              rounded-xl
              flex
              items-center
              justify-center
              mb-2.5
              shadow-xl
              border
              border-white/20
            "
          >
            <UtensilsCrossed className="w-6 h-6 text-[#d4dfc7]" />
          </div>

          <h3
            className="
              font-serif
              font-bold
              text-lg
              text-white
              tracking-wide
              mb-1.5
            "
          >
            TERIMA KASIH
          </h3>

          <p
            className="
              font-serif
              italic
              text-[#d4dfc7]
              text-xs
              sm:text-sm
              max-w-xs
              mb-3.5
              opacity-90
              leading-relaxed
            "
          >
            "Suatu kehormatan bagi kami dapat menyajikan hidangan terbaik untuk Anda."
          </p>

          <div
            className="
              w-12
              h-[1.5px]
              bg-[#859d58]
              rounded-full
              mb-3.5
            "
          />

          <div className="w-full flex justify-center">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (props.onWindyClose) {
                  props.onWindyClose(e);
                }
              }}
              disabled={props.isClosing}
              className={`
                px-5
                py-2.5
                text-white
                rounded-xl
                text-xs
                font-bold
                uppercase
                tracking-[0.15em]
                shadow-xl
                border
                transition-all
                w-full
                max-w-[200px]
                font-serif
                pointer-events-auto
                ${
                  props.isClosing
                    ? `
                      bg-[#3f4d27]
                      border-[#526531]
                      opacity-70
                      cursor-wait
                    `
                    : `
                      bg-[#61773a]
                      hover:bg-[#526531]
                      border-[#7a954a]
                      active:scale-95
                      cursor-pointer
                    `
                }
              `}
            >
              <span>
                {props.isClosing ? 'Menutup...' : 'Tutup Buku'}
              </span>
            </button>
          </div>
        </div>

        <p
          className="
            text-[10px]
            text-[#d4dfc7]/90
            font-mono
            tracking-[0.2em]
            uppercase
            pointer-events-auto
            font-bold
          "
        >
          &copy; 2026 {props.restaurantName}
        </p>
      </div>
    </div>
  );
});


// ============================================================
// BOOK MENU
// ============================================================

export default function BookMenu({
  restaurantName,
  menu,
  addToCart,
  formatRupiah,
  cart = []
}) {
  const bookRef = useRef();
  const [isWindyClosing, setIsWindyClosing] = useState(false);

  const ITEMS_PER_PAGE = 3;
  const menuPages = [];

  for (let i = 0; i < menu.length; i += ITEMS_PER_PAGE) {
    menuPages.push(menu.slice(i, i + ITEMS_PER_PAGE));
  }

  const [pageSize, setPageSize] = useState({
    width: window.innerWidth < 768 ? Math.min(window.innerWidth - 32, 320) : 370,
    height: window.innerWidth < 768 ? 480 : 520,
    isMobile: window.innerWidth < 768
  });

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setPageSize({
        width: mobile ? Math.min(window.innerWidth - 32, 320) : 370,
        height: mobile ? 480 : 520,
        isMobile: mobile
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleWindyClose = (e) => {
    if (isWindyClosing) return;

    if (e) {
      e.preventDefault();
      e.stopPropagation();
      if (e.nativeEvent && e.nativeEvent.stopImmediatePropagation) {
        e.nativeEvent.stopImmediatePropagation();
      }
    }

    const flipInstance = bookRef.current?.pageFlip();
    if (!flipInstance) return;

    setIsWindyClosing(true);

    if (pageSize.isMobile) {
      setTimeout(() => {
        try {
          if (typeof flipInstance.turn === 'function') {
            flipInstance.turn(0);
          } else if (typeof flipInstance.flip === 'function') {
            flipInstance.flip(0);
          }
        } catch (err) {}
        setIsWindyClosing(false);
      }, 500);
      return;
    }

    const interval = setInterval(() => {
      const currentPage = typeof flipInstance.getCurrentPageIndex === 'function' 
        ? flipInstance.getCurrentPageIndex() 
        : 0;

      if (currentPage > 0) {
        try {
          if (typeof flipInstance.flipPrev === 'function') {
            flipInstance.flipPrev();
          }
        } catch (err) {
          clearInterval(interval);
        }
      } else {
        clearInterval(interval);
      }
    }, 120);

    setTimeout(() => {
      clearInterval(interval);
      try {
        if (typeof flipInstance.turn === 'function') {
          flipInstance.turn(0);
        }
      } catch (err) {}
      setIsWindyClosing(false);
    }, 1100);
  };

  const handlePageFlip = (e) => {
    if (isWindyClosing) return;
    const pageIndex = e.data;
    const flipInstance = bookRef.current?.pageFlip();
    if (!flipInstance) return;

    const totalPagesCount = typeof flipInstance.getPageCount === 'function' 
      ? flipInstance.getPageCount() 
      : 0;

    if (pageIndex >= totalPagesCount - 1) {
      setTimeout(() => {
        if (!isWindyClosing) {
          try {
            if (typeof flipInstance.turn === 'function') {
              flipInstance.turn(0);
            }
          } catch (err) {}
        }
      }, 600);
    }
  };

  return (
    <div
      className={`
        flex
        flex-col
        items-center
        justify-center
        w-full
        h-full
        py-1
        px-1
        select-none
        bg-[#f4f1ea]
        rounded-2xl
        shadow-xs
        border
        border-[#e2dcd0]
        overflow-hidden
        ${isWindyClosing ? 'windy-book-active' : ''}
      `}
    >
      <div
        className="
          relative
          flex
          items-center
          justify-center
          w-full
          max-w-3xl
        "
      >
        <div
          className={`
            relative
            shadow-[0_12px_30px_rgba(75,93,45,0.2)]
            rounded-xl
            overflow-visible
            bg-[#3a4822]
            p-[2px]
            border
            border-[#4b5d2d]
            [transform:translateZ(0)]
            flex
            justify-center
            w-full
            ${isWindyClosing ? 'windy-book' : ''}
          `}
        >
          {/* RING BINDER DI SISI KIRI LUAR BUKU KHUSUS TAMPILAN HANDPHONE */}
          {pageSize.isMobile && (
            <div
              className="
                absolute
                -left-3
                top-4
                bottom-4
                w-6
                flex
                flex-col
                justify-between
                items-center
                z-50
                pointer-events-none
              "
            >
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="
                    w-4
                    h-3.5
                    bg-gradient-to-r
                    from-stone-400
                    via-stone-100
                    to-stone-500
                    rounded-full
                    shadow-[0_2px_4px_rgba(0,0,0,0.3)]
                    border
                    border-stone-500
                  "
                />
              ))}
            </div>
          )}

          {/* RING BINDER DI TENGAH KHUSUS LAYAR BESAR / DESKTOP */}
          {!pageSize.isMobile && (
            <div
              className="
                absolute
                left-1/2
                -translate-x-1/2
                top-2
                bottom-2
                w-8
                flex
                flex-col
                justify-between
                items-center
                z-50
                pointer-events-none
              "
            >
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="
                    w-5
                    h-3.5
                    bg-gradient-to-r
                    from-stone-400
                    via-stone-100
                    to-stone-500
                    rounded-full
                    shadow-[0_2px_4px_rgba(0,0,0,0.2)]
                    border
                    border-stone-500
                  "
                />
              ))}
            </div>
          )}

          {isWindyClosing && (
            <div
              className="
                absolute
                inset-[-15px]
                z-[100]
                pointer-events-none
                overflow-hidden
              "
            >
              <div className="wind-line wind-line-1" />
              <div className="wind-line wind-line-2" />
              <div className="wind-line wind-line-3" />
            </div>
          )}

          {isWindyClosing && (
            <div
              className="
                absolute
                inset-0
                z-[90]
                pointer-events-none
                overflow-visible
                windy-pages
              "
            >
              <div className="fake-page fake-page-1" />
              <div className="fake-page fake-page-2" />
              <div className="fake-page fake-page-3" />
            </div>
          )}

          <HTMLFlipBook
            width={pageSize.width}
            height={pageSize.height}
            size="stretch"
            minWidth={250}
            maxWidth={410}
            minHeight={340}
            maxHeight={540}
            maxShadowOpacity={0.35}
            showCover={true}
            mobileScrollSupport={true}
            usePortrait={pageSize.isMobile}
            startPage={0}
            drawShadow={true}
            flippingTime={450}
            swipeDistance={30}
            clickEventForward={false}
            useMouseEvents={true}
            disableFlipByClick={true}
            showPageCorners={true}
            cornerAreaWidth={40}
            onFlip={handlePageFlip}
            ref={bookRef}
            className={`
              shadow-xl
              mx-auto
              ${isWindyClosing ? 'windy-flipbook' : ''}
            `}
          >
            {/* COVER DEPAN */}
            <CoverPage number={1} restaurantName={restaurantName} />

            {/* WELCOME */}
            <Page number={2}>
              <div
                className="
                  flex-1
                  flex
                  flex-col
                  justify-center
                  text-center
                  px-3
                  py-2
                "
              >
                <div
                  className="
                    w-14
                    h-14
                    bg-[#eef2e6]
                    rounded-2xl
                    flex
                    items-center
                    justify-center
                    mx-auto
                    mb-2.5
                    text-[#4b5d2d]
                    shadow-sm
                    border
                    border-[#d8d2c4]
                  "
                >
                  <UtensilsCrossed className="w-7 h-7" />
                </div>

                <h3
                  className="
                    font-serif
                    font-bold
                    text-lg
                    text-stone-900
                    mb-2
                    tracking-wide
                  "
                >
                  Selamat Datang
                </h3>

                <p
                  className="
                    font-serif
                    italic
                    text-stone-700
                    text-xs
                    sm:text-sm
                    leading-relaxed
                    mb-4
                    px-1
                  "
                >
                  "Menghadirkan kehangatan cita rasa rumahan dengan standar pelayanan terbaik untuk Anda."
                </p>

                <div
                  className="
                    inline-block
                    mx-auto
                    text-xs
                    text-[#4b5d2d]
                    bg-[#eef2e6]
                    px-4
                    py-1.5
                    rounded-full
                    uppercase
                    tracking-[0.15em]
                    font-serif
                    font-bold
                    border
                    border-[#d8d2c4]
                  "
                >
                  Sentuh Pojok ➔
                </div>
              </div>

              <div
                className="
                  flex
                  justify-between
                  items-center
                  text-[10px]
                  text-stone-500
                  font-mono
                  uppercase
                  tracking-[0.1em]
                  pt-2
                  border-t
                  border-stone-200
                  shrink-0
                  mt-auto
                  font-bold
                "
              >
                <span className="truncate pr-2">{restaurantName}</span>
                <span>H. 2</span>
              </div>
            </Page>

            {/* MENU PAGES */}
            {menuPages.map((pageItems, index) => {
              const pageNum = index + 3;
              const isEvenPage = pageNum % 2 === 0;

              return (
                <Page key={index} number={pageNum}>
                  <div className="flex-1 flex flex-col justify-between pr-0.5 pb-1 h-full">
                    <div
                      className="
                        border-b
                        border-[#d8d2c4]
                        pb-2
                        mb-2
                        flex
                        justify-between
                        items-center
                        bg-[#f4f1ea]/90
                        px-3
                        rounded-lg
                        shrink-0
                      "
                    >
                      <h3
                        className="
                          font-serif
                          font-bold
                          text-xs
                          sm:text-sm
                          text-[#3a4822]
                          uppercase
                          tracking-[0.1em]
                        "
                      >
                        Katalog Hidangan
                      </h3>
                    </div>

                    <div className="flex-1 flex flex-col justify-between space-y-2 my-auto">
                      {pageItems.map((item) => {
                        const cartItem = cart.find(
                          (ci) => ci.id === item.id
                        );
                        const currentQtyInCart = cartItem
                          ? cartItem.qty
                          : 0;

                        let maxStock = 99;
                        let cleanDesc = item.desc || "";
                        const match = cleanDesc.match(
                          /(?:stok|tersedia)\D*(\d+)/i
                        );
                        if (match) {
                          maxStock = parseInt(match[1], 10);
                          cleanDesc = cleanDesc.replace(/(?:stok|tersedia)\D*\d+/gi, "").trim();
                        }

                        const isOutOfStock = currentQtyInCart >= maxStock;

                        return (
                          <div
                            key={item.id}
                            className="
                              bg-white/95
                              p-2.5
                              sm:p-3
                              rounded-xl
                              border-2
                              border-[#dcd6c8]
                              flex
                              flex-col
                              justify-between
                              shadow-xs
                              space-y-1.5
                              cursor-default
                              flex-1
                            "
                          >
                            <div>
                              <div
                                className="
                                  flex
                                  justify-between
                                  items-start
                                  gap-1.5
                                "
                              >
                                <h4
                                  className="
                                    font-serif
                                    font-bold
                                    text-stone-900
                                    text-xs
                                    sm:text-sm
                                    leading-snug
                                  "
                                >
                                  {item.name}
                                </h4>

                                <span
                                  className="
                                    font-mono
                                    font-extrabold
                                    text-[#4b5d2d]
                                    text-xs
                                    sm:text-sm
                                    whitespace-nowrap
                                    bg-[#eef2e6]
                                    px-2.5
                                    py-1
                                    rounded-md
                                    border
                                    border-[#d8d2c4]
                                  "
                                >
                                  {formatRupiah(item.price)}
                                </span>
                              </div>

                              <p
                                className="
                                  font-serif
                                  text-stone-700
                                  text-[11px]
                                  sm:text-xs
                                  mt-1
                                  line-clamp-2
                                  italic
                                  leading-snug
                                  opacity-95
                                "
                              >
                                {cleanDesc}
                              </p>
                            </div>

                            <div
                              className="
                                flex
                                justify-between
                                items-center
                                pt-1.5
                                border-t
                                border-stone-200/80
                              "
                            >
                              {/* Sisi Kiri */}
                              {isEvenPage ? (
                                <div
                                  className="
                                    flex
                                    items-center
                                    space-x-1.5
                                    text-[10px]
                                    sm:text-[11px]
                                    font-mono
                                    text-stone-700
                                    bg-stone-100
                                    px-2
                                    py-0.5
                                    rounded-md
                                    border
                                    border-stone-300
                                    font-bold
                                  "
                                >
                                  <AlertCircle className="w-3 h-3 text-[#4b5d2d]" />
                                  <span>
                                    Sisa:{' '}
                                    <strong className="text-stone-900">
                                      {Math.max(
                                        0,
                                        maxStock - currentQtyInCart
                                      )}
                                    </strong>
                                  </span>
                                </div>
                              ) : (
                                <div>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      if (!isOutOfStock) {
                                        addToCart(item);
                                      }
                                    }}
                                    disabled={isOutOfStock}
                                    className={`
                                      px-3
                                      py-1.5
                                      rounded-lg
                                      text-xs
                                      font-serif
                                      font-bold
                                      flex
                                      items-center
                                      space-x-1
                                      transition-all
                                      cursor-pointer
                                      pointer-events-auto
                                      ${
                                        isOutOfStock
                                          ? 'bg-stone-100 text-stone-400 cursor-not-allowed border border-stone-200'
                                          : cartItem
                                          ? 'bg-[#4b5d2d] text-white shadow-xs'
                                          : 'bg-[#4b5d2d] hover:bg-[#3a4822] text-white active:scale-95'
                                      }
                                    `}
                                  >
                                    {isOutOfStock ? (
                                      <span>Habis</span>
                                    ) : cartItem ? (
                                      <>
                                        <Check className="w-3 h-3 text-[#d4dfc7]" />
                                        <span>({cartItem.qty})</span>
                                      </>
                                    ) : (
                                      <>
                                        <Plus className="w-3 h-3 text-white" />
                                        <span>Pilih</span>
                                      </>
                                    )}
                                  </button>
                                </div>
                              )}

                              {/* Sisi Kanan */}
                              {isEvenPage ? (
                                <div>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      if (!isOutOfStock) {
                                        addToCart(item);
                                      }
                                    }}
                                    disabled={isOutOfStock}
                                    className={`
                                      px-3
                                      py-1.5
                                      rounded-lg
                                      text-xs
                                      font-serif
                                      font-bold
                                      flex
                                      items-center
                                      space-x-1
                                      transition-all
                                      cursor-pointer
                                      pointer-events-auto
                                      ${
                                        isOutOfStock
                                          ? 'bg-stone-100 text-stone-400 cursor-not-allowed border border-stone-200'
                                          : cartItem
                                          ? 'bg-[#4b5d2d] text-white shadow-xs'
                                          : 'bg-[#4b5d2d] hover:bg-[#3a4822] text-white active:scale-95'
                                      }
                                    `}
                                  >
                                    {isOutOfStock ? (
                                      <span>Habis</span>
                                    ) : cartItem ? (
                                      <>
                                        <Check className="w-3 h-3 text-[#d4dfc7]" />
                                        <span>({cartItem.qty})</span>
                                      </>
                                    ) : (
                                      <>
                                        <Plus className="w-3 h-3 text-white" />
                                        <span>Pilih</span>
                                      </>
                                    )}
                                  </button>
                                </div>
                              ) : (
                                <div
                                  className="
                                    flex
                                    items-center
                                    space-x-1.5
                                    text-[10px]
                                    sm:text-[11px]
                                    font-mono
                                    text-stone-700
                                    bg-stone-100
                                    px-2
                                    py-0.5
                                    rounded-md
                                    border
                                    border-stone-300
                                    font-bold
                                  "
                                >
                                  <AlertCircle className="w-3 h-3 text-[#4b5d2d]" />
                                  <span>
                                    Sisa:{' '}
                                    <strong className="text-stone-900">
                                      {Math.max(
                                        0,
                                        maxStock - currentQtyInCart
                                      )}
                                    </strong>
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div
                    className="
                      flex
                      justify-between
                      items-center
                      text-[10px]
                      text-stone-500
                      font-mono
                      uppercase
                      tracking-[0.1em]
                      pt-2
                      border-t
                      border-stone-200
                      shrink-0
                      mt-auto
                      font-bold
                    "
                  >
                    <span className="truncate pr-2">{restaurantName}</span>
                    <span>H. {pageNum}</span>
                  </div>
                </Page>
              );
            })}

            {/* FILOSOFI DAPUR */}
            <Page number={menuPages.length + 3}>
              <div className="flex-1 flex flex-col justify-center py-3 px-3 text-center relative">
                <div
                  className="
                    my-auto
                    space-y-3
                    z-10
                    bg-white/95
                    backdrop-blur-xs
                    p-5
                    rounded-xl
                    border-2
                    border-stone-200
                    shadow-sm
                  "
                >
                  <div
                    className="
                      w-12
                      h-12
                      bg-[#eef2e6]
                      rounded-xl
                      flex
                      items-center
                      justify-center
                      mx-auto
                      text-[#4b5d2d]
                      shadow-sm
                      border
                      border-[#d8d2c4]
                    "
                  >
                    <ChefHat className="w-6 h-6" />
                  </div>

                  <h4
                    className="
                      font-serif
                      font-bold
                      text-stone-900
                      text-base
                      tracking-wide
                      uppercase
                    "
                  >
                    Filosofi Dapur
                  </h4>

                  <div className="w-10 h-[1.5px] bg-[#61773a] mx-auto rounded-full" />

                  <p
                    className="
                      font-serif
                      italic
                      text-stone-700
                      text-xs
                      sm:text-sm
                      leading-relaxed
                      px-1
                    "
                  >
                    "Setiap menu diracik dengan penuh ketulusan, memadukan resep rahasia keluarga dan bahan premium."
                  </p>
                </div>
              </div>

              <div
                className="
                  flex
                  justify-between
                  items-center
                  text-[10px]
                  text-stone-500
                  font-mono
                  uppercase
                  tracking-[0.1em]
                  pt-2
                  border-t
                  border-stone-200
                  shrink-0
                  mt-auto
                  font-bold
                "
              >
                <span className="truncate pr-2">{restaurantName}</span>
                <span>H. {menuPages.length + 3}</span>
              </div>
            </Page>

            {/* CITA RASA */}
            <Page number={menuPages.length + 4}>
              <div className="flex-1 flex flex-col justify-center py-3 px-3 text-center relative">
                <div
                  className="
                    my-auto
                    space-y-3
                    z-10
                    bg-white/95
                    backdrop-blur-xs
                    p-5
                    rounded-xl
                    border-2
                    border-stone-200
                    shadow-sm
                  "
                >
                  <div
                    className="
                      w-12
                      h-12
                      bg-[#eef2e6]
                      rounded-xl
                      flex
                      items-center
                      justify-center
                      mx-auto
                      text-[#4b5d2d]
                      shadow-sm
                      border
                      border-[#d8d2c4]
                    "
                  >
                    <Soup className="w-6 h-6" />
                  </div>

                  <h4
                    className="
                      font-serif
                      font-bold
                      text-stone-900
                      text-base
                      tracking-wide
                      uppercase
                    "
                  >
                    Cita Rasa Autentik
                  </h4>

                  <div className="w-10 h-[1.5px] bg-[#61773a] mx-auto rounded-full" />

                  <p
                    className="
                      font-serif
                      italic
                      text-stone-700
                      text-xs
                      sm:text-sm
                      leading-relaxed
                      px-1
                    "
                  >
                    "Kepuasan Anda adalah kebanggaan kami. Nikmati kelezatan di setiap gigitan."
                  </p>
                </div>
              </div>

              <div
                className="
                  flex
                  justify-between
                  items-center
                  text-[10px]
                  text-stone-500
                  font-mono
                  uppercase
                  tracking-[0.1em]
                  pt-2
                  border-t
                  border-stone-200
                  shrink-0
                  mt-auto
                  font-bold
                "
              >
                <span className="truncate pr-2">{restaurantName}</span>
                <span>H. {menuPages.length + 4}</span>
              </div>
            </Page>

            {/* COVER BELAKANG */}
            <BackCoverPage
              number={menuPages.length + 5}
              restaurantName={restaurantName}
              onWindyClose={handleWindyClose}
              isClosing={isWindyClosing}
            />
          </HTMLFlipBook>
        </div>
      </div>

      <style>{`
        .windy-book {
          transform-origin: center center;
          animation: windyShake 1150ms cubic-bezier(.22,.61,.36,1) both;
        }

        @keyframes windyShake {
          0% { transform: rotate(0deg) translateX(0) scale(1); }
          8% { transform: rotate(0.8deg) translateX(3px) scale(1.005); }
          16% { transform: rotate(-1deg) translateX(-4px) scale(1.008); }
          26% { transform: rotate(1.4deg) translateX(5px) scale(1.01); }
          38% { transform: rotate(-1.1deg) translateX(-5px) scale(1.012); }
          50% { transform: rotate(0.7deg) translateX(3px) scale(1.008); }
          65% { transform: rotate(-0.5deg) translateX(-2px) scale(1.005); }
          80% { transform: rotate(0.2deg) translateX(1px) scale(1.002); }
          100% { transform: rotate(0deg) translateX(0) scale(1); }
        }

        .windy-pages {
          perspective: 1200px;
        }

        .fake-page {
          position: absolute;
          top: 1%;
          left: 1%;
          width: 48%;
          height: 98%;
          border-radius: 3px;
          transform-origin: right center;
          background: linear-gradient(
            -90deg,
            rgba(255,255,255,0.96) 0%,
            rgba(250,248,243,0.98) 70%,
            rgba(214,208,195,0.9) 100%
          );
          box-shadow: 6px 0 15px rgba(0,0,0,0.1);
          opacity: 0;
        }

        .fake-page-1 { animation: windyPage1 950ms cubic-bezier(.22,.61,.36,1) 80ms both; }
        .fake-page-2 { animation: windyPage2 1000ms cubic-bezier(.22,.61,.36,1) 140ms both; }
        .fake-page-3 { animation: windyPage3 1050ms cubic-bezier(.22,.61,.36,1) 210ms both; }

        @keyframes windyPage1 {
          0% { opacity: 0; transform: rotateY(0deg) translateX(0); }
          45% { opacity: 0.9; transform: rotateY(48deg) translateX(10px); }
          100% { opacity: 0; transform: rotateY(175deg) translateX(30px); }
        }

        @keyframes windyPage2 {
          0% { opacity: 0; transform: rotateY(0deg); }
          50% { opacity: 0.85; transform: rotateY(55deg) translateX(12px); }
          100% { opacity: 0; transform: rotateY(175deg) translateX(35px); }
        }

        @keyframes windyPage3 {
          0% { opacity: 0; transform: rotateY(0deg); }
          55% { opacity: 0.8; transform: rotateY(65deg) translateX(12px); }
          100% { opacity: 0; transform: rotateY(175deg) translateX(35px); }
        }

        .wind-line {
          position: absolute;
          right: -30%;
          width: 70%;
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent);
          transform: rotate(8deg) translateX(100%);
        }

        .wind-line-1 { top: 30%; animation: windLine 700ms ease-out both; }
        .wind-line-2 { top: 50%; animation: windLine 750ms ease-out 110ms both; }
        .wind-line-3 { top: 70%; animation: windLine 800ms ease-out 180ms both; }

        @keyframes windLine {
          0% { opacity: 0; transform: rotate(8deg) translateX(100%); }
          50% { opacity: 0.6; }
          100% { opacity: 0; transform: rotate(8deg) translateX(-250%); }
        }

        .windy-flipbook {
          filter: drop-shadow(0 10px 20px rgba(0,0,0,0.15));
        }
      `}</style>
    </div>
  );
}