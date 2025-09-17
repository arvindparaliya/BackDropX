import { useState } from "react";
import { assets } from "../assets/assets";

const BgSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeCategory, setActiveCategory] = useState("People");

  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value);
  };

  return (
    <div className="mb-20 relative">
      {/* Section Title */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-12 text-center">
        Stunning Quality <span className="text-indigo-600">Preview</span>
      </h2>

      {/* Category Selector */}
      <div className="flex justify-center mb-10 flex-wrap">
        <div className="inline-flex gap-3 bg-gray-100 p-2 rounded-full shadow-inner flex-wrap justify-center">
          {assets.categories.map((category) => (
            <button
              key={category}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Image Comparison Slider */}
      <div className="relative w-full max-w-4xl m-auto rounded-2xl shadow-2xl overflow-hidden group">
        {/* Original Image */}
        <img
          src={assets.peopleOrg}
          alt="Original"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        />

        {/* Removed Background Image */}
        <img
          src={assets.people}
          alt="Background Removed"
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
        />

        {/* Labels */}
        <span className="absolute top-4 left-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full shadow">
          Original
        </span>
        <span className="absolute top-4 right-4 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full shadow">
          Removed
        </span>

        {/* Slider Input */}
        <input
          type="range"
          className="absolute top-1/2 left-0 w-full z-20 appearance-none bg-transparent cursor-pointer"
          min={0}
          max={100}
          value={sliderPosition}
          onChange={handleSliderChange}
        />

        {/* Custom Handle */}
        <div
          className="absolute top-1/2 left-0 z-30 transform -translate-y-1/2 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-6 h-6 rounded-full bg-white border-2 border-indigo-600 shadow-lg transform -translate-x-1/2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default BgSlider;
