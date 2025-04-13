import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      // Варіант для тесту з json-server:
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      if (response.ok) {
        setMessage('Успішна реєстрація!');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setMessage('Помилка реєстрації');
      }

      // Варіант для справжнього бекенду:
      /*
      const response = await fetch('http://localhost:3001/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      if (response.ok) {
        setMessage('Успішна реєстрація!');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setMessage('Помилка реєстрації');
      }
      */
    } catch {
      setMessage('Помилка підключення до сервера');
    }
  };

  return (
    <div className="auth-container">
      <h2>Реєстрація</h2>

      <input placeholder="Ім'я" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Пароль" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button className="login-btn" onClick={handleRegister}>Зареєструватись</button>

      <p className="message">{message}</p>

      <p className="register-link">
        Вже маєте акаунт? <Link to="/login">Увійти</Link>
      </p>
    </div>
  );
};

export default Register;
