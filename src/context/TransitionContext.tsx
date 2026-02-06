import React, { createContext, useContext, useState, ReactNode } from 'react';

type Position = {
  x: number;
  y: number;
  width: number;
  height: number;
};

interface TransitionContextProps {
  isTransitioning: boolean;
  transitionOrigin: Position | null;
  startTransition: (rect: Position, callback: () => void) => void;
  endTransition: () => void;
  transitionStage: 'idle' | 'expanding' | 'covering' | 'revealing';
  setTransitionStage: (stage: 'idle' | 'expanding' | 'covering' | 'revealing') => void;
  transitionText: string;
  setTransitionText: (text: string) => void;
}

const TransitionContext = createContext<TransitionContextProps | undefined>(undefined);

export const PageTransitionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionOrigin, setTransitionOrigin] = useState<Position | null>(null);
  const [transitionStage, setTransitionStage] = useState<'idle' | 'expanding' | 'covering' | 'revealing'>('idle');
  const [transitionText, setTransitionText] = useState('');

  const startTransition = (rect: Position, callback: () => void) => {
    setTransitionOrigin(rect);
    setIsTransitioning(true);
    setTransitionStage('expanding');

    // Sequence timing would be handled by the TransitionOverlay component
    // effectively, but we can trigger the navigation callback here
    // or pass it to the overlay to trigger when "covered".
    // For now, let's store the callback likely in a ref or just rely on the Overlay to call a passed function,
    // but the cleanest way is often to let the Overlay drive the "when to navigate" via an onAnimationComplete prop,
    // OR simply timeout here. 
    
    // Better AR/VR feel: navigate ONLY when fully covered.
    // We'll expose a method to the Overlay to say "I'm ready to navigate".
    // Actually, simpler: The Link component handles the delay logic or we pass the callback to the context 
    // and the Context/Overlay coordinates it.
    
    // Let's keep it simple: The Overlay monitors "transitionStage".
    // When stage reaches "covering", we execute the navigation.
    
    // We will save the callback to be executed later.
    // However, React state updates are async.
    // Let's return the control to the caller (Link) to handle the navigation 
    // after a fixed timeout for now, or use a specific "onCovered" mechanism.
    
    // Refined approach:
    // 1. Link calls startTransition with simple rect.
    // 2. State updates, Overlay starts expanding.
    // 3. Overlay tells Context "I am covering now".
    // 4. Context or Effect triggers the pending navigation?
    
    // Actually, standardizing the time is easier and usually smoother/less buggy than waiting for animation events which might be interrupted.
    // Let's set the duration in a constant and let the Link handle the timeout, 
    // OR handle it here.
    
    // Let's handle navigation callback in the Link for simplicity 
    // but give it the correct delay derived from our animation constants.
    
    // For this implementation, I will just set state here.
  };

  const endTransition = () => {
    setIsTransitioning(false);
    setTransitionStage('idle');
    setTransitionOrigin(null);
  };

  return (
    <TransitionContext.Provider
      value={{
        isTransitioning,
        transitionOrigin,
        startTransition,
        endTransition,
        transitionStage,
        setTransitionStage,
        transitionText,
        setTransitionText,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
};

export const usePageTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('usePageTransition must be used within a PageTransitionProvider');
  }
  return context;
};
