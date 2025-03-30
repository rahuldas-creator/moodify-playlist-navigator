
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Playlist {
  id: string;
  name: string;
  description: string;
  images: { url: string }[];
  external_urls: { spotify: string };
}

interface PlaylistCardProps {
  playlist: Playlist;
  mood: string;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist, mood }) => {
  const imageUrl = playlist.images[0]?.url || "https://placehold.co/300x300/9B5DE5/FFFFFF?text=Moodify";
  
  const getGradientClass = () => {
    switch (mood) {
      case "happy": return "bg-gradient-happy";
      case "sad": return "bg-gradient-sad";
      case "nostalgic": return "bg-gradient-nostalgic";
      case "energized": return "bg-gradient-energized";
      case "calm": return "bg-gradient-calm";
      case "focused": return "bg-gradient-focused";
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
        />
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity ${getGradientClass()}`}></div>
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold truncate">{playlist.name}</h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mt-1 flex-1">
          {playlist.description || "No description available"}
        </p>
        
        <div className="mt-4">
          <Button asChild className="w-full group">
            <a 
              href={playlist.external_urls.spotify} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              Listen on Spotify
              <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;
