document.addEventListener("DOMContentLoaded", function () {
    const carouselTrack = document.querySelector(".carousel-track");
    const templates = Array.from(document.querySelectorAll(".carousel-track .template"));
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    if (!carouselTrack || templates.length === 0) {
        console.error("Ошибка: .carousel-track или .template не найдены");
        return;
    }

    const visibleItems = 1; 
    const templateWidth = templates[0].offsetWidth + 30;
    let index = 0;
    let isTransitioning = false;

    // Дублируем первые и последние элементы для плавного зацикливания
    templates.forEach(template => {
        const clone = template.cloneNode(true);
        carouselTrack.appendChild(clone);
    });

    templates.slice().reverse().forEach(template => {
        const clone = template.cloneNode(true);
        carouselTrack.insertBefore(clone, carouselTrack.firstChild);
    });

    // Устанавливаем начальную позицию с учетом дублированных элементов
    let startPosition = -templateWidth * templates.length;
    carouselTrack.style.transform = `translateX(${startPosition}px)`;

    function moveNext() {
        if (isTransitioning) return;
        isTransitioning = true;
        index++;

        carouselTrack.style.transition = "transform 0.5s ease-in-out";
        carouselTrack.style.transform = `translateX(${startPosition - templateWidth * index}px)`;

        setTimeout(() => {
            if (index >= templates.length) {
                index = 0;
                carouselTrack.style.transition = "none";
                carouselTrack.style.transform = `translateX(${startPosition}px)`;
            }
            isTransitioning = false;
        }, 500);
    }

    function movePrev() {
        if (isTransitioning) return;
        isTransitioning = true;
        index--;

        carouselTrack.style.transition = "transform 0.5s ease-in-out";
        carouselTrack.style.transform = `translateX(${startPosition - templateWidth * index}px)`;

        setTimeout(() => {
            if (index < 0) {
                index = templates.length - 1;
                carouselTrack.style.transition = "none";
                carouselTrack.style.transform = `translateX(${startPosition - templateWidth * index}px)`;
            }
            isTransitioning = false;
        }, 500);
    }

    nextButton.addEventListener("click", moveNext);
    prevButton.addEventListener("click", movePrev);
    setInterval(moveNext, 4000);
});

