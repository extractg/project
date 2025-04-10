// public/js/signup.js
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
  
    signupForm.addEventListener('submit', async function (e) {
      e.preventDefault(); // Предотвращаем стандартное поведение
  
      const email = document.getElementById('emailInput').value;
      const password = document.getElementById('passwordInput').value;
      const confirmPassword = document.getElementById('confirmPasswordInput').value;
  
      if (password !== confirmPassword) {
        alert('Пароли не совпадают.');
        return;
      }
  
      try {
        const response = await fetch('/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });
  
        const data = await response.json();
  
        if (response.ok && data.token) {
          // Сохраняем токен после успешной регистрации
          localStorage.setItem('authToken', data.token);
          // Перенаправляем на защищённую страницу или сразу на профиль
          window.location.href = '/profile.html';
        } else {
          alert(data.error || 'Ошибка регистрации.');
        }
      } catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка при регистрации');
      }
    });
  });
  