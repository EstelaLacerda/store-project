import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import './style/ChangePassword.css';
import Footer from '../components/Footer';

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [message, setMessage] = useState({ text: '', type: '' });

  const validations = {
    length: formData.newPassword.length >= 6,
    upper: /[A-Z]/.test(formData.newPassword),
    number: /\d/.test(formData.newPassword),
    special: /[@#\$%&\*!\?\/\-\|\\_\.\+=]/.test(formData.newPassword)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setFormData({ email: '', newPassword: '', confirmPassword: '' });
    setMessage({ text: '', type: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    const { email, newPassword, confirmPassword } = formData;

    if (!email || !newPassword || !confirmPassword) {
      setMessage({ text: 'Por favor, preencha todos os campos.', type: 'error' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ text: 'As senhas não coincidem.', type: 'error' });
      return;
    }

    const isPasswordValid = Object.values(validations).every(Boolean);
    if (!isPasswordValid) {
      setMessage({ text: 'A senha não atende aos requisitos de segurança.', type: 'error' });
      return;
    }

    if (/[¨\{\}\[\]´`~\^:;<>,“”‘']/.test(newPassword)) {
      setMessage({ text: 'A senha contém caracteres não suportados.', type: 'error' });
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(user => user.username === email || user.email === email);

    if (userIndex === -1) {
      setMessage({ text: 'Usuário não encontrado com este e-mail.', type: 'error' });
    } else {
      users[userIndex].password = newPassword;
      localStorage.setItem('users', JSON.stringify(users));

      setMessage({ text: 'Senha alterada com sucesso! ✅', type: 'success' });

      setTimeout(() => {
        handleClear();
        window.location.href = '/';
      }, 2000);
    }
  };

  return (
    <div className="change-pass-container">
      <Header />
      <div className="cp-content">
        <div className="welcome-text">
          <h2>Mude sua Senha</h2>
          <p>Por favor, informe seu email para mudar sua senha</p>
        </div>

        {/* Lista de Requisitos Dinâmica */}
        <div className="password-requirements">
          <h3>Sua senha deve ter:</h3>
          <ul>
            <li className={`req-item ${validations.length ? 'valid' : ''}`}>
              Pelo meno 6 caracteres
            </li>
            <li className={`req-item ${validations.upper ? 'valid' : ''}`}>
              Pelo menos uma letra maiúscula (A - Z)
            </li>
            <li className={`req-item ${validations.number ? 'valid' : ''}`}>
              Pelo menos um número (0-9)
            </li>
            <li className={`req-item ${validations.special ? 'valid' : ''}`}>
              Pelo menos um caractere especial (ex:@,#,$,*)
            </li>
          </ul>
        </div>

        {/* Formulário */}
        <form className="pass-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input-field"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* Nova Senha */}
          <div className="password-container">
            <input
              type={showNewPass ? "text" : "password"}
              name="newPassword"
              placeholder="Nova senha"
              className="input-field"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="toggle-btn"
              onClick={() => setShowNewPass(!showNewPass)}
            >
              <i className={`fa-solid ${showNewPass ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </button>
          </div>

          {/* Confirmar Senha */}
          <div className="password-container">
            <input
              type={showConfirmPass ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirme a senha"
              className="input-field"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="toggle-btn"
              onClick={() => setShowConfirmPass(!showConfirmPass)}
            >
              <i className={`fa-solid ${showConfirmPass ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </button>
          </div>

          <div className="button-container">
            <button type="submit" className="apply-button">Change</button>
            <button type="button" className="clear-button" onClick={handleClear}>Clear</button>
          </div>
        </form>

        {/* Área de Mensagem */}
        {message.text && (
          <div className={`message-box ${message.type}`}>
            {message.text}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};
