import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProposalModal from '../components/ProposalModal';
import Icon from '../components/Icon';
import { Link } from 'react-router-dom';
import PageToc from '../components/PageToc';

const TermsOfUsePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sections = [
    { id: 'aceitacao', title: '1. Aceitação' },
    { id: 'quem-somos', title: '2. Quem Somos' },
    { id: 'servicos', title: '3. Serviços' },
    { id: 'cadastro', title: '4. Cadastro' },
    { id: 'comunicacao', title: '5. Comunicação' },
    { id: 'propriedade', title: '6. Propriedade Intelectual' },
    { id: 'condutas', title: '7. Condutas Proibidas' },
    { id: 'terceiros', title: '8. Links de Terceiros' },
    { id: 'responsabilidade', title: '9. Responsabilidade' },
    { id: 'privacidade', title: '10. Privacidade' },
    { id: 'alteracoes', title: '11. Alterações' },
    { id: 'foro', title: '12. Lei e Foro' },
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
            <Link to="/" className="hover:text-primary transition-colors">Início</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Termos de Uso</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light mb-4 tracking-tight text-gray-900">
            Termos de Uso
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
            
            <section id="aceitacao" className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">1. Aceitação dos Termos</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Bem-vindo ao site da <strong>Redstone Engenharia</strong>. Ao acessar e utilizar este site, você concorda em cumprir e estar vinculado aos seguintes Termos de Uso. Se você não concordar com qualquer parte destes termos, por favor, não utilize nosso site.
              </p>
            </section>

            <section id="quem-somos" className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">2. Quem Somos</h2>
              <p className="text-gray-600 leading-relaxed">
                A <strong>Redstone Engenharia Ltda.</strong> é uma empresa especializada em construção civil, projetos de engenharia e consultoria.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 mt-4">
                <li><strong>CNPJ:</strong> 63.720.236/0001-12</li>
                <li><strong>Localização:</strong> Piratininga, SP</li>
              </ul>
            </section>

            <section id="servicos" className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">3. Escopo dos Serviços</h2>
              <p className="text-gray-600 leading-relaxed">
                Este site tem como objetivo apresentar nosso portfólio de obras, detalhar nossos serviços de engenharia e servir como canal de comunicação para novos clientes e parceiros. As informações contidas aqui são informativas e podem ser alteradas sem aviso prévio.
              </p>
            </section>

            <section id="cadastro" className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">4. Cadastro e Responsabilidade</h2>
              <p className="text-gray-600 leading-relaxed">
                Ao preencher formulários de contato em nosso site, você garante que as informações fornecidas são verdadeiras, precisas e atuais. Você é o único responsável por qualquer informação falsa ou imprecisa que possa causar prejuízos à Redstone Engenharia ou a terceiros.
              </p>
            </section>

            <section id="comunicacao" className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">5. Comunicação</h2>
              <p className="text-gray-600 leading-relaxed">
                Ao nos contatar via formulário, e-mail ou WhatsApp, você consente em receber nosso retorno para tratar da sua solicitação. Poderemos enviar comunicações institucionais ou de marketing, caso você opte por recebê-las.
              </p>
            </section>

            <section id="propriedade" className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">6. Propriedade Intelectual</h2>
              <p className="text-gray-600 leading-relaxed">
                Todo o conteúdo deste site, incluindo textos, logotipos, imagens de projetos, gráficos e código fonte, é de propriedade exclusiva da Redstone Engenharia ou de seus licenciadores, sendo protegido pelas leis de direitos autorais e propriedade intelectual do Brasil. É proibida a reprodução, distribuição ou modificação sem autorização prévia por escrito.
              </p>
            </section>

            <section id="condutas" className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">7. Condutas Proibidas</h2>
              <p className="text-gray-600 leading-relaxed">
                Você concorda em não utilizar o site para:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 mt-4">
                <li>Violar qualquer lei municipal, estadual ou federal.</li>
                <li>Transmitir vírus, malware ou qualquer código destrutivo.</li>
                <li>Tentar obter acesso não autorizado aos nossos sistemas.</li>
                <li>Coletar dados de outros usuários sem consentimento.</li>
              </ul>
            </section>

            <section id="terceiros" className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">8. Links de Terceiros</h2>
              <p className="text-gray-600 leading-relaxed">
                Nosso site pode conter links para sites de terceiros (ex: LinkedIn, Instagram). Não controlamos e não somos responsáveis pelo conteúdo ou práticas de privacidade desses sites. Recomendamos a leitura dos termos de cada site visitado.
              </p>
            </section>

            <section id="responsabilidade" className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">9. Limitação de Responsabilidade</h2>
              <p className="text-gray-600 leading-relaxed">
                O site é fornecido "como está". Embora nos esforcemos para manter as informações atualizadas, não garantimos que o site estará livre de erros ou interrupções. A Redstone Engenharia não se responsabiliza por danos diretos ou indiretos decorrentes do uso ou da impossibilidade de uso do site.
              </p>
            </section>

            <section id="privacidade" className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">10. Privacidade e Cookies</h2>
              <p className="text-gray-600 leading-relaxed">
                A sua privacidade é importante para nós. O uso de seus dados pessoais é regido pela nossa <Link to="/politica-de-privacidade" className="text-primary hover:underline">Política de Privacidade</Link>. Para entender como utilizamos cookies, consulte nossas configurações.
              </p>
            </section>

            <section id="alteracoes" className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">11. Alterações dos Termos</h2>
              <p className="text-gray-600 leading-relaxed">
                Podemos atualizar estes Termos de Uso periodicamente. A versão mais recente estará sempre disponível nesta página, com a data da última atualização. O uso contínuo do site após alterações implica na aceitação dos novos termos.
              </p>
            </section>

            <section id="foro" className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">12. Lei Aplicável e Foro</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Estes termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da Comarca de São Paulo, SP (ou o foro de domicílio do consumidor, se aplicável) para dirimir quaisquer dúvidas decorrentes deste documento.
              </p>

              <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10 mt-8">
                <h3 className="text-primary font-bold text-lg mb-4">Dúvidas? Entre em contato</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-4">
                    <div className="bg-white w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-full shadow-sm text-primary">
                      <Icon name="mail" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">E-mail</p>
                      <a href="mailto:contato@redstoneengenharia.com.br" className="text-gray-900 hover:text-primary transition-colors font-medium">
                        reds@redstoneengenharia.com.br
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                     <div className="bg-white w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-full shadow-sm text-primary">
                      <Icon name="phone" />
                    </div>
                    <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">WhatsApp</p>
                      <p className="text-gray-900 font-medium">(XX) XXXXX-XXXX</p>
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

export default TermsOfUsePage;
