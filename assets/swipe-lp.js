// assets/swipe-lp.js
(function () {
  const isMobile = () =>
    window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 768;

  // iOSの100vh対策：--vh を毎回更新
  function setVhVar() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  function initSwipe(container) {
    if (container.__swiper_instance) return; // 二重初期化防止
   // const paginationEl = container.querySelector('.swiper-pagination');

    // データ属性からオプション（将来拡張）
    const dir = container.dataset.direction || 'vertical';
    const mobileOnly = container.dataset.mobileOnly === 'true';

    if (mobileOnly && !isMobile()) {
      // PC時は通常スクロールにフォールバック（Swiperを作らない）
      return;
    }

    const swiper = new Swiper(container, {
      direction: dir,               // ← 縦固定 'vertical'
      slidesPerView: 1,
      mousewheel: true,             // ホイールでセクション切替（PCでも動く）
      keyboard: { enabled: true },
      simulateTouch: true,          // タッチ操作を有効化
      threshold: 5,                 // スワイプの最小移動
      touchAngle: 45,               // 斜め操作の許容
      resistanceRatio: 0.65,
      speed: 600,
      longSwipes: true,
      longSwipesRatio: 0.2,
      pagination: paginationEl
        ? { el: paginationEl, clickable: true }
        : undefined,
      // スクロールのはみ出しを抑え、ページ全体スクロールを防止
      touchStartPreventDefault: true,
      passiveListeners: true,
      // スライドの高さが可変でも段差を減らす
      autoHeight: false,
      // モバイルでアドレスバーに追従して高さ調整
      on: {
        init() {
          container.__swiper_initialized = true;
        },
        resize() {
          // 必要ならここで再計算
        },
      },
    });

    container.__swiper_instance = swiper;
  }

  function destroySwipe(container) {
    const inst = container.__swiper_instance;
    if (inst && inst.destroy) {
      inst.destroy(true, true);
      container.__swiper_instance = null;
      container.__swiper_initialized = false;
    }
  }

  function bootstrap() {
    setVhVar();
    document
      .querySelectorAll('.swipe-lp')
      .forEach((el) => {
        const mobileOnly = el.dataset.mobileOnly === 'true';
        if (mobileOnly && !isMobile()) {
          destroySwipe(el);
        } else {
          initSwipe(el);
        }
      });
  }

  window.addEventListener('resize', () => {
    setVhVar();
    // 画面幅やポインタタイプが変わることがある（回転等）
    bootstrap();
  });

  document.addEventListener('DOMContentLoaded', bootstrap);
})();