document.addEventListener("DOMContentLoaded", function () {
    let navbar = document.querySelector("header");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            navbar.style.padding = "-30px 0";
            navbar.style.background = "rgb(255, 255, 255)"; // Затемнение при скролле
        } else {
            navbar.style.background = "transparent"; // Прозрачный, если вверху страницы
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    let lastScrollTop = 0;
    const navbar = document.querySelector("header"); // Указываем твой навбар

    window.addEventListener("scroll", function () {
        let currentScroll = window.scrollY;

        if (currentScroll > lastScrollTop) {
            // Скроллим вниз – прячем навбар
            navbar.style.top = "-110px"; // Можно увеличить, если навбар больше
        } else {
            // Скроллим вверх – показываем навбар
            navbar.style.top = "0";
        }
        lastScrollTop = currentScroll;
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const coursesLink = document.querySelector('a[href="#courses"]'); // Находим ссылку
    const coursesSection = document.querySelector("#courses"); // Находим секцию

    if (coursesLink && coursesSection) {
        coursesLink.addEventListener("click", function(event) {
            event.preventDefault(); // Отменяем стандартное действие ссылки
            const offset = 110; // Регулируем насколько ниже прокручивать
            const sectionPosition = coursesSection.offsetTop - offset;

            window.scrollTo({
                top: sectionPosition,
                behavior: "smooth" // Делаем прокрутку плавной
            });
        });
    }
});
document.addEventListener("DOMContentLoaded", function() {
    const coursesLink = document.querySelector('a[href="#pakalpojumi"]'); // Находим ссылку
    const coursesSection = document.querySelector("#pakalpojumi"); // Находим секцию

    if (coursesLink && coursesSection) {
        coursesLink.addEventListener("click", function(event) {
            event.preventDefault(); // Отменяем стандартное действие ссылки
            const offset = 120; // Регулируем насколько ниже прокручивать
            const sectionPosition = coursesSection.offsetTop - offset;

            window.scrollTo({
                top: sectionPosition,
                behavior: "smooth" // Делаем прокрутку плавной
            });
        });
    }
});

//LANGUAGE SWITCHER 

document.addEventListener("DOMContentLoaded", function () {
    const languageSwitcher = document.getElementById("language-switcher");
    let currentLang = localStorage.getItem("lang") || "lv"; // По умолчанию латышский

    function changeLanguage(lang) {
        fetch("/locales/lang.json")
            .then(response => response.json())
            .then(data => {
                // Обновляем текст в навигации
                document.getElementById("nav-home").textContent = data.home[lang];
                document.getElementById("nav-courses").textContent = data.courses[lang];
                document.getElementById("nav-cv").textContent = data.your_cv[lang];
                document.getElementById("nav-blog").textContent = data.blog[lang];
                document.getElementById("nav-profile").textContent = data.profile[lang];

                // Обновляем заголовок и описание главной страницы
                document.getElementById("hero-title").textContent = data.hero_title[lang];
                document.getElementById("hero-subtitle").textContent = data.hero_subtitle[lang];
                document.getElementById("create-resume").textContent = data.create_resume[lang];

                // Обновляем блок с курсами
                document.getElementById("courses-title").textContent = data.courses_title[lang];
                document.getElementById("courses-description").textContent = data.courses_description[lang];
                document.getElementById("btn-buy-course").textContent = data.btn_buy_course[lang];
                document.getElementById("course-price").textContent = data.course_price[lang];

                // Оптимизация контента
                document.getElementById("optimize-title").textContent = data.optimize_title[lang];
                document.getElementById("optimize-text").textContent = data.optimize_text[lang];

                // Раздел "Как мы можем помочь?"
                document.getElementById("help-title").textContent = data.help_title[lang];
                document.getElementById("help-resume-title").textContent = data.help_resume_title[lang];
                document.getElementById("help-resume-text").textContent = data.help_resume_text[lang];
                document.getElementById("help-ats-title").textContent = data.help_ats_title[lang];
                document.getElementById("help-ats-text").textContent = data.help_ats_text[lang];
                document.getElementById("help-review-title").textContent = data.help_review_title[lang];
                document.getElementById("help-review-text").textContent = data.help_review_text[lang];
                document.getElementById("help-guidance-title").textContent = data.help_guidance_title[lang];
                document.getElementById("help-guidance-text").textContent = data.help_guidance_text[lang];

                // Обновляем блок "АвтоBlur" (сетка 3х3)
                document.getElementById("quality").textContent = data.quality[lang];
                document.getElementById("new-templates").textContent = data.new_templates[lang];
                document.getElementById("free-use").textContent = data.free_use[lang];
                document.getElementById("grid-courses").textContent = data.grid_courses[lang];
                document.getElementById("assistant-team").textContent = data.assistant_team[lang];

                // Обновляем кнопки выбора шаблонов
                document.querySelectorAll(".select-template").forEach((el) => {
                    el.textContent = data.select_template[lang];
                });

                // Меняем текст кнопки переключения языка
                languageSwitcher.textContent = lang === "lv" ? "LV" : "EN";
            });

        // Сохраняем выбранный язык в LocalStorage
        localStorage.setItem("lang", lang);
    }

    // Переключение языка при клике на кнопку
    languageSwitcher.addEventListener("click", function () {
        currentLang = currentLang === "lv" ? "en" : "lv";
        changeLanguage(currentLang);
    });

    // Загружаем язык при старте страницы
    changeLanguage(currentLang);
});



document.addEventListener("DOMContentLoaded", function() { 
    const images = document.querySelectorAll(".resume-img");

    if (images.length === 0) {
        console.error("❌ Ошибка: Изображения с классом 'resume-img' не найдены.");
        return;
    }

    let currentIndex = 0;

    function changeImage() {
        if (images.length === 0) return; 
        images[currentIndex].classList.remove("active");
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add("active");
        setTimeout(changeImage, 5500); 
    }

    images[currentIndex].classList.add("active");
    setTimeout(changeImage, 5500);
});

document.addEventListener("DOMContentLoaded", function () {
    const languageSwitcher = document.getElementById("language-switcher");
    let currentLang = localStorage.getItem("lang") || "lv"; // По умолчанию латышский язык

    function changeLanguage(lang) {
        fetch("/locales/lang.json")
            .then(response => response.json())
            .then(data => {
                document.getElementById("nav-home").textContent = data.home[lang];
                document.getElementById("nav-courses").textContent = data.courses[lang];
                document.getElementById("nav-cv").textContent = data.your_cv[lang];
                document.getElementById("nav-blog").textContent = data.blog[lang];
                document.getElementById("nav-profile").textContent = data.profile[lang];
                // Обновляем заголовки и тексты на странице Your CV
                document.getElementById("your-cv-title").textContent = data.your_cv_title[lang];
                document.getElementById("cv-main-title").textContent = data.cv_main_title[lang];
                document.getElementById("breadcrumb-home").textContent = data.breadcrumb_home[lang];
                document.getElementById("breadcrumb-your-cv").textContent = data.breadcrumb_your_cv[lang];
                document.getElementById("cv-description").textContent = data.cv_description[lang];
                document.getElementById("cv-upload-title").textContent = data.cv_upload_title[lang];
                document.getElementById("cv-upload-info").textContent = data.cv_upload_info[lang];
                document.getElementById("cv-upload-btn").textContent = data.cv_upload_btn[lang];
            })
            .catch(error => console.error("Error loading language file:", error));

        // Сохраняем выбранный язык в LocalStorage
        localStorage.setItem("lang", lang);
    }

    // Переключение языка при клике на кнопку
    languageSwitcher.addEventListener("click", function () {
        currentLang = currentLang === "lv" ? "en" : "lv";
        changeLanguage(currentLang);
    });

    // Загружаем язык при старте страницы
    changeLanguage(currentLang);
});
