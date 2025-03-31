
import { ExternalLink, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { motion } from "framer-motion";

export interface Playlist {
  id: string;
  name: string;
  description: string;
  images: { url: string }[];
  external_urls: { spotify: string };
  source?: "spotify" | "youtube";
  language?: string;
  yearRange?: [number, number];
  youtubeId?: string;
}

interface PlaylistCardProps {
  playlist: Playlist;
  mood: string;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist, mood }) => {
  const defaultImage = "https://placehold.co/300x300/9B5DE5/FFFFFF?text=Moodify";
  const [imageError, setImageError] = useState(false);
  const [liked, setLiked] = useState(false);
  const imageUrl = imageError || !playlist.images[0]?.url ? defaultImage : playlist.images[0].url;
  
  const isYoutube = playlist.source === "youtube";
  
  // Create the YouTube URL using the youtubeId
  const youtubeUrl = playlist.youtubeId 
    ? `https://www.youtube.com/playlist?list=${playlist.youtubeId}` 
    : "#";
  
  const getGradientClass = () => {
    switch (mood) {
      case "happy": return "bg-gradient-happy";
      case "sad": return "bg-gradient-sad";
      case "nostalgic": return "bg-gradient-nostalgic";
      case "energized": return "bg-gradient-energized";
      case "calm": return "bg-gradient-calm";
      case "focused": return "bg-gradient-focused";
      case "romantic": return "bg-gradient-romantic";
      case "relaxed": return "bg-gradient-relaxed";
      case "groovy": return "bg-gradient-groovy";
      case "melancholic": return "bg-gradient-melancholic";
      case "intense": return "bg-gradient-intense";
      case "creative": return "bg-gradient-creative";
      default: return "bg-gradient-to-r from-primary to-accent";
    }
  };

  return (
    <motion.div 
      className="playlist-card group"
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative overflow-hidden rounded-t-xl">
        <img 
          src={imageUrl} 
          alt={playlist.name} 
          className="playlist-image transition-transform duration-500 group-hover:scale-110"
          onError={() => setImageError(true)}
        />
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-300 ${getGradientClass()}`}></div>
        
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button 
            asChild 
            className="rounded-full w-16 h-16 bg-white/90 text-black hover:bg-white hover:scale-110 transition-all shadow-xl"
          >
            <a 
              href={isYoutube ? youtubeUrl : playlist.external_urls.spotify} 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center"
              aria-label={`Play ${playlist.name}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 ml-1">
                <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
              </svg>
            </a>
          </Button>
        </div>
        
        {/* Like button */}
        <motion.button 
          className="absolute top-3 right-3 z-10 bg-black/30 backdrop-blur-md p-2 rounded-full hover:bg-black/50 transition-colors"
          onClick={() => setLiked(!liked)}
          whileTap={{ scale: 0.9 }}
          aria-label={liked ? "Unlike" : "Like"}
        >
          <Heart className={`h-5 w-5 ${liked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
        </motion.button>
      </div>
      
      <div className="p-5 flex flex-col flex-1 bg-white dark:bg-gray-800 rounded-b-xl shadow-md">
        <div className="flex items-center justify-between mb-2">
          <HoverCard>
            <HoverCardTrigger asChild>
              <h3 className="font-bold text-lg line-clamp-1 cursor-pointer">{playlist.name}</h3>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-2">
                <h4 className="font-semibold">{playlist.name}</h4>
                <p className="text-sm">{playlist.description || "No description available"}</p>
              </div>
            </HoverCardContent>
          </HoverCard>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${isYoutube ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
            {isYoutube ? 'YouTube' : 'Spotify'}
          </span>
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-2 mt-1 flex-1">
          {playlist.description || "No description available"}
        </p>
        
        <div className="mt-3 flex flex-wrap gap-2 mb-3">
          {playlist.language && (
            <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
              {playlist.language.charAt(0).toUpperCase() + playlist.language.slice(1)}
            </span>
          )}
          
          {playlist.yearRange && (
            <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">
              {playlist.yearRange[0]} - {playlist.yearRange[1]}
            </span>
          )}
        </div>
        
        <div className="mt-2">
          <Button asChild className={`w-full group ${isYoutube ? 'bg-red-600 hover:bg-red-700' : 'bg-gradient-to-r from-primary to-accent hover:bg-gradient-to-r hover:from-primary/90 hover:to-accent/90'} rounded-full shadow-md`}>
            <a 
              href={isYoutube ? youtubeUrl : playlist.external_urls.spotify} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-5"
            >
              Listen on {isYoutube ? 'YouTube' : 'Spotify'}
              <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default PlaylistCard;
