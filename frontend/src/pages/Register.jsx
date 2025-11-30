import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./style/Register.css";
import Footer from "../components/Footer";

const validarDigitoCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    return true;
};

const initialState = {
    email: '',
    senha: '',
    confirmarSenha: '',
    nome: '',
    cpf: '',
    dataNascimento: '',
    celular: '',
    estadoCivil: 'solteiro',
    escolaridade: '2-completo'
};

export default function Register() {
    const [formData, setFormData] = useState(initialState);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const formatarCpf = (value) => {
        let cleanValue = value.replace(/\D/g, '');
        cleanValue = cleanValue.replace(/(\d{3})(\d)/, '$1.$2');
        cleanValue = cleanValue.replace(/(\d{3})(\d)/, '$1.$2');
        cleanValue = cleanValue.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        return cleanValue.slice(0, 14);
    };

    const formatarCelular = (value) => {
        let cleanValue = value.replace(/\D/g, '');
        if (cleanValue.length > 10) {
            return cleanValue.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
        } else if (cleanValue.length > 5) {
            return cleanValue.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
        } else if (cleanValue.length > 2) {
            return cleanValue.replace(/^(\d\d)(\d{0,5}).*/, "($1) $2");
        } else {
            return cleanValue.replace(/^(\d*)/, "($1");
        }
    };

    const handleCpfChange = (e) => {
        const formattedValue = formatarCpf(e.target.value);
        setFormData(prev => ({ ...prev, cpf: formattedValue }));
    };

    const handleCelularChange = (e) => {
        const formattedValue = formatarCelular(e.target.value);
        setFormData(prev => ({ ...prev, celular: formattedValue }));
    };

    const limparFormulario = () => {
        setFormData(initialState);
        document.getElementById('email').focus();
    };

    const validarFormulario = useCallback(() => {
        const { email, senha, confirmarSenha, nome, cpf, dataNascimento, celular } = formData;

        if (email.trim() === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Por favor, insira um e-mail válido.');
            document.getElementById('email').focus();
            return;
        }

        const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
        if (!regexSenha.test(senha)) {
            alert('A senha não atende aos critérios de segurança. Por favor, verifique as regras.');
            document.getElementById('senha').focus();
            return;
        }

        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem.');
            document.getElementById('confirmarSenha').focus();
            return;
        }

        const nomeTrim = nome.trim();
        const palavrasNome = nomeTrim.split(' ');
        if (nomeTrim === '') {
            alert('O campo Nome é obrigatório.');
            document.getElementById('nome').focus();
            return;
        }
        if (palavrasNome.length < 2 || palavrasNome[0].length < 2) {
            alert('O nome deve conter pelo menos duas palavras, e a primeira deve ter no mínimo 2 caracteres.');
            document.getElementById('nome').focus();
            return;
        }
        const regexCaracteresEspeciais = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]/;
        if (regexCaracteresEspeciais.test(nomeTrim)) {
            alert('O nome não pode conter números ou caracteres especiais.');
            document.getElementById('nome').focus();
            return;
        }

        if (cpf.trim() === '') {
            alert('O campo CPF é obrigatório.');
            document.getElementById('cpf').focus();
            return;
        }
        if (!validarDigitoCPF(cpf)) {
            alert('O CPF inserido é inválido.');
            document.getElementById('cpf').focus();
            return;
        }

        if (dataNascimento.trim() === '') {
            alert('A data de nascimento é obrigatória.');
            document.getElementById('dataNascimento').focus();
            return;
        }
        const dataNasc = new Date(dataNascimento);
        const hoje = new Date();
        let idade = hoje.getFullYear() - dataNasc.getFullYear();
        const m = hoje.getMonth() - dataNasc.getMonth();
        if (m < 0 || (m === 0 && hoje.getDate() < dataNasc.getDate())) {
            idade--;
        }
        if (idade < 18) {
            alert('Você deve ter mais de 18 anos.');
            document.getElementById('dataNascimento').focus();
            return;
        }

        if (celular.trim() !== '') {
            const celularLimpo = celular.replace(/\D/g, '');
            if (celularLimpo.length < 10 || celularLimpo.length > 11) {
                alert('Se preenchido, o celular deve estar em um formato válido (com DDD).');
                document.getElementById('celular').focus();
                return;
            }
        }

        alert('Validação bem-sucedida! Prosseguindo para o registro (A chamada ao Backend seria aqui).');
        limparFormulario();
    }, [formData]);

    const handleVoltar = () => {
        navigate('/');
    };

    return (
        <>
            <div className="full-screen-layout">
                <Header />

                <div className="register-container">
                    <span className="register-title">
                        Faça seu cadastro!
                    </span>

                    <div className="container-cadastro">
                        <form id="cadastroForm" className="register-form" onSubmit={(e) => e.preventDefault()}>

                            {/* Email */}
                            <div className="form-group">
                                <label htmlFor="email">Email (Login):</label>
                                <input type="email" id="email" name="email" placeholder="seuemail@exemplo.com" required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Senha */}
                            <div className="form-group">
                                <label htmlFor="senha">Senha:</label>
                                <input type="password" id="senha" name="senha" required
                                    value={formData.senha}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Confirmação de Senha */}
                            <div className="form-group">
                                <label htmlFor="confirmarSenha">Confirme sua senha:</label>
                                <input type="password" id="confirmarSenha" name="confirmarSenha" required
                                    value={formData.confirmarSenha}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Regras de Senha */}
                            <div id="regras-senha" className="password-rules">
                                <strong>A senha deve incluir:</strong>
                                <ul>
                                    <li>Pelo menos 8 caracteres.</li>
                                    <li>Pelo menos uma letra maiúscula (A-Z).</li>
                                    <li>Pelo menos uma letra minúscula (a-z).</li>
                                    <li>Pelo menos um número (0-9).</li>
                                    <li>Pelo menos um caractere especial.</li>
                                    <li><strong>Permitidos:</strong> @ $ ! % * ? &amp; #</li>
                                    <li><strong>Não Permitidos:</strong> Outros caracteres especiais como ( ) [ ] {'{'} {'}'} &lt; &gt; / \ |</li>
                                </ul>
                            </div>

                            {/* Nome Completo */}
                            <div className="form-group">
                                <label htmlFor="nome">Nome Completo:</label>
                                <input type="text" id="nome" name="nome" placeholder="Digite seu nome completo" required
                                    value={formData.nome}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* CPF com formatação */}
                            <div className="form-group">
                                <label htmlFor="cpf">CPF:</label>
                                <input type="text" id="cpf" name="cpf" placeholder="000.000.000-00" maxLength="14" required
                                    value={formData.cpf}
                                    onChange={handleCpfChange}
                                />
                            </div>

                            {/* Data de Nascimento */}
                            <div className="form-group">
                                <label htmlFor="dataNascimento">Data de Nascimento:</label>
                                <input type="date" id="dataNascimento" name="dataNascimento" required
                                    value={formData.dataNascimento}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Celular com formatação */}
                            <div className="form-group">
                                <label htmlFor="celular">Celular/WhatsApp (Opcional):</label>
                                <input type="tel" id="celular" name="celular" placeholder="(00) 00000-0000"
                                    value={formData.celular}
                                    onChange={handleCelularChange}
                                />
                            </div>

                            {/* Estado Civil (Radio Group) */}
                            <div className="form-group">
                                <label>Estado Civil:</label>
                                <div className="radio-group" onChange={handleChange}>
                                    <input type="radio" id="solteiro" name="estadoCivil" value="solteiro" checked={formData.estadoCivil === 'solteiro'} />
                                    <label htmlFor="solteiro">Solteiro</label>

                                    <input type="radio" id="casado" name="estadoCivil" value="casado" checked={formData.estadoCivil === 'casado'} />
                                    <label htmlFor="casado">Casado</label>

                                    <input type="radio" id="divorciado" name="estadoCivil" value="divorciado" checked={formData.estadoCivil === 'divorciado'} />
                                    <label htmlFor="divorciado">Divorciado</label>

                                    <input type="radio" id="viuvo" name="estadoCivil" value="viuvo" checked={formData.estadoCivil === 'viuvo'} />
                                    <label htmlFor="viuvo">Viúvo</label>
                                </div>
                            </div>

                            {/* Escolaridade (Select) */}
                            <div className="form-group">
                                <label htmlFor="escolaridade">Escolaridade:</label>
                                <select id="escolaridade" name="escolaridade"
                                    value={formData.escolaridade}
                                    onChange={handleChange}
                                >
                                    <option value="1-incompleto">Fundamental Incompleto</option>
                                    <option value="1-completo">Fundamental Completo</option>
                                    <option value="2-incompleto">Médio Incompleto</option>
                                    <option value="2-completo">Médio Completo ou Equivalente</option>
                                    <option value="superior">Superior (Graduação)</option>
                                    <option value="pos-graduado">Pós-graduação</option>
                                </select>
                            </div>

                            {/* Botões */}
                            <div className="button-container">
                                <button type="button" id="btnIncluir" className="btn-primary" onClick={validarFormulario}>Cadastrar</button>
                                <button type="button" id="btnLimpar" className="btn-secondary" onClick={limparFormulario}>Limpar</button>
                                <button type="button" id="btnVoltar" className="btn-tertiary" onClick={handleVoltar}>Voltar</button>
                            </div>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}