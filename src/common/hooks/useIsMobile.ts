import { useEffect, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';

const useIsMobile = () => {
  const { width } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false); // Default to false for SSR
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(width < 821);
  }, [width]);

  // Return false until mounted to prevent hydration mismatch
  return mounted ? isMobile : false;
};

export default useIsMobile;
