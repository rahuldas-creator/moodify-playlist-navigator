
import { useState } from "react";
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
};

const moods: Mood[] = [
  {
    id: "happy",
    name: "Happy",
    icon: <Smile className="mood-icon" />,
    color: "bg-mood-happy",
    gradient: "bg-gradient-happy",
    description: "Uplifting tunes to boost your spirits"
  },
  {
    id: "sad",
    name: "Sad",
    icon: <Frown className="mood-icon" />,
    color: "bg-mood-sad",
    gradient: "bg-gradient-sad",
    description: "Emotional melodies for your blue moments"
  },
  {
    id: "nostalgic",
    name: "Nostalgic",
    icon: <Music className="mood-icon" />,
    color: "bg-mood-nostalgic",
    gradient: "bg-gradient-nostalgic",
    description: "Blast from the past to reminisce"
  },
  {
    id: "energized",
    name: "Energized",
    icon: <Rocket className="mood-icon" />,
    color: "bg-mood-energized",
    gradient: "bg-gradient-energized",
    description: "High-energy tracks to get you moving"
  },
  {
    id: "calm",
    name: "Calm",
    icon: <CloudSun className="mood-icon" />,
    color: "bg-mood-calm",
    gradient: "bg-gradient-calm",
    description: "Peaceful sounds to soothe your mind"
  },
  {
    id: "focused",
    name: "Focused",
    icon: <Headphones className="mood-icon" />,
    color: "bg-mood-focused",
    gradient: "bg-gradient-focused",
    description: "Concentration-enhancing soundtracks"
  },
  {
    id: "romantic",
    name: "Romantic",
    icon: <Heart className="mood-icon" />,
    color: "bg-mood-romantic",
    gradient: "bg-gradient-romantic",
    description: "Love songs for heartfelt moments"
  },
  {
    id: "relaxed",
    name: "Relaxed",
    icon: <Waves className="mood-icon" />,
    color: "bg-mood-relaxed",
    gradient: "bg-gradient-relaxed",
    description: "Laid-back tunes for unwinding"
  },
  {
    id: "groovy",
    name: "Groovy",
    icon: <Music2 className="mood-icon" />,
    color: "bg-mood-groovy",
    gradient: "bg-gradient-groovy",
    description: "Rhythmic beats to get in the groove"
  },
  {
    id: "melancholic",
    name: "Melancholic",
    icon: <Cloud className="mood-icon" />,
    color: "bg-mood-melancholic",
    gradient: "bg-gradient-melancholic",
    description: "Reflective music for contemplative times"
  },
  {
    id: "intense",
    name: "Intense",
    icon: <Flame className="mood-icon" />,
    color: "bg-mood-intense",
    gradient: "bg-gradient-intense",
    description: "Powerful tracks for strong emotions"
  },
  {
    id: "creative",
    name: "Creative",
    icon: <Palette className="mood-icon" />,
    color: "bg-mood-creative",
    gradient: "bg-gradient-creative",
    description: "Inspiring sounds to boost creativity"
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

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood.id);
    setTimeout(() => {
      navigate(`/results/${mood.id}`);
    }, 500);
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">How are you feeling today?</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Your emotions are the soundtrack to your life. Select your current mood and discover the perfect playlist to accompany your journey.
        </p>
      </motion.div>
      
      <motion.div 
        className="mood-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {moods.map((mood) => (
          <motion.div
            key={mood.id}
            variants={itemVariants}
            className={`mood-card ${selectedMood === mood.id ? mood.gradient : ""}`}
            onClick={() => handleMoodSelect(mood)}
            onMouseEnter={() => setHoveredMood(mood.id)}
            onMouseLeave={() => setHoveredMood(null)}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              transition: { duration: 0.2 }
            }}
          >
            <div 
              className={`rounded-full p-3 transition-all duration-300 ${
                selectedMood === mood.id 
                  ? "bg-white/20" 
                  : hoveredMood === mood.id 
                    ? "bg-secondary/80" 
                    : "bg-secondary"
              }`}
            >
              {mood.icon}
            </div>
            <h3 className={`text-lg font-medium ${selectedMood === mood.id ? "text-white" : ""}`}>
              {mood.name}
            </h3>
            <p className={`text-xs text-center mt-1 opacity-80 ${selectedMood === mood.id ? "text-white/80" : "text-muted-foreground"}`}>
              {mood.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default MoodSelection;
