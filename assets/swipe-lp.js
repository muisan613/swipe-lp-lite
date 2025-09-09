document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.swipe-lp').forEach((el) => {
    const paginationEl = el.querySelector('.swiper-pagination');
    if (!el.__swiper_initialized) {
      new Swiper(el, {
        direction: 'vertical',
        mousewheel: true,
        speed: 600,
        pagination: paginationEl ? { el: paginationEl, clickable: true } : undefined
      });
      el.__swiper_initialized = true;
    }
  });
});
