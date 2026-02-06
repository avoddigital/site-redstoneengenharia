import { useState, useEffect } from 'react';

export const useScrollSpy = (sectionIds: string[], offset: number = 0, paused: boolean = false) => {
  const [activeLink, setActiveLink] = useState<string>('');

  useEffect(() => {
    if (paused) return; // Don't run observer logic if paused

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Find the first intersecting entry (or the one with distinct presence)
      // Since we want to update the URL and state based on what's mostly visible.
      // A common pattern is checking if isIntersecting.
      
      // Better logic: Find the entry with the highest intersection ratio
      // or the one that intersects near the top viewport offset.
      
      // Let's filter intersecting entries.
      const visibleSections = entries.filter(entry => entry.isIntersecting);
      
      if (visibleSections.length > 0) {
        // Sort by intersection ratio to find the "most visible" section
        const mostVisible = visibleSections.reduce((prev, current) => 
            (prev.intersectionRatio > current.intersectionRatio) ? prev : current
        );
        
        const targetId = mostVisible.target.id;
        
        if (targetId && activeLink !== targetId) {
             setActiveLink(targetId);
             
            // Update URL hash without jump or history push
            if (window.location.hash !== `#${targetId}`) {
                window.history.replaceState(null, "", `#${targetId}`);
            }
        }
      }
    };

    const observerOptions = {
      root: null, // viewport
      rootMargin: `-${offset}px 0px -40% 0px`, // Adjust root margin to trigger when section enters the "reading zone" (top part minus header)
      threshold: [0.2, 0.5, 0.8] // Multiple thresholds to help catch "most visible"
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sectionIds, offset, paused]);

  return activeLink;
};
