import { useState } from "react";
import "../../index.css";

export default function Login() {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="title">LOGIN DULU LAH</h2>
        <p className="subtitle">Login untuk ke dashboard</p>

        {/* Email */}
        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="you@example.com" />
        </div>

        {/* Password */}
        <div className="form-group">
          <label>Password</label>
          <div className="password-field">
            <input
              type={showPass ? "text" : "password"}
              placeholder="••••••••"
            />
            <button
              type="button"
              className="toggle-btn"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button className="login-btn">Login</button>
      </div>
    </div>
  );
}
