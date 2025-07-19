"use client";

import { useState, useEffect, useRef } from "react";

const COLORS = [
  { value: "#6B6E8D", hue: 236 }, // Slate
  { value: "#79E7D0", hue: 168 }, // Aqua
  { value: "#7AA2F7", hue: 223 }, // Blue
  { value: "#ff9a9e", hue: 357 }, // Pink
  { value: "#f6d365", hue: 45 },  // Yellow
  { value: "#84fab0", hue: 145 }, // Green
];

export const ArcColorPicker = ({
  selectedColor,
  setSelectedColor,
}) => {
  const [baseColor, setBaseColor] = useState(COLORS[0]);
  const [saturation, setSaturation] = useState(50);
  const [brightness, setBrightness] = useState(50);
  const sliderRef = useRef(null);

  useEffect(() => {
    const match = COLORS.find(c =>
      selectedColor.toLowerCase().includes(c.value.toLowerCase())
    );
    if (match) {
      setBaseColor(match);
    }
  }, [selectedColor]);

  const vibrate = () => {
    if (navigator.vibrate) navigator.vibrate(50);
  };

  const handleColorSelect = (color) => {
    setBaseColor(color);
    setSaturation(50);
    setBrightness(50);
    updateColor(color.hue, 50, 50);
    vibrate();
  };

  const handleSliderMove = (event) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const clientX =
      "touches" in event ? event.touches[0].clientX : event.clientX;
    const clientY =
      "touches" in event ? event.touches[0].clientY : event.clientY;
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
    const newSaturation = Math.round(x * 100);
    const newBrightness = Math.round((1 - y) * 100);
    setSaturation(newSaturation);
    setBrightness(newBrightness);
    updateColor(baseColor.hue, newSaturation, newBrightness);
    vibrate();
  };

  const updateColor = (hue, sat, bri) => {
    const newHsl = `hsl(${hue}, ${sat}%, ${bri}%)`;
    setSelectedColor(newHsl);
  };

  return (
    <div className="w-full sm:w-[400px] max-w-full bg-white/80 dark:bg-neutral-900 backdrop-blur-xl rounded-3xl p-4 sm:p-6 space-y-6 shadow-lg">
      {/* Color Preview */}
      <div className="flex justify-center">
        <div
          className="size-16 rounded-full border-2 border-white shadow-lg"
          style={{ background: selectedColor }}
        />
      </div>

      {/* 2D Gradient Slider */}
      <div
        ref={sliderRef}
        className="h-40 sm:h-48 relative cursor-crosshair rounded-md overflow-hidden"
        onMouseDown={(e) => {
          handleSliderMove(e.nativeEvent);
          const move = (ev) => handleSliderMove(ev);
          const up = () => {
            document.removeEventListener("mousemove", move);
            document.removeEventListener("mouseup", up);
          };
          document.addEventListener("mousemove", move);
          document.addEventListener("mouseup", up);
        }}
        onTouchStart={(e) => {
          handleSliderMove(e.nativeEvent);
          const move = (ev) => handleSliderMove(ev);
          const end = () => {
            document.removeEventListener("touchmove", move);
            document.removeEventListener("touchend", end);
          };
          document.addEventListener("touchmove", move);
          document.addEventListener("touchend", end);
        }}
        style={{
          backgroundImage: `
            linear-gradient(to right, 
              hsl(${baseColor.hue}, 0%, 50%), 
              hsl(${baseColor.hue}, 100%, 50%)
            ),
            linear-gradient(to top, 
              hsl(${baseColor.hue}, 100%, 0%),
              transparent
            )
          `
        }}
      >
        {/* Knob */}
        <div
          className="absolute w-5 h-5 sm:w-4 sm:h-4 border-2 border-white rounded-full shadow transform -translate-x-1/2 -translate-y-1/2 z-10"
          style={{
            left: `${saturation}%`,
            top: `${100 - brightness}%`,
          }}
        />
      </div>

      {/* Swatches */}
      <div className="flex flex-wrap justify-center w-full gap-2">
        {COLORS.map((color, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleColorSelect(color)}
            className={`size-8 rounded-full transition-transform hover:scale-110 ${
              baseColor.value.toLowerCase() === color.value.toLowerCase()
                ? "border-2 border-white shadow"
                : ""
            }`}
            style={{ background: color.value }}
          />
        ))}
      </div>
    </div>
  );
};