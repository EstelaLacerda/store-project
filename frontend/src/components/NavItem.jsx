import "./style/NavItem.css";

export default function NavItem({ children, onClick }) {
    return (
        <div className="nav-item" onClick={onClick}>
            {children}
        </div>
    );
}