import React from 'react';
import Header from '../components/Header'; // Certifique-se que o caminho está certo
import './style/About.css';

export default function About() {
  return (
    <div className="about-page">
      <Header />

      <main className="about-container">
        
        {/* Seção 1: Nossa História */}
        <section className="about-section">
          <h2 className="section-title">Nossa História</h2>
          <p className="about-text">
            Lorem ipsum dolor sit amet. At cupiditate voluptates qui consectetur voluptates qui corporis expedita ut atque explicabo ut natus similique sit debitis saepe. Nam dicta corporis quo aliquid animi non vitae ratione in voluptas cupiditate in voluptatem dolore?
          </p>
        </section>

        {/* Seção 2: Vídeo Institucional */}
        <section className="about-section">
          <h2 className="section-title">Vídeo Institucional</h2>
          <div className="video-placeholder">
            {/* Aqui viria uma tag <iframe> do Youtube futuramente */}
            [Espaço para Vídeo Institucional]
          </div>
        </section>

        {/* Seção 3: Equipe e Escritório */}
        <section className="about-section">
          <h2 className="section-title">Nossa Equipe e Escritório</h2>
          <div className="team-gallery">
            <div className="team-img-box">Foto da equipe 1</div>
            <div className="team-img-box">Foto do escritório</div>
            <div className="team-img-box">Foto da equipe 2</div>
          </div>
          <div style={{textAlign: 'center', marginTop: '10px', color: '#888'}}>
             Foto de um detalhe do ambiente
          </div>
        </section>

        {/* Seção 4: Nossos Serviços */}
        <section className="about-section">
          <h2 className="section-title">Nossos Serviços de TI</h2>
          <div className="services-grid">
            
            <div className="service-card">
              <h3>Consultoria Estratégica</h3>
              <p>Lorem ipsum dolor sit amet. At cupiditate voluptates qui consectetur voluptates qui corporis expedita ut atque explicabo.</p>
            </div>

            <div className="service-card">
              <h3>Desenvolvimento de Software</h3>
              <p>Lorem ipsum dolor sit amet. At cupiditate voluptates qui consectetur voluptates qui corporis expedita ut atque explicabo.</p>
            </div>

            <div className="service-card">
              <h3>Suporte e Manutenção</h3>
              <p>Lorem ipsum dolor sit amet. At cupiditate voluptates qui consectetur voluptates qui corporis expedita ut atque explicabo.</p>
            </div>

          </div>
        </section>

        {/* Seção 5: Fundadores (Tabela) */}
        <section className="about-section">
          <h2 className="section-title">Os Fundadores</h2>
          <table className="founders-table">
            <thead>
              <tr>
                <th>Cargo</th>
                <th>Nome</th>
                <th>Breve Currículo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CEO & Co-founder</td>
                <td>Paulo Campos</td>
                <td>Especialista em Gestão de Projetos de TI com 15 anos de experiência no mercado.</td>
              </tr>
              <tr>
                <td>CTO & Co-founder</td>
                <td>Estela Lacerda</td>
                <td>Arquiteto de Software com foco em soluções cloud e desenvolvimento ágil.</td>
              </tr>
              <tr>
                <td>COO & Co-founder</td>
                <td>Ronaldo Nazário</td>
                <td>Expert em Operações e Infraestrutura de TI, campeão da copa de 2002.</td>
              </tr>
            </tbody>
          </table>
        </section>

      </main>

      {/* Footer (Rodapé) */}
      <footer className="about-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Contato</h4>
            <p>✉ contato@techsolutions.com</p>
            <p>📞 (00) 1234-5678</p>
            <p>💬 (00) 91234-5678</p>
          </div>

          <div className="footer-section">
            <h4>Endereço</h4>
            <p>Av. Cais do Apolo, 77, Recife Antigo</p>
            <p>Recife, PE, CEP 00000-000</p>
          </div>

          <div className="footer-section">
            <h4>Pagamento</h4>
            <div style={{fontSize: '2rem'}}>
               {/* Ícones simulados com texto ou FontAwesome se tiver */}
               💳 💳 💠 ||||
            </div>
          </div>
        </div>
        <div className="copyright">
          Tech Solutions © 2025
        </div>
      </footer>
    </div>
  );
}