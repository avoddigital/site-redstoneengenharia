import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProposalModal from '../components/ProposalModal';
import Icon from '../components/Icon';
import PageToc from '../components/PageToc';

const PrivacyPolicyPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sections = [
    { id: 'intro', title: '1. Introdução' },
    { id: 'coleta', title: '2. Dados Coletados' },
    { id: 'finalidade', title: '3. Finalidade do Uso' },
    { id: 'base-legal', title: '4. Base Legal' },
    { id: 'compartilhamento', title: '5. Compartilhamento' },
    { id: 'cookies', title: '6. Cookies' },
    { id: 'retencao', title: '7. Retenção de Dados' },
    { id: 'seguranca', title: '8. Segurança' },
    { id: 'direitos', title: '9. Seus Direitos' },
    { id: 'contato', title: '10. Contato' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Header offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 flex flex-col font-sans">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />

      <main className="flex-grow pt-32 pb-20 mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-7xl">
        
        {/* Header Section */}
        <div className="max-w-4xl mx-auto mb-16 text-center md:text-left">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 justify-center md:justify-start">
            <a href="/" className="hover:text-primary transition-colors">Início</a>
            <span>/</span>
            <span className="text-gray-900 font-medium">Política de Privacidade</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-tight text-gray-900">
            Política de Privacidade
          </h1>
          <p className="text-gray-500 font-light text-sm">
            Última atualização: 04 de Fevereiro de 2026
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto relative">
          
          {/* Sidebar Navigation - Sticky */}
          <aside className="lg:w-64 hidden lg:block relative">
            <div className="sticky top-32">
              <PageToc sections={sections} />
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 max-w-4xl prose prose-gray prose-lg">
            
            <section id="intro" className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">1. Introdução</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                A <strong>REDSTONE ENGENHARIA</strong> ("nós", "nosso" ou "empresa") valoriza a sua privacidade e está comprometida com a proteção dos seus dados pessoais. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
              </p>
              <p className="text-gray-600 leading-relaxed">
                Ao utilizar nossos serviços ou navegar em nosso site, você concorda com as práticas descritas nesta política.
              </p>
            </section>

            <section id="coleta" className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">2. Dados que Coletamos</h2>
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-2">Dados de Navegação</h3>
                  <p className="text-gray-600 text-sm">
                    Endereço IP, tipo de navegador, páginas visitadas, tempo de permanência e outras informações coletadas via cookies para análise de desempenho.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-2">Dados de Contato</h3>
                  <p className="text-gray-600 text-sm">
                    Nome, e-mail, telefone e empresa, quando fornecidos voluntariamente através dos nossos formulários de contato ou solicitação de orçamento.
                  </p>
                </div>
              </div>
            </section>

            <section id="finalidade" className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">3. Finalidade do Uso</h2>
              <p className="text-gray-600 mb-4">Utilizamos seus dados para as seguintes finalidades:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Responder a solicitações de orçamento e dúvidas.</li>
                <li>Melhorar a experiência de navegação e funcionalidade do site.</li>
                <li>Cumprir obrigações legais e regulatórias.</li>
                <li>Enviar comunicações de marketing (apenas com seu consentimento explícito).</li>
              </ul>
            </section>

            <section id="base-legal" className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">4. Base Legal</h2>
              <p className="text-gray-600 leading-relaxed">
                O tratamento dos seus dados é realizado com base nas hipóteses legais previstas na LGPD, incluindo:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 mt-4">
                <li><strong>Consentimento:</strong> Quando você autoriza expressamente o uso dos dados.</li>
                <li><strong>Execução de Contrato:</strong> Necessário para prestar os serviços contratados.</li>
                <li><strong>Legítimo Interesse:</strong> Para apoiar e promover nossas atividades, respeitando seus direitos fundamentais.</li>
              </ul>
            </section>

            <section id="compartilhamento" className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">5. Compartilhamento de Dados</h2>
              <p className="text-gray-600 leading-relaxed">
                Não vendemos seus dados pessoais. Podemos compartilhar informações apenas com:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 mt-4">
                <li>Fornecedores de serviços essenciais (hospedagem, e-mail marketing), sob contrato de confidencialidade.</li>
                <li>Autoridades judiciais ou governamentais, quando exigido por lei.</li>
              </ul>
            </section>

            <section id="cookies" className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">6. Cookies e Tecnologias</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Utilizamos cookies para personalizar conteúdo e analisar nosso tráfego. Você pode gerenciar suas preferências de cookies a qualquer momento através do nosso painel de configurações.
              </p>
              <button 
                onClick={() => window.location.reload()} // Simplified trigger for demo, essentially re-triggers consent check if cleared
                className="text-primary font-medium hover:underline cursor-pointer"
              >
                Gerenciar Preferências de Cookies
              </button>
            </section>

            <section id="retencao" className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">7. Retenção de Dados</h2>
              <p className="text-gray-600 leading-relaxed">
                Armazenamos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades para as quais foram coletados, ou para cumprir obrigações legais, contratuais ou regulatórias.
              </p>
            </section>

            <section id="seguranca" className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">8. Segurança</h2>
              <p className="text-gray-600 leading-relaxed">
                Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acesso não autorizado, perda, alteração ou divulgação indevida.
              </p>
            </section>

            <section id="direitos" className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">9. Seus Direitos (Titular)</h2>
              <p className="text-gray-600 mb-4">De acordo com a LGPD, você tem direito a:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Confirmar a existência de tratamento', 'Acessar seus dados', 'Corrigir dados incompletos', 'Solicitar anonimização ou bloqueio', 'Portabilidade dos dados', 'Revogar consentimento'].map((item) => (
                  <div key={item} className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
                    <Icon name="check_circle" className="text-green-600 text-lg" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section id="contato" className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">10. Contato e Encarregado (DPO)</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Para exercer seus direitos ou tirar dúvidas sobre nossa Política de Privacidade, entre em contato conosco:
              </p>
              
              <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10">
                <h3 className="text-primary font-bold text-lg mb-4">Canal de Privacidade</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-4">
                    <div className="bg-white w-10 h-10 flex items-center justify-center rounded-full shadow-sm text-primary flex-shrink-0">
                      <Icon name="mail" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">E-mail</p>
                      <a href="mailto:privacidade@redstoneengenharia.com.br" className="text-gray-900 hover:text-primary transition-colors font-medium">
                        redstoneengenharia@redstoneengenharia.com.br
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                     <div className="bg-white w-10 h-10 flex items-center justify-center rounded-full shadow-sm text-primary flex-shrink-0">
                      <Icon name="business" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Controlador</p>
                      <p className="text-gray-900 font-medium">Redstone Engenharia Ltda.</p>
                      <p className="text-gray-500 text-sm">Piratininga, SP</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>

        {/* Floating Back to Top (Mobile) */}
        <button 
          onClick={scrollToTop}
          className="lg:hidden fixed bottom-6 right-6 bg-white text-gray-900 p-3 rounded-full shadow-lg border border-gray-100 z-50 hover:bg-gray-50 transition-all"
        >
          <Icon name="arrow_upward" />
        </button>

      </main>

      <Footer onOpenModal={() => setIsModalOpen(true)} />
      <ProposalModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default PrivacyPolicyPage;
