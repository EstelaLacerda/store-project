import React, { useState } from 'react';
import Header from '../components/Header';
import './style/Logged.css';

export default function Logged() {
    const userInfo = {
        name: "cupcake de lacerda oliveira",
        email: "elo@cesar.school"
    };

    const servicesDB = {
        "formatacao": { label: "Formatação de Computador", price: 50.00, days: 2 },
        "rede": { label: "Configuração de Rede", price: 120.00, days: 4 },
        "software": { label: "Instalação de Software Básico", price: 50.00, days: 2 },
        "backup": { label: "Backup e Restauração", price: 80.00, days: 3 },
        "limpeza": { label: "Limpeza Física Interna", price: 70.00, days: 1 }
    };

    const [requests, setRequests] = useState([
        { id: 2025001, date: '30/09/2025', service: 'Instalação de Software Básico', status: 'CONCLUÍDO', price: 'R$ 50,00', deadline: '02/10/2025' },
        { id: 2025002, date: '09/10/2025', service: 'Configuração de Rede', status: 'EM ANDAMENTO', price: 'R$ 120,00', deadline: '14/10/2025' },
        { id: 2025003, date: '14/10/2025', service: 'Backup e Restauração', status: 'AGUARDANDO APROVAÇÃO', price: 'R$ 80,00', deadline: '17/10/2025' }
    ]);

    const [selectedKey, setSelectedKey] = useState("");
    const [formValues, setFormValues] = useState({
        price: "R$ 0,00",
        days: "0 Dias Úteis",
        deadline: "DD/MM/AAAA"
    });

    const calculateDeadline = (daysToAdd) => {
        const date = new Date();
        date.setDate(date.getDate() + daysToAdd);
        return date.toLocaleDateString('pt-BR');
    };

    const handleServiceChange = (e) => {
        const key = e.target.value;
        setSelectedKey(key);

        if (key && servicesDB[key]) {
            const svc = servicesDB[key];
            setFormValues({
                price: `R$ ${svc.price.toFixed(2).replace('.', ',')}`,
                days: `${svc.days} Dias Úteis`,
                deadline: calculateDeadline(svc.days)
            });
        } else {
            setFormValues({ price: "R$ 0,00", days: "0 Dias Úteis", deadline: "DD/MM/AAAA" });
        }
    };

    const handleAddRequest = () => {
        if (!selectedKey) {
            alert("Por favor, selecione um serviço!");
            return;
        }

        const newRequest = {
            id: 2025000 + requests.length + 1,
            date: new Date().toLocaleDateString('pt-BR'),
            service: servicesDB[selectedKey].label,
            status: 'EM ELABORAÇÃO',
            price: formValues.price,
            deadline: formValues.deadline
        };

        setRequests([...requests, newRequest]);

        setSelectedKey("");
        setFormValues({ price: "R$ 0,00", days: "0 Dias Úteis", deadline: "DD/MM/AAAA" });
    };

    const handleDelete = (idToDelete) => {
        const updatedList = requests.filter(req => req.id !== idToDelete);
        setRequests(updatedList);
    };

    return (
        <div className="logged-page">
            <Header />

            <main className="logged-container">

                <section className="logged-card user-info">
                    <h2 className="card-title">Usuário Logado</h2>
                    <p>Nome: <span className="user-highlight">{userInfo.name}</span></p>
                    <p>Login (E-mail): <span className="user-highlight">{userInfo.email}</span></p>
                </section>

                <section className="logged-card">
                    <h2 className="card-title">Nova Solicitação de Serviço de TI</h2>

                    <div className="form-grid">
                        <div className="form-group">
                            <label>Serviço de TI:</label>
                            <select
                                className="logged-input"
                                value={selectedKey}
                                onChange={handleServiceChange}
                            >
                                <option value="">-- Selecione um Serviço --</option>
                                <option value="software">Instalação de Software Básico</option>
                                <option value="formatacao">Formatação de Computador</option>
                                <option value="rede">Configuração de Rede</option>
                                <option value="backup">Backup e Restauração</option>
                                <option value="limpeza">Limpeza Física Interna</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Preço:</label>
                            <input type="text" className="logged-input" value={formValues.price} disabled />
                        </div>

                        <div className="form-group">
                            <label>Prazo de Atendimento:</label>
                            <input type="text" className="logged-input" value={formValues.days} disabled />
                        </div>

                        <div className="form-group">
                            <label>Data Prevista de Atendimento:</label>
                            <input type="text" className="logged-input" value={formValues.deadline} disabled />
                        </div>
                    </div>

                    <div className="form-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                        <div className="form-group">
                            <label>Status:</label>
                            <input type="text" className="logged-input" value="EM ELABORAÇÃO" disabled />
                        </div>
                        <div className="form-group">
                            <button className="btn-incluir" onClick={handleAddRequest}>
                                Incluir Solicitação
                            </button>
                        </div>
                    </div>
                </section>

                <section className="logged-card">
                    <h2 className="card-title">Minhas Solicitações Existentes</h2>

                    <table className="requests-table">
                        <thead>
                            <tr>
                                <th>Data do Pedido</th>
                                <th>Nº Solicitação</th>
                                <th>Serviço</th>
                                <th>Status</th>
                                <th>Preço</th>
                                <th>Data Prevista</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req) => (
                                <tr key={req.id}>
                                    <td>{req.date}</td>
                                    <td>{req.id}</td>
                                    <td>{req.service}</td>
                                    <td>{req.status}</td>
                                    <td>{req.price}</td>
                                    <td>{req.deadline}</td>
                                    <td style={{ textAlign: 'center' }}>
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

            <footer className="logged-footer">
                Store © 2025
            </footer>
        </div>
    );
}