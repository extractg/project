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
      const publicPages = ['login.html', 'sign.up.html', '#courses', '#pakalpojumi', 'index.html', 'templates.html', 'template.html', 'courses.html', 'index.html#pakalpojumi'];
      
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

let scrollPosition = 0;

function toggleMenu() {
  const isOpening = !navMenu.classList.contains('show');

  if (isOpening) {
    // Сохраняем текущую позицию
    scrollPosition = window.scrollY || document.documentElement.scrollTop;
    // Фиксируем body
    document.body.classList.add('no-scroll');
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.position = 'fixed';
  } else {
    // Снимаем фиксацию
    document.body.classList.remove('no-scroll');
    document.body.style.position = '';
    document.body.style.top = '';
    // Возвращаем на ту же позицию
    window.scrollTo(0, scrollPosition);
  }

  hamburger.classList.toggle('open');
  navMenu.classList.toggle('show');
}

// Обработка кликов по гамбургеру
hamburger.addEventListener('click', toggleMenu);

// Обработка кликов по ссылкам
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('show');
    document.body.classList.remove('no-scroll');
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, scrollPosition);
  });
});
// селектор контейнера, куда встраиваем подгруженные страницы
const MAIN = document.getElementById('main-content');
const NAV  = document.getElementById('nav-menu');

// утилита: берёт HTML-строку, парсит и выдаёт контент <main id="main-content">
function extractMain(htmlText) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlText, 'text/html');
  return doc.getElementById('main-content').innerHTML;
}

// обработчик кликов по навбара
NAV.addEventListener('click', async e => {
  const link = e.target.closest('a');
  if (!link) return;
  const href = link.getAttribute('href');

  // только наши внутренние ссылки
  if (href.startsWith('http') || href.startsWith('mailto:') || link.classList.contains('lang-btn')) {
    return; // внешние — пусть работают как обычно
  }

  e.preventDefault();

  try {
    // подгружаем новую страницу
    const res = await fetch(href, { credentials: 'same-origin' });
    if (!res.ok) throw new Error('Network error');

    const htmlText = await res.text();
    const newMain = extractMain(htmlText);

    // заменяем содержимое
    MAIN.innerHTML = newMain;

    // обновляем URL в адресной строке
    history.pushState(null, '', href);

    // если у URL есть hash, прокручиваем к нужному элементу
    const hash = location.hash;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    } else {
      // иначе наверх
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // если нужно — перезапускаем AOS или другие инициализации
    if (window.AOS) AOS.refresh();

  } catch (err) {
    console.error('Fetch failed:', err);
    // при ошибке можно просто перейти обычным способом
    window.location.href = href;
  }
});

// Обработка кнопок назад/вперед
window.addEventListener('popstate', async () => {
  try {
    const res = await fetch(location.pathname + location.hash, { credentials: 'same-origin' });
    if (!res.ok) throw new Error('Network error');

    const htmlText = await res.text();
    const newMain = extractMain(htmlText);
    MAIN.innerHTML = newMain;

    // аналогично скроллим
    const hash = location.hash;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }

    if (window.AOS) AOS.refresh();
  } catch (err) {
    console.error('Popstate fetch failed:', err);
  }
});