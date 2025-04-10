document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('[data-target]').forEach(input => {
      const targetId = input.dataset.target;
      const targetElement = document.getElementById(targetId);
  
      if (!targetElement) {
        console.warn(`⚠️ Element with ID "${targetId}" not found.`);
        return;
      }
  
      // безопасное получение data-default
      const defaultValue = targetElement.dataset.default || '[Text]';
  
      // Восстановление при загрузке
      const storedValue = localStorage.getItem(targetId);
      if (storedValue) {
        targetElement.textContent = storedValue;
        input.value = storedValue;
      } else {
        targetElement.textContent = defaultValue;
        input.value = '';
      }
  
      // Обновление при вводе
      input.addEventListener('input', () => {
        const value = input.value.trim();
        if (value) {
          targetElement.textContent = value;
          localStorage.setItem(targetId, value);
        } else {
          targetElement.textContent = defaultValue;
          localStorage.setItem(targetId, defaultValue);
        }
      });
    });
  });
  