import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    // Проста перевірка, щоб не відправляти пусті поля
    if (!name || !email || !password) {
      setMessage('Будь ласка, заповніть всі поля');
      return;
    }

    try {
      console.log('Надсилаю дані реєстрації:', { name, email, password });

      const response = await fetch('http://localhost:8080/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      console.log('Статус відповіді:', response.status);

      const data = await response.json();
      console.log('Дані від бекенду:', data);

      if (response.ok) {
        console.log('Успішна реєстрація!');
        setMessage('Успішна реєстрація!');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        console.log('Помилка реєстрації');
        setMessage('Помилка реєстрації');
      }

    } catch (error) {
      console.error('Помилка на боці клієнта або мережі:', error);
      setMessage('Помилка підключення до сервера');
    }
  };

  return (
    <div className="auth-container">
      <h2>Реєстрація</h2>

      <input
        placeholder="Ім'я"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Пароль"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="login-btn" onClick={handleRegister}>Зареєструватись</button>

      <p className="message">{message}</p>

      <p className="register-link">
        Вже маєте акаунт? <Link to="/login">Увійти</Link>
      </p>
    </div>
  );
};

export default Register;
