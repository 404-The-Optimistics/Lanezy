import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, BarChart3, Clock, Zap, TrendingUp } from 'lucide-react';

// Navbar Component
const Navbar = ({ darkMode, toggleDarkMode }) => {
    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 ${darkMode ? 'bg-[#1A1D22]' : 'bg-white/95'} backdrop-blur-md border-b ${darkMode ? 'border-red-900/20' : 'border-gray-200'}`}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    <motion.div
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-orange-500"></div>
                        <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            TrafficFlow
                        </span>
                    </motion.div>

                    <motion.div
                        className="hidden md:flex items-center space-x-8"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <a href="#" className={`px-4 py-2 rounded-lg ${darkMode ? 'text-white hover:bg-red-900/30' : 'bg-red-500 text-white hover:bg-red-600'} font-medium transition-colors`}>
                            Home
                        </a>
                        <a href="#" className={`px-4 py-2 rounded-lg ${darkMode ? 'text-gray-300 hover:text-white hover:bg-red-900/30' : 'text-gray-600 hover:text-gray-900 hover:bg-red-50'} transition-colors`}>
                            Dashboard
                        </a>
                        <a href="#" className={`px-4 py-2 rounded-lg ${darkMode ? 'text-gray-300 hover:text-white hover:bg-red-900/30' : 'text-gray-600 hover:text-gray-900 hover:bg-red-50'} transition-colors`}>
                            Team
                        </a>
                        <a href="#" className={`px-4 py-2 rounded-lg ${darkMode ? 'text-gray-300 hover:text-white hover:bg-red-900/30' : 'text-gray-600 hover:text-gray-900 hover:bg-red-50'} transition-colors`}>
                            Live Cam
                        </a>
                        <a href="#" className={`px-4 py-2 rounded-lg ${darkMode ? 'text-gray-300 hover:text-white hover:bg-red-900/30' : 'text-gray-600 hover:text-gray-900 hover:bg-red-50'} transition-colors`}>
                            Map
                        </a>
                        <a href="#" className={`px-4 py-2 rounded-lg ${darkMode ? 'text-gray-300 hover:text-white hover:bg-red-900/30' : 'text-gray-600 hover:text-gray-900 hover:bg-red-50'} transition-colors`}>
                            How Our Project Works
                        </a>
                    </motion.div>

                    <motion.button
                        onClick={toggleDarkMode}
                        className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} transition-colors`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </motion.button>
                </div>
            </div>
        </nav>
    );
};

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
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${activeLight === 0 ? 'bg-red-500 shadow-lg shadow-red-500/50' : 'bg-gray-600'}`}></div>
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${activeLight === 1 ? 'bg-yellow-500 shadow-lg shadow-yellow-500/50' : 'bg-gray-600'}`}></div>
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${activeLight === 2 ? 'bg-green-500 shadow-lg shadow-green-500/50' : 'bg-gray-600'}`}></div>
        </motion.div>
    );
};

// Stats Card Component
const StatsCard = ({ title, value, change, icon: Icon, color, darkMode, delay = 0 }) => {
    return (
        <motion.div
            className={`${darkMode ? 'bg-[#171418] border-red-900/30' : 'bg-white border-gray-200'} border rounded-xl p-6 backdrop-blur-sm hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
            whileHover={{ y: -5, scale: 1.02 }}
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {title}
                </h3>
                <Icon className={`w-5 h-5 ${color}`} />
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
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-3xl"></div>
            </div>

            {/* Hero Section */}
            <div className="pt-24 pb-12 px-6 relative z-10">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className={`text-6xl md:text-7xl font-bold mb-6 ${darkMode
                            ? 'bg-gradient-to-r from-[#7C818C] via-[#493A45] to-orange-200 bg-clip-text text-transparent'
                            : 'bg-gradient-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text text-transparent'
                            }`}>
                            TrafficFlow Dashboard
                        </h1>

                        <motion.p
                            className={`text-xl mb-12 max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            Smart traffic monitoring system with real-time vehicle detection and flow optimization
                        </motion.p>

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

                    {/* System Overview */}
                    <motion.div
                        className="mt-20 max-w-6xl mx-auto"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                    >
                        <h2 className={`text-3xl font-bold mb-8 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            🚦 Smart Traffic Control System
                        </h2>
                        <p className={`text-lg mb-12 text-center max-w-4xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            A 4-lane intelligent traffic management system using computer vision and IoT to detect traffic density and dynamically control signal lights. Built using YOLOv5, OpenCV, FastAPI, Node.js, React, and Arduino.
                        </p>

                        {/* Objective Card */}
                        <motion.div
                            className={`${darkMode ? 'bg-[#171418] border-red-900/30' : 'bg-white border-gray-200'} border rounded-xl p-8 mb-8 text-left shadow-xl backdrop-blur-sm`}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 1.4 }}
                        >
                            <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                🔍 System Objectives
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className={`font-semibold mb-3 ${darkMode ? 'text-red-400' : 'text-red-600'}`}>Primary Goals:</h4>
                                    <ul className={`space-y-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                                        <li className="flex items-start">
                                            <span className="text-red-500 mr-3 mt-1">•</span>
                                            Analyze traffic density through live camera feeds
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-red-500 mr-3 mt-1">•</span>
                                            Decide optimal lane signals based on vehicle count
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className={`font-semibold mb-3 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>Safety Features:</h4>
                                    <ul className={`space-y-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                                        <li className="flex items-start">
                                            <span className="text-orange-500 mr-3 mt-1">•</span>
                                            Ensure no conflicting signals across lanes
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-orange-500 mr-3 mt-1">•</span>
                                            Real-time Arduino LED control system
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>

                        {/* Core Logic Flow */}
                        <motion.div
                            className={`${darkMode ? 'bg-[#171418] border-red-900/30' : 'bg-white border-gray-200'} border rounded-xl p-8 mb-8 shadow-xl backdrop-blur-sm`}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 1.6 }}
                        >
                            <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                🧠 Core Logic Flow
                            </h3>
                            <div className="grid gap-6">
                                {[
                                    {
                                        step: "1",
                                        title: "Live Video Input",
                                        desc: "Government provides live video feeds or pre-recorded videos from 4 directions (lanes).",
                                        color: "text-red-500"
                                    },
                                    {
                                        step: "2",
                                        title: "Vehicle Detection (YOLO + OpenCV)",
                                        desc: "Each video is processed individually to count vehicles using YOLOv5. Frames are sent to FastAPI backend for real-time inference.",
                                        color: "text-orange-500"
                                    },
                                    {
                                        step: "3",
                                        title: "Traffic Logic Controller (Node.js)",
                                        desc: "Gets vehicle counts from FastAPI, applies logic to decide which lane gets green, ensures only one lane is green at a time.",
                                        color: "text-yellow-500"
                                    },
                                    {
                                        step: "4",
                                        title: "Signal Update to Arduino",
                                        desc: "Sends control signals to Arduino via Wi-Fi (ESP8266). Arduino turns on respective LEDs for the selected lane.",
                                        color: "text-green-500"
                                    },
                                    {
                                        step: "5",
                                        title: "Frontend Display (React)",
                                        desc: "Shows current signal status, vehicle counts, and lane camera feed. Admin can also override in case of emergency.",
                                        color: "text-blue-500"
                                    }
                                ].map((item, index) => (
                                    <motion.div
                                        key={item.step}
                                        className={`flex items-start space-x-4 p-4 rounded-lg ${darkMode ? 'bg-[#231E24]' : 'bg-gray-50'}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 1.8 + index * 0.1 }}
                                    >
                                        <div className={`w-8 h-8 rounded-full ${item.color} bg-opacity-20 flex items-center justify-center font-bold ${item.color}`}>
                                            {item.step}
                                        </div>
                                        <div>
                                            <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                {item.title}
                                            </h4>
                                            <p className={`${darkMode ? 'text-gray-200' : 'text-gray-600'} text-sm leading-relaxed`}>
                                                {item.desc}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Tech Stack & Traffic Logic */}
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Tech Stack */}
                            <motion.div
                                className={`${darkMode ? 'bg-[#171418] border-red-900/30' : 'bg-white border-gray-200'} border rounded-xl p-8 shadow-xl backdrop-blur-sm`}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 2.4 }}
                            >
                                <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    🏗️ Tech Stack
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        { category: "Frontend", tech: "React.js", color: "text-blue-500" },
                                        { category: "Backend (AI)", tech: "FastAPI + YOLOv5 + OpenCV", color: "text-green-500" },
                                        { category: "Logic Controller", tech: "Node.js + Express", color: "text-yellow-500" },
                                        { category: "Hardware", tech: "Arduino UNO + ESP8266 Wi-Fi", color: "text-red-500" },
                                        { category: "Communication", tech: "HTTP/WebSocket", color: "text-orange-500" }
                                    ].map((item, index) => (
                                        <motion.div
                                            key={item.category}
                                            className="flex justify-between items-center"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.4, delay: 2.6 + index * 0.1 }}
                                        >
                                            <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                                                {item.category}:
                                            </span>
                                            <span className={`${item.color} font-semibold`}>
                                                {item.tech}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Traffic Logic */}
                            <motion.div
                                className={`${darkMode ? 'bg-[#171418] border-red-900/30' : 'bg-white border-gray-200'} border rounded-xl p-8 shadow-xl backdrop-blur-sm`}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 2.6 }}
                            >
                                <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    🔁 Traffic Logic Rules
                                </h3>
                                <div className="space-y-4">
                                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-[#231E24]' : 'bg-gray-50'}`}>
                                        <h4 className={`font-semibold mb-2 ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
                                            Core Rule:
                                        </h4>
                                        <p className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} text-sm`}>
                                            Only <strong>1 lane</strong> can have a green signal at any given time
                                        </p>
                                    </div>

                                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-[#231E24]' : 'bg-gray-50'}`}>
                                        <h4 className={`font-semibold mb-2 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                                            Priority Logic:
                                        </h4>
                                        <div className={`${darkMode ? 'bg-[#231E24]' : 'bg-white'} p-3 rounded font-mono text-sm ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                                            {`if (laneA > laneB && laneA > laneC && laneA > laneD) {
    green = A
}`}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Landing;