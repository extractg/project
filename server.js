// server.js

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'YourSecretKey';

// Middleware для обработки urlencoded и JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/locales', express.static(path.join(__dirname, 'locales')));

// Раздача статических файлов из папки "public" без префикса
app.use(express.static(path.join(__dirname, 'public')));

// Инициализация Sequelize для работы с SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

// Определение модели пользователя
const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Синхронизация с базой данных
sequelize.sync()
  .then(() => console.log('База данных синхронизирована'))
  .catch(err => console.error('Ошибка синхронизации БД:', err));

/**
 * Middleware для проверки JWT-токена.
 * Извлекает токен из заголовка "Authorization" и проверяет его.
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401);
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Маршрут логина с генерацией JWT-токена
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Неверные данные' });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: 'Неверные данные' });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ message: 'Авторизация успешна', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Маршрут регистрации с генерацией JWT-токена
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({ email, passwordHash });
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.status(201).json({ message: 'Пользователь успешно зарегистрирован', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Пример защищённого маршрута
app.get('/profile', authenticateToken, (req, res) => {
  res.json({ message: `Добро пожаловать, ${req.user.email}!` });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
