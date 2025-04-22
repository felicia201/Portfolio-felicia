const parentContainer = document.querySelector('.about-content');
parentContainer.addEventListener('click', event => {
    const current = event.target;
    const readmore = current.classList.contains('Btn');
    if (!readmore) return;

    const currentText = event.target.parentNode.querySelector('.read_more_text');
    currentText.classList.toggle('read_more_text--show');
    current.textContent = current.textContent.includes('en savoir plus') ?
        "savoir moins..." : "savoir plus";
});

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

let sections = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navlinks.forEach(links => {
                links.classList.remove('active');
            });
            document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
        }
    });

    let header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 100);

    /*bouger le menu nav bar */
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

let darkModeIcon = document.querySelector('#darkMode-icon');

darkModeIcon.onclick = () => {
    darkModeIcon.classList.toggle('bx-sun');
    document.body.classList.toggle('dark-mode');
};




ScrollReveal({ 
    reset: true,
    distance:'80px',
    duration:2000,
    delay:200 
});
ScrollReveal().reveal('.home-content,.heading',{origin:'top'});
ScrollReveal().reveal('.home-img img, .project-container, .portfolio-box, .contact form',{origin:'bottom'});
ScrollReveal().reveal('.home-content h1, .about-img img',{origin:'left'});
ScrollReveal().reveal('.home-content h3, .home-content p, .about-content',{origin:'right'});
   

 const text = "Felicia";
  const speed = 400; 
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      document.getElementById("typewriter").innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }

  window.addEventListener("DOMContentLoaded", typeWriter);

  //  À propos
const aboutText = "Je m'appelle Felicia VOLATAHINDRAZANA, j'ai 23 ans et je suis en bachelor développeuse web à HETIC. Les nouvelles technologies, les progrès technologiques et les différents langages de programmation constituent mes passions ! J'ai développé des compétences solides au cours de mes études et en autodidacte. Laissez-moi vous le démontrer !";

let j = 0;
const speed2 = 30; 

function typeWriterAbout() {
  if (j < aboutText.length) {
    document.getElementById("about-typewriter").innerHTML += aboutText.charAt(j);
    j++;
    setTimeout(typeWriterAbout, speed2);
  }
}


window.addEventListener("DOMContentLoaded", () => {
  typeWriter(); 
  typeWriterAbout(); 
});

document.getElementById('contact-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());

  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  alert(result.message);
});
