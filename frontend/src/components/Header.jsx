import { useNavigate } from "react-router-dom";
import "../components/style/Header.css";
import NavItem from "./NavItem";

export default function Header() {
    const navigate = useNavigate();

    return (
        <>
            <div className="head-container">
                <div className="title-section">
                    <img src="/vite.svg" alt="Logo" className="logo" />
                    <span className="title-name">
                        Store Project
                    </span>
                </div>
                <div className="nav-section">
                    <NavItem onClick={() => navigate('/')}>Início</NavItem>
                    <NavItem onClick={() => navigate('/cadastro')}>Cadastro</NavItem>
                    <NavItem onClick={() => navigate('/sobre')}>Sobre</NavItem>
                </div>
            </div>
        </>
    );
}