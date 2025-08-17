
// Mostrar/ocultar botón "Back to Top"
let backToTopBtn = document.getElementById("backToTop");
window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
};

// Función para volver arriba
function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}

// Validación simple del formulario (solo ejemplo, Zoho ya valida)
document.addEventListener("DOMContentLoaded", function() {
    let form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function(e) {
            let inputs = form.querySelectorAll("input[required], textarea[required]");
            for (let input of inputs) {
                if (!input.value.trim()) {
                    alert("Por favor complete todos los campos requeridos.");
                    e.preventDefault();
                    return;
                }
            }
        });
    }
});
