import React, { useState, useEffect } from 'react';

const AnimatedBox = ({ photos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % photos.length);
    }, 3000); // change every 3 second
    return () => clearInterval(interval);
  }, [photos.length]);

  return (
    <div className="animated-box">
      <img
        src={photos[currentIndex]}
        alt=""
        className="animated-img"
      />
    </div>
  );
};

export default AnimatedBox;
