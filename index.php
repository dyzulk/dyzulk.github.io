<!DOCTYPE html>
<html lang="en">
    <head>
        <?php $IPATH = $_SERVER["DOCUMENT_ROOT"]."/assets/php/"; include($IPATH."header.php")?>
    </head>
    <body>
        <main class="l-main">

            
            <?php include($IPATH."navbar.php")?>

            <!--===== HOME =====-->
            <section class="home bd-grid" id="home">
                <div class="home__data">
                    <h1 class="home__title">Hi,<br>I'am <span class="home__title-color">Herdy</span><br> Web Designer</h1>

                    <a href="#contact" class="button">Contact</a>
                </div>

                <div class="home__social">
                    <a href="https://id.linkedin.com/in/dyzulk" class="home__social-icon"><i class='bx bxl-linkedin'></i></a>
                    <a href="https://dyzulk.com" class="home__social-icon"><i class='bx bx-globe' ></i></a>
                    <a href="https://github.com/dyzulk" class="home__social-icon"><i class='bx bxl-github' ></i></a>
                </div>

                <div class="home__img">
                    <svg class="home__blob" viewBox="0 0 479 467" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <mask id="mask0" mask-type="alpha">
                            <path d="M9.19024 145.964C34.0253 76.5814 114.865 54.7299 184.111 29.4823C245.804 6.98884 311.86 -14.9503 370.735 14.143C431.207 44.026 467.948 107.508 477.191 174.311C485.897 237.229 454.931 294.377 416.506 344.954C373.74 401.245 326.068 462.801 255.442 466.189C179.416 469.835 111.552 422.137 65.1576 361.805C17.4835 299.81 -17.1617 219.583 9.19024 145.964Z"/>
                        </mask>
                        <g mask="url(#mask0)">
                            <path d="M9.19024 145.964C34.0253 76.5814 114.865 54.7299 184.111 29.4823C245.804 6.98884 311.86 -14.9503 370.735 14.143C431.207 44.026 467.948 107.508 477.191 174.311C485.897 237.229 454.931 294.377 416.506 344.954C373.74 401.245 326.068 462.801 255.442 466.189C179.416 469.835 111.552 422.137 65.1576 361.805C17.4835 299.81 -17.1617 219.583 9.19024 145.964Z"/>
                            <image class="home__blob-img" x="50" y="60" href="assets/img/perfil.png"/>
                        </g>
                    </svg>
                </div>
            </section>

            <!--===== ABOUT =====-->
            <section class="about section " id="about">
                <h2 class="section-title">About</h2>

                <div class="about__container bd-grid">
                    <div class="about__img">
                        <img src="assets/img/about.jpg" alt="Muhammad Herdy Iskandar">
                    </div>
                    
                    <div>
                        <h2 class="about__subtitle">I'am Herdy</h2>
                        <p class="about__text">A 18 year old Indonesian student living in Cirebon, Indonesian. You might have seen me on Facebook or Instagram. Now here you are. Yes, I write, too. Because there are so many things I cannot say out loud, yet I always find a way to put it into words.</p>           
                    </div>                                   
                </div>
            </section>

            <!--===== SKILLS =====-->
            <section class="skills section" id="skills">
                <h2 class="section-title">Skills</h2>

                <div class="skills__container bd-grid">          
                    <div>
                        <h2 class="skills__subtitle">Profesional Skills</h2>
                        <p class="skills__text">I’m Herdy, from Indonesia. I’ve spent my time to take any opportunity as well as developing my experience and skills to things like Content Creator, Graphic Designing, Programming, and many others.<br/><br/>But one thing I always stick with everything is, I always do every works as my passion, and that's what makes me happy also giving myself a chance to deliver best works that i can do.</p>
                        <div class="skills__data">
                            <div class="skills__names">
                                <i class='bx bxl-html5 skills__icon'></i>
                                <span class="skills__name">HTML5</span>
                            </div>
                            <div class="skills__bar skills__html">

                            </div>
                            <div>
                                <span class="skills__percentage">90%</span>
                            </div>
                        </div>
                        <div class="skills__data">
                            <div class="skills__names">
                                <i class='bx bxl-css3 skills__icon'></i>
                                <span class="skills__name">CSS3</span>
                            </div>
                            <div class="skills__bar skills__css">
                                
                            </div>
                            <div>
                                <span class="skills__percentage">85%</span>
                            </div>
                        </div>
                        <div class="skills__data">
                            <div class="skills__names">
                                <i class='bx bxl-javascript skills__icon' ></i>
                                <span class="skills__name">JAVASCRIPT</span>
                            </div>
                            <div class="skills__bar skills__js">
                                
                            </div>
                            <div>
                                <span class="skills__percentage">65%</span>
                            </div>
                        </div>
                        <div class="skills__data">
                            <div class="skills__names">
                                <i class='bx bxs-paint skills__icon'></i>
                                <span class="skills__name">UX/UI</span>
                            </div>
                            <div class="skills__bar skills__ux">
                                
                            </div>
                            <div>
                                <span class="skills__percentage">85%</span>
                            </div>
                        </div>
                    </div>
                    
                    <div>              
                        <img src="assets/img/work3.jpg" alt="" class="skills__img">
                    </div>
                </div>
            </section>

            <!--===== WORK =====-->
            <section class="work section" id="work">
                <h2 class="section-title">Work</h2>

                <div class="work__container bd-grid">
                    <a href="" class="work__img">
                        <img src="assets/img/work1.jpg" alt="">
                    </a>
                    <a href="" class="work__img">
                        <img src="assets/img/work2.jpg" alt="">
                    </a>
                    <a href="" class="work__img">
                        <img src="assets/img/work3.jpg" alt="">
                    </a>
                    <a href="" class="work__img">
                        <img src="assets/img/work4.jpg" alt="">
                    </a>
                    <a href="" class="work__img">
                        <img src="assets/img/work5.jpg" alt="">
                    </a>
                    <a href="" class="work__img">
                        <img src="assets/img/work6.jpg" alt="">
                    </a>
                </div>
            </section>

            <!--===== CONTACT =====-->
            <section class="contact section" id="contact">
                <h2 class="section-title">Contact</h2>

                <div class="contact__container bd-grid">
                    <form action="https://formspree.io/f/mdobzbbr" method="POST" class="contact__form">
                        <input type="text" name="name" placeholder="Name" class="contact__input" required="">
                        <input type="mail" name="email"  placeholder="Email" class="contact__input" required="">
                        <input type="text" name="subject"  placeholder="Subject" class="contact__input" required="">
                        <textarea type="message" name="message" placeholder="Message" id="" cols="0" rows="10" class="contact__input" required=""></textarea>
                        <button class="contact__button button" type="submit" name="submit" value="submit" >Send</button>
                    </form>
                </div>
                <div style="text-align: center;">
					<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.1851094133394!2d108.36259749999999!3d-6.498234300000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6ec36c5d3a70f9%3A0x7ae03457d77ea7c5!2sDyzulk%20-%20Seinjak%20%26%20Sejejak!5e0!3m2!1sid!2sid!4v1646790899934!5m2!1sid!2sid" width="95%" height="450" style="border: 25; margin-top: 30px;" allowfullscreen="" loading="lazy"></iframe>
				</div>
            </section>
        </main>

        <?php include($IPATH."footer.php")?>

        <!--===== SCROLL REVEAL =====-->
        <script src="https://unpkg.com/scrollreveal"></script>

        <!--===== MAIN JS =====-->
        <script src="assets/js/main.js"></script>
    </body>
</html>