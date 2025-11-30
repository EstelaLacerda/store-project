import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import './style/ChangePassword.css'; // Importando o CSS que criamos

export default function ChangePassword() {
  // Estados para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Estados para controlar a visibilidade das senhas (o "olhinho")
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // Estado para mensagens de erro/sucesso
  const [message, setMessage] = useState({ text: '', type: '' });

  // Estado calculado para validações (atualiza em tempo real)
  const validations = {
    length: formData.newPassword.length >= 6,
    upper: /[A-Z]/.test(formData.newPassword),
    number: /\d/.test(formData.newPassword),
    special: /[@#\$%&\*!\?\/\-\|\\_\.\+=]/.test(formData.newPassword)
  };

  // Função para atualizar os inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Função para limpar o formulário
  const handleClear = () => {
    setFormData({ email: '', newPassword: '', confirmPassword: '' });
    setMessage({ text: '', type: '' });
  };

  // Função de Envio (Submit)
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    const { email, newPassword, confirmPassword } = formData;

    // 1. Validar campos vazios
    if (!email || !newPassword || !confirmPassword) {
      setMessage({ text: 'Por favor, preencha todos os campos.', type: 'error' });
      return;
    }

    // 2. Validar se senhas coincidem
    if (newPassword !== confirmPassword) {
      setMessage({ text: 'As senhas não coincidem.', type: 'error' });
      return;
    }

    // 3. Validar Regras de Senha (verifica se todas as validações são true)
    const isPasswordValid = Object.values(validations).every(Boolean);
    if (!isPasswordValid) {
      setMessage({ text: 'A senha não atende aos requisitos de segurança.', type: 'error' });
      return;
    }

    if (/[¨\{\}\[\]´`~\^:;<>,“”‘']/.test(newPassword)) {
      setMessage({ text: 'A senha contém caracteres não suportados.', type: 'error' });
      return;
    }

    // 4. Lógica de "Backend" (LocalStorage)
    // Recupera usuários salvos
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(user => user.username === email || user.email === email);

    if (userIndex === -1) {
      setMessage({ text: 'Usuário não encontrado com este e-mail.', type: 'error' });
    } else {
      // Atualiza a senha
      users[userIndex].password = newPassword;
      localStorage.setItem('users', JSON.stringify(users));

      setMessage({ text: 'Senha alterada com sucesso! ✅', type: 'success' });

      // Limpa após sucesso e redireciona (opcional)
      setTimeout(() => {
        handleClear();
        // Se você usar React Router, seria: navigate('/login')
        window.location.href = '/';
      }, 2000);
    }
  };

  return (
    <div className="change-pass-container">
      <Header />
      <div className="cp-content">
        <div className="welcome-text">
          <h2>Change Your Password</h2>
          <p>Please enter your email to reset your password</p>
        </div>

        {/* Lista de Requisitos Dinâmica */}
        <div className="password-requirements">
          <h3>Your password must have:</h3>
          <ul>
            <li className={`req-item ${validations.length ? 'valid' : ''}`}>
              At least 6 characters
            </li>
            <li className={`req-item ${validations.upper ? 'valid' : ''}`}>
              At least one capital letter (A - Z)
            </li>
            <li className={`req-item ${validations.number ? 'valid' : ''}`}>
              At least one number (0-9)
            </li>
            <li className={`req-item ${validations.special ? 'valid' : ''}`}>
              At least one special character (ex: @, #, $, *)
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
              placeholder="New Password"
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
              {/* Usando FontAwesome (assumindo que você tem o link no index.html) */}
              <i className={`fa-solid ${showNewPass ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </button>
          </div>

          {/* Confirmar Senha */}
          <div className="password-container">
            <input
              type={showConfirmPass ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm the Password"
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

      <footer style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
        Store &copy; 2025
      </footer>
    </div>
  );
};
