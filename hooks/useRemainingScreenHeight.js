import { useEffect, useState } from 'react';

const useRemainingHeightOnScroll = () => {
  const [remainingHeight, setRemainingHeight] = useState(0);
  const [remainingPercentage, setRemainingPercentage] = useState(0);

  const handleScroll = () => {
    const totalHeight = document.body.scrollHeight; // total content height
    const scrolledHeight = window.scrollY + window.innerHeight; // height of scrolled content
    const remaining = totalHeight - scrolledHeight; // remaining height

    // Calculate remaining height and percentage
    setRemainingHeight(remaining < 0 ? 0 : remaining);
    setRemainingPercentage(totalHeight > 0 ? ((remaining / totalHeight) * 100).toFixed(2) : 0);
  };

  useEffect(() => {
    // Initial calculation
    handleScroll();

    // Set up scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { remainingHeight, remainingPercentage };
};

export default useRemainingHeightOnScroll;
