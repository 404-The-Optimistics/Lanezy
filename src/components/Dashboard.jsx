import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Upload, 
  Activity, 
  Car, 
  Truck, 
  Bus,
  Camera,
  Clock,
  Eye,
  Bike,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Signal,
  TrendingUp,
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
  delay = 0,
  onLoadedData
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
        <div className="relative rounded-2xl overflow-hidden">
          <video
            src={(() => {
              switch (direction) {
                case 'north': return '/Videos/North_Lane.mp4';
                case 'south': return '/Videos/South_Lane.mp4';
                case 'east': return '/Videos/East_Lane.mp4';
                case 'west': return '/Videos/West_Lane.mp4';
                default: return '';
              }
            })()}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-48 object-cover bg-black"
            onLoadedData={() => onLoadedData && onLoadedData(direction)}
          />
          <div className="absolute top-3 right-3">
            <div className="bg-green-500/90 backdrop-blur-sm rounded-full p-2 animate-pulse">
              <Eye className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

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
    north: { counts: {}, frame: "", loading: false },
    south: { counts: {}, frame: "", loading: false },
    east: { counts: {}, frame: "", loading: false },
    west: { counts: {}, frame: "", loading: false }
  });
  const [signalState, setSignalState] = useState({ N: "red", S: "red", E: "red", W: "red" });
  const [csvData, setCsvData] = useState({ north: [], south: [], east: [], west: [] });
  const [currentWindow, setCurrentWindow] = useState(0);
  const [currentGreen, setCurrentGreen] = useState(null);
  const [currentYellow, setCurrentYellow] = useState(null);
  const [cycleOrder, setCycleOrder] = useState([]);
  const timerRef = useRef(null);
  const FPS = 30;
  const GREEN_DURATION = 10 * FPS; // 10 seconds
  const YELLOW_DURATION = 2 * FPS; // 2 seconds

  // Track video readiness
  const [videoReady, setVideoReady] = useState({ north: false, south: false, east: false, west: false });
  // Track time left for countdown
  const [countdown, setCountdown] = useState(0);
  // Track current window start index
  const [windowStart, setWindowStart] = useState(0);

  // CSV parsing utility
  function parseCSV(text, lane) {
    const lines = text.trim().split(/\r?\n/);
    const headers = lines[0].split(",");
    const frameIdx = headers.findIndex(h => h.trim().toLowerCase() === "frame");
    const totalIdx = headers.findIndex(h => h.trim().toLowerCase() === "total");
    if (frameIdx === -1 || totalIdx === -1) return [];
    return lines.slice(1).map(line => {
      const cols = line.split(",");
      return {
        frame: parseInt(cols[frameIdx], 10),
        total: parseInt(cols[totalIdx], 10)
      };
    });
  }

  // Fetch and parse all CSVs on mount
  useEffect(() => {
    async function fetchCSVs() {
      const files = {
        north: "/Videos/North.csv",
        south: "/Videos/South.csv",
        east: "/Videos/East.csv",
        west: "/Videos/West.csv"
      };
      const data = {};
      for (const lane of Object.keys(files)) {
        try {
          const res = await fetch(files[lane]);
          const text = await res.text();
          data[lane] = parseCSV(text, lane);
        } catch (e) {
          data[lane] = [];
        }
      }
      setCsvData(data);
    }
    fetchCSVs();
  }, []);

  // Traffic light state machine
  useEffect(() => {
    if (!csvData.north.length || !csvData.south.length || !csvData.east.length || !csvData.west.length) return;
    let phase = 'green';
    let timeLeft = GREEN_DURATION / FPS;
    let windowIdx = 0;
    let order = [];
    let cycleIdx = 0;
    let running = true;
    let timeoutId = null;
    let intervalId = null;

    function getWindowSums(start) {
      const sums = {};
      for (const lane of ["north", "south", "east", "west"]) {
        const arr = csvData[lane];
        let sum = 0;
        for (let i = start; i < Math.min(start + GREEN_DURATION, arr.length); i++) {
          sum += arr[i]?.total || 0;
        }
        sums[lane] = sum;
      }
      return sums;
    }

    function runCycle(idx, prevGreen) {
      setWindowStart(idx * GREEN_DURATION);
      const sums = getWindowSums(idx * GREEN_DURATION);
      const sorted = Object.entries(sums).sort((a, b) => b[1] - a[1]).map(([lane]) => lane);
      order = sorted;
      setCycleOrder(order);
      cycleIdx = 0;
      nextPhase();
    }

    function nextPhase() {
      if (!running) return;
      const greenLane = order[cycleIdx % 4];
      setCurrentGreen(greenLane);
      setSignalState({
        N: greenLane === "north" ? "green" : "red",
        S: greenLane === "south" ? "green" : "red",
        E: greenLane === "east" ? "green" : "red",
        W: greenLane === "west" ? "green" : "red"
      });
      phase = 'green';
      timeLeft = GREEN_DURATION / FPS;
      setCountdown(timeLeft);
      setWindowStart(windowIdx * GREEN_DURATION);
      intervalId = setInterval(() => {
        timeLeft -= 1;
        setCountdown(timeLeft);
        if (timeLeft <= 0) clearInterval(intervalId);
      }, 1000);
      // Green phase
      timeoutId = setTimeout(() => {
        setCurrentYellow(greenLane);
        setSignalState(prev => ({
          ...prev,
          [greenLane.charAt(0).toUpperCase()]: "yellow"
        }));
        phase = 'yellow';
        timeLeft = YELLOW_DURATION / FPS;
        setCountdown(timeLeft);
        clearInterval(intervalId);
        intervalId = setInterval(() => {
          timeLeft -= 1;
          setCountdown(timeLeft);
          if (timeLeft <= 0) clearInterval(intervalId);
        }, 1000);
        // Yellow phase
        timeoutId = setTimeout(() => {
          setCurrentYellow(null);
          setSignalState({
            N: "red", S: "red", E: "red", W: "red"
          });
          cycleIdx++;
          if (cycleIdx % 4 === 0) {
            windowIdx++;
            runCycle(windowIdx, greenLane);
          } else {
            setWindowStart(windowIdx * GREEN_DURATION);
            nextPhase();
          }
        }, YELLOW_DURATION * (1000 / FPS));
      }, GREEN_DURATION * (1000 / FPS));
    }

    runCycle(windowIdx, null);
    return () => {
      running = false;
      if (timeoutId) clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
    // eslint-disable-next-line
  }, [csvData]);

  // Set video playback rate to 0.33x
  useEffect(() => {
    const rates = document.querySelectorAll("video");
    rates.forEach(v => { v.playbackRate = 0.33; });
  });
  
  // Helper functions
  const sumCounts = (counts) => Object.values(counts).reduce((a, b) => a + b, 0);
  
  // Helper: Current window vehicle flow (sum of all vehicles in current 10s window)
  const getCurrentWindowVehicleFlow = () => {
    let total = 0;
    for (const lane of Object.keys(csvData)) {
      const arr = csvData[lane];
      for (let i = windowStart; i < Math.min(windowStart + GREEN_DURATION, arr.length); i++) {
        total += arr[i]?.total || 0;
      }
    }
    return total;
  };

  // Helper to check if all videos are loaded
  const getActiveLanes = () => {
    return Object.values(videoReady).filter(Boolean).length;
  };

  // Helper for current green lane label
  const getCurrentGreenLabel = () => {
    if (!currentGreen) return 'None';
    return currentGreen.charAt(0).toUpperCase() + currentGreen.slice(1) + ' Lane';
  };

  // Helper for next green lane label
  const getNextGreenLabel = () => {
    if (!cycleOrder.length || !currentGreen) return 'None';
    const idx = cycleOrder.indexOf(currentGreen);
    const nextIdx = (idx + 1) % cycleOrder.length;
    const nextLane = cycleOrder[nextIdx];
    return nextLane.charAt(0).toUpperCase() + nextLane.slice(1) + ' Lane';
  };

  // Pass onLoadedData to LaneUpload to track video readiness
  const handleVideoReady = (direction) => {
    setVideoReady(prev => ({ ...prev, [direction]: true }));
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
           Red Light Dashboard
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Real-time vehicle detection and traffic flow analysis using advanced YOLO computer vision technology
          </p>
        </motion.header>

        {/* Stats Dashboard */}
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard 
              title="Active Lanes" 
              value={`${getActiveLanes()}/4`} 
              icon={Activity} 
              color="red" 
              darkMode={darkMode}
              delay={0.2}
            />
            <StatsCard 
              title="Countdown" 
              value={`${countdown > 0 ? countdown : 0}s`} 
              icon={Clock} 
              color="red" 
              darkMode={darkMode}
              delay={0.3}
            />
            <StatsCard 
              title="Current Green Lane" 
              value={getCurrentGreenLabel()} 
              icon={Signal} 
              color="red" 
              darkMode={darkMode}
              delay={0.4}
            />
            <StatsCard 
              title="Next Lane" 
              value={getNextGreenLabel()} 
              icon={ArrowRight} 
              color="red" 
              darkMode={darkMode}
              delay={0.5}
            />
          </div>
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
                onLoadedData={handleVideoReady}
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
                  onLoadedData={handleVideoReady}
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
                  onLoadedData={handleVideoReady}
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
                  onLoadedData={handleVideoReady}
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
                  onLoadedData={handleVideoReady}
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