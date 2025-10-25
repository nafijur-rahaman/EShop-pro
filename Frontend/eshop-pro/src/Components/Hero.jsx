import React, { useState, useEffect } from "react";
import AnimatedText from "./text/AnimatedText";
import img1 from "../assets/images/offer-img-1.jpg";
import img2 from "../assets/images/offer-img-2.jpg";
import img3 from "../assets/images/offer-img-3.jpg";

const Hero = () => {
  const images = [img1, img2, img3];
  const [current, setCurrent] = useState(0);

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [current]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div>
      <div className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-2xl shadow-lg mt-8">
        {/* Images container */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full flex-shrink-0 object-cover h-[400px]"
            />
          ))}
        </div>

        {/* Left Button */}
        <button
          onClick={prevSlide}
          className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2  text-white p-3 rounded-full hover:scale-200"
        >
          ❮
        </button>

        {/* Right Button */}
        <button
          onClick={nextSlide}
          className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full hover:scale-200"
        >
          ❯
        </button>

        {/* Bullets */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                current === index ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="text-center mt-4">
        <AnimatedText
          text="Welcome to Our Shop"
          className="text-5xl font-bold text-black"
          delay={10} // milliseconds per letter
        />
      </div>
    </div>
  );
};

export default Hero;
