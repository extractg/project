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
        fetch("lang.json")
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
