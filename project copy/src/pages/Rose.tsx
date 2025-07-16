import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useLayoutEffect,
} from "react";
import {
  Download,
  Settings,
  Palette,
  Play,
  Pause,
} from "lucide-react";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import { ArcColorPicker } from "../components/cuicui/ArcColorPicker";
import { Helmet } from "react-helmet"; 

interface RoseParams {
  amplitude: number;
  k: number;
  color: string;
  strokeWidth: number;
  phaseShift: number;
}

interface AnimationState {
  isRunning: boolean;
  speed: number;
  currentPhase: number;
}

function RoseCurve() {
  const [params, setParams] = useState<RoseParams>({
    amplitude: 150,
    k: 4,
    color: "#ffffff",
    strokeWidth: 2,
    phaseShift: 0,
  });

  const [animation, setAnimation] = useState<AnimationState>({
    isRunning: true,
    speed: 0.02,
    currentPhase: 0,
  });

  const [fps, setFps] = useState<number>(60);
  const fpsCounterRef = useRef<{ frames: number; lastTime: number }>({
    frames: 0,
    lastTime: 0,
  });

  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>();
  const animationStateRef = useRef(animation);
  const paramsRef = useRef(params);
  const pathRef = useRef<SVGPathElement>(null);
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);

  // Close color picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!isColorPickerVisible) return;

      const picker = document.getElementById("color-picker-popup");
      const button = document.getElementById("color-picker-button");

      if (picker && picker.contains(event.target as Node)) return;
      if (button && button.contains(event.target as Node)) return;

      setIsColorPickerVisible(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isColorPickerVisible]);  

  useLayoutEffect(() => {
    animationStateRef.current = animation;
  }, [animation]);

  useEffect(() => {
    paramsRef.current = params;
  }, [params]);

  const generatePath = useCallback(
    (amplitude: number, k: number, phaseShift: number) => {
      const steps = 2000;
      // Cover longer range of t to close the curve fully
      const tMax = 2 * Math.PI * (k % 1 === 0 ? 1 : k);
      let path = "";
      
      for (let i = 0; i <= steps; i++) {
        const t = (i / steps) * tMax;
        const r = amplitude * Math.cos(k * t + phaseShift);
        const x = r * Math.cos(t) + 250;
        const y = r * Math.sin(t) + 250;

        if (i === 0) {
          path += `M ${x.toFixed(2)} ${y.toFixed(2)}`;
        } else {
          path += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
        }
      }
      return path;
    },
    []
  );


  const staticPath = useMemo(() => {
    return generatePath(params.amplitude, params.k, params.phaseShift);
  }, [params, generatePath]);

  const updateParam = useCallback(
    (key: keyof RoseParams, value: number | string) => {
      setParams((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const updateAnimationSpeed = useCallback((speed: number) => {
    setAnimation((prev) => ({ ...prev, speed }));
    animationStateRef.current.speed = speed;
  }, []);

  const animate = useCallback(
    (currentTime: number) => {
      const state = animationStateRef.current;
      const currentParams = paramsRef.current;

      if (!state.isRunning) return;

      if (!lastTimeRef.current) {
        lastTimeRef.current = currentTime;
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      fpsCounterRef.current.frames++;
      if (currentTime - fpsCounterRef.current.lastTime >= 1000) {
        setFps(
          Math.round(
            (fpsCounterRef.current.frames * 1000) /
              (currentTime - fpsCounterRef.current.lastTime)
          )
        );
        fpsCounterRef.current.frames = 0;
        fpsCounterRef.current.lastTime = currentTime;
      }

      const deltaTime = (currentTime - lastTimeRef.current) / 1000;
      lastTimeRef.current = currentTime;

      let newPhase = state.currentPhase + state.speed * deltaTime * 60;
      newPhase = newPhase % (2 * Math.PI);

      animationStateRef.current.currentPhase = newPhase;

      if (pathRef.current) {
        const newPath = generatePath(
          currentParams.amplitude,
          currentParams.k,
          newPhase
        );
        pathRef.current.setAttribute("d", newPath);
        pathRef.current.setAttribute("stroke", currentParams.color);
        pathRef.current.setAttribute("stroke-width", String(currentParams.strokeWidth));
      }

      if (fpsCounterRef.current.frames % 6 === 0) {
        setAnimation((prev) => ({ ...prev, currentPhase: newPhase }));
      }

      animationRef.current = requestAnimationFrame(animate);
    },
    [generatePath]
  );

  useEffect(() => {
    if (animationStateRef.current.isRunning) {
      animate(performance.now());
    }
  }, [animate]);

  const startAnimation = useCallback(() => {
    if (!animationStateRef.current.isRunning) {
      animationStateRef.current.isRunning = true;
      setAnimation((prev) => ({ ...prev, isRunning: true }));
      lastTimeRef.current = undefined;
      fpsCounterRef.current = { frames: 0, lastTime: 0 };
      animate(performance.now());
    }
  }, [animate]);

  const stopAnimation = useCallback(() => {
    animationStateRef.current.isRunning = false;
    setAnimation((prev) => ({ ...prev, isRunning: false }));
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
  }, []);

  const toggleAnimation = useCallback(() => {
    if (animationStateRef.current.isRunning) stopAnimation();
    else startAnimation();
  }, [startAnimation, stopAnimation]);

  const downloadSVG = useCallback(() => {
    const currentPath =
      animation.isRunning
        ? pathRef.current?.getAttribute("d") || staticPath
        : staticPath;

    const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
      <svg width="500" height="500" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
        <rect width="500" height="500" fill="black"/>
        <path d="${currentPath}"
              fill="none"
              stroke="${params.color}"
              stroke-width="${params.strokeWidth}"
              stroke-linecap="round"
              stroke-linejoin="round"/>
      </svg>`;

    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `rose-curve-${Date.now()}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [staticPath, params.color, params.strokeWidth, animation.isRunning]);

  const currentPhaseDisplay = animation.isRunning
    ? animation.currentPhase
    : params.phaseShift;

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Helmet>
        <title>Designer | Rose </title>
      </Helmet>
      <Topbar />

      <main className="px-4 sm:px-6 pb-12 sm:pb-20">
        <div className="max-w-7xl mx-auto">
          <header className="pt-12 sm:pt-20 pb-6 sm:pb-8 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
              Rose Curve Designer
            </h2>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white/[0.02] backdrop-blur-sm rounded-2xl p-6 border border-white/[0.08]">
                <div className="flex justify-center">
                  <div className="relative w-full max-w-[500px] mx-auto bg-black rounded-xl p-4 border border-white/[0.05]">
                    <svg
                      viewBox="0 0 500 500"
                      className="w-full h-auto"
                    >
                      <path
                        ref={pathRef}
                        d={staticPath}
                        fill="none"
                        stroke={params.color}
                        strokeWidth={params.strokeWidth}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <button
                      onClick={toggleAnimation}
                      className="absolute top-2 left-2 bg-white/[0.05] hover:bg-white/[0.1] text-white p-2 rounded-full"
                      title={animation.isRunning ? "Pause" : "Play"}
                    >
                      {animation.isRunning ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </button>

                    <button
                      id="color-picker-button"
                      onClick={() =>
                        setIsColorPickerVisible((prev) => !prev)
                      }
                      className="absolute bottom-2 left-2 bg-white/[0.05] hover:bg-white/[0.1] text-white p-2 rounded-full"
                      title="Change Line Color"
                    >
                      <Palette className="w-4 h-4" />
                    </button>

                    {isColorPickerVisible && (
                      <div
                        id="color-picker-popup"
                        className="absolute bottom-12 left-2 bg-black/90 p-4 rounded-xl shadow-lg"
                      >
                        <ArcColorPicker
                          selectedColor={params.color}
                          setSelectedColor={(color: string) =>
                            updateParam("color", color)
                          }
                        />
                      </div>
                    )}

                    <div className="absolute bottom-2 right-2 text-white text-xs font-mono">
                      Phase: {currentPhaseDisplay.toFixed(2)} rad (
                      {(
                        (currentPhaseDisplay * 180) /
                        Math.PI
                      ).toFixed(1)}
                      &deg;)
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full flex justify-center">
                <button
                  onClick={downloadSVG}
                  className="w-full sm:w-auto bg-white text-black hover:bg-gray-100 font-medium py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3"
                >
                  <Download className="w-5 h-5" />
                  Download SVG
                </button>
              </div>

              <div className="bg-white/[0.02] backdrop-blur-sm rounded-2xl p-6 border border-white/[0.08]">
                <h3 className="text-lg sm:text-xl font-light text-white mb-4">Current Parameters</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-gray-400 font-light">Amplitude</div>
                    <div className="text-white font-medium">{params.amplitude}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-400 font-light">k (Petal Count)</div>
                    <div className="text-white font-medium">{params.k}</div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/[0.08]">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400 font-light">Animation Status:</span>
                    <span className={`font-medium ${animation.isRunning ? 'text-gray-200' : 'text-gray-500'}`}>{animation.isRunning ? 'Running' : 'Stopped'}</span>
                  </div>
                  {animation.isRunning && (
                    <>
                      <div className="flex justify-between items-center text-sm mt-2">
                        <span className="text-gray-400 font-light">Speed:</span>
                        <span className="text-white font-medium">{animation.speed.toFixed(3)}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm mt-2">
                        <span className="text-gray-400 font-light">Performance:</span>
                        <span className={`font-medium ${fps >= 55 ? 'text-gray-200' : fps >= 30 ? 'text-gray-400' : 'text-gray-500'}`}>{fps} FPS</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="xl:col-span-1 space-y-6">
                {/* Amplitude Controls */}
                <div className="bg-white/[0.02] backdrop-blur-sm rounded-2xl p-6 border border-white/[0.08]">
                  <div className="flex items-center gap-3 mb-6">
                    <Settings className="w-5 h-5 text-gray-400" />
                    <h3 className="text-xl font-light text-white">Amplitude</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-light text-gray-300 mb-2">
                        Amplitude: {params.amplitude}
                      </label>
                      <input
                        type="range"
                        min="10"
                        max="200"
                        value={params.amplitude}
                        onChange={(e) => updateParam('amplitude', parseInt(e.target.value))}
                        className="w-full h-2 bg-white/[0.1] rounded-lg appearance-none cursor-pointer slider-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Frequency Controls */}
                <div className="bg-white/[0.02] backdrop-blur-sm rounded-2xl p-6 border border-white/[0.08]">
                  <div className="flex items-center gap-3 mb-6">
                    <Settings className="w-5 h-5 text-gray-400" />
                    <h3 className="text-xl font-light text-white">Frequency</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-light text-gray-300 mb-2">
                        k (Petal Count): {params.k}
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        step="0.1"
                        value={params.k}
                        onChange={(e) => updateParam('k', parseFloat(e.target.value))}
                        className="w-full h-2 bg-white/[0.1] rounded-lg appearance-none cursor-pointer slider-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Visual Controls */}
                <div className="bg-white/[0.02] backdrop-blur-sm rounded-2xl p-6 border border-white/[0.08]">
                  <div className="flex items-center gap-3 mb-6">
                    <Palette className="w-5 h-5 text-gray-400" />
                    <h3 className="text-xl font-light text-white">Visual</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-light text-gray-300 mb-2">
                        Manual Phase Shift: {params.phaseShift.toFixed(2)}
                        {animation.isRunning && <span className="text-gray-500 text-xs ml-2">(Animation Active)</span>}
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="6.283"
                        step="0.1"
                        value={params.phaseShift}
                        onChange={(e) => updateParam('phaseShift', parseFloat(e.target.value))}
                        disabled={animation.isRunning}
                        className={`w-full h-2 bg-white/[0.1] rounded-lg appearance-none cursor-pointer slider-mono ${
                          animation.isRunning ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-light text-gray-300 mb-2">
                        Stroke Width: {params.strokeWidth}px
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={params.strokeWidth}
                        onChange={(e) => updateParam('strokeWidth', parseInt(e.target.value))}
                        className="w-full h-2 bg-white/[0.1] rounded-lg appearance-none cursor-pointer slider-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-light text-gray-300 mb-2">
                        Animation Speed: {animation.speed.toFixed(3)}
                      </label>
                      <input
                        type="range"
                        min="0.005"
                        max="0.1"
                        step="0.005"
                        value={animation.speed}
                        onChange={(e) => updateAnimationSpeed(parseFloat(e.target.value))}
                        className="w-full h-2 bg-white/[0.1] rounded-lg appearance-none cursor-pointer slider-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* VIEW DOCUMENTATION BUTTON */}
                <div className="w-full flex justify-center mt-10">
                  <a
                    href="docs/rose"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-white text-sm transition-colors duration-200 bg-black px-3 py-2 rounded"
                  >
                    Go To Documentation
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default RoseCurve;