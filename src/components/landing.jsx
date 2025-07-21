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

const Landing = () => {
    const [darkMode, setDarkMode] = useState(true);
    const [showHowItWorks, setShowHowItWorks] = useState(false);
    const [showDashboard, setShowDashboard] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [showTeam, setShowTeam] = useState(false);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    const statsData = [
        { title: "Total Vehicles", value: "113", change: "+12%", icon: BarChart3, color: "text-green-500" },
        { title: "Avg Wait Time", value: "45s", change: "-8%", icon: Clock, color: "text-yellow-500" },
        { title: "Flow Rate", value: "24/min", change: "+5%", icon: TrendingUp, color: "text-blue-500" },
        { title: "Efficiency", value: "87%", change: "+3%", icon: Zap, color: "text-red-500" }
    ];

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
                                    className="flex justify-center items-center space-x-12 mt-16 mb-20"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8, delay: 0.5 }}
                                >
                                    <TrafficLight darkMode={darkMode} delay={0.1} />
                                    <TrafficLight darkMode={darkMode} delay={0.2} />
                                    <TrafficLight darkMode={darkMode} delay={0.3} />
                                </motion.div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
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
                            </motion.div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Landing;