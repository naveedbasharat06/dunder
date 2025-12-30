
        const slider = document.getElementById('slider');
        const header = document.getElementById('main-header');
        const slides = document.querySelectorAll('.slide');
        const cursor = document.getElementById('cursor');
        const cursorIcon = document.getElementById('cursor-icon');

        let currentIndex = 0;
        let isLeftSide = false;
        let autoPlay;
        window.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.2,
                ease: "power2.out"
            });

            isLeftSide = e.clientX < window.innerWidth / 2;
            cursorIcon.className = isLeftSide 
                ? "fa-solid fa-chevron-left" 
                : "fa-solid fa-chevron-right";
        });

        const hideCursor = () => gsap.to(cursor, { opacity: 0, duration: 0.2 });
        const showCursor = () => {
            if (window.innerWidth >= 768) {
                gsap.to(cursor, { opacity: 1, duration: 0.2 });
            }
        };

        header.addEventListener('mouseenter', hideCursor);
        header.addEventListener('mouseleave', (e) => {
            if (e.clientY > header.offsetHeight) showCursor();
        });
        slider.addEventListener('mouseenter', showCursor);
        slider.addEventListener('mouseleave', hideCursor);

        function updateSlides() {
            slides.forEach((slide, index) => {
                if (index === currentIndex) {
                    slide.classList.add('active');
                    gsap.to(slide, { opacity: 1, duration: 0.2 });
                } else {
                    slide.classList.remove('active');
                    gsap.to(slide, { opacity: 0, duration: 0.2 });
                }
            });
        }

        function startAutoPlay() {
            clearInterval(autoPlay);
            autoPlay = setInterval(() => {
                currentIndex = (currentIndex + 1) % slides.length;
                updateSlides();
            }, 8000);
        }

        slider.addEventListener('click', (e) => {
           
            if (e.target.closest('header')) return;
            
            if (isLeftSide) {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            } else {
                currentIndex = (currentIndex + 1) % slides.length;
            }
            updateSlides();
            startAutoPlay();
        });

        updateSlides();
        startAutoPlay();
    