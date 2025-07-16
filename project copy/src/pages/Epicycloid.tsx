import React, { useState, useCallback, useMemo, useRef, useEffect, useLayoutEffect } from 'react';
import { Download, Settings, Palette, Play, Pause } from 'lucide-react';
import Topbar from '../components/Topbar'; 
import Footer from '../components/Footer'; 
import { ArcColorPicker } from "../components/cuicui/ArcColorPicker";
import {Helmet} from "react-helmet";

interface EpicycloidParams {
  R: number; // Fixed circle radius
  r: number; // Rolling circle radius
  amplitude: number;
  color: string;
  strokeWidth: number;
}

interface AnimationState {
  isRunning: boolean;
  globalPhase: number;
  internalPhase: number;
  globalSpeed: number;    // radians/frame
  internalSpeed: number;  // radians/frame
}

function Epicycloid() {
  const [params, setParams] = useState<EpicycloidParams>({
    R: 100,
    r: 30,
    amplitude: 150, 
    color: "#ffffff",
    strokeWidth: 2,
  });

  const [animation, setAnimation] = useState<AnimationState>({
    isRunning: true,
    globalPhase: 0,
    internalPhase: 0,
    globalSpeed: 0.02,
    internalSpeed: 0.03,
  });

  const [fps, setFps] = useState<number>(60);
  const fpsCounterRef = useRef<{ frames: number; lastTime: number }>({ frames: 0, lastTime: 0 });

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

  useLayoutEffect(() => { animationStateRef.current = animation; }, [animation]);
  useEffect(() => { paramsRef.current = params; }, [params]);

  // Greatest common divisor to compute period
  const gcd = useCallback((a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  }, []);

  const generatePath = useCallback(
    (
      R: number,
      r: number,
      globalPhase: number,
      internalPhase: number,
      amplitude: number
    ) => {
      const steps = 2000;
      const maxT = Math.PI * 2 * (R / gcd(R, r));
      const rawPoints: { x: number; y: number }[] = [];

      for (let i = 0; i <= steps; i++) {
        const t = (i / steps) * maxT;
        const theta = t - globalPhase;

        const rawX =
          (R + r) * Math.cos(theta) -
          r * Math.cos(((R + r) / r) * theta + internalPhase);
        const rawY =
          (R + r) * Math.sin(theta) -
          r * Math.sin(((R + r) / r) * theta + internalPhase);

        rawPoints.push({ x: rawX, y: rawY });
      }

      const maxDistance = rawPoints.reduce((max, p) => {
        const d = Math.sqrt(p.x * p.x + p.y * p.y);
        return Math.max(max, d);
      }, 0.00001);

      let path = "";
      rawPoints.forEach((p, i) => {
        const x = (p.x / maxDistance) * amplitude + 250;
        const y = (p.y / maxDistance) * amplitude + 250;
        if (i === 0) {
          path += `M ${x.toFixed(2)} ${y.toFixed(2)}`;
        } else {
          path += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
        }
      });

      return path;
    },
    [gcd]
  );

  const staticPath = useMemo(() => {
    return generatePath(
      params.R,
      params.r,
      animation.globalPhase,
      animation.internalPhase,
      params.amplitude
    );
  }, [params, animation.globalPhase, animation.internalPhase, generatePath]);

  const updateParam = useCallback((key: keyof EpicycloidParams, value: number | string) => {
    setParams(prev => ({ ...prev, [key]: value }));
  }, []);

  const updateAnimationSpeed = useCallback((type: 'global' | 'internal', speed: number) => {
    setAnimation(prev => ({ 
      ...prev, 
      [`${type}Speed`]: speed 
    }));
    animationStateRef.current[`${type}Speed`] = speed;
  }, []);

  const animate = useCallback((currentTime: number) => {
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
      setFps(Math.round((fpsCounterRef.current.frames * 1000) /
        (currentTime - fpsCounterRef.current.lastTime)));
      fpsCounterRef.current.frames = 0;
      fpsCounterRef.current.lastTime = currentTime;
    }

    const deltaTime = (currentTime - lastTimeRef.current) / 1000;
    lastTimeRef.current = currentTime;

    // Update both phases
    let newGlobal = state.globalPhase + state.globalSpeed * deltaTime * 60;
    let newInternal = state.internalPhase + state.internalSpeed * deltaTime * 60;

    newGlobal = newGlobal % (2 * Math.PI);
    newInternal = newInternal % (2 * Math.PI);

    animationStateRef.current.globalPhase = newGlobal;
    animationStateRef.current.internalPhase = newInternal;

    if (pathRef.current) {
      const newPath = generatePath(
        currentParams.R,
        currentParams.r,
        newGlobal,
        newInternal,
        currentParams.amplitude
      );
      pathRef.current.setAttribute("d", newPath);
    }

    if (fpsCounterRef.current.frames % 6 === 0) {
      setAnimation(prev => ({
        ...prev,
        globalPhase: newGlobal,
        internalPhase: newInternal,
      }));
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [generatePath]);

  useEffect(() => {
    if (animationStateRef.current.isRunning) {
      animate(performance.now());
    }
  }, [animate]);

  // Start/stop animation
  const startAnimation = useCallback(() => {
    if (!animationStateRef.current.isRunning) {
      animationStateRef.current.isRunning = true;
      setAnimation(prev => ({ ...prev, isRunning: true }));
      lastTimeRef.current = undefined;
      fpsCounterRef.current = { frames: 0, lastTime: 0 };
      animate(performance.now());
    }
  }, [animate]);

  useEffect(() => {
    startAnimation();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [startAnimation]);

  const stopAnimation = useCallback(() => {
    animationStateRef.current.isRunning = false;
    setAnimation(prev => ({ ...prev, isRunning: false }));
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
  }, []);

  const toggleAnimation = useCallback(() => {
    if (animationStateRef.current.isRunning) stopAnimation();
    else startAnimation();
  }, [startAnimation, stopAnimation]);

  const resetPhase = useCallback(() => {
    animationStateRef.current.globalPhase = 0;
    animationStateRef.current.internalPhase = 0;
    setAnimation(prev => ({ 
      ...prev, 
      globalPhase: 0,
      internalPhase: 0
    }));

    if (!animationStateRef.current.isRunning && pathRef.current) {
      const newPath = generatePath(
        params.R,
        params.r,
        0,
        0,
        params.amplitude
      );
      pathRef.current.setAttribute('d', newPath);
    }
  }, [params, generatePath]);

  const downloadSVG = useCallback(() => {
    const currentPath = animation.isRunning
      ? pathRef.current?.getAttribute('d') || staticPath
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

    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `epicycloid-curve-${Date.now()}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [staticPath, params.color, params.strokeWidth, animation.isRunning]);

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Helmet>
        <title>Designer | Epicycloid</title>
      </Helmet>
      <Topbar />

      <main className="px-4 sm:px-6 pb-12 sm:pb-20">
        <div className="max-w-7xl mx-auto">
          <header className="pt-12 sm:pt-20 pb-6 sm:pb-8 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
              Epicycloid Designer
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
                      <div>Global: {animation.globalPhase.toFixed(2)} rad</div>
                      <div>Internal: {animation.internalPhase.toFixed(2)} rad</div>
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
                    <div className="text-gray-400 font-light">R (Fixed Radius)</div>
                    <div className="text-white font-medium">{params.R}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-400 font-light">r (Rolling Radius)</div>
                    <div className="text-white font-medium">{params.r}</div>
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
                        <span className="text-gray-400 font-light">Global Speed:</span>
                        <span className="text-white font-medium">{animation.globalSpeed.toFixed(3)}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm mt-2">
                        <span className="text-gray-400 font-light">Internal Speed:</span>
                        <span className="text-white font-medium">{animation.internalSpeed.toFixed(3)}</span>
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
              <div className="bg-white/[0.02] backdrop-blur-sm rounded-2xl p-6 border border-white/[0.08]">
                <div className="flex items-center gap-3 mb-6">
                  <Settings className="w-5 h-5 text-gray-400" />
                  <h3 className="text-xl font-light text-white">Amplitude (Scale): {params.amplitude}</h3>
                </div>
                <input
                  type="range"
                  min="50"
                  max="250"
                  value={params.amplitude}
                  onChange={(e) =>
                    updateParam("amplitude", parseInt(e.target.value))
                  }
                  className="w-full h-2 bg-white/[0.1] rounded-lg appearance-none cursor-pointer slider-mono"
                />
              </div>

              {/* Radius Controls */}
              <div className="bg-white/[0.02] backdrop-blur-sm rounded-2xl p-6 border border-white/[0.08]">
                <div className="flex items-center gap-3 mb-6">
                  <Settings className="w-5 h-5 text-gray-400" />
                  <h3 className="text-xl font-light text-white">Radii</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-light text-gray-300 mb-2">
                      R (Fixed Radius): {params.R}
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="200"
                      value={params.R}
                      onChange={(e) => updateParam('R', parseInt(e.target.value))}
                      className="w-full h-2 bg-white/[0.1] rounded-lg appearance-none cursor-pointer slider-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-light text-gray-300 mb-2">
                      r (Rolling Radius): {params.r}
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="100"
                      value={params.r}
                      onChange={(e) => updateParam('r', parseInt(e.target.value))}
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
                </div>
              </div>

              {/* Animation Controls */}
              <div className="bg-white/[0.02] backdrop-blur-sm rounded-2xl p-6 border border-white/[0.08]">
                <div className="flex items-center gap-3 mb-6">
                  <Play className="w-5 h-5 text-gray-400" />
                  <h3 className="text-xl font-light text-white">Animation</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-light text-gray-300 mb-2">
                      Global Rotation Speed: {animation.globalSpeed.toFixed(3)}
                    </label>
                    <input
                      type="range"
                      min="0.0"
                      max="0.1"
                      step="0.001"
                      value={animation.globalSpeed}
                      onChange={(e) => updateAnimationSpeed('global', parseFloat(e.target.value))}
                      className="w-full h-2 bg-white/[0.1] rounded-lg appearance-none cursor-pointer slider-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-light text-gray-300 mb-2">
                      Internal Phase Speed: {animation.internalSpeed.toFixed(3)}
                    </label>
                    <input
                      type="range"
                      min="0.0"
                      max="0.1"
                      step="0.001"
                      value={animation.internalSpeed}
                      onChange={(e) => updateAnimationSpeed('internal', parseFloat(e.target.value))}
                      className="w-full h-2 bg-white/[0.1] rounded-lg appearance-none cursor-pointer slider-mono"
                    />
                  </div>
                </div>
              </div>

              {/* VIEW DOCUMENTATION BUTTON */}
              <div className="w-full flex justify-center mt-10">
                <a
                  href="docs/epicycloid"
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
      </main>
      <Footer />
    </div>
  );
}

export default Epicycloid;