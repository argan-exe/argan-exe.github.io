// ===== Mobile nav toggle =====
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

// ===== Dropdown (Portofolio) — tap to open on touch/mobile =====
document.querySelectorAll(".has-dropdown > a").forEach((link) => {
  link.addEventListener("click", (e) => {
    if (window.innerWidth <= 760) {
      e.preventDefault();
      link.parentElement.classList.toggle("open");
    }
  });
});

// ===== Carousel (mendukung banyak box independen di 1 halaman) =====
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function initCarousel(carouselEl) {
  const slides = carouselEl.querySelectorAll(":scope > img");
  const dots = carouselEl.querySelectorAll(":scope > .carousel-dots button");
  const prevBtn = carouselEl.querySelector(":scope > .carousel-arrow.prev");
  const nextBtn = carouselEl.querySelector(":scope > .carousel-arrow.next");

  if (!slides.length) return;

  let current = 0;
  let autoplayTimer = null;

  function goToSlide(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((img, i) => img.classList.toggle("active", i === current));
    dots.forEach((dot, i) => dot.classList.toggle("active", i === current));
  }

  function startAutoplay() {
    if (prefersReducedMotion || slides.length < 2) return;
    autoplayTimer = setInterval(() => goToSlide(current + 1), 6000);
  }

  function stopAutoplay() {
    clearInterval(autoplayTimer);
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      goToSlide(current - 1);
      stopAutoplay();
      startAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      goToSlide(current + 1);
      stopAutoplay();
      startAutoplay();
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      goToSlide(i);
      stopAutoplay();
      startAutoplay();
    });
  });

  carouselEl.addEventListener("mouseenter", stopAutoplay);
  carouselEl.addEventListener("mouseleave", startAutoplay);

  goToSlide(0);
  startAutoplay();
}

document.querySelectorAll(".carousel").forEach(initCarousel);
window.initCarousel = initCarousel;