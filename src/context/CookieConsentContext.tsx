import React, { createContext, useContext, useEffect, useState } from 'react';

// --- Types ---
export interface ConsentOptions {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

interface CookieConsentContextType {
  consent: ConsentOptions;
  hasConsented: boolean;
  bannerOpen: boolean;
  preferencesOpen: boolean;
  
  // Actions
  acceptAll: () => void;
  rejectNonEssential: () => void;
  updateConsent: (newConsent: ConsentOptions) => void; // Save specific preferences
  
  // UI Controls
  openPreferences: () => void;
  closePreferences: () => void;
  closeBanner: () => void; // Should strictly only be used if we want to dismiss without action (rare)

  // Helpers to check permissions
  // e.g. if (canRunAnalytics()) { ... }
  canRunAnalytics: boolean;
  canRunMarketing: boolean;
}

const STORAGE_KEY = 'redstone_cookie_consent';
const CONSENT_VERSION = '1.0'; // Increment this to force re-consent

// Default State
const defaultConsent: ConsentOptions = {
  necessary: true, // Always true
  analytics: false,
  marketing: false,
  preferences: false,
};

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
};

// --- Provider ---
export const CookieConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [consent, setConsent] = useState<ConsentOptions>(defaultConsent);
  const [hasConsented, setHasConsented] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        
        // Version Check
        if (parsed.version === CONSENT_VERSION) {
          setConsent(parsed.consent);
          setHasConsented(true);
          setBannerOpen(false);
          return;
        }
      }
    } catch (e) {
      console.error('Failed to parse cookie consent', e);
    }
    
    // Default: Show banner if no valid consent found
    setBannerOpen(true);
  }, []);

  // --- Actions ---

  const saveToStorage = (newConsent: ConsentOptions) => {
    const data = {
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
      consent: newConsent,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const acceptAll = () => {
    const allEnabled: ConsentOptions = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    setConsent(allEnabled);
    setHasConsented(true);
    setBannerOpen(false);
    setPreferencesOpen(false);
    saveToStorage(allEnabled);
  };

  const rejectNonEssential = () => {
    const onlyNecessary: ConsentOptions = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    setConsent(onlyNecessary);
    setHasConsented(true);
    setBannerOpen(false);
    setPreferencesOpen(false);
    saveToStorage(onlyNecessary);
  };

  const updateConsent = (newConsent: ConsentOptions) => {
    // Ensure necessary is always true
    const validConsent = { ...newConsent, necessary: true };
    setConsent(validConsent);
    setHasConsented(true);
    setBannerOpen(false);
    setPreferencesOpen(false);
    saveToStorage(validConsent);
  };

  const openPreferences = () => setPreferencesOpen(true);
  const closePreferences = () => setPreferencesOpen(false);
  const closeBanner = () => setBannerOpen(false);

  return (
    <CookieConsentContext.Provider value={{
      consent,
      hasConsented,
      bannerOpen,
      preferencesOpen,
      acceptAll,
      rejectNonEssential,
      updateConsent,
      openPreferences,
      closePreferences,
      closeBanner,
      canRunAnalytics: consent.analytics,
      canRunMarketing: consent.marketing,
    }}>
      {children}
    </CookieConsentContext.Provider>
  );
};
