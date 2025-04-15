import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage('Будь ласка, введіть email та пароль');
      return;
    }
  
    const loginUrl = 'http://localhost:8080/users/login';
  
    const basicAuth = btoa(`${email}:${password}`); // кодування в base64
  
    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${basicAuth}`,
        },
      });
  
      const data = await response.json();
      console.log('Дані від бекенду:', data);
  
      if (response.ok && data.email) {
        localStorage.setItem('user', JSON.stringify(data));
        setMessage('Успішний вхід!');
        navigate('/');
      } else {
        setMessage('Невірний email або пароль');
      }
    } catch (error) {
      console.error('Помилка підключення до сервера:', error);
      setMessage('Помилка підключення до сервера');
    }
  };
  

  return (
    <div className="auth-container">
      <h2>Вхід</h2>

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

      <button className="login-btn" onClick={handleLogin}>Увійти</button>

      <p className="message">{message}</p>

      <p className="register-link">
        Не маєте акаунту? <Link to="/register">Зареєструйтесь</Link>
      </p>
    </div>
  );
};

export default Login;
