import React, { useState } from 'react';
import { register } from '../api';
import Header from '../components/Header';
import Banner from '../components/Banner';
import './RegisterPage.css';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await register(fullName, email, password);
      alert('Đăng ký thành công!');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Lỗi khi đăng ký');
    }
  };

  return (
    <>
      <Header />
      <div className="register-container">
        <h2>Đăng ký</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input placeholder="Họ tên" value={fullName} onChange={e => setFullName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Mật khẩu" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={handleRegister}>Đăng ký</button>
      </div>
      <Banner />
    </>
  );
}
