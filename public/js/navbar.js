document.addEventListener('DOMContentLoaded', () => {
  // Обработчик для ссылки профиля
  const profileLink = document.getElementById('nav-profile');
  if (profileLink) {
    profileLink.addEventListener('click', (e) => {
      e.preventDefault(); // Отменяем стандартное поведение ссылки
      const token = localStorage.getItem('authToken');
      if (token) {
        // Если токен есть, пользователь считается авторизованным
        window.location.href = 'profile.html';
      } else {
        // Если токена нет, перенаправляем на страницу логина
        window.location.href = 'login.html';
      }
    });
  }

  // Если хотите переопределить поведение других ссылок в навигационном меню,
  // можно добавить обработчики для них. Например, чтобы не давать доступ к другим страницам, если пользователь не авторизован:
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Здесь можно указать условие для публичных разделов (login.html и sign.up.html оставляем доступными)
      const publicPages = ['login.html', 'sign.up.html', '#courses', '#pakalpojumi', 'index.html', 'templates.html', 'template.html', 'courses.html'];
      
      // Получаем путь, на который ведёт ссылка (без учета ведущего слэша)
      const href = link.getAttribute('href').replace(/^\//, '');
      
      // Если ссылка не ведет к публичной странице, проверяем авторизацию
      if (!publicPages.includes(href)) {
        const token = localStorage.getItem('authToken');
        if (!token) {
          e.preventDefault();
          window.location.href = 'login.html';
        }
      }
    });
  });
});


const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = navMenu.querySelectorAll('a');

function toggleMenu() {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('show');

  if (navMenu.classList.contains('show')) {
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
  }
}

hamburger.addEventListener('click', toggleMenu);

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('show');
    document.body.classList.remove('no-scroll');
  });
});
function updateMenuHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Вешаем на resize / orientationchange / scroll
window.addEventListener('resize', updateMenuHeight);
window.addEventListener('orientationchange', updateMenuHeight);
window.addEventListener('scroll', updateMenuHeight);

// При загрузке 
updateMenuHeight();