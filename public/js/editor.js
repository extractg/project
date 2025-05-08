// js/editor.js

// При загрузке страницы показываем выбранный шаблон и синхронизируем поля
document.addEventListener('DOMContentLoaded', () => {
  // Получаем идентификатор шаблона из localStorage или используем шаблон-1 по умолчанию
  const selected = localStorage.getItem('selectedTemplate') || 'template-1';

  // Скрываем все превью-шаблоны и панели
  document.querySelectorAll('.cv-template').forEach(t => t.style.display = 'none');
  document.querySelectorAll('.editor-panel').forEach(p => p.style.display = 'none');

  // Показываем нужный шаблон и панель редактора
  const tpl   = document.getElementById(selected);
  const panel = document.getElementById(`panel-${selected}`);
  if (tpl)   tpl.style.display   = 'block';
  if (panel) panel.style.display = 'flex';

  // Синхронизируем все поля ввода <-> превью и localStorage
  panel.querySelectorAll('[data-target]').forEach(input => {
    const targetId  = input.dataset.target;
    const previewEl = document.getElementById(targetId);
    if (!previewEl) return;

    const key = `${selected}-${targetId}`;
    const saved = localStorage.getItem(key);

    // Начальное состояние
    if (saved) {
      previewEl.textContent = saved;
      input.value           = saved;
    } else {
      previewEl.textContent = '';
      input.value           = '';
    }

    // При изменении поля
    input.addEventListener('input', () => {
      const v = input.value.trim();
      if (v) {
        previewEl.textContent = v;
        localStorage.setItem(key, v);
      } else {
        previewEl.textContent = '';
        localStorage.removeItem(key);
      }
    });
  });
});

// Функция скачивания активного шаблона в PDF (A4, high DPI)
function downloadPDF() {
  const template = Array.from(document.querySelectorAll('.cv-template'))
    .find(t => getComputedStyle(t).display !== 'none');
  if (!template) return;

  const opt = {
    margin:      [10, 10, 10, 10],         // поля в мм
    filename:    'my-resume.pdf',
    image:       { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF:       { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak:   { mode: ['css','legacy'] } // respect CSS page-break-*
  };

  html2pdf()
    .set(opt)
    .from(template)
    .save();
}

// Выставляем downloadPDF глобально для кнопки
window.downloadPDF = downloadPDF;
/**
 * Загружает выбранный файл и подставляет его в <img> по id.
 * @param {HTMLInputElement} input — тот самый <input type="file">
 * @param {string} targetId — id <img>, в который нужно вставить картинку
 */
window.handleImageUpload = function(input, targetId) {
  if (!input.files || !input.files[0]) return;
  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = document.getElementById(targetId);
    if (img) {
      img.src = e.target.result;
    }
  };
  reader.readAsDataURL(file);
};


document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('beta-overlay');
  if (!overlay) return;

  // 1) Показываем оверлей
  overlay.classList.add('show');

  // 2) Скрываем через 3 секунды
  setTimeout(() => {
    overlay.classList.add('hide');

    // После окончания анимации скрываем совсем
    overlay.addEventListener('animationend', function handler(e) {
      if (e.animationName === 'fadeOutOverlay') {
        overlay.remove();
        overlay.removeEventListener('animationend', handler);
      }
    });
  }, 3000);
});
