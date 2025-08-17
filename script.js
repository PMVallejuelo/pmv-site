
// script.js - Manejo de interactividad básica de la página Policía Municipal Vallejuelo

// Navegación con desplazamiento suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mostrar año actual en footer
document.addEventListener("DOMContentLoaded", () => {
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

// Botón para volver arriba
const backToTop = document.createElement("button");
backToTop.textContent = "↑";
backToTop.id = "backToTop";
backToTop.style.position = "fixed";
backToTop.style.bottom = "20px";
backToTop.style.right = "20px";
backToTop.style.display = "none";
backToTop.style.padding = "10px";
backToTop.style.background = "#d32f2f";
backToTop.style.color = "#fff";
backToTop.style.border = "none";
backToTop.style.borderRadius = "50%";
backToTop.style.cursor = "pointer";
document.body.appendChild(backToTop);

window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
