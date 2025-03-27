document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("usernameInput").value;
    const password = document.getElementById("passwordInput").value;

    if (username === "user" && password === "1234") {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("username", username);
        window.location.href = "profile.html";
    } else {
        alert("Invalid credentials!");
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const languageSwitcher = document.getElementById("language-switcher");
    let currentLang = localStorage.getItem("lang") || "lv"; // По умолчанию латышский

    function changeLanguage(lang) {
        fetch("/locales/lang.json")
            .then(response => response.json())
            .then(data => {
                document.getElementById("nav-home").textContent = data.home[lang];
                document.getElementById("nav-courses").textContent = data.courses[lang];
                document.getElementById("nav-cv").textContent = data.your_cv[lang];
                document.getElementById("nav-blog").textContent = data.blog[lang];
                document.getElementById("nav-profile").textContent = data.profile[lang];
                document.getElementById("login-title").textContent = data.login_title[lang];
                document.getElementById("email-label").textContent = data.email_label[lang];
                document.getElementById("usernameInput").placeholder = data.email_placeholder[lang];
                document.getElementById("password-label").textContent = data.password_label[lang];
                document.getElementById("passwordInput").placeholder = data.password_placeholder[lang];
                document.getElementById("forgot-password").textContent = data.forgot_password[lang];
                document.getElementById("sign-in-btn").textContent = data.sign_in[lang];
                document.getElementById("or-continue").textContent = data.or_continue[lang];
                document.getElementById("register-text").textContent = data.register_text[lang];
                document.getElementById("register-link").textContent = data.register_link[lang];
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
