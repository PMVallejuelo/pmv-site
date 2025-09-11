// Script básico - Policía Municipal de Vallejuelo

console.log("Sitio web Policía Municipal de Vallejuelo cargado correctamente");
<script>
(function(){
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel__track');
  const slides = [...track.querySelectorAll('.carousel__img')];
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');

  let index = 0;

  function goTo(i){
    index = (i + slides.length) % slides.length;   // wrap-around
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  // Botones
  nextBtn.addEventListener('click', ()=> goTo(index + 1));
  prevBtn.addEventListener('click', ()=> goTo(index - 1));

  // Teclado
  window.addEventListener('keydown', (e)=>{
    if (e.key === 'ArrowRight') goTo(index + 1);
    if (e.key === 'ArrowLeft')  goTo(index - 1);
    if (e.key === 'Escape')     closeLightbox();
  });

  // Swipe táctil
  let startX = null;
  track.addEventListener('touchstart', (e)=>{ startX = e.touches[0].clientX; }, {passive:true});
  track.addEventListener('touchend', (e)=>{
    if (startX == null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) goTo(index + (dx < 0 ? 1 : -1));
    startX = null;
  });

  // Lightbox (clic en la imagen)
  const lightbox = document.getElementById('lightbox');
  const lbImg    = lightbox?.querySelector('.lightbox__img');
  const lbClose  = lightbox?.querySelector('.lightbox__close');

  function openLightbox(src){
    if (!lightbox) return;
    lbImg.src = src;
    lightbox.style.display = 'flex';
  }
  function closeLightbox(){
    if (!lightbox) return;
    lightbox.style.display = 'none';
    lbImg.src = '';
  }

  slides.forEach(img =>{
    img.addEventListener('click', ()=> openLightbox(img.getAttribute('src')));
  });

  lbClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e)=>{ if (e.target === lightbox) closeLightbox(); });

  // Iniciar
  goTo(0);
})();
</script>
