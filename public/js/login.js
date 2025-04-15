document.addEventListener("DOMContentLoaded", function () {
  // Языковой переключатель
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
      })
      .catch(err => console.error("Ошибка при загрузке языка: ", err));

    // Сохраняем выбранный язык
    localStorage.setItem("lang", lang);
  }

  if (languageSwitcher) {
    languageSwitcher.addEventListener("click", function () {
      currentLang = currentLang === "lv" ? "en" : "lv";
      changeLanguage(currentLang);
    });
  }

  // Загружаем язык при старте страницы
  changeLanguage(currentLang);

  // Обработчик логина через fetch
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      
      const email = document.getElementById("usernameInput").value;
      const password = document.getElementById("passwordInput").value;

      try {
        const response = await fetch("/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok && data.token) {
          localStorage.setItem("authToken", data.token);
          window.location.href = "profile.html";  // Открываем профильную страницу
        } else {
          alert(data.error || "Ошибка авторизации. Проверьте введённые данные.");
        }
      } catch (error) {
        console.error("Ошибка запроса:", error);
        alert("Ошибка при попытке войти в систему");
      }
    });
  }
});
