
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Smile, 
  Frown, 
  Music, 
  Headphones,
  Rocket,
  CloudSun
} from "lucide-react";

export type Mood = {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
};

const moods: Mood[] = [
  {
    id: "happy",
    name: "Happy",
    icon: <Smile className="mood-icon" />,
    color: "bg-mood-happy",
    gradient: "bg-gradient-happy",
  },
  {
    id: "sad",
    name: "Sad",
    icon: <Frown className="mood-icon" />,
    color: "bg-mood-sad",
    gradient: "bg-gradient-sad",
  },
  {
    id: "nostalgic",
    name: "Nostalgic",
    icon: <Music className="mood-icon" />,
    color: "bg-mood-nostalgic",
    gradient: "bg-gradient-nostalgic",
  },
  {
    id: "energized",
    name: "Energized",
    icon: <Rocket className="mood-icon" />,
    color: "bg-mood-energized",
    gradient: "bg-gradient-energized",
  },
  {
    id: "calm",
    name: "Calm",
    icon: <CloudSun className="mood-icon" />,
    color: "bg-mood-calm",
    gradient: "bg-gradient-calm",
  },
  {
    id: "focused",
    name: "Focused",
    icon: <Headphones className="mood-icon" />,
    color: "bg-mood-focused",
    gradient: "bg-gradient-focused",
  },
];

const MoodSelection = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood.id);
    setTimeout(() => {
      navigate(`/results/${mood.id}`);
    }, 500);
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
        <span className="gradient-text">How are you feeling today?</span>
      </h1>
      <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl">
        Select your mood and discover the perfect playlist to match your vibe
      </p>
      
      <div className="mood-container">
        {moods.map((mood) => (
          <div
            key={mood.id}
            className={`mood-card ${selectedMood === mood.id ? mood.gradient : ""}`}
            onClick={() => handleMoodSelect(mood)}
          >
            <div className={`rounded-full p-3 ${selectedMood === mood.id ? "bg-white/20" : "bg-secondary"}`}>
              {mood.icon}
            </div>
            <h3 className={`text-lg font-medium ${selectedMood === mood.id ? "text-white" : ""}`}>
              {mood.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodSelection;
