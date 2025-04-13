import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Варіант для тестування з json-server:
      const response = await fetch(`http://localhost:3001/users?email=${email}&password=${password}`);
      const data = await response.json();

      if (data.length > 0) {
        setMessage('Успішний вхід!');
        localStorage.setItem('user', JSON.stringify(data[0]));  // Запис у localStorage
        navigate('/');
      }
       else {
        setMessage('Невірний email або пароль');
      }

      // Варіант для справжнього бекенду:
      /*
      const response = await fetch('http://localhost:3001/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        setMessage('Успішний вхід!');
        navigate('/');
      } else {
        setMessage('Помилка входу');
      }
      */
    } catch {
      setMessage('Помилка підключення до сервера');
    }
  };

  return (
    <div className="auth-container">
      <h2>Вхід</h2>

      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Пароль" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button className="login-btn" onClick={handleLogin}>Увійти</button>

      <p className="message">{message}</p>

      <p className="register-link">
        Не маєте акаунту? <Link to="/register">Зареєструйтесь</Link>
      </p>
    </div>
  );
};

export default Login;
