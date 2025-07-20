import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon} from 'lucide-react';

const Navbar = ({ darkMode, toggleDarkMode, onHowItWorksClick, onHomeClick, onDashboardClick, onMapClick, onTeamClick }) => {
    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-red-950/30 to-[#15171C]' : 'bg-white/95'} backdrop-blur-md border-b ${darkMode ? 'border-red-900/20' : 'border-gray-200'}`}>
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
                        <a href="#" onClick={e => { e.preventDefault(); onHomeClick(); }} className={`px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 ${darkMode ? 'text-white hover:bg-red-900/30' : ' text-white hover:bg-red-900/30'} font-medium`}>Home</a>
                        <a href="#" onClick={e => { e.preventDefault(); onDashboardClick(); }} className={`px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 ${darkMode ? 'text-gray-300 hover:text-white hover:bg-red-900/30' : 'text-gray-600 hover:text-gray-900 hover:bg-red-50'} transition-colors`}>Dashboard</a>
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

export default Navbar;