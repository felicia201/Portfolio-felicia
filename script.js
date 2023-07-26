const parentContainer= document.querySelector('.about-content');
parentContainer.addEventListener('click',event=>{
    const current = event.target;
    const readmore= current.className.includes('Btn');
    if(!readmore)return;

    const currentText =event.target.parentNode.querySelector('.read_more_text');
    currentText.classList.toggle('read_more_text--show');
    current.textContent =current.textContent.incluses('en savoir plus') ?
    "savoir moins..." : "savoir plus";


})
// menu nav bar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick =()=> {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

let section = document.querySelector('section');
let navlinks = document.querySelector('header nav a');

window.onscroll =() => {
    section.forEach(sec => {
        let top  = window.scrollY;
        let offset = sec .offsetTop -150;
        let height = sec .offsetheight;
        let id =sec .getAttribute('id');

        if(top >= offset && top <offset + height) {
            navlinks.forEach(links=>{
                links.classList.remove('active');
                document.querySelector('header nav a[href* ='+ id + ']').classList.add('active');
            });

        };
    }); 

let header = document.querySelector('.header');
header.classList.toggle('sticky',window.scrollY > 100);


/*bouger le menu nav bar */
menuIcon.classList.remove('bx-x');
navbar.classList.remove('active');
};

/*light mode*/
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
   



// script notifications
// Effectuer une requête AJAX pour récupérer les notifications/messages du serveur
var xhr = new XMLHttpRequest();
xhr.open('GET', 'check_notifications.php', true);
xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            // Traitement de la réponse du serveur
            var notifications = JSON.parse(xhr.responseText); // Pour JSON
            // var xmlDoc = xhr.responseXML; // Pour XML

            // Afficher les notifications ou les messages dans votre interface utilisateur
            var notificationList = document.getElementById('notification-list');
            notificationList.innerHTML = '';

            for (var i = 0; i < notifications.length; i++) {
                var notification = notifications[i];
                var li = document.createElement('li');
                li.textContent = notification.message;
                notificationList.appendChild(li);
            }
        } else {
            console.error('Une erreur s\'est produite : ' + xhr.status);
        }
    }
};

xhr.send();
