import React from "react";
import { Play, Pause, Palette, Download, Zap, Activity, Settings } from "lucide-react";
import { LissajousLogo } from "../components/Logos";  
import { Helmet } from "react-helmet";

// Custom minimalist icons (same style as before)
const OverviewIcon = () => (
  <svg width="24" height="24" viewBox="0 0 28 28" fill="none" className="text-white flex-shrink-0 self-center sm:w-7 sm:h-7">
    <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);

const MathIcon = () => (
  <svg width="24" height="24" viewBox="0 0 28 28" fill="none" className="text-white flex-shrink-0 self-center sm:w-7 sm:h-7">
    <path d="M3 8h22M3 20h22M8 14l12 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M14 3v22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const InterfaceIcon = () => (
  <svg width="24" height="24" viewBox="0 0 28 28" fill="none" className="text-white flex-shrink-0 self-center sm:w-7 sm:h-7">
    <rect x="3" y="5" width="22" height="17" rx="3" stroke="currentColor" strokeWidth="2" fill="none"/>
    <rect x="7" y="10" width="14" height="2" rx="1" stroke="currentColor" strokeWidth="2" fill="none"/>
    <rect x="7" y="15" width="8" height="2" rx="1" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);

const ParametersIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
    className="text-white flex-shrink-0 self-center sm:w-7 sm:h-7"
    fill="currentColor"
  >
    <path d="M18.979 4.661a19.9 19.9 0 0 0-6.129 2.735L9.857 4.402l-5.656 5.657 3.042 3.042a19.9 19.9 0 0 0-2.583 5.883H0v10.031h4.66a19.9 19.9 0 0 0 2.66 6.009l-3.118 3.118 5.656 5.656 3.119-3.118A19.9 19.9 0 0 0 19 43.344V48h4.062v-8.047C14.665 39.465 8 32.52 8 24c0-8.521 6.665-15.465 15.062-15.953V0h-4.083z" />
    <path d="M15 24a9 9 0 0 0 8.062 8.951v-4.046A4.996 4.996 0 0 1 19 24c0-2.44 1.75-4.466 4.062-4.905v-4.046A9 9 0 0 0 15 24M44.109 6.435h-2.745V0H26v14.762h15.364V9.865h2.745v8.446H26V48h7.011V32.693l-2.413-9.06h-1.206v-1.892h18.124V6.435z" />
  </svg>
);

const ControlsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 28 28" fill="none" className="text-white flex-shrink-0 self-center sm:w-7 sm:h-7">
    <rect x="3" y="3" width="22" height="22" rx="3" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="11" cy="11" r="2" fill="currentColor"/>
    <circle cx="17" cy="17" r="2" fill="currentColor"/>
    <path d="M8 14h12M14 8v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const PerformanceIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 20 20"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className="text-white flex-shrink-0 self-center sm:w-7 sm:h-7"
  >
    <rect x="0" width="20" height="20" fill="none" />
    <path d="M3.76 17.01h12.48C17.34 15.63 18 13.9 18 12c0-4.41-3.58-8-8-8s-8 3.59-8 8c0 1.9.66 3.63 1.76 5.01zM9 6c0-.55.45-1 1-1s1 .45 1 1c0 .56-.45 1-1 1s-1-.44-1-1zM4 8c0-.55.45-1 1-1s1 .45 1 1c0 .56-.45 1-1 1s-1-.44-1-1zm4.52 3.4c.84-.83 6.51-3.5 6.51-3.5s-2.66 5.68-3.49 6.51c-.84.84-2.18.84-3.02 0-.83-.83-.83-2.18 0-3.01zM3 13c0-.55.45-1 1-1s1 .45 1 1c0 .56-.45 1-1 1s-1-.44-1-1zm6 0c0-.55.45-1 1-1s1 .45 1 1c0 .56-.45 1-1 1s-1-.44-1-1zm6 0c0-.55.45-1 1-1s1 .45 1 1c0 .56-.45 1-1 1s-1-.44-1-1z" />
  </svg>
);

