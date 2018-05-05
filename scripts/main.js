document.addEventListener('DOMContentLoaded', (evt) => {
  const stickyElement = document.querySelector('[data-sticky-ui]');
  const stickyStartPosition = Number(stickyElement.dataset.stickyStartPosition);
  const stickyFixedPosition = Number(stickyElement.dataset.stickyFixedPosition);

  const backToTopBtn = document.querySelector('#backtotop');

  const scrollToTop = () => {
    let timeout;
    if (document.documentElement.scrollTop != 0 || document.body.scrollTop != 0) {
      window.scrollBy(0, -150);
      timeout = setTimeout(scrollToTop,17);
    } else {
      clearTimeout(timeout);
    }
  }

  const detectAndShowBackToTopButton = (scrollPosition) => {
    if (scrollPosition > 150) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  const checkAndStickElement = (scrollPosition) => {
    if (scrollPosition >= stickyStartPosition + stickyFixedPosition) {
      stickyElement.classList.add('stickyActive');
      stickyElement.style.top = '0px';
    } else {
      stickyElement.classList.remove('stickyActive');
      stickyElement.style.top = '';
    }
  }

  backToTopBtn.addEventListener('click', (evt) => {
    scrollToTop();
  });

  let frameRedrawReady = true;
  window.addEventListener('scroll', (evt) => {
    const scrollY = window.scrollY;
    if (window.frameRedrawReady) {
      window.requestAnimationFrame(() => {
        checkAndStickElement(scrollY);
        detectAndShowBackToTopButton(scrollY);
        window.frameRedrawReady = false;
      });
    }
    window.frameRedrawReady = true;
  });

  detectAndShowBackToTopButton(window.scrollY);
});
