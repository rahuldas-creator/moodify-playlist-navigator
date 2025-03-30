
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import PlaylistCard, { Playlist } from "@/components/PlaylistCard";
import { fetchPlaylistsByMood } from "@/utils/spotify";
import { toast } from "sonner";

const Results = () => {
  const { mood = "" } = useParams<{ mood: string }>();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Prettify the mood name
  const moodTitle = mood.charAt(0).toUpperCase() + mood.slice(1);

  // Format the gradient class
  const gradientClass = `bg-gradient-${mood}`;

  useEffect(() => {
    const loadPlaylists = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPlaylistsByMood(mood);
        setPlaylists(data);
      } catch (err) {
        console.error("Error fetching playlists:", err);
        setError("Failed to load playlists. Please try again later.");
        toast.error("Failed to load playlists");
      } finally {
        setLoading(false);
      }
    };

    loadPlaylists();
  }, [mood]);

  return (
    <div className="page-container">
      <Header />
      
      <main className="flex-1">
        <div className={`py-8 mb-8 ${gradientClass}`}>
          <div className="container">
            <Button
              variant="outline"
              size="sm"
              className="mb-6 bg-white/20 hover:bg-white/30 border-white/10"
              asChild
            >
              <Link to="/" className="flex items-center gap-2">
                <ChevronLeft className="h-4 w-4" />
                Back to moods
              </Link>
            </Button>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {moodTitle} Playlists
            </h1>
            <p className="text-white/80 text-lg">
              Perfect music selections for when you're feeling {mood}
            </p>
          </div>
        </div>

        <div className="container mb-12">
          {loading ? (
            <Loader />
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button asChild>
                <Link to="/">Try another mood</Link>
              </Button>
            </div>
          ) : (
            <div className="results-container">
              {playlists.map((playlist) => (
                <PlaylistCard key={playlist.id} playlist={playlist} mood={mood} />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <footer className="py-6 border-t">
        <div className="container text-center text-muted-foreground text-sm">
          <p>Powered by Spotify. Made with ♥ by Moodify</p>
        </div>
      </footer>
    </div>
  );
};

export default Results;
