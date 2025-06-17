document.addEventListener('DOMContentLoaded', function() {

    // Мобильное меню

    const hamburger = document.querySelector('.hamburger');

    const navMenu = document.querySelector('.nav-menu');

    

    hamburger.addEventListener('click', function() {

        this.classList.toggle('active');

        navMenu.classList.toggle('active');

        

        // Блокировка прокрутки при открытом меню

        if (navMenu.classList.contains('active')) {

            document.body.style.overflow = 'hidden';

        } else {

            document.body.style.overflow = '';

        }

    });

    

    // Закрытие меню при клике на пункт

    document.querySelectorAll('.nav-item a').forEach(item => {

        item.addEventListener('click', () => {

            hamburger.classList.remove('active');

            navMenu.classList.remove('active');

            document.body.style.overflow = '';

        });

    });

    

    // Плавная прокрутка для якорных ссылок

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener('click', function(e) {

            e.preventDefault();

            

            const targetId = this.getAttribute('href');

            const targetElement = document.querySelector(targetId);

            

            if (targetElement) {

                window.scrollTo({

                    top: targetElement.offsetTop - 80,

                    behavior: 'smooth'

                });

            }

        });

    });

    

    // Галерея

    const slider = document.querySelector('.gallery-slider');

    const slides = document.querySelectorAll('.slide');

    const prevBtn = document.querySelector('.prev-btn');

    const nextBtn = document.querySelector('.next-btn');

    const dotsContainer = document.querySelector('.gallery-dots');

    let currentSlide = 0;

    

    // Создаем точки для навигации

    slides.forEach((_, index) => {

        const dot = document.createElement('span');

        dot.classList.add('dot');

        if (index === 0) dot.classList.add('active');

        dot.addEventListener('click', () => goToSlide(index));

        dotsContainer.appendChild(dot);

    });

    

    const dots = document.querySelectorAll('.dot');

    

    // Функция переключения слайдов

    function goToSlide(slideIndex) {

        slider.style.transform = `translateX(-${slideIndex * 100}%)`;

        

        // Обновляем активный слайд

        slides.forEach(slide => slide.classList.remove('active'));

        slides[slideIndex].classList.add('active');

        

        // Обновляем активную точку

        dots.forEach(dot => dot.classList.remove('active'));

        dots[slideIndex].classList.add('active');

        

        currentSlide = slideIndex;

    }

    

    // Следующий слайд

    function nextSlide() {

        currentSlide = (currentSlide + 1) % slides.length;

        goToSlide(currentSlide);

    }

    

    // Предыдущий слайд

    function prevSlide() {

        currentSlide = (currentSlide - 1 + slides.length) % slides.length;

        goToSlide(currentSlide);

    }

    

    // Обработчики кнопок

    nextBtn.addEventListener('click', nextSlide);

    prevBtn.addEventListener('click', prevSlide);

    

    // Автопрокрутка галереи

    let slideInterval = setInterval(nextSlide, 10000);

    

    // Остановка автопрокрутки при наведении

    slider.addEventListener('mouseenter', () => {

        clearInterval(slideInterval);

    });

    

    // Возобновление автопрокрутки

    slider.addEventListener('mouseleave', () => {

        slideInterval = setInterval(nextSlide, 10000);

    });

    

    // Анимация при скролле

    const animateOnScroll = () => {

        const sections = document.querySelectorAll('.section');

        

        sections.forEach(section => {

            const sectionTop = section.getBoundingClientRect().top;

            const windowHeight = window.innerHeight;

            

            if (sectionTop < windowHeight - 100) {

                section.style.opacity = '1';

                section.style.transform = 'translateY(0)';

            }

        });

    };

    

    // Запускаем при загрузке

    window.addEventListener('load', animateOnScroll);

    // И при скролле

    window.addEventListener('scroll', animateOnScroll);

});
