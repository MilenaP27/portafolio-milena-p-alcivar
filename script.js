document.addEventListener('DOMContentLoaded', () => {
  // Año automático en el footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // HAMBURGER MENU
  const ham = document.querySelector('.hamburger');
  const nav = document.getElementById('main-nav');

  if (ham) {
    ham.addEventListener('click', () => {
      const expanded = ham.getAttribute('aria-expanded') === 'true';
      ham.setAttribute('aria-expanded', String(!expanded));
      ham.classList.toggle('is-open');
      nav.classList.toggle('open');
    });
  }

  // HABILIDADES: animar las barras cuando se ven en pantalla
  const skills = document.querySelectorAll('.skill');
  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target.querySelector('.progress-bar');
        const percent = bar.getAttribute('data-percent') || '0';
        bar.style.width = percent + '%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  skills.forEach(skill => skillObserver.observe(skill));

  // FORMULARIO DE CONTACTO
  const form = document.getElementById('contactForm');
  if (form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    const response = document.getElementById('formResponse');

    function validateField(field) {
      if (!field.checkValidity()) {
        field.nextElementSibling.textContent = "Por favor completa este campo correctamente.";
        field.nextElementSibling.style.display = "block";
        return false;
      } else {
        field.nextElementSibling.textContent = "";
        field.nextElementSibling.style.display = "none";
        return true;
      }
    }

    inputs.forEach(input => {
      input.addEventListener('input', () => validateField(input));
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      inputs.forEach(input => { if (!validateField(input)) valid = false; });
      if (!valid) {
        response.textContent = "Corrige los errores antes de enviar.";
        response.style.color = "red";
        return;
      }
      response.textContent = "¡Mensaje enviado con éxito! Gracias 💌";
      response.style.color = "green";
      form.reset();
    });
  }
});
