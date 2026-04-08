/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronRight, ChevronLeft, Info, Presentation, Monitor, BookOpen, Video, VideoOff, Circle, Settings, X } from "lucide-react";
import { ACWaveform, RLCIcons, FrequencyMeter, FormulaDisplay, ComparisonTable, ResonanceVisual, CapacitorWaveform } from "./components/Visuals";

const slides = [
  {
    id: 0,
    title: "Presentation Topic",
    speaker: "Group Members",
    subtitle: "[CSE] | [Topic Name]",
    bullets: [
      { id: 1, text: "Course Code: [Course Code]", highlight: true },
      { id: 2, text: "Course Title: [Course Title]" },
      { id: 3, text: "Presentation Topic: [Topic Name]" },
      { id: 4, text: "Welcome to our presentation overview." }
    ],
    notes: [
      { title: "Opening", content: "Good morning. Please refer to this slide for our presentation details and group information." }
    ],
    visualType: "cover"
  },
  {
    id: 1,
    title: "Introduction",
    speaker: "Ayrin Alam Any",
    subtitle: "Foundation of Power System Components",
    bullets: [
      { id: 1, text: "Three main components in power systems:", subItems: ["Resistance (R)", "Inductance (L)", "Capacitance (C)"] },
      { id: 2, text: "R is frequency independent (ideal case)", highlight: true },
      { id: 3, text: "L and C are strictly frequency dependent", highlight: true },
      { id: 4, text: "Frequency (f) = number of cycles per second (Hertz)" },
      { id: 5, text: "Bangladesh Power System = 50 Hz (50 direction changes/sec)" },
      { id: 6, text: "Angular frequency: ω = 2πf", formula: "ω = 2πf" },
    ],
    notes: [
      { title: "Intro", content: "Welcome everyone. Today we discuss how frequency affects our power grid's core components." },
      { title: "Components", content: "We have R, L, and C. While R is constant, L and C change behavior with frequency." },
      { title: "Frequency", content: "In Bangladesh, we use 50Hz. This means the current reverses 100 times every second." },
    ],
    visualType: "intro"
  },
  {
    id: 1,
    title: "Inductive Components",
    speaker: "Md. Ajmine Adil Sadik",
    subtitle: "Frequency Effect on Inductance",
    bullets: [
      { id: 1, text: "Fundamental Equation: v = L (di/dt)", formula: "v = L (di/dt)" },
      { id: 2, text: "Inductive Reactance: XL = ωL = 2πfL", formula: "XL = 2πfL" },
      { id: 3, text: "Analysis: XL ∝ f (Directly Proportional)", highlight: true },
      { id: 4, text: "Higher Frequency → Higher XL (More opposition to current)" },
      { id: 5, text: "Impact: Transmission lines & Transformer windings" },
      { id: 6, text: "Frequency deviation affects Reactive Power & Voltage Drop" },
    ],
    notes: [
      { title: "Inductor", content: "Inductors oppose changes in current. The opposition is called Inductive Reactance." },
      { title: "Math", content: "As you see in the formula XL = 2πfL, reactance is directly proportional to frequency." },
      { title: "Impact", content: "This means if frequency rises, voltage drops across lines will increase." },
    ],
    visualType: "inductor"
  },
  {
    id: 2,
    title: "Capacitive Components",
    speaker: "Naim Hossain",
    subtitle: "Frequency Effect on Capacitance",
    bullets: [
      { id: 1, text: "Fundamental Equation: i(t) = C (dv(t)/dt)", formula: "i = C (dv/dt)" },
      { id: 2, text: "Applying AC Voltage: v(t) = Vm sin(ωt)" },
      { id: 3, text: "Current Derived: i(t) = ωC Vm sin(ωt + 90°)", formula: "i(t) = ωC Vm sin(ωt + 90°)" },
      { id: 4, text: "Capacitive Reactance: XC = 1/(ωC) = 1/(2πfC)", formula: "XC = 1/(2πfC)" },
      { id: 5, text: "Analysis: XC ∝ 1/f (Inversely Proportional)", highlight: true },
      { id: 6, text: "Frequency Increase → Reactance Decreases → Current Increases" },
      { id: 7, text: "Frequency Decrease → Reactance Increases → Current Decreases" },
      { id: 8, text: "Impact: Capacitor banks, Shunt capacitance & Voltage regulation" },
    ],
    notes: [
      { title: "Opening", content: "A capacitor stores electrical energy and opposes the change in voltage." },
      { title: "Derivation", content: "If v(t) is Vm sin(ωt), its derivative is proportional to ω. Thus, the current i(t) leads voltage by 90° and is proportional to frequency." },
      { title: "Reactance", content: "XC is inversely proportional to frequency. At high frequency, it allows more current. At low frequency, it resists more." },
      { title: "Power Systems", content: "If system frequency changes, capacitor bank reactance changes—affecting reactive power supplied and voltage recovery." },
    ],
    visualType: "capacitor"
  },
  {
    id: 3,
    title: "Analysis & Resonance",
    speaker: "Tasneem Binte Aziz",
    subtitle: "System Impedance & Real-Life Impact",
    bullets: [
      { id: 1, text: "Total Impedance: Z = R + j(XL - XC)", formula: "Z = R + j(XL - XC)" },
      { id: 2, text: "Resonance Condition: XL = XC", highlight: true },
      { id: 3, text: "Resonance Frequency: f = 1 / (2π√LC)", formula: "fr = 1 / (2π√LC)" },
      { id: 4, text: "At Resonance: Current is Maximum (Overcurrent Risk)" },
      { id: 5, text: "Grid Deviation: 49Hz–51Hz causes equipment stress" },
      { id: 6, text: "Harmonics: Higher frequencies distort system stability" },
    ],
    notes: [
      { title: "Impedance", content: "Total impedance depends on the balance between XL and XC." },
      { title: "Resonance", content: "If XL equals XC, they cancel out, leaving only R. This causes massive current spikes." },
      { title: "Real Life", content: "Grid stability is fragile. Even a 1Hz shift can stress transformers and generators." },
    ],
    visualType: "resonance"
  },
  {
    id: 4,
    title: "Comparison & Conclusion",
    speaker: "Diya Bipasha",
    subtitle: "Final Summary & Key Takeaways",
    bullets: [
      { id: 1, text: "Comparison Summary:", table: true },
      { id: 2, text: "Both L and C are frequency dependent", highlight: true },
      { id: 3, text: "Both control Reactive Power in the grid" },
      { id: 4, text: "Conclusion: High Frequency → Inductor opposes more" },
      { id: 5, text: "Conclusion: High Frequency → Capacitor opposes less" },
      { id: 6, text: "Power system stability is frequency-dependent", highlight: true },
    ],
    notes: [
      { title: "Summary", content: "To wrap up, frequency is the pulse of the power system." },
      { title: "Comparison", content: "Inductors and capacitors react in opposite ways, allowing us to balance the grid." },
      { title: "Final Word", content: "Maintaining 50Hz is not just a standard, it's a requirement for safety and efficiency." },
    ],
    visualType: "comparison"
  }
];

export default function App() {
  const [showNotes, setShowNotes] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeBullet, setActiveBullet] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Video Settings States
  const [showVideoSettings, setShowVideoSettings] = useState(false);
  const [isMirrored, setIsMirrored] = useState(false);
  const [videoBrightness, setVideoBrightness] = useState(100);
  const [videoFilter, setVideoFilter] = useState("none");
  const videoRef = useRef<HTMLVideoElement>(null);
  const slideContainerRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<BlobPart[]>([]);

  // Device Selection States
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedAudioDevice, setSelectedAudioDevice] = useState<string>("");
  const [selectedVideoDevice, setSelectedVideoDevice] = useState<string>("");

  const getDevices = useCallback(async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audios = devices.filter(d => d.kind === 'audioinput');
      const videos = devices.filter(d => d.kind === 'videoinput');
      setAudioDevices(audios);
      setVideoDevices(videos);

      setSelectedAudioDevice(prev => audios.find(d => d.deviceId === prev) ? prev : (audios[0]?.deviceId || ""));
      setSelectedVideoDevice(prev => videos.find(d => d.deviceId === prev) ? prev : (videos[0]?.deviceId || ""));
    } catch (e) {
      console.error("Error enumerating devices", e);
    }
  }, []);

  useEffect(() => {
    navigator.mediaDevices.addEventListener('devicechange', getDevices);
    getDevices();
    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', getDevices);
    };
  }, [getDevices]);

  const slide = slides[currentSlide];

  const nextBullet = () => {
    if (activeBullet < slide.bullets.length) {
      setActiveBullet(prev => prev + 1);
    } else if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
      setActiveBullet(0);
    }
  };

  const prevBullet = () => {
    if (activeBullet > 0) {
      setActiveBullet(prev => prev - 1);
    } else if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
      setActiveBullet(slides[currentSlide - 1].bullets.length);
    }
  };

  const resetBullets = () => {
    setActiveBullet(0);
    setCurrentSlide(0);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " ") e.preventDefault();

      if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
        if (activeBullet < slide.bullets.length) {
          setActiveBullet(prev => prev + 1);
        } else if (currentSlide < slides.length - 1) {
          setCurrentSlide(prev => prev + 1);
          setActiveBullet(0);
        }
      } else if (e.key === "ArrowLeft") {
        if (activeBullet > 0) {
          setActiveBullet(prev => prev - 1);
        } else if (currentSlide > 0) {
          setCurrentSlide(prev => prev - 1);
          setActiveBullet(slides[currentSlide - 1].bullets.length);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeBullet, currentSlide, slide.bullets.length]);

  useEffect(() => {
    let stream: MediaStream | null = null;
    if (isVideoOpen) {
      navigator.mediaDevices.getUserMedia({
        video: selectedVideoDevice ? { deviceId: { exact: selectedVideoDevice } } : true
      })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
          }
          getDevices(); // Update labels after permission granted
        })
        .catch((err) => console.error("Error accessing webcam:", err));
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isVideoOpen, selectedVideoDevice, getDevices]);

  const startRecording = async () => {
    try {
      // 1. Get Screen Stream (Tab)
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: { displaySurface: "browser" },
        audio: false,
        // @ts-ignore
        preferCurrentTab: true
      });

      // 2. Get Mic Audio
      const micStream = await navigator.mediaDevices.getUserMedia({
        audio: selectedAudioDevice ? { deviceId: { exact: selectedAudioDevice } } : true
      });
      getDevices(); // Update labels after permission granted

      const videoTrack = screenStream.getVideoTracks()[0];
      const audioTrack = micStream.getAudioTracks()[0];

      // 3. Crop to slide container if supported
      if (slideContainerRef.current && typeof (window as any).CropTarget !== 'undefined' && (videoTrack as any).cropTo) {
        try {
          const cropTarget = await (window as any).CropTarget.fromElement(slideContainerRef.current);
          await (videoTrack as any).cropTo(cropTarget);
        } catch (e) {
          console.warn("Region capture not supported/failed", e);
        }
      }

      const combinedStream = new MediaStream([videoTrack, audioTrack]);

      const mediaRecorder = new MediaRecorder(combinedStream, { mimeType: "video/webm" });
      mediaRecorderRef.current = mediaRecorder;
      recordedChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `presentation-recording-${new Date().toISOString().slice(0, 10)}.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        combinedStream.getTracks().forEach((track) => track.stop());
        setIsRecording(false);
      };

      videoTrack.onended = () => {
        if (mediaRecorderRef.current?.state !== "inactive") {
          mediaRecorderRef.current?.stop();
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error starting recording:", err);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
    }
    setIsRecording(false);
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const renderVisual = () => {
    switch (slide.visualType) {
      case "intro":
        return (
          <>
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Monitor className="w-4 h-4" />
                Live Visualization
              </h3>
              <ACWaveform />
            </div>
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Info className="w-4 h-4" />
                Component Symbols
              </h3>
              <RLCIcons />
            </div>
            <div className="mt-auto flex justify-end">
              <FrequencyMeter />
            </div>
          </>
        );
      case "inductor":
        return (
          <div className="space-y-8">
            <FormulaDisplay title="Inductive Reactance" formula="XL = 2πfL" relation="XL ∝ f" />
            <FormulaDisplay title="Voltage Equation" formula="v = L (di/dt)" />
          </div>
        );
      case "capacitor":
        return (
          <div className="space-y-6">
            <FormulaDisplay title="Capacitive Reactance" formula="XC = 1/(2πfC)" relation="XC ∝ 1/f" />
            <CapacitorWaveform />
          </div>
        );
      case "resonance":
        return (
          <div className="space-y-8">
            <ResonanceVisual />
            <FormulaDisplay title="Resonance Frequency" formula="fr = 1 / (2π√LC)" />
          </div>
        );
      case "comparison":
        return (
          <div className="space-y-8">
            <ComparisonTable />
            <div className="mt-auto flex justify-end">
              <FrequencyMeter />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 flex flex-col items-center justify-center gap-6 overflow-hidden relative">
      {/* Slide Container (16:9 Aspect Ratio) */}
      <div ref={slideContainerRef} className="relative w-full max-w-6xl aspect-[16/9] bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-200 flex flex-col">

        {/* Slide Header */}
        {slide.visualType !== "cover" && (
          <header className="bg-blue-600 px-12 py-8 text-white flex justify-between items-center z-10 shrink-0">
            <div>
              <motion.h1
                key={currentSlide}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="text-4xl font-bold tracking-tight"
              >
                {slide.title}
              </motion.h1>
              <p className="text-blue-100 mt-1 font-medium opacity-80">{slide.subtitle}</p>
            </div>
            <div className="flex items-center gap-3 bg-blue-700/50 px-4 py-2 rounded-full border border-blue-500/30">
              <Presentation className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">{slide.speaker}</span>
            </div>
          </header>
        )}

        {/* Slide Body with Sliding Transition */}
        <div className={`flex-1 relative overflow-hidden ${slide.visualType === 'cover' ? 'bg-slate-50' : ''}`}>
          <AnimatePresence mode="wait">
            <motion.main
              key={currentSlide}
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
              className={`absolute inset-0 overflow-hidden ${slide.visualType === 'cover' ? 'flex flex-col' : 'grid grid-cols-12 gap-12 p-12'}`}
            >
              {slide.visualType === "cover" ? (
                <div className="w-full h-full flex flex-col items-center justify-center relative bg-gradient-to-br from-slate-50 to-blue-50/50 overflow-hidden">
                  <div className="text-center mt-2 mb-6 px-12 z-10 w-full">
                    <h2 className="text-blue-600 font-bold tracking-widest uppercase mb-2 text-xs bg-blue-100 inline-block px-3 py-1 rounded-full shadow-sm">PRESENTATION</h2>
                    <h1 className="text-3xl lg:text-4xl font-black text-slate-800 tracking-tight leading-tight mb-4 max-w-4xl mx-auto">
                      Effect of Frequency on Inductive and Capacitive Components in Power Systems
                    </h1>
                    <div className="flex items-center justify-center gap-4 text-indigo-700 font-bold bg-white w-fit mx-auto px-6 py-2 rounded-full shadow-sm border border-indigo-100 text-sm">
                      <span className="opacity-80">Course Code:</span>
                      <span className="text-base">CSE 121</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                      <span>Electrical Circuits</span>
                    </div>
                  </div>

                  <div className="w-full max-w-5xl grid grid-cols-2 gap-8 px-8 z-10">
                    {/* Submitted To Panel */}
                    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl shadow-blue-900/5 border border-white flex flex-col justify-center relative overflow-hidden group hover:-translate-y-1 transition-transform">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                      <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Submitted To</h3>
                      <p className="font-black text-2xl text-slate-800 mb-1 truncate">Sakib Mahmood Chowdhury</p>
                      <p className="text-blue-600 font-bold text-sm mb-1 truncate">Lecturer</p>
                      <p className="text-slate-500 text-sm font-medium truncate">Department of Computer Science and Engineering</p>
                      <p className="text-slate-400 text-xs mt-1 truncate">Daffodil International University</p>
                    </div>

                    {/* Submitted By Panel */}
                    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl shadow-indigo-900/5 border border-white flex flex-col justify-center relative overflow-hidden group hover:-translate-y-1 transition-transform">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-indigo-600"></div>
                      <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Submitted By</h3>
                      <ul className="space-y-1">
                        {[
                          { name: 'Naim Hossain', id: '252-15-178' },
                          { name: 'Md Ajmine Adil Sadik', id: '252-15-172' },
                          { name: 'Tasneem binte aziz', id: '252-15-070' },
                          { name: 'Diya bipasha', id: '252-15-652' },
                          { name: 'Ayrin Alom Any', id: '252-15-520' }
                        ].map((member, idx) => (
                          <li key={idx} className="flex justify-between items-center group/item cursor-default border-b border-slate-100 last:border-0 pb-1.5 last:pb-0">
                            <span className="font-bold text-slate-700 text-sm group-hover/item:text-indigo-600 transition-colors">{member.name}</span>
                            <span className="font-mono font-bold text-indigo-700 bg-indigo-50/50 px-2 py-0.5 text-xs rounded">{member.id}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Background Decorative Elements */}
                  <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                    <div className="absolute -top-20 -left-20 w-[40rem] h-[40rem] bg-blue-100/50 rounded-full blur-3xl"></div>
                    <div className="absolute top-40 -right-20 w-[40rem] h-[40rem] bg-indigo-100/50 rounded-full blur-3xl"></div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Left Column: Content */}
                  <div className="col-span-7 flex flex-col gap-6 overflow-y-auto pr-4">
                    <div className="space-y-4">
                      <AnimatePresence>
                        {slide.bullets.map((bullet, index) => (
                          index < activeBullet && (
                            <motion.div
                              key={bullet.id}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              exit={{ x: -20, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className={`flex gap-4 items-start ${bullet.highlight ? 'bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500' : ''}`}
                            >
                              <div className="mt-2 w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                              <div className="space-y-2 w-full">
                                <p className={`text-xl font-medium ${bullet.highlight ? 'text-blue-900 font-bold' : 'text-slate-700'}`}>
                                  {bullet.text}
                                </p>
                                {bullet.subItems && (
                                  <div className="grid grid-cols-3 gap-4 mt-2">
                                    {bullet.subItems.map((sub, i) => (
                                      <div key={i} className="text-sm font-bold text-blue-600 bg-blue-100/50 px-3 py-1 rounded-md text-center">
                                        {sub}
                                      </div>
                                    ))}
                                  </div>
                                )}
                                {bullet.formula && !slide.visualType.includes("inductor") && !slide.visualType.includes("capacitor") && (
                                  <div className="mt-2 p-4 bg-slate-50 rounded-xl border border-slate-200 inline-block">
                                    <span className="text-3xl font-mono text-slate-800 italic">{bullet.formula}</span>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )
                        ))}
                      </AnimatePresence>
                    </div>

                    <div className="mt-auto flex items-center gap-4 py-4">
                      {(activeBullet > 0 || currentSlide > 0) && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={prevBullet}
                          className="flex items-center gap-2 text-slate-500 font-bold hover:text-slate-700 transition-colors group w-fit"
                        >
                          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                          <span>Previous</span>
                        </motion.button>
                      )}

                      {(activeBullet < slide.bullets.length || currentSlide < slides.length - 1) && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={nextBullet}
                          className="flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors group w-fit"
                        >
                          <span>
                            {activeBullet === 0 && currentSlide === 0 ? "Start Presentation" :
                              activeBullet === slide.bullets.length ? "Next Slide" : "Next Point"}
                          </span>
                          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                      )}

                      {currentSlide === slides.length - 1 && activeBullet === slide.bullets.length && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={resetBullets}
                          className="flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors group w-fit"
                        >
                          <span>Restart</span>
                          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Visuals */}
                  <div className="col-span-5 flex flex-col gap-8">
                    {renderVisual()}
                  </div>
                </>
              )}
            </motion.main>
          </AnimatePresence>
        </div>

        {/* Slide Footer */}
        <footer className="px-12 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-slate-400 text-xs font-medium z-10">
          <div className="flex gap-6">
            <span>EE-401: Power Systems Analysis</span>
            <span>Slide 0{currentSlide + 1}/0{slides.length}</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleRecording}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all ${isRecording ? 'bg-red-600 text-white shadow-md' : 'hover:bg-slate-200 text-slate-600'}`}
            >
              <Circle className={`w-4 h-4 ${isRecording ? 'fill-white' : ''}`} />
              <span>{isRecording ? 'Recording...' : 'Record'}</span>
            </button>
            <button
              onClick={() => setIsVideoOpen(!isVideoOpen)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all ${isVideoOpen ? 'bg-slate-800 text-white shadow-md' : 'hover:bg-slate-200 text-slate-600'}`}
            >
              {isVideoOpen ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
              <span>{isVideoOpen ? 'Stop Video' : 'Video Dive'}</span>
            </button>

            {isVideoOpen && (
              <div className="relative">
                <button
                  onClick={() => setShowVideoSettings(!showVideoSettings)}
                  className={`flex items-center justify-center p-2 rounded-md transition-all ${showVideoSettings ? 'bg-slate-800 text-white shadow-md' : 'hover:bg-slate-200 text-slate-600'}`}
                >
                  <Settings className="w-5 h-5" />
                </button>

                <AnimatePresence>
                  {showVideoSettings && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute bottom-full mb-4 right-0 w-72 bg-white/80 backdrop-blur-md border border-slate-200 shadow-xl rounded-xl p-4 z-50 flex flex-col gap-4 text-slate-800"
                    >
                      <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                        <h4 className="font-bold text-sm">Media Settings</h4>
                        <button onClick={() => setShowVideoSettings(false)} className="text-slate-400 hover:text-slate-600">
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-1">
                        <span className="text-xs font-medium block">Microphone</span>
                        <select
                          value={selectedAudioDevice}
                          onChange={(e) => setSelectedAudioDevice(e.target.value)}
                          className="w-full text-xs border border-slate-200 rounded-md p-1.5 bg-slate-50 outline-none focus:border-blue-500 overflow-hidden text-ellipsis whitespace-nowrap"
                        >
                          {audioDevices.map(d => (
                            <option key={d.deviceId} value={d.deviceId}>
                              {d.label || `Microphone ${d.deviceId.slice(0, 5)}...`}
                            </option>
                          ))}
                          {audioDevices.length === 0 && <option value="">No microphones found</option>}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <span className="text-xs font-medium block">Camera</span>
                        <select
                          value={selectedVideoDevice}
                          onChange={(e) => setSelectedVideoDevice(e.target.value)}
                          className="w-full text-xs border border-slate-200 rounded-md p-1.5 bg-slate-50 outline-none focus:border-blue-500 overflow-hidden text-ellipsis whitespace-nowrap"
                        >
                          {videoDevices.map(d => (
                            <option key={d.deviceId} value={d.deviceId}>
                              {d.label || `Camera ${d.deviceId.slice(0, 5)}...`}
                            </option>
                          ))}
                          {videoDevices.length === 0 && <option value="">No cameras found</option>}
                        </select>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Mirror Video</span>
                        <button
                          onClick={() => setIsMirrored(!isMirrored)}
                          className={`w-10 h-5 rounded-full relative transition-colors ${isMirrored ? 'bg-blue-600' : 'bg-slate-300'}`}
                        >
                          <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${isMirrored ? 'translate-x-5' : ''}`} />
                        </button>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="font-medium">Brightness</span>
                          <span className="text-slate-500">{videoBrightness}%</span>
                        </div>
                        <input
                          type="range"
                          min="50" max="200"
                          value={videoBrightness}
                          onChange={(e) => setVideoBrightness(Number(e.target.value))}
                          className="w-full accent-blue-600"
                        />
                      </div>

                      <div className="space-y-1">
                        <span className="text-xs font-medium block">Filter Effect</span>
                        <select
                          value={videoFilter}
                          onChange={(e) => setVideoFilter(e.target.value)}
                          className="w-full text-sm border border-slate-200 rounded-md p-1.5 bg-slate-50 outline-none focus:border-blue-500"
                        >
                          <option value="none">Normal</option>
                          <option value="grayscale(100%)">Grayscale</option>
                          <option value="sepia(100%)">Sepia</option>
                          <option value="contrast(150%)">High Contrast</option>
                          <option value="blur(4px)">Blur</option>
                          <option value="hue-rotate(90deg)">Alien (Hue)</option>
                        </select>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <button
              onClick={() => setShowNotes(!showNotes)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all ${showNotes ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-slate-200 text-slate-600'}`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{showNotes ? 'Hide Speaker Notes' : 'Show Speaker Notes'}</span>
            </button>
          </div>
        </footer>

        {/* Notes Overlay */}
        <AnimatePresence>
          {showNotes && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute inset-x-0 bottom-0 h-1/2 bg-slate-900/95 backdrop-blur-md text-white p-12 z-50 overflow-y-auto border-t border-slate-700"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-blue-400 flex items-center gap-3">
                  <BookOpen className="w-6 h-6" />
                  Speaker Notes: {slide.speaker}
                </h2>
                <button
                  onClick={() => setShowNotes(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 rotate-90" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-12">
                {slide.notes.map((note, i) => (
                  <div key={i} className="space-y-2">
                    <h4 className="text-blue-300 font-bold uppercase tracking-wider text-xs">{note.title}</h4>
                    <p className="text-slate-300 leading-relaxed text-sm">{note.content}</p>
                  </div>
                ))}
              </div>
              <div className="mt-12 pt-8 border-t border-slate-800 flex justify-between items-center text-slate-500 text-xs">
                <p>Estimated Talk Time: 4 Minutes</p>
                <p>Key Emphasis: {slide.subtitle}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Video Call Component - Placed explicitly inside slideContainer */}
        <AnimatePresence>
          {isVideoOpen && (
            <motion.div
              drag
              dragConstraints={slideContainerRef}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-8 right-8 w-48 h-48 bg-black rounded-2xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing border-4 border-slate-800 z-[100]"
            >
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover pointer-events-none"
                style={{
                  transform: isMirrored ? 'scaleX(-1)' : 'scaleX(1)',
                  filter: `brightness(${videoBrightness}%) ${videoFilter !== 'none' ? videoFilter : ''}`
                }}
              />
              {/* Recording Indicator */}
              {isRecording && (
                <div className="absolute top-3 left-3 flex gap-2 z-10 pointer-events-none">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Progress Bar */}
        <div className="absolute bottom-0 left-0 h-1.5 w-full bg-slate-200 z-20">
          <motion.div 
            className="h-full bg-blue-600 rounded-r-full shadow-[0_0_8px_rgba(37,99,235,0.6)]"
            initial={{ width: 0 }}
            animate={{ width: `${(currentSlide / (slides.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Instructions for Preview */}
      <div className="text-slate-400 text-sm flex flex-col items-center gap-1">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4" />
          <span>Click "Next Point" or use <kbd className="px-1.5 py-0.5 bg-slate-200 rounded text-slate-600 font-mono text-xs">ArrowRight</kbd>, <kbd className="px-1.5 py-0.5 bg-slate-200 rounded text-slate-600 font-mono text-xs">Space</kbd>, or <kbd className="px-1.5 py-0.5 bg-slate-200 rounded text-slate-600 font-mono text-xs">Enter</kbd> to progress.</span>
        </div>
        <span className="text-[10px] opacity-70 italic">Use <kbd className="px-1.5 py-0.5 bg-slate-200 rounded text-slate-600 font-mono text-xs">ArrowLeft</kbd> to go back.</span>
      </div>
    </div>
  );
}
