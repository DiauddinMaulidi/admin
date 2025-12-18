import { useState } from "react";
import "../../index.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate()
  const API_URL = `${import.meta.env.VITE_API_URL}/login`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(API_URL, {
        username,
        password,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setMessage('Login Berhasil! Mengalihkan ke Dashboard...');

        navigate('/');

      } else {
        setMessage('Login berhasil, tetapi token tidak diterima.');
      }

    } catch (error) {
      const errorMsg = error.response ? error.response.data.message : 'Terjadi kesalahan jaringan.';
      setMessage(`Login Gagal: ${errorMsg}`);
      console.error('Error Login:', error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="title">LOGIN</h2>
        <p className="subtitle">desa tembeng putik</p>

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="form-group">
            <label className="text-white">Username</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="contoh: kknunhaz" />
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="text-white">Password</label>
            <div className="password-field">
              <input
                type={showPass ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
              <button
                type="submit"
                className="toggle-btn"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button className="login-btn">Login</button>
        </form>
        {/* Menampilkan pesan */}
        {message && (
          <p style={{ marginTop: '20px', color: message.includes('Gagal') ? 'red' : 'green' }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
