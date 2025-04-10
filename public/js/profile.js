// public/js/profile.js
document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('authToken');
  
    if (!token) {
      // Если токена нет, перенаправляем на страницу логина
      window.location.href = '/login.html';
      return;
    }
  
    try {
      const response = await fetch('/profile', {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
  
      if (response.status === 401 || response.status === 403) {
        // Если токен недействителен или истёк
        alert('Сессия истекла. Пожалуйста, войдите снова.');
        localStorage.removeItem('authToken');
        window.location.href = '/login.html';
        return;
      }
  
      const data = await response.json();
  
      // Отображаем информацию профиля
      const profileContent = document.getElementById('profile-content');
      profileContent.innerHTML = `<h2>${data.message}</h2>`;
    } catch (error) {
      console.error('Ошибка загрузки профиля:', error);
      alert('Ошибка при получении данных профиля.');
    }
    
    // Логика для выхода из системы
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('authToken');
      window.location.href = '/login.html';
    });
  });
  