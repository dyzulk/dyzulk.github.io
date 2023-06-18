/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 

/*===== TELEGRAM BOT =====*/
function kirimPesan() {

    var nama = document.getElementById('name');
    var email = document.getElementById('email');
    var subject = document.getElementById('subject');
    var pesan = document.getElementById('message');

    var gabungan = '%F0%9D%90%8D%F0%9D%90%9A%F0%9D%90%A6%F0%9D%90%9A%20%3A%0A' + nama.value + '%F0%9D%90%84%F0%9D%90%A6%F0%9D%90%9A%F0%9D%90%A2%F0%9D%90%A5%20%3A%0A' + email.value + '%F0%9D%90%92%F0%9D%90%AE%F0%9D%90%9B%F0%9D%90%A3%F0%9D%90%9E%F0%9D%90%A4%20%3A%0A' + subject.value + '%F0%9D%90%8F%F0%9D%90%9E%F0%9D%90%AC%F0%9D%90%9A%F0%9D%90%A7%20%3A%0A' + message.value;

    var token = '6260715907:AAHYHXLrAwSjnUecHxLi0AC01k1FM0xbr8M'; // Ganti dengan token bot yang kamu buat
    var grup = '-836942032'; // Ganti dengan chat id dari bot yang kamu buat

    $.ajax({
        url: `https://api.telegram.org/bot${token}/sendMessage?chat_id=${grup}&text=${gabungan}&parse_mode=html`,
        method: `POST`,
    })
}