const LissajousDocs: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>Docs | Lissajous</title>
      </Helmet>
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
      </div>
      <div className="relative z-10 px-4 sm:px-6 py-8 sm:py-12 md:py-16 lg:py-24">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-4 sm:mb-6 tracking-tight text-center">
            Lissajous Curve Documentation
          </h1>
          <p className="text-gray-400 text-base sm:text-lg font-light text-center mb-8 sm:mb-12 lg:mb-16 max-w-2xl mx-auto px-4">
            Create and explore beautiful harmonic patterns with real-time parameter control
          </p>

          {/* Overview */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-light mb-3 sm:mb-4 tracking-tight flex items-center gap-2 sm:gap-3">
              <OverviewIcon />
              Overview
            </h2>
            <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/[0.08]">
              <p className="text-gray-400 font-light mb-3 sm:mb-4 text-sm sm:text-base">
                Lissajous curves are complex harmonic patterns created by the intersection of two perpendicular 
                oscillatory motions. This interactive designer allows you to:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 sm:space-y-2 text-sm sm:text-base">
                <li>Visualize curves with real-time animation</li>
                <li>Adjust amplitude, frequency, and phase parameters</li>
                <li>Control animation speed and direction</li>
                <li>Export high-quality SVG files of your creations</li>
              </ul>
            </div>
          </section>

          {/* Mathematical Background */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-light mb-3 sm:mb-4 tracking-tight flex items-center gap-2 sm:gap-3">
              <MathIcon />
              Mathematical Background
            </h2>
            <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/[0.08]">
              <p className="text-gray-400 font-light mb-3 sm:mb-4 text-sm sm:text-base">
                Lissajous curves are defined by the parametric equations:
              </p>
              <pre className="text-gray-300 text-xs sm:text-sm font-mono bg-black/50 p-3 sm:p-4 rounded-lg overflow-x-auto">
{`x(t) = A * sin(a*t + δ)
y(t) = B * sin(b*t)`}
              </pre>
              <p className="text-gray-400 mt-3 sm:mt-4 font-light text-sm sm:text-base">
                where:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2 text-sm sm:text-base">
                <li><code className="bg-black/50 px-1 rounded text-xs sm:text-sm">A</code> and <code className="bg-black/50 px-1 rounded text-xs sm:text-sm">B</code>: Amplitudes of the x and y oscillations</li>
                <li><code className="bg-black/50 px-1 rounded text-xs sm:text-sm">a</code> and <code className="bg-black/50 px-1 rounded text-xs sm:text-sm">b</code>: Frequencies of the x and y oscillations</li>
                <li><code className="bg-black/50 px-1 rounded text-xs sm:text-sm">δ</code>: Phase difference between the two oscillations</li>
                <li><code className="bg-black/50 px-1 rounded text-xs sm:text-sm">t</code>: Time parameter</li>
              </ul>
              <p className="text-gray-400 mt-3 sm:mt-4 font-light text-sm sm:text-base">
                The shape of the curve depends on the frequency ratio <code className="bg-black/50 px-1 rounded text-xs sm:text-sm">a/b</code> and the phase difference <code className="bg-black/50 px-1 rounded text-xs sm:text-sm">δ</code>.
                When the ratio is rational, the curve is closed and periodic.
              </p>
            </div>
          </section>

          {/* Interface Overview */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-light mb-3 sm:mb-4 tracking-tight flex items-center gap-2 sm:gap-3">
              <InterfaceIcon />
              Interface Overview
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {/* Live Preview */}
              <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/[0.08]">
                <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4 flex items-center gap-2">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" /> Live Preview
                </h3>
                <p className="text-gray-400 font-light text-sm sm:text-base mb-2">
                  The main visualization area shows the current curve with controls for:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm sm:text-base">
                  <li>Play/Pause animation</li>
                  <li>Color selection</li>
                  <li>Phase display (radians and degrees)</li>
                  <li>Real-time FPS counter</li>
                </ul>
              </div>

              {/* Controls Panel */}
              <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/[0.08]">
                <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4 flex items-center gap-2">
                  <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" /> Control Panels
                </h3>
                <p className="text-gray-400 font-light text-sm sm:text-base mb-2">
                  The right panel contains parameter groups:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm sm:text-base">
                  <li>Amplitude controls (X and Y)</li>
                  <li>Frequency controls (X and Y)</li>
                  <li>Visual controls (color, stroke width, phase)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Parameters */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-light mb-3 sm:mb-4 tracking-tight flex items-center gap-2 sm:gap-3">
              <ParametersIcon />
              Parameters
            </h2>
            <div className="overflow-x-auto">
              <div className="min-w-full bg-white/[0.02] backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/[0.08] overflow-hidden">
                <table className="min-w-full text-left text-xs sm:text-sm text-gray-300">
                  <thead className="bg-white/[0.02]">
                    <tr>
                      <th className="py-2 sm:py-3 px-2 sm:px-4 font-medium">Parameter</th>
                      <th className="py-2 sm:py-3 px-2 sm:px-4 font-medium">Type</th>
                      <th className="py-2 sm:py-3 px-2 sm:px-4 font-medium">Description</th>
                      <th className="py-2 sm:py-3 px-2 sm:px-4 font-medium">Range</th>
                      <th className="py-2 sm:py-3 px-2 sm:px-4 font-medium">Default</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["A (amplitudeX)", "number", "X-axis amplitude", "10 – 200", "100"],
                      ["B (amplitudeY)", "number", "Y-axis amplitude", "10 – 200", "100"],
                      ["a (frequencyX)", "number", "X-axis frequency", "1 – 10", "3"],
                      ["b (frequencyY)", "number", "Y-axis frequency", "1 – 10", "2"],
                      ["phaseShift", "number", "Phase difference (radians)", "0 – 2π (~6.283)", "0"],
                      ["strokeWidth", "number", "Line thickness", "1 – 10", "2"],
                      ["color", "string", "Line color (hex)", "Any", "#3498db"],
                      ["speed", "number", "Animation speed", "0.005 – 0.1", "0.02"]
                    ].map(([param, type, desc, range, def]) => (
                      <tr key={param} className="border-t border-white/[0.05]">
                        <td className="py-2 px-2 sm:px-4 font-medium text-xs sm:text-sm">{param}</td>
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm">{type}</td>
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm">{desc}</td>
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm">{range}</td>
                        <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm">{def}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Controls & Actions */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-light mb-3 sm:mb-4 tracking-tight flex items-center gap-2 sm:gap-3">
              <ControlsIcon />
              Controls and Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              <div className="bg-white/[0.02] rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/[0.08]">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <h3 className="text-base sm:text-lg font-medium">Animation</h3>
                </div>
                <p className="text-gray-400 font-light text-sm sm:text-base">
                  Toggle animation with Play/Pause. The curve will trace its path in real-time. 
                  Animation speed can be adjusted from 0.005 (slow) to 0.1 (fast).
                </p>
              </div>
              <div className="bg-white/[0.02] rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/[0.08]">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <h3 className="text-base sm:text-lg font-medium">Color Picker</h3>
                </div>
                <p className="text-gray-400 font-light text-sm sm:text-base">
                  Customize the curve color using the arc-based picker. Adjust grain intensity 
                  for a textured appearance. Click anywhere on the preview to toggle the picker.
                </p>
              </div>
              <div className="bg-white/[0.02] rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/[0.08] md:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <Download className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <h3 className="text-base sm:text-lg font-medium">Export SVG</h3>
                </div>
                <p className="text-gray-400 font-light text-sm sm:text-base">
                  Download your curve as a 500×500 SVG file. The exported image includes 
                  a white background and preserves all visual parameters.
                </p>
              </div>
            </div>
          </section>

          {/* Performance */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-light mb-3 sm:mb-4 tracking-tight flex items-center gap-2 sm:gap-3">
              <PerformanceIcon />
              Performance & Optimization
            </h2>
            <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/[0.08]">
              <p className="text-gray-400 font-light mb-3 sm:mb-4 text-sm sm:text-base">
                The animation uses <code className="bg-black/50 px-1 rounded text-xs sm:text-sm">requestAnimationFrame</code> for smooth rendering with these optimizations:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm sm:text-base">
                <li>Direct DOM manipulation bypassing React state updates during animation</li>
                <li>Throttled UI updates (every 6 frames) to reduce rendering overhead</li>
                <li>Reference caching for animation parameters</li>
                <li>Efficient path generation with 2000 calculation steps</li>
              </ul>
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/[0.08]">
                <p className="text-gray-400 font-light text-sm sm:text-base">
                  FPS indicators:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2 text-sm sm:text-base">
                  <li>Green ≥ 55 FPS: Optimal performance</li>
                  <li>Yellow ≥ 30 FPS: Acceptable</li>
                  <li>Red &lt; 30 FPS: Performance issues</li>
                </ul>
              </div>
            </div>
          </section>

          {/* CTA Button */}
          <section className="mt-8 sm:mt-12 lg:mt-16 mb-4 sm:mb-6 lg:mb-8 text-center">
            <a 
              href="/lissajous" 
              className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white text-black rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 font-medium text-sm sm:text-base"
            >
              Lissajous Editor
              <LissajousLogo className="w-12 h-12 sm:w-16 sm:h-16" />
            </a>
            <p className="mt-3 sm:mt-4 text-gray-400 font-light text-sm sm:text-base">
              Create your own harmonic patterns
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LissajousDocs;