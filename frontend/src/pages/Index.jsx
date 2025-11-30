import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import NavItem from "../components/NavItem";
import "./style/Index.css";
import Footer from "../components/Footer";

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
                        <input type="email" placeholder="E-mail" className="input-field" />
                        <input type="password" placeholder="Senha" className="input-field" />

                        <div className="forgot-password-container">
                            Esqueceu sua senha?
                            <NavItem onClick={() => navigate('/mudar-senha')} className="forgot-password-link">
                                clique aqui!
                            </NavItem>
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
            <Footer />
        </div>
    );
}