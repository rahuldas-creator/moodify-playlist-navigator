
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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
  const imageUrl = imageError || !playlist.images[0]?.url ? defaultImage : playlist.images[0].url;
  
  const isYoutube = playlist.source === "youtube";
  
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
    <div className="playlist-card group">
      <div className="relative overflow-hidden">
        <img 
          src={imageUrl} 
          alt={playlist.name} 
          className="playlist-image transition-transform duration-500 group-hover:scale-105"
          onError={() => setImageError(true)}
        />
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity ${getGradientClass()}`}></div>
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-bold truncate">{playlist.name}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${isYoutube ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
            {isYoutube ? 'YouTube' : 'Spotify'}
          </span>
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-2 mt-1 flex-1">
          {playlist.description || "No description available"}
        </p>
        
        {playlist.language && (
          <div className="text-xs text-muted-foreground mt-2">
            Language: {playlist.language.charAt(0).toUpperCase() + playlist.language.slice(1)}
          </div>
        )}
        
        {playlist.yearRange && (
          <div className="text-xs text-muted-foreground mt-1 mb-2">
            Era: {playlist.yearRange[0]} - {playlist.yearRange[1]}
          </div>
        )}
        
        <div className="mt-4">
          <Button asChild className={`w-full group ${isYoutube ? 'bg-red-600 hover:bg-red-700' : ''}`}>
            <a 
              href={isYoutube && playlist.youtubeId ? `https://www.youtube.com/playlist?list=${playlist.youtubeId}` : playlist.external_urls.spotify} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              Listen on {isYoutube ? 'YouTube' : 'Spotify'}
              <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;
