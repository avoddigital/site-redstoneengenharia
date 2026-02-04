import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfUsePage from './pages/TermsOfUsePage';
import ScrollToTop from './components/ScrollToTop';
import { CookieConsentProvider } from './context/CookieConsentContext';
import CookieBanner from './components/cookies/CookieBanner';
import CookiePreferencesModal from './components/cookies/CookiePreferencesModal';

const App: React.FC = () => {
  return (
    <CookieConsentProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projetos" element={<ProjectsPage />} />
        <Route path="/politica-de-privacidade" element={<PrivacyPolicyPage />} />
        <Route path="/termos-de-uso" element={<TermsOfUsePage />} />
      </Routes>
      <CookieBanner />
      <CookiePreferencesModal />
    </CookieConsentProvider>
  );
};

export default App;