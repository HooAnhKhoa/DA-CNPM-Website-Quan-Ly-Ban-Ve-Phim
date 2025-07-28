import React, { useState } from 'react';
import { login } from '../api';
import { useNavigate } from 'react-router-dom';
import Banner from '../components/Banner';
import Header from '../components/Header';
import './LoginPage.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await login(email, password);
      console.log('Login response:', res.data); // ⚠️ Thêm dòng này để kiểm tra
      localStorage.setItem('userID', res.data.UserID);
      localStorage.setItem('FullName', res.data.FullName); // Thêm dòng này
      localStorage.setItem('Email', res.data.Email);  
      const user = {
        UserID: res.data.UserID,
        FullName: res.data.FullName,
        Email: res.data.Email
      };
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
    } catch (err) {
      setError('Email hoặc mật khẩu không đúng!');
    }
  };

  return (
    <>
      <Header />
      <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">CGV</h2>
        <p className="login-subtitle">Đăng nhập</p>
        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          placeholder="Mật khẩu"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="login-input"
        />
        <button onClick={handleLogin} className="login-button">
          Đăng nhập
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
    <Banner />
  </>
);
}