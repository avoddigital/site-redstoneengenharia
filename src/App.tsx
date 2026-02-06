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
import { PageTransitionProvider } from './context/TransitionContext';
import { TransitionOverlay } from './components/TransitionOverlay';
import { PageContentWrapper } from './components/PageContentWrapper';

const App: React.FC = () => {
  return (
    <PageTransitionProvider>
        <CookieConsentProvider>
        <ScrollToTop />
        <TransitionOverlay />
        <PageContentWrapper>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/projetos" element={<ProjectsPage />} />
                <Route path="/politica-de-privacidade" element={<PrivacyPolicyPage />} />
                <Route path="/termos-de-uso" element={<TermsOfUsePage />} />
            </Routes>
            <CookieBanner />
            <CookiePreferencesModal />
        </PageContentWrapper>
        </CookieConsentProvider>
    </PageTransitionProvider>
  );
};

export default App;