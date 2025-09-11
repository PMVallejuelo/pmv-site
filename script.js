// Script del sitio - Policía Municipal de Vallejuelo
console.log("Sitio web PMV cargado correctamente");

(function () {
  const carousel = document.querySelector(".carousel");
  if (!carousel) return;

  const track   = carousel.querySelector(".carousel__track");
  const slides  = Array.from(track.querySelectorAll(".carousel__img"));
  const prevBtn = carousel.querySelector(".prev");
  const nextBtn = carousel.querySelector(".next");

  if (!slides.length || !prevBtn || !nextBtn) return;

  let index = 0;
  let slideWidth = carousel.clientWidth;

  function setWidth() {
    // recalcula el ancho de referencia al cambiar el tamaño de la ventana
    slideWidth = carousel.clientWidth;
    goTo(index, false);
  }

  function goTo(i, animate = true) {
    index = (i + slides.length) % slides.length; // efecto carrusel
    if (animate) {
      track.style.transition = "transform .5s ease-in-out";
    } else {
      track.style.transition = "none";
    }
    track.style.transform = `translateX(-${index * slideWidth}px)`;
  }

  // Botones
  nextBtn.addEventListener("click", () => goTo(index + 1));
  prevBtn.addEventListener("click", () => goTo(index - 1));

  // Teclado
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") goTo(index + 1);
    if (e.key === "ArrowLeft")  goTo(index - 1);
    if (e.key === "Escape")     closeLightbox();
  });

  // Swipe táctil
  let startX = null;
  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener("touchend", (e) => {
    if (startX == null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) goTo(index + (dx < 0 ? 1 : -1));
    startX = null;
  });

  // Lightbox
  const lightbox = document.getElementById("lightbox");
  const lbImg    = lightbox ? lightbox.querySelector(".lightbox__img") : null;
  const lbClose  = lightbox ? lightbox.querySelector(".lightbox__close") : null;

  function openLightbox(src) {
    if (!lightbox || !lbImg) return;
    lbImg.src = src;
    lightbox.style.display = "flex";
  }
  function closeLightbox() {
    if (!lightbox || !lbImg) return;
    lightbox.style.display = "none";
    lbImg.src = "";
  }

  slides.forEach((img) => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => openLightbox(img.getAttribute("src")));
  });

  lbClose && lbClose.addEventListener("click", closeLightbox);
  lightbox && lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Recalcular al redimensionar
  window.addEventListener("resize", setWidth);

  // Iniciar
  setWidth();
  goTo(0, false);
})();
