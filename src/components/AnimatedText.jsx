import React, { useState, useEffect } from "react";
import { texts } from "./AnimatedTextData";
const AnimatedText = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % texts.length);
    }, 3000); // 3 seconds per text
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="animated-text-wrapper">
      <div
        className="animated-text-container"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {texts.map((text, index) => (
          <div className="animated-text" key={index}>
            {text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedText;
