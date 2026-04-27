// ===== CAROUSEL GALLERY - AUTOPLAY + DINAMIK RASMLAR =====

(function () {
  'use strict';

  // ── DOM elementlar ───────────────────────────────────────
  const mainImage        = document.getElementById('mainImage');
  const mainImageTitle   = document.getElementById('mainImageTitle');
  const mainImageDesc    = document.getElementById('mainImageDescription');
  const thumbnailTrack   = document.getElementById('thumbnailTrack');
  const carouselPrev     = document.getElementById('carouselPrev');
  const carouselNext     = document.getElementById('carouselNext');
  const currentImageNum  = document.getElementById('currentImageNum');
  const totalImagesNum   = document.getElementById('totalImagesNum');
  const carouselProgress = document.getElementById('carouselProgress');

  const thumbnails  = document.querySelectorAll('.thumbnail-item');
  const totalImages = thumbnails.length;

  let currentIndex = 0;
  let isAnimating  = false;

  // ── AUTOPLAY sozlamalari ─────────────────────────────────
  const AUTOPLAY_DELAY    = 4000;
  const PAUSE_AFTER_CLICK = 8000;
  let   autoplayTimer     = null;
  let   pauseTimer        = null;

  // ── Init ─────────────────────────────────────────────────
  function init() {
    if (!mainImage || !thumbnailTrack || totalImages === 0) return;

    if (totalImagesNum) totalImagesNum.textContent = totalImages;
    updateCounter(0);
    updateProgress(0);
    addEventListeners();
    updateNavButtons();
    startAutoplay();
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      const next = (currentIndex + 1) % totalImages;
      setActiveImage(next, false);
    }, AUTOPLAY_DELAY);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function pauseThenResume() {
    stopAutoplay();
    clearTimeout(pauseTimer);
    pauseTimer = setTimeout(() => {
      startAutoplay();
    }, PAUSE_AFTER_CLICK);
  }

  function setActiveImage(index, byUser) {
    if (index < 0 || index >= totalImages) return;
    if (isAnimating) return;
    isAnimating = true;

    if (byUser) pauseThenResume();

    const newThumb = thumbnails[index];
    const newSrc   = newThumb.querySelector('img').src;

    mainImage.style.opacity = '0';

    setTimeout(() => {
      mainImage.src = newSrc;
      mainImage.alt = newThumb.querySelector('img').alt || '';

      const fadeIn = () => {
        mainImage.style.opacity = '1';
        isAnimating = false;
      };

      if (mainImage.complete) {
        fadeIn();
      } else {
        mainImage.onload  = fadeIn;
        mainImage.onerror = fadeIn;
      }

      if (mainImageTitle) mainImageTitle.textContent = newThumb.dataset.title || '';
      if (mainImageDesc)  mainImageDesc.textContent  = newThumb.dataset.desc  || '';

    }, 350);

    thumbnails.forEach(t => t.classList.remove('active'));
    newThumb.classList.add('active');

    currentIndex = index;
    updateCounter(index);
    updateProgress(index);
    scrollToThumbnail(index);
    updateNavButtons();
  }

  function updateCounter(index) {
    if (currentImageNum) currentImageNum.textContent = index + 1;
  }

  function updateProgress(index) {
    if (!carouselProgress) return;
    carouselProgress.style.width = ((index + 1) / totalImages * 100) + '%';
  }

  function scrollToThumbnail(index) {
    const thumb = thumbnails[index];
    if (!thumb) return;

    const trackLeft  = thumbnailTrack.scrollLeft;
    const trackWidth = thumbnailTrack.clientWidth;
    const thumbLeft  = thumb.offsetLeft;
    const thumbWidth = thumb.offsetWidth;

    if (thumbLeft < trackLeft) {
      thumbnailTrack.scrollTo({ left: thumbLeft - 10, behavior: 'smooth' });
    } else if (thumbLeft + thumbWidth > trackLeft + trackWidth) {
      thumbnailTrack.scrollTo({
        left: thumbLeft + thumbWidth - trackWidth + 10,
        behavior: 'smooth'
      });
    }
  }

  function carouselScrollBy(direction) {
    const step = thumbnailTrack.clientWidth * 0.75;
    thumbnailTrack.scrollBy({ left: direction * step, behavior: 'smooth' });
    setTimeout(updateNavButtons, 400);
  }

  function updateNavButtons() {
    if (!carouselPrev || !carouselNext) return;
    const max = thumbnailTrack.scrollWidth - thumbnailTrack.clientWidth;
    carouselPrev.disabled = thumbnailTrack.scrollLeft <= 5;
    carouselNext.disabled = thumbnailTrack.scrollLeft >= max - 5 || max <= 0;
  }

  function addEventListeners() {
    thumbnails.forEach((thumb, i) => {
      thumb.addEventListener('click', () => setActiveImage(i, true));
    });

    if (carouselPrev) carouselPrev.addEventListener('click', () => {
      carouselScrollBy(-1);
      pauseThenResume();
    });
    if (carouselNext) carouselNext.addEventListener('click', () => {
      carouselScrollBy(1);
      pauseThenResume();
    });

    thumbnailTrack.addEventListener('scroll', updateNavButtons);

    mainImage.addEventListener('mouseenter', stopAutoplay);
    mainImage.addEventListener('mouseleave', startAutoplay);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        setActiveImage((currentIndex - 1 + totalImages) % totalImages, true);
      }
      if (e.key === 'ArrowRight') {
        setActiveImage((currentIndex + 1) % totalImages, true);
      }
    });

    let tx = 0;
    mainImage.addEventListener('touchstart', e => {
      tx = e.changedTouches[0].screenX;
    }, { passive: true });

    mainImage.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].screenX - tx;
      if (dx < -50) setActiveImage((currentIndex + 1) % totalImages, true);
      if (dx >  50) setActiveImage((currentIndex - 1 + totalImages) % totalImages, true);
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    });

    let rt;
    window.addEventListener('resize', () => {
      clearTimeout(rt);
      rt = setTimeout(updateNavButtons, 250);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();