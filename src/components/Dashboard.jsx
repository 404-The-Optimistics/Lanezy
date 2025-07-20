import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Upload, 
  Play, 
  Pause, 
  RotateCcw, 
  Activity, 
  Car, 
  Truck, 
  Bus,
  Camera,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  MapPin,
  Bike,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Signal,
  TrendingUp,
  Users,
  Zap,
  Sun,
  Moon,
  BarChart3
} from "lucide-react";
import Navbar from "./Navbar";


// Lane Upload Component with landing page styling
const LaneUpload = ({ 
  direction, 
  position, 
  onUpload, 
  loading, 
  frame, 
  counts,
  isActive,
  signal,
  darkMode,
  delay = 0
}) => {
  const directions = {
    north: { label: "North Lane", icon: ArrowUp, rotation: "rotate-0", color: "from-blue-500 to-cyan-500" },
    south: { label: "South Lane", icon: ArrowDown, rotation: "rotate-180", color: "from-emerald-500 to-teal-500" },
    east: { label: "East Lane", icon: ArrowRight, rotation: "rotate-90", color: "from-purple-500 to-pink-500" },
    west: { label: "West Lane", icon: ArrowLeft, rotation: "rotate-270", color: "from-orange-500 to-red-500" }
  };

  const DirectionIcon = directions[direction].icon;

  // Traffic light component
  const renderTrafficLight = () => {
    const colorMap = {
      red: ["red", "gray", "gray"],
      yellow: ["gray", "yellow", "gray"],
      green: ["gray", "gray", "green"]
    };
    const tailwindColor = {
      red: "bg-red-500 shadow-red-500/50 animate-pulse",
      yellow: "bg-yellow-400 shadow-yellow-400/50 animate-pulse",
      green: "bg-green-500 shadow-green-500/50 animate-pulse",
      gray: "bg-gray-600 opacity-40"
    };
    const colors = colorMap[signal] || ["gray", "gray", "gray"];
    
    return (
      <div className="absolute top-4 left-4 z-20">
        <div className={`${darkMode ? 'bg-black/80' : 'bg-white/80'} backdrop-blur-md rounded-lg p-2 flex flex-col gap-1 shadow-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          {[0,1,2].map(i => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${tailwindColor[colors[i]]}`}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <motion.div
      className="w-full h-full flex items-center justify-center"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <div className={`relative w-full max-w-md h-80 ${
        darkMode ? 'bg-[#171418] border-2 border-gradient-to-r from-red-500 to-orange-400' : 'bg-white border-2 border-gradient-to-r from-red-400 to-orange-300'
      } backdrop-blur-sm rounded-3xl p-6 shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-xl ${
        darkMode ? 'hover:shadow-red-500/10' : 'hover:shadow-red-500/10'
      } ${isActive ? 'ring-2 ring-red-400/60' : ''}`}>
        
        {renderTrafficLight()}
        
        {/* Direction Header */}
        <div className="flex items-center justify-center mb-6">
          <div className={`w-12 h-12 bg-gradient-to-r ${directions[direction].color} rounded-full flex items-center justify-center shadow-lg`}>
            <DirectionIcon className="w-6 h-6 text-white" />
          </div>
          <div className="ml-4">
            <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{directions[direction].label}</h3>
            <div className="flex items-center gap-2">
              <Camera className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Lane {position + 1}</span>
            </div>
          </div>
        </div>

        {/* Upload Area or Video Display */}
        {!frame ? (
          <div className={`relative border-2 border-dashed ${
            darkMode ? 'border-gray-600 hover:border-red-400 hover:bg-red-400/5' : 'border-gray-300 hover:border-red-400 hover:bg-red-50'
          } rounded-2xl p-8 text-center h-40 flex flex-col items-center justify-center cursor-pointer transition-all duration-300`}>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) onUpload(file, direction);
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={loading}
            />
            
            <div className={`transition-transform duration-300 ${loading ? 'animate-spin' : ''}`}>
              {loading ? (
                <Clock className="w-12 h-12 text-red-400 mb-3" />
              ) : (
                <Upload className={`w-12 h-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-3`} />
              )}
            </div>
            
            <p className={`text-base ${darkMode ? 'text-white' : 'text-gray-900'} font-medium mb-1`}>
              {loading ? "Processing..." : "Upload Video"}
            </p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} text-center`}>
              {loading ? "Analyzing traffic..." : "Drop video file or click to browse"}
            </p>
          </div>
        ) : (
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src={`data:image/jpeg;base64,${frame}`}
              alt={`${direction} lane detection`}
              className="w-full h-48 object-cover bg-black"
            />
            <div className="absolute top-3 right-3">
              <div className="bg-green-500/90 backdrop-blur-sm rounded-full p-2 animate-pulse">
                <Eye className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        )}

        {/* Vehicle Counts */}
        {counts && Object.keys(counts).length > 0 && (
          <div className="mt-4">
            <h4 className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-3 flex items-center gap-2`}>
              <Activity className="w-4 h-4 text-emerald-400" />
              Live Detection
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(counts).map(([vehicle, count]) => {
                const getVehicleIcon = (type) => {
                  switch (type.toLowerCase()) {
                    case 'car': return Car;
                    case 'truck': return Truck;
                    case 'bus': return Bus;
                    case 'motorcycle':
                    case 'motorbike':
                    case 'bike':
                    case 'bicycle': return Bike;
                    default: return Car;
                  }
                };
                
                const VehicleIcon = getVehicleIcon(vehicle);
                
                return (
                  <div
                    key={vehicle}
                    className={`${
                      darkMode ? 'bg-gray-800/80 hover:bg-gray-700/80' : 'bg-gray-100/80 hover:bg-gray-200/80'
                    } rounded-xl p-3 flex items-center justify-between transition-colors`}
                  >
                    <div className="flex items-center gap-2">
                      <VehicleIcon className="w-4 h-4 text-red-400" />
                      <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'} capitalize`}>{vehicle}</span>
                    </div>
                    <span className="text-sm font-bold text-emerald-400">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Status Indicator */}
        <div className="absolute top-4 right-4">
          <div className={`w-3 h-3 rounded-full ${
            loading ? 'bg-yellow-400 animate-pulse' : frame ? 'bg-green-400' : 'bg-gray-500'
          }`} />
        </div>
      </div>
    </motion.div>
  );
};

// Stats Card Component with landing page styling
const StatsCard = ({ title, value, icon: Icon, color = "red", darkMode, delay = 0 }) => {
  return (
    <motion.div
      className={`${darkMode ? 'bg-[#171418] border-2 border-gradient-to-r from-red-500 to-orange-400' : 'bg-white border-2 border-gradient-to-r from-red-400 to-orange-300'} rounded-xl p-6 backdrop-blur-sm hover:shadow-xl ${darkMode ? 'hover:shadow-red-500/10' : 'hover:shadow-red-500/10'} transition-all duration-300`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5, scale: 1.05 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{title}</h3>
        <span className={`w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-red-500 via-orange-400 to-yellow-400 shadow-lg`}>
          <Icon className="w-5 h-5 text-white" />
        </span>
      </div>
      <div className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {value}
      </div>
    </motion.div>
  );
};

function TrafficDetectionDashboard({ darkMode, toggleDarkMode, onHowItWorksClick, onHomeClick, onDashboardClick }) {
  const [lanes, setLanes] = useState({
    north: { counts: { car: 5, truck: 2, bus: 1 }, frame: "", loading: false },
    south: { counts: { car: 8, motorcycle: 3 }, frame: "", loading: false },
    east: { counts: { car: 3, truck: 1, bus: 2 }, frame: "", loading: false },
    west: { counts: { car: 6, motorcycle: 1 }, frame: "", loading: false }
  });
  
  const [signalState, setSignalState] = useState({ 
    N: "green", 
    S: "red", 
    E: "yellow", 
    W: "red" 
  });

  // Helper functions
  const sumCounts = (counts) => Object.values(counts).reduce((a, b) => a + b, 0);
  
  const getTotalCounts = () => {
    const totals = {};
    Object.values(lanes).forEach(lane => {
      Object.entries(lane.counts).forEach(([vehicle, count]) => {
        totals[vehicle] = (totals[vehicle] || 0) + count;
      });
    });
    return totals;
  };

  const getActiveLanes = () => {
    return Object.entries(lanes).filter(([_, lane]) => Object.keys(lane.counts).length > 0).length;
  };

  const getTotalVehicles = () => {
    return Object.values(getTotalCounts()).reduce((a, b) => a + b, 0);
  };

  // Mock upload function
  const upload = async (file, direction) => {
    setLanes(prev => ({
      ...prev,
      [direction]: { ...prev[direction], loading: true }
    }));

    // Simulate processing time
    setTimeout(() => {
      setLanes(prev => ({
        ...prev,
        [direction]: { 
          ...prev[direction], 
          loading: false,
          frame: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==" // 1x1 pixel placeholder
        }
      }));
    }, 2000);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-gradient-to-br from-[#15171C] via-red-950/30 to-gray-900' : 'bg-gradient-to-br from-gray-50 via-red-50 to-gray-50'}`} style={darkMode ? { backgroundColor: '#171418' } : {}}>
      
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} onHowItWorksClick={onHowItWorksClick} onHomeClick={onHomeClick} onDashboardClick={onDashboardClick} />
      
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-red-500/5 to-orange-400/10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-3xl"></div>
      </div>

      <motion.div className="relative z-10 pt-24" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        {/* Header */}
        <motion.header 
          className="text-center py-12 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className={`inline-flex items-center gap-2 ${darkMode ? 'bg-red-600/20' : 'bg-red-100'} backdrop-blur-sm border ${darkMode ? 'border-red-500/20' : 'border-red-200'} rounded-full px-6 py-2 mb-6`}>
            <Signal className="w-5 h-5 text-red-400" />
            <span className={`text-sm font-medium ${darkMode ? 'text-red-300' : 'text-red-600'}`}>AI-Powered Traffic Management</span>
          </div>
          
          <h1 className={`text-5xl font-bold mb-4 ${
            darkMode 
              ? 'bg-gradient-to-r from-[#7C818C] via-[#493A45] to-orange-200 bg-clip-text text-transparent'
              : 'bg-gradient-to-r from-red-600 via-red-500 to-orange-500 bg-clip-text text-transparent'
          } font-serif`}>
            Smart Crossroad Monitor
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Real-time vehicle detection and traffic flow analysis using advanced YOLO computer vision technology
          </p>
        </motion.header>

        {/* Stats Dashboard */}
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard 
              title="Total Vehicles" 
              value={getTotalVehicles()} 
              icon={Car} 
              color="red" 
              darkMode={darkMode}
              delay={0.2}
            />
            <StatsCard 
              title="Active Lanes" 
              value={`${getActiveLanes()}/4`} 
              icon={Activity} 
              color="red" 
              darkMode={darkMode}
              delay={0.3}
            />
            <StatsCard 
              title="Detection Rate" 
              value="98%" 
              icon={Eye} 
              color="red" 
              darkMode={darkMode}
              delay={0.4}
            />
            <StatsCard 
              title="Avg Wait Time" 
              value="2.3m" 
              icon={Clock} 
              color="red" 
              darkMode={darkMode}
              delay={0.5}
            />
          </div>

          {/* Vehicle Type Breakdown */}
          <motion.div
            className={`${darkMode ? 'bg-[#171418] border-2 border-gradient-to-r from-red-500 to-orange-400' : 'bg-white border-2 border-gradient-to-r from-red-400 to-orange-300'} rounded-2xl p-6 mb-12 backdrop-blur-sm hover:shadow-xl ${darkMode ? 'hover:shadow-red-500/10' : 'hover:shadow-red-500/10'} transition-all duration-300`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ y: -5, scale: 1.05 }}
          >
            <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              Vehicle Distribution
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(getTotalCounts()).map(([vehicle, count]) => {
                const getVehicleIcon = (type) => {
                  switch (type.toLowerCase()) {
                    case 'car': return Car;
                    case 'truck': return Truck;
                    case 'bus': return Bus;
                    case 'motorcycle':
                    case 'motorbike':
                    case 'bike':
                    case 'bicycle': return Bike;
                    default: return Car;
                  }
                };
                
                const VehicleIcon = getVehicleIcon(vehicle);
                
                return (
                  <div key={vehicle} className="text-center">
                    <div className={`${darkMode ? 'bg-gray-800/60 hover:bg-gray-700/60' : 'bg-gray-100/60 hover:bg-gray-200/60'} rounded-xl p-4 mb-2 transition-colors`}>
                      <VehicleIcon className="w-8 h-8 text-red-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-emerald-400 mb-1">{count}</div>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} capitalize`}>{vehicle}s</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Lane Monitoring Grid */}
        <div className="max-w-7xl mx-auto px-6 pb-12">
          <motion.h2 
            className={`text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Camera className="w-6 h-6 text-red-400" />
            Live Lane Monitoring
          </motion.h2>
          
          {/* Mobile Layout */}
          <div className="lg:hidden space-y-8">
            {Object.entries(lanes).map(([direction, data], index) => (
              <LaneUpload
                key={direction}
                direction={direction}
                position={index}
                onUpload={upload}
                loading={data.loading}
                frame={data.frame}
                counts={data.counts}
                isActive={Object.keys(data.counts).length > 0}
                signal={signalState[direction.charAt(0).toUpperCase()]}
                darkMode={darkMode}
                delay={1.0 + index * 0.1}
              />
            ))}
          </div>

          {/* Desktop Layout - Crossroad Style */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-2 gap-16 max-w-5xl mx-auto">
              {/* Top Row */}
              <div className="flex justify-center">
                <LaneUpload
                  direction="north"
                  position={0}
                  onUpload={upload}
                  loading={lanes.north.loading}
                  frame={lanes.north.frame}
                  counts={lanes.north.counts}
                  isActive={Object.keys(lanes.north.counts).length > 0}
                  signal={signalState.N}
                  darkMode={darkMode}
                  delay={1.0}
                />
              </div>
              <div className="flex justify-center">
                <LaneUpload
                  direction="east"
                  position={1}
                  onUpload={upload}
                  loading={lanes.east.loading}
                  frame={lanes.east.frame}
                  counts={lanes.east.counts}
                  isActive={Object.keys(lanes.east.counts).length > 0}
                  signal={signalState.E}
                  darkMode={darkMode}
                  delay={1.1}
                />
              </div>
              
              {/* Bottom Row */}
              <div className="flex justify-center">
                <LaneUpload
                  direction="west"
                  position={2}
                  onUpload={upload}
                  loading={lanes.west.loading}
                  frame={lanes.west.frame}
                  counts={lanes.west.counts}
                  isActive={Object.keys(lanes.west.counts).length > 0}
                  signal={signalState.W}
                  darkMode={darkMode}
                  delay={1.2}
                />
              </div>
              <div className="flex justify-center">
                <LaneUpload
                  direction="south"
                  position={3}
                  onUpload={upload}
                  loading={lanes.south.loading}
                  frame={lanes.south.frame}
                  counts={lanes.south.counts}
                  isActive={Object.keys(lanes.south.counts).length > 0}
                  signal={signalState.S}
                  darkMode={darkMode}
                  delay={1.3}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default TrafficDetectionDashboard;