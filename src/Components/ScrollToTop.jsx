import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === 'PUSH') {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth' // <-- smooth scroll here
      });
    }
  }, [pathname, navigationType]);

  return null;
};

export default ScrollToTop;
