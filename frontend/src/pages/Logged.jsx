import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import requestApi from "../api/requestApi";
import './style/Logged.css';

export default function Logged() {

    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [requests, setRequests] = useState([]);

    const servicesDB = {
        "formatacao": { label: "Formatação de Computador", price: 50.00, days: 2 },
        "rede": { label: "Configuração de Rede", price: 120.00, days: 4 },
        "software": { label: "Instalação de Software Básico", price: 50.00, days: 2 },
        "backup": { label: "Backup e Restauração", price: 80.00, days: 3 },
        "limpeza": { label: "Limpeza Física Interna", price: 70.00, days: 1 }
    };

    const [selectedKey, setSelectedKey] = useState("");
    const [formValues, setFormValues] = useState({
        price: "R$ 0,00",
        days: "0 Dias Úteis",
        deadline: "DD/MM/AAAA"
    });

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            alert("Você precisa estar logado!");
            navigate("/");
            return;
        }

        const parsed = JSON.parse(storedUser);
        setUserInfo(parsed.user);

        requestApi.getUserRequests(parsed.user.id).then(res => {
            setRequests(res.data);
        });
    }, [navigate]);

    const calculateDeadline = (daysToAdd) => {
        const date = new Date();
        date.setDate(date.getDate() + daysToAdd);
        return date.toLocaleDateString('pt-BR');
    };

    const handleServiceChange = (e) => {
        const key = e.target.value;
        setSelectedKey(key);

        if (!key) {
            setFormValues({ price: "R$ 0,00", days: "0 Dias Úteis", deadline: "DD/MM/AAAA" });
            return;
        }

        const svc = servicesDB[key];
        setFormValues({
            price: `R$ ${svc.price.toFixed(2).replace('.', ',')}`,
            days: `${svc.days} Dias Úteis`,
            deadline: calculateDeadline(svc.days)
        });
    };

    const handleAddRequest = async () => {
        if (!selectedKey) return alert("Selecione um serviço!");

        const svc = servicesDB[selectedKey];

        const payload = {
            userId: userInfo.id,
            service: svc.label,
            status: "EM ELABORAÇÃO",
            price: formValues.price,
            deadline: formValues.deadline,
            date: new Date().toLocaleDateString("pt-BR")
        };

        const res = await requestApi.createRequest(payload);

        setRequests(prev => [...prev, res.data]);
        setSelectedKey("");
        setFormValues({ price: "R$ 0,00", days: "0 Dias Úteis", deadline: "DD/MM/AAAA" });
    };

    const handleDelete = async (id) => {
        await requestApi.deleteRequest(id);
        setRequests(prev => prev.filter(req => req.id !== id));
    };

    if (!userInfo) return null;

    return (
        <div className="logged-page">
            <Header />

            <main className="logged-container">

                <section className="logged-card user-info">
                    <h2 className="card-title">Usuário Logado</h2>
                    <p>Nome: <span className="user-highlight">{userInfo.nome}</span></p>
                    <p>Login (E-mail): <span className="user-highlight">{userInfo.email}</span></p>
                </section>

                <section className="logged-card">
                    <h2 className="card-title">Nova Solicitação</h2>

                    <div className="form-grid">
                        <div className="form-group">
                            <label>Serviço de TI:</label>
                            <select className="logged-input" value={selectedKey} onChange={handleServiceChange}>
                                <option value="">-- Selecione --</option>
                                {Object.keys(servicesDB).map(key => (
                                    <option key={key} value={key}>{servicesDB[key].label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Preço:</label>
                            <input type="text" className="logged-input" value={formValues.price} disabled />
                        </div>

                        <div className="form-group">
                            <label>Prazo:</label>
                            <input type="text" className="logged-input" value={formValues.days} disabled />
                        </div>

                        <div className="form-group">
                            <label>Data Prevista:</label>
                            <input type="text" className="logged-input" value={formValues.deadline} disabled />
                        </div>
                    </div>

                    <button className="btn-incluir" onClick={handleAddRequest}>Incluir Solicitação</button>
                </section>

                <section className="logged-card">
                    <h2 className="card-title">Minhas Solicitações</h2>

                    <table className="requests-table">
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Nº</th>
                                <th>Serviço</th>
                                <th>Status</th>
                                <th>Preço</th>
                                <th>Previsto</th>
                                <th>Ação</th>
                            </tr>
                        </thead>

                        <tbody>
                            {requests.map(req => (
                                <tr key={req.id}>
                                    <td>{req.date}</td>
                                    <td>{req.id}</td>
                                    <td>{req.service}</td>
                                    <td>{req.status}</td>
                                    <td>{req.price}</td>
                                    <td>{req.deadline}</td>
                                    <td>
                                        <button className="btn-excluir" onClick={() => handleDelete(req.id)}>
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

            </main>

            <Footer />
        </div>
    );
}
