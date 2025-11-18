import Header from "../components/Header";
import "./style/Index.css";

export default function Index() {
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
                        <button type="submit" className="submit-button">Entrar</button>
                    </form>
                </div>
                <div className="side-b">
                    B
                </div>
            </div>
        </div>
    );
}