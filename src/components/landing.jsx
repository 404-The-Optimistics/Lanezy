import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, BarChart3, Clock, Zap, TrendingUp } from 'lucide-react';
import HowItWorks from './HowItWorks';
import Dashboard from './Dashboard';
import MapPage from './map';
import Team from './team';
import Navbar from "./Navbar";

// Traffic Light Component
const TrafficLight = ({ darkMode, delay = 0 }) => {
    const [activeLight, setActiveLight] = useState(1); // 0: red, 1: yellow, 2: green

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

// Stats Card Component
const StatsCard = ({ title, value, change, icon: Icon, color, darkMode, delay = 0 }) => {
    return (
        <motion.div
            className={`${darkMode ? 'bg-[#171418] border-2 border-gradient-to-r from-red-500 to-orange-400' : 'bg-white border-2 border-gradient-to-r from-red-400 to-orange-300'} rounded-xl p-6 backdrop-blur-sm hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
            whileHover={{ y: -5, scale: 1.02 }}
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{title}</h3>
                <span className={`w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-red-500 via-orange-400 to-yellow-400 shadow-lg`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                </span>
            </div>
            <div className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {value}
            </div>
            <div className={`text-sm flex items-center ${change.includes('+') ? 'text-green-500' : change.includes('-') ? 'text-red-500' : 'text-orange-500'}`}>
                <TrendingUp className="w-4 h-4 mr-1" />
                {change} from last hour
            </div>
        </motion.div>
    );
};

// Main Landing Page Component
const Landing = () => {
    const [darkMode, setDarkMode] = useState(true);
    const [showHowItWorks, setShowHowItWorks] = useState(false);
    const [showDashboard, setShowDashboard] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [showTeam, setShowTeam] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const statsData = [
        {
            title: "Total Vehicles",
            value: "113",
            change: "+12%",
            icon: BarChart3,
            color: "text-green-500"
        },
        {
            title: "Avg Wait Time",
            value: "45s",
            change: "-8%",
            icon: Clock,
            color: "text-yellow-500"
        },
        {
            title: "Flow Rate",
            value: "24/min",
            change: "+5%",
            icon: TrendingUp,
            color: "text-blue-500"
        },
        {
            title: "Efficiency",
            value: "87%",
            change: "+3%",
            icon: Zap,
            color: "text-red-500"
        }
    ];

    return (
        <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-gradient-to-br from-[#15171C] via-red-950/30 to-gray-900' : 'bg-gradient-to-br from-gray-50 via-red-50 to-gray-50'}`} style={darkMode ? { backgroundColor: '#171418' } : {}}>
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
                    {/* Background Effects */}
                    <div className="fixed inset-0 pointer-events-none">
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-3xl"></div>
                    </div>
                    {/* Hero Section */}
                    <div className="pt-24 pb-12 px-6 relative z-10">
                        <div className="absolute inset-0 w-full h-full animate-gradient-x bg-gradient-to-r from-red-400 via-orange-300 to-yellow-400 opacity-20 blur-2xl pointer-events-none" />
                        <div className="max-w-7xl mx-auto text-center relative">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <h1 className={`text-6xl md:text-7xl font-bold mb-6 drop-shadow-lg ${darkMode
                                    ? 'bg-gradient-to-r from-[#7C818C] via-[#493A45] to-orange-200 bg-clip-text text-transparent'
                                    : 'bg-gradient-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text text-transparent'
                                    }`}>
                                    Red Light Dashboard
                                </h1>

                                <motion.p
                                    className={`text-xl mb-8 max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                >
                                    Smart traffic monitoring system with real-time vehicle detection and flow optimization
                                </motion.p>

                                <motion.button
                                    className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-red-500 to-orange-400 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 mb-8"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                    whileHover={{ scale: 1.08 }}
                                    onClick={() => { setShowDashboard(true); setShowHowItWorks(false); setShowMap(false); setShowTeam(false); }}
                                >
                                    Live Demo
                                </motion.button>

                                {/* OUR TEAM Button */}
                                <motion.button
                                    className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-orange-400 to-red-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 mb-8 ml-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.7 }}
                                    whileHover={{ scale: 1.08 }}
                                    onClick={() => { setShowTeam(true); setShowDashboard(false); setShowHowItWorks(false); setShowMap(false); }}
                                >
                                    OUR TEAM
                                </motion.button>

                                {/* Traffic Lights Animation */}
                                <motion.div
                                    className="flex justify-center items-center space-x-8 mb-16"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8, delay: 0.5 }}
                                >
                                    <TrafficLight darkMode={darkMode} delay={0.1} />
                                    <TrafficLight darkMode={darkMode} delay={0.2} />
                                    <TrafficLight darkMode={darkMode} delay={0.3} />
                                </motion.div>
                            </motion.div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                                {statsData.map((stat, index) => (
                                    <StatsCard
                                        key={stat.title}
                                        title={stat.title}
                                        value={stat.value}
                                        change={stat.change}
                                        icon={stat.icon}
                                        color={stat.color}
                                        darkMode={darkMode}
                                        delay={0.8 + index * 0.1}
                                    />
                                ))}
                            </div>

                            {/* How our project works Section (Stepper Style) */}
                            <motion.section
                                className={`mt-20 max-w-5xl mx-auto rounded-2xl shadow-lg p-10 ${darkMode ? 'bg-[#18151c] border border-red-900/30' : 'bg-white border border-red-200/60'} relative z-10`}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 1.2 }}
                            >
                                <h2 className={`text-3xl md:text-4xl font-bold mb-6 text-center ${darkMode ? 'text-orange-200' : 'text-red-700'}`}>How our project works</h2>
                                <motion.p
                                    className={`text-lg mb-12 text-center max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.7, delay: 0.2 }}
                                >
                                    Our smart traffic system uses computer vision, IoT, and real-time logic to optimize traffic flow and safety. Here's a step-by-step overview:
                                </motion.p>
                                <div className="relative pl-8 mb-16">
                                    <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-red-500 via-orange-400 to-yellow-400 rounded-full" />
                                    {/* Stepper Items */}
                                    {[{
                                        title: 'Live Video Input',
                                        desc: 'Government provides live video feeds or pre-recorded videos from 4 directions (lanes).',
                                        icon: <BarChart3 className="w-7 h-7 text-red-500" />, color: 'from-red-500 to-orange-400'
                                    }, {
                                        title: 'Vehicle Detection (YOLO + OpenCV)',
                                        desc: 'Each video is processed individually to count vehicles using YOLOv5. Frames are sent to FastAPI backend for real-time inference.',
                                        icon: <Clock className="w-7 h-7 text-orange-500" />, color: 'from-orange-400 to-yellow-400'
                                    }, {
                                        title: 'Traffic Logic Controller (Node.js)',
                                        desc: 'Gets vehicle counts from FastAPI, applies logic to decide which lane gets green, ensures only one lane is green at a time.',
                                        icon: <TrendingUp className="w-7 h-7 text-yellow-500" />, color: 'from-yellow-400 to-green-400'
                                    }, {
                                        title: 'Signal Update to Arduino',
                                        desc: 'Sends control signals to Arduino via Wi-Fi (ESP8266). Arduino turns on respective LEDs for the selected lane.',
                                        icon: <Zap className="w-7 h-7 text-green-500" />, color: 'from-green-400 to-blue-400'
                                    }, {
                                        title: 'Frontend Display (React)',
                                        desc: 'Shows current signal status, vehicle counts, and lane camera feed. Admin can also override in case of emergency.',
                                        icon: <BarChart3 className="w-7 h-7 text-blue-500" />, color: 'from-blue-400 to-purple-400'
                                    }].map((step, idx) => (
                                        <motion.div
                                            key={step.title}
                                            className={`flex items-start space-x-4 p-6 mb-6 rounded-xl shadow-lg relative ${darkMode ? 'bg-[#231E24]' : 'bg-white'}`}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                                        >
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${step.color} shadow-md absolute -left-16 top-1/2 -translate-y-1/2`}>
                                                {step.icon}
                                            </div>
                                            <div className="w-full text-center">
                                                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-orange-200' : 'text-gray-900'}`}>{step.title}</h3>
                                                <p className={`text-base ${darkMode ? 'text-gray-200' : 'text-gray-600'}`}>{step.desc}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                                {/* Tech Stack & Traffic Logic */}
                                <div className="grid md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto">
                                    {/* Tech Stack */}
                                    <motion.div
                                        className={`${darkMode ? 'bg-[#231E24] border-red-900/30' : 'bg-white border-gray-200'} border rounded-xl p-8 shadow-xl backdrop-blur-sm`}
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                    >
                                        <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>🏗️ Tech Stack</h3>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Frontend:</span>
                                                <span className="text-blue-500 font-semibold">React.js</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Backend (AI):</span>
                                                <span className="text-green-500 font-semibold">FastAPI + YOLOv5 + OpenCV</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Logic Controller:</span>
                                                <span className="text-yellow-500 font-semibold">Node.js + Express</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Hardware:</span>
                                                <span className="text-red-500 font-semibold">Arduino UNO + ESP8266 Wi-Fi</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Communication:</span>
                                                <span className="text-orange-500 font-semibold">HTTP/WebSocket</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                    {/* Traffic Logic Rules */}
                                    <motion.div
                                        className={`${darkMode ? 'bg-[#231E24] border-red-900/30' : 'bg-white border-gray-200'} border rounded-xl p-8 shadow-xl backdrop-blur-sm`}
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.3 }}
                                    >
                                        <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>🔁 Traffic Logic Rules</h3>
                                        <div className="space-y-4">
                                            <div className={`p-4 rounded-lg ${darkMode ? 'bg-[#2a232b]' : 'bg-gray-50'}`}> 
                                                <h4 className={`font-semibold mb-2 ${darkMode ? 'text-red-400' : 'text-red-600'}`}>Core Rule:</h4>
                                                <p className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} text-sm`}>Only <strong>1 lane</strong> can have a green signal at any given time</p>
                                            </div>
                                            <div className={`p-4 rounded-lg ${darkMode ? 'bg-[#2a232b]' : 'bg-gray-50'}`}> 
                                                <h4 className={`font-semibold mb-2 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>Priority Logic:</h4>
                                                <div className={`${darkMode ? 'bg-[#231E24]' : 'bg-white'} p-3 rounded font-mono text-sm ${darkMode ? 'text-green-400' : 'text-green-600'}`}>{`if (laneA > laneB && laneA > laneC && laneA > laneD) {\n    green = A\n}`}</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.section>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Landing;


/// How it works
// Team
