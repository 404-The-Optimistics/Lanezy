import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, BarChart3, Clock, Zap, TrendingUp } from 'lucide-react';
import HowItWorks from './HowItWorks';
import Dashboard from './Dashboard';
import MapPage from './map';
import Team from './team';

// Navbar Component
const Navbar = ({ darkMode, toggleDarkMode, onHowItWorksClick, onHomeClick, onDashboardClick, onMapClick, onTeamClick }) => {
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
                        <img src="/vite.svg" alt="Logo" className="w-8 h-8 rounded-full shadow-lg" />
                        <span className={`text-xl font-bold tracking-wide ${darkMode ? 'text-white' : 'text-gray-900'}`}>TrafficFlow</span>
                    </motion.div>

                    <motion.div
                        className="hidden md:flex items-center space-x-8"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <a href="#" onClick={e => { e.preventDefault(); onHomeClick(); }} className={`px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 ${darkMode ? 'text-white hover:bg-red-900/30' : 'bg-red-500 text-white hover:bg-red-600'} font-medium`}>Home</a>
                        <a href="#" onClick={e => { e.preventDefault(); onDashboardClick(); }} className={`px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 ${darkMode ? 'text-gray-300 hover:text-white hover:bg-red-900/30' : 'text-gray-600 hover:text-gray-900 hover:bg-red-50'} transition-colors`}>Dashboard</a>
                        <a href="#" onClick={e => { e.preventDefault(); onTeamClick(); }} className={`px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 ${darkMode ? 'text-gray-300 hover:text-white hover:bg-red-900/30' : 'text-gray-600 hover:text-gray-900 hover:bg-red-50'} transition-colors`}>
                            Team
                        </a>
                        <a href="#" onClick={e => { e.preventDefault(); onMapClick(); }} className={`px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 ${darkMode ? 'text-gray-300 hover:text-white hover:bg-red-900/30' : 'text-gray-600 hover:text-gray-900 hover:bg-red-50'} transition-colors`}>
                            Map
                        </a>
                        <a href="#" onClick={e => { e.preventDefault(); onHowItWorksClick(); }} className={`px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 ${darkMode ? 'text-gray-300 hover:text-white hover:bg-red-900/30' : 'text-gray-600 hover:text-gray-900 hover:bg-red-50'} transition-colors`}>
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
                                    TrafficFlow Dashboard
                                </h1>

                                <motion.p
                                    className={`text-xl mb-8 max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                >
                                    Smart traffic monitoring system with real-time vehicle detection and flow optimization
                                </motion.p>

                                <motion.a
                                    href="#dashboard"
                                    className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-red-500 to-orange-400 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 mb-8"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                    whileHover={{ scale: 1.08 }}
                                >
                                    View Dashboard
                                </motion.a>

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
                        </div>
                    </div>
                </>
            )}
            <footer className={`w-full py-6 mt-16 ${darkMode ? 'bg-[#1A1D22] text-gray-400' : 'bg-white text-gray-600'} border-t border-red-900/10 text-center text-sm z-50 relative`}>Made with ❤️ by the TrafficFlow Team &copy; {new Date().getFullYear()}</footer>
        </div>
    );
};

export default Landing;