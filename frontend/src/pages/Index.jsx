import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import "./style/Index.css";

export default function Index() {
    const navigate = useNavigate();

    return (
        <div className="full-screen-layout">
            <Header />
            <div className="container">
                <div className="side-a">
                    <span className="side-title">
                        Bem vindo de Volta!
                    </span>
                    <form className="login-form">
                        <input type="text" placeholder="Usuário" className="input-field" />
                        <input type="password" placeholder="Senha" className="input-field" />
                        
                        {/* Adicionei classes aqui ao invés de style inline */}
                        <div className="forgot-password-container">
                            <Link to="/change-password" className="forgot-password-link">
                                Esqueceu a senha?
                            </Link>
                        </div>

                        <button type="submit" className="submit-button">Entrar</button>
                    </form>
                </div>
                <div className="side-b">
                    <span className="side-title">
                        Novo por aqui?
                    </span>
                    <p className="side-description">
                        Cadastre-se e comece a usar nossos serviços agora mesmo!
                    </p>
                    <button
                        onClick={() => navigate('/cadastro')}
                        className="register-button">
                        Cadastrar
                    </button>
                </div>
            </div>
        </div>
    );
}