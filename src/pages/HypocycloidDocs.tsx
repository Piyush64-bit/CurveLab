import React from "react";
import { Play, Pause, Palette, Download, Zap } from "lucide-react";
import { HypocycloidLogo} from "../components/Logos";
import { Helmet } from "react-helmet";

// Custom minimalist icons
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
    viewBox="0 0 28 28"
    fill="none"
    className="text-white flex-shrink-0 self-center sm:w-7 sm:h-7"
  >
    <rect x="4" y="4" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="2" />
    <path d="M8 10h12M8 14h12M8 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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

const HypocycloidDocs: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>Docs | Hypocycloid</title>
      </Helmet> 
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
      </div>
      <div className="relative z-10 px-4 sm:px-6 py-8 sm:py-12 md:py-16 lg:py-24">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-4 sm:mb-6 tracking-tight text-center">
            Hypocycloid Designer Documentation
          </h1>
          <p className="text-gray-400 text-base sm:text-lg font-light text-center mb-8 sm:mb-12 lg:mb-16 max-w-2xl mx-auto px-4">
            Learn how to use, customize, and export mesmerizing hypocycloid curves.
          </p>

          {/* Overview */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-light mb-3 sm:mb-4 tracking-tight flex items-center gap-2 sm:gap-3">
              <OverviewIcon />
              Overview
            </h2>
            <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/[0.08]">
              <p className="text-gray-400 font-light mb-3 sm:mb-4 text-sm sm:text-base">
                A hypocycloid is a curve traced by a point on a circle rolling inside a larger circle.
                This interactive page allows you to:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 sm:space-y-2 text-sm sm:text-base">
                <li>Visualize the curve dynamically</li>
                <li>Adjust radii, phase, and styling in real time</li>
                <li>Animate rotation smoothly</li>
                <li>Export your creation as an SVG file</li>
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
                The hypocycloid is defined by:
              </p>
              <div className="overflow-x-auto">
                <pre className="text-gray-300 text-xs sm:text-sm font-mono bg-black/50 p-3 sm:p-4 rounded-lg whitespace-pre">
{`x(t) = (R - r) * cos(t) + r * cos(((R - r)/r) * t + phaseShift)
y(t) = (R - r) * sin(t) - r * sin(((R - r)/r) * t + phaseShift)`}
                </pre>
              </div>
              <p className="text-gray-400 mt-3 sm:mt-4 font-light text-sm sm:text-base">
                where:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2 text-sm sm:text-base">
                <li><code className="bg-black/50 px-1 rounded text-xs sm:text-sm">R</code>: Radius of the fixed circle</li>
                <li><code className="bg-black/50 px-1 rounded text-xs sm:text-sm">r</code>: Radius of the rolling circle</li>
                <li><code className="bg-black/50 px-1 rounded text-xs sm:text-sm">phaseShift</code>: Phase offset in radians</li>
              </ul>
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
                  Renders the SVG curve, shows phase angle, and provides controls to:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm sm:text-base">
                  <li>Play/Pause Animation</li>
                  <li>Reset Phase</li>
                  <li>Change Color</li>
                  <li>Download SVG</li>
                </ul>
              </div>

              {/* Controls */}
              <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/[0.08]">
                <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4 flex items-center gap-2">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" /> Controls
                </h3>
                <p className="text-gray-400 font-light text-sm sm:text-base mb-2">
                  Adjust parameters in real time:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm sm:text-base">
                  <li>R and r radii sliders</li>
                  <li>Phase shift slider (manual when paused)</li>
                  <li>Stroke width slider</li>
                  <li>Color picker</li>
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
                      ["R", "number", "Fixed circle radius", "10 – 200", "100"],
                      ["r", "number", "Rolling circle radius", "5 – 100", "30"],
                      ["phaseShift", "number", "Phase offset (radians)", "0 – 2π (~6.283)", "0"],
                      ["strokeWidth", "number", "Stroke thickness", "1 – 10", "2"],
                      ["color", "string", "Stroke color (hex)", "Any", "#8e44ad"],
                      ["speed", "number", "Animation speed", "~0 – ∞", "0.02"]
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
                  <h3 className="text-base sm:text-lg font-medium">Play/Pause</h3>
                </div>
                <p className="text-gray-400 font-light text-sm sm:text-base">
                  Toggle animation loop. When paused, you can set the phase manually.
                </p>
              </div>
              <div className="bg-white/[0.02] rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/[0.08]">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <h3 className="text-base sm:text-lg font-medium">Color Picker</h3>
                </div>
                <p className="text-gray-400 font-light text-sm sm:text-base">
                  Select colors using the custom arc-based picker. Adjust grain intensity and color.
                </p>
              </div>
              <div className="bg-white/[0.02] rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/[0.08] md:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <Download className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <h3 className="text-base sm:text-lg font-medium">Download SVG</h3>
                </div>
                <p className="text-gray-400 font-light text-sm sm:text-base">
                  Export your design as a 500×500 SVG with the chosen stroke and color.
                </p>
              </div>
            </div>
          </section>

          {/* Performance */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-light mb-3 sm:mb-4 tracking-tight flex items-center gap-2 sm:gap-3">
              <PerformanceIcon />
              Performance & FPS
            </h2>
            <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/[0.08]">
              <p className="text-gray-400 font-light mb-3 sm:mb-4 text-sm sm:text-base">
                The animation loop uses <code className="bg-black/50 px-1 rounded text-xs sm:text-sm">requestAnimationFrame</code> for smooth rendering.
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm sm:text-base">
                <li>Green ≥ 55 FPS</li>
                <li>Yellow ≥ 30 FPS</li>
                <li>Red &lt; 30 FPS</li>
              </ul>
            </div>
          </section>

          {/* CTA Button Section */}
          <section className="mt-8 sm:mt-12 lg:mt-16 mb-4 sm:mb-6 lg:mb-8 text-center">
            <a 
              href="/hypocycloid" 
              className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white text-black rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 font-medium text-sm sm:text-base"
            >
              <span>Hypocycloid Editor</span>
              <HypocycloidLogo className="w-12 h-12 sm:w-16 sm:h-16" />
            </a>

            <p className="mt-3 sm:mt-4 text-gray-400 font-light text-sm sm:text-base">
              Experiment live
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HypocycloidDocs;


