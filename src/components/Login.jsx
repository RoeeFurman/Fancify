import React, { useState, useEffect } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";

export const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    fullname: "",
  });

  useEffect(() => {}, []);

  const onLogin = (ev = null) => {
    if (ev) ev.preventDefault();
    console.log(credentials);
    if (!credentials.username) return;
  };

  const handleChange = (ev) => {
    const field = ev.target.name;
    const value = ev.target.value;
    setCredentials({ ...credentials, [field]: value });
  };

  return (
    <div className="login-cmp">
      <form className="login-form" onSubmit={onLogin}>
        <h1>Log In to continue</h1>
        <div className="inputs">
          <input
            autoComplete="off"
            type="text"
            name="username"
            value={credentials.username}
            placeholder="Username"
            onChange={handleChange}
            required
            autoFocus
          />
          <input
            type="password"
            name="password"
            value={credentials.password}
            placeholder="Password"
            onChange={handleChange}
            required
          />
        </div>
        <button>Log in</button>
      </form>
    </div>
  );
};
