
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Smile, 
  Frown, 
  Music, 
  Headphones,
  Rocket,
  CloudSun,
  Heart,
  Waves,
  Music2,
  Cloud,
  Flame,
  Palette
} from "lucide-react";
import { motion } from "framer-motion";

export type Mood = {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  description: string;
  glowColor: string;
};

const moods: Mood[] = [
  {
    id: "happy",
    name: "Happy",
    icon: <Smile className="mood-icon" />,
    color: "bg-mood-happy",
    gradient: "bg-gradient-happy",
    description: "Uplifting tunes to boost your spirits",
    glowColor: "255, 209, 102" // FFD166
  },
  {
    id: "sad",
    name: "Sad",
    icon: <Frown className="mood-icon" />,
    color: "bg-mood-sad",
    gradient: "bg-gradient-sad",
    description: "Emotional melodies for your blue moments",
    glowColor: "17, 138, 178" // 118AB2
  },
  {
    id: "nostalgic",
    name: "Nostalgic",
    icon: <Music className="mood-icon" />,
    color: "bg-mood-nostalgic",
    gradient: "bg-gradient-nostalgic",
    description: "Blast from the past to reminisce",
    glowColor: "155, 93, 229" // 9B5DE5
  },
  {
    id: "energized",
    name: "Energized",
    icon: <Rocket className="mood-icon" />,
    color: "bg-mood-energized",
    gradient: "bg-gradient-energized",
    description: "High-energy tracks to get you moving",
    glowColor: "239, 71, 111" // EF476F
  },
  {
    id: "calm",
    name: "Calm",
    icon: <CloudSun className="mood-icon" />,
    color: "bg-mood-calm",
    gradient: "bg-gradient-calm",
    description: "Peaceful sounds to soothe your mind",
    glowColor: "6, 214, 160" // 06D6A0
  },
  {
    id: "focused",
    name: "Focused",
    icon: <Headphones className="mood-icon" />,
    color: "bg-mood-focused",
    gradient: "bg-gradient-focused",
    description: "Concentration-enhancing soundtracks",
    glowColor: "7, 59, 76" // 073B4C
  },
  {
    id: "romantic",
    name: "Romantic",
    icon: <Heart className="mood-icon" />,
    color: "bg-mood-romantic",
    gradient: "bg-gradient-romantic",
    description: "Love songs for heartfelt moments",
    glowColor: "232, 74, 95" // e84a5f
  },
  {
    id: "relaxed",
    name: "Relaxed",
    icon: <Waves className="mood-icon" />,
    color: "bg-mood-relaxed",
    gradient: "bg-gradient-relaxed",
    description: "Laid-back tunes for unwinding",
    glowColor: "90, 170, 149" // 5aaa95
  },
  {
    id: "groovy",
    name: "Groovy",
    icon: <Music2 className="mood-icon" />,
    color: "bg-mood-groovy",
    gradient: "bg-gradient-groovy",
    description: "Rhythmic beats to get in the groove",
    glowColor: "249, 199, 79" // f9c74f
  },
  {
    id: "melancholic",
    name: "Melancholic",
    icon: <Cloud className="mood-icon" />,
    color: "bg-mood-melancholic",
    gradient: "bg-gradient-melancholic",
    description: "Reflective music for contemplative times",
    glowColor: "87, 117, 144" // 577590
  },
  {
    id: "intense",
    name: "Intense",
    icon: <Flame className="mood-icon" />,
    color: "bg-mood-intense",
    gradient: "bg-gradient-intense",
    description: "Powerful tracks for strong emotions",
    glowColor: "214, 40, 40" // d62828
  },
  {
    id: "creative",
    name: "Creative",
    icon: <Palette className="mood-icon" />,
    color: "bg-mood-creative",
    gradient: "bg-gradient-creative",
    description: "Inspiring sounds to boost creativity",
    glowColor: "138, 201, 38" // 8ac926
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const MoodSelection = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [hoveredMood, setHoveredMood] = useState<string | null>(null);
  const navigate = useNavigate();
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Mouse move effect handler for the cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate percentage position
    const xPercent = Math.floor((x / rect.width) * 100);
    const yPercent = Math.floor((y / rect.height) * 100);
    
    // Apply the custom properties
    card.style.setProperty('--x', `${xPercent}%`);
    card.style.setProperty('--y', `${yPercent}%`);
  };
  
  // Reset card effect on mouse leave
  const handleMouseLeave = (index: number) => {
    const card = cardsRef.current[index];
    if (card) {
      card.style.setProperty('--x', '50%');
      card.style.setProperty('--y', '50%');
    }
  };

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood.id);
    setTimeout(() => {
      navigate(`/results/${mood.id}`);
    }, 600);
  };

  // Initialize card refs
  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, moods.length);
  }, [moods.length]);

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 font-display">
          <span className="gradient-text">How are you feeling today?</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Your emotions are the soundtrack to your life. Select your current mood and discover the perfect playlist to accompany your journey.
        </p>
      </motion.div>
      
      <motion.div 
        className="mood-container pb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {moods.map((mood, index) => (
          <motion.div
            key={mood.id}
            ref={el => cardsRef.current[index] = el}
            variants={itemVariants}
            className={`mood-card ${selectedMood === mood.id ? mood.gradient : ""}`}
            onClick={() => handleMoodSelect(mood)}
            onMouseEnter={() => setHoveredMood(mood.id)}
            onMouseLeave={() => {
              setHoveredMood(null);
              handleMouseLeave(index);
            }}
            onMouseMove={(e) => handleMouseMove(e, index)}
            style={{ 
              '--glow-color': mood.glowColor 
            } as React.CSSProperties}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 20px 35px rgba(0,0,0,0.1)",
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Glow effect */}
            <div className="mood-card-glow"></div>
            
            {/* Icon wrapper */}
            <motion.div 
              className={`mood-icon-wrapper ${
                selectedMood === mood.id 
                  ? "bg-white/20" 
                  : hoveredMood === mood.id 
                    ? "bg-secondary/80" 
                    : "bg-secondary"
              }`}
              whileHover={{ 
                rotate: [0, -10, 10, -5, 0],
                transition: { duration: 0.5 }
              }}
            >
              {mood.icon}
            </motion.div>
            
            {/* Title */}
            <h3 className={`mood-title ${selectedMood === mood.id ? "text-white" : ""}`}>
              {mood.name}
            </h3>
            
            {/* Description */}
            <p className={`mood-description ${selectedMood === mood.id ? "text-white/80" : "text-muted-foreground"}`}>
              {mood.description}
            </p>
            
            {/* Animated indicator for hover state */}
            <motion.div 
              className={`absolute bottom-0 left-0 h-1 bg-accent transition-all duration-300 ${
                hoveredMood === mood.id && selectedMood !== mood.id ? "opacity-100" : "opacity-0"
              }`}
              initial={{ width: 0 }}
              animate={{ 
                width: hoveredMood === mood.id && selectedMood !== mood.id ? "100%" : "0%"
              }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Pulse animation on selection */}
            {selectedMood === mood.id && (
              <motion.div
                className="absolute inset-0 rounded-xl bg-white"
                initial={{ opacity: 0.5, scale: 1 }}
                animate={{ opacity: 0, scale: 1.5 }}
                transition={{ duration: 0.8 }}
              />
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default MoodSelection;
