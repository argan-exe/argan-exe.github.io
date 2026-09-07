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

// ===== Hero carousel =====
const slides = document.querySelectorAll(".carousel img");
const dots = document.querySelectorAll(".carousel-dots button");
const prevBtn = document.querySelector(".carousel-arrow.prev");
const nextBtn = document.querySelector(".carousel-arrow.next");
const carousel = document.querySelector(".carousel");

let current = 0;
let autoplayTimer = null;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function goToSlide(index) {
  if (!slides.length) return;
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

if (prevBtn) prevBtn.addEventListener("click", () => { goToSlide(current - 1); stopAutoplay(); startAutoplay(); });
if (nextBtn) nextBtn.addEventListener("click", () => { goToSlide(current + 1); stopAutoplay(); startAutoplay(); });

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => { goToSlide(i); stopAutoplay(); startAutoplay(); });
});

if (carousel) {
  carousel.addEventListener("mouseenter", stopAutoplay);
  carousel.addEventListener("mouseleave", startAutoplay);
}

goToSlide(0);
startAutoplay();