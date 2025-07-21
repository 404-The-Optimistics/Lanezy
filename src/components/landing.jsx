import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, BarChart3, Clock, Zap, TrendingUp, Users } from 'lucide-react';
import HowItWorks from './HowItWorks';
import Dashboard from './Dashboard';
import MapPage from './map';
import Team from './team';
import Navbar from "./Navbar";

// Traffic Light Component
const TrafficLight = ({ darkMode, delay = 0 }) => {
    const [activeLight, setActiveLight] = useState(1);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setActiveLight((prev) => (prev + 1) % 3);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className="w-6 h-16 bg-gray-800 rounded-full flex flex-col items-center justify-center space-y-1 p-1 shadow-lg"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay }}
        >
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${activeLight === 0 ? 'bg-red-500 shadow-lg shadow-red-500/50 animate-pulse' : 'bg-gray-600'}`}></div>
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${activeLight === 1 ? 'bg-yellow-500 shadow-lg shadow-yellow-500/50 animate-pulse' : 'bg-gray-600'}`}></div>
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${activeLight === 2 ? 'bg-green-500 shadow-lg shadow-green-500/50 animate-pulse' : 'bg-gray-600'}`}></div>
        </motion.div>
    );
};

// Steps data for How It Works section
const steps = [
  {
    title: 'Live Video Input',
    desc: 'Government provides live video feeds or pre-recorded videos from 4 directions (lanes).',
    icon: <BarChart3 className="w-7 h-7 text-red-500" />,
    color: 'from-red-500 to-orange-400',
  },
  {
    title: 'Vehicle Detection (YOLO + OpenCV)',
    desc: 'Each video is processed individually to count vehicles using YOLOv5. Frames are sent to FastAPI backend for real-time inference.',
    icon: <Clock className="w-7 h-7 text-orange-500" />,
    color: 'from-orange-400 to-yellow-400',
  },
  {
    title: 'Traffic Logic Controller (Node.js)',
    desc: 'Gets vehicle counts from FastAPI, applies logic to decide which lane gets green, ensures only one lane is green at a time.',
    icon: <TrendingUp className="w-7 h-7 text-yellow-500" />,
    color: 'from-yellow-400 to-green-400',
  },
  {
    title: 'Signal Update to Arduino',
    desc: 'Sends control signals to Arduino via Wi-Fi (ESP8266). Arduino turns on respective LEDs for the selected lane.',
    icon: <Zap className="w-7 h-7 text-green-500" />,
    color: 'from-green-400 to-blue-400',
  },
  {
    title: 'Frontend Display (React)',
    desc: 'Shows current signal status, vehicle counts, and lane camera feed. Admin can also override in case of emergency.',
    icon: <BarChart3 className="w-7 h-7 text-blue-500" />,
    color: 'from-blue-400 to-purple-400',
  },
];

const Landing = () => {
    const [darkMode, setDarkMode] = useState(true);
    const [showHowItWorks, setShowHowItWorks] = useState(false);
    const [showDashboard, setShowDashboard] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [showTeam, setShowTeam] = useState(false);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    return (
        <div className={`min-h-screen transition-colors duration-500 relative overflow-hidden ${darkMode ? 'bg-[#0B0F1A]' : 'bg-gray-50'}`}>
            {/* Animated Background Gradients */}
            <div className="absolute inset-0 overflow-hidden">
                <div className={`absolute -inset-[10px] ${darkMode ? 'opacity-40' : 'opacity-20'}`}>
                    <div className="absolute top-0 -left-4 w-96 h-96 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                    <div className="absolute top-0 -right-4 w-96 h-96 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-20 w-96 h-96 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
                </div>
            </div>

            <Navbar
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                onHowItWorksClick={() => { setShowHowItWorks(true); setShowDashboard(false); setShowMap(false); setShowTeam(false); }}
                onHomeClick={() => { setShowHowItWorks(false); setShowDashboard(false); setShowMap(false); setShowTeam(false); }}
                onDashboardClick={() => { setShowDashboard(true); setShowHowItWorks(false); setShowMap(false); setShowTeam(false); }}
                onMapClick={() => { setShowMap(true); setShowDashboard(false); setShowHowItWorks(false); setShowTeam(false); }}
                onTeamClick={() => { setShowTeam(true); setShowDashboard(false); setShowHowItWorks(false); setShowMap(false); }}
            />

            {showDashboard ? (
                <Dashboard
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                    onHowItWorksClick={() => { setShowHowItWorks(true); setShowDashboard(false); setShowMap(false); setShowTeam(false); }}
                    onHomeClick={() => { setShowHowItWorks(false); setShowDashboard(false); setShowMap(false); setShowTeam(false); }}
                    onDashboardClick={() => { setShowDashboard(true); setShowHowItWorks(false); setShowMap(false); setShowTeam(false); }}
                />
            ) : showHowItWorks ? (
                <HowItWorks darkMode={darkMode} />
            ) : showMap ? (
                <MapPage />
            ) : showTeam ? (
                <Team
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                    onHowItWorksClick={() => { setShowHowItWorks(true); setShowDashboard(false); setShowMap(false); setShowTeam(false); }}
                    onHomeClick={() => { setShowHowItWorks(false); setShowDashboard(false); setShowMap(false); setShowTeam(false); }}
                    onDashboardClick={() => { setShowDashboard(true); setShowHowItWorks(false); setShowMap(false); setShowTeam(false); }}
                    onMapClick={() => { setShowMap(true); setShowDashboard(false); setShowHowItWorks(false); setShowTeam(false); }}
                    onTeamClick={() => { setShowTeam(true); setShowDashboard(false); setShowHowItWorks(false); setShowMap(false); }}
                />
            ) : (
                <>
                    {/* Hero Section */}
                    <div className="pt-32 pb-20 px-6 relative z-10">
                        {/* Decorative Elements */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-red-500/10 animate-pulse-slow"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-orange-500/20 animate-pulse-slower"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-yellow-500/30 animate-pulse"></div>

                        <div className="max-w-7xl mx-auto text-center relative">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <h1 className={`text-7xl md:text-8xl font-bold mb-8 ${
                                    darkMode
                                    ? 'bg-gradient-to-r from-red-500 via-orange-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                                    : 'bg-gradient-to-r from-red-600 via-orange-500 to-yellow-600 bg-clip-text text-transparent drop-shadow-lg'
                                }`}>
                                    Red Light
                                </h1>

                                <motion.p
                                    className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto font-light ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                >
                                    Revolutionizing traffic management with AI-powered vehicle detection and intelligent flow optimization
                                </motion.p>

                                <div className="flex flex-wrap justify-center gap-6">
                                    <motion.button
                                        className="group relative inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-red-500 to-orange-400 text-white font-semibold overflow-hidden shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all duration-300"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.5 }}
                                        whileHover={{ scale: 1.05 }}
                                        onClick={() => { setShowDashboard(true); setShowHowItWorks(false); setShowMap(false); setShowTeam(false); }}
                                    >
                                        <span className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                        <span className="relative flex items-center">
                                            Live Demo
                                            <BarChart3 className="w-5 h-5 ml-2" />
                                        </span>
                                    </motion.button>

                                    <motion.button
                                        className="group relative inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-orange-400 to-red-500 text-white font-semibold overflow-hidden shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all duration-300"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.7 }}
                                        whileHover={{ scale: 1.05 }}
                                        onClick={() => { setShowTeam(true); setShowDashboard(false); setShowHowItWorks(false); setShowMap(false); }}
                                    >
                                        <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                        <span className="relative flex items-center">
                                            OUR TEAM
                                            <Users className="w-5 h-5 ml-2" />
                                        </span>
                                    </motion.button>
                                </div>

                                {/* Traffic Lights Animation */}
                                <motion.div
                                    className="flex justify-center items-center space-x-12 mt-16"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8, delay: 0.5 }}
                                >
                                    <TrafficLight darkMode={darkMode} delay={0.1} />
                                    <TrafficLight darkMode={darkMode} delay={0.2} />
                                    <TrafficLight darkMode={darkMode} delay={0.3} />
                                </motion.div>

                                {/* How It Works Section */}
                                <div className="max-w-4xl mx-auto mt-32">
                                    <motion.h1
                                        className="text-4xl md:text-5xl font-bold mb-6 text-center bg-gradient-to-r from-red-500 via-orange-400 to-yellow-500 bg-clip-text text-transparent"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.7 }}
                                    >
                                        How Does the Project Work?
                                    </motion.h1>
                                    <motion.p
                                        className="text-lg mb-12 text-center max-w-2xl mx-auto text-gray-300"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.7, delay: 0.2 }}
                                    >
                                        Our smart traffic system uses computer vision, IoT, and real-time logic to optimize traffic flow and safety. Here's a step-by-step overview:
                                    </motion.p>
                                    <div className="relative pl-8">
                                        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-red-500 via-orange-400 to-yellow-400 rounded-full" />
                                        {steps.map((step, idx) => (
                                            <motion.div
                                                key={step.title}
                                                className="flex items-start space-x-4 p-6 mb-6 rounded-xl shadow-lg relative bg-[#171418] text-center"
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                                            >
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${step.color} shadow-md absolute -left-16 top-1/2 -translate-y-1/2`}>
                                                    {step.icon}
                                                </div>
                                                <div className="w-full text-center">
                                                    <h3 className="text-2xl font-semibold mb-3 bg-gradient-to-r from-red-500 via-orange-400 to-yellow-500 bg-clip-text text-transparent">{step.title}</h3>
                                                    <p className="text-base text-gray-300">{step.desc}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Tech Stack & Traffic Logic */}
                                <div className="grid md:grid-cols-2 gap-8 mt-16 max-w-4xl mx-auto">
                                    {/* Tech Stack */}
                                    <motion.div
                                        className="bg-[#171418] border-red-900/30 border rounded-xl p-8 shadow-xl backdrop-blur-sm text-center"
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                    >
                                        <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-red-500 via-orange-400 to-yellow-500 bg-clip-text text-transparent">🏗️ Tech Stack</h3>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium text-gray-300">Frontend:</span>
                                                <span className="text-blue-400 font-semibold">React.js</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium text-gray-300">Backend (AI):</span>
                                                <span className="text-green-400 font-semibold">FastAPI + YOLOv5 + OpenCV</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium text-gray-300">Logic Controller:</span>
                                                <span className="text-yellow-400 font-semibold">Node.js + Express</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium text-gray-300">Hardware:</span>
                                                <span className="text-red-400 font-semibold">Arduino UNO + ESP8266 Wi-Fi</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium text-gray-300">Communication:</span>
                                                <span className="text-orange-400 font-semibold">HTTP/WebSocket</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                    {/* Traffic Logic Rules */}
                                    <motion.div
                                        className="bg-[#171418] border-red-900/30 border rounded-xl p-8 shadow-xl backdrop-blur-sm text-center"
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.3 }}
                                    >
                                        <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-red-500 via-orange-400 to-yellow-500 bg-clip-text text-transparent">🔁 Traffic Logic Rules</h3>
                                        <div className="space-y-4">
                                            <div className="p-4 rounded-lg bg-[#2a232b]"> 
                                                <h4 className="font-semibold mb-2 text-red-400">Core Rule:</h4>
                                                <p className="text-gray-300 text-sm">Only <strong>1 lane</strong> can have a green signal at any given time</p>
                                            </div>
                                            <div className="p-4 rounded-lg bg-[#2a232b]"> 
                                                <h4 className="font-semibold mb-2 text-orange-400">Priority Logic:</h4>
                                                <div className="bg-[#231E24] p-3 rounded font-mono text-sm text-green-400">{`if (laneA > laneB && laneA > laneC && laneA > laneD) {\n    green = A\n}`}</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Landing;