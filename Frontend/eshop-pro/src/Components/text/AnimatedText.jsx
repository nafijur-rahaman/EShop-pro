import React, { useState, useEffect } from "react";

const AnimatedText = ({ text, className = "", duration = 500 }) => {
  const letters = Array.from(text);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % letters.length);
    }, duration);
    return () => clearInterval(interval);
  }, [letters.length, duration]);

  return (
    <span className={className}>
      {letters.map((char, index) => {
        const isActive = index === activeIndex;
        return (
          <span
            key={index}
            style={{
              display: "inline-block",
              transition: `all ${duration / 1000}s ease-in-out`,
              transform: isActive ? "scale(1.5)" : "scale(1)",
              color: isActive ? "#0ea5e9" : "black", // sky blue vs black
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </span>
  );
};

export default AnimatedText;
