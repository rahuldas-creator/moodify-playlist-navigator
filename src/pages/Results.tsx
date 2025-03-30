
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import PlaylistCard, { Playlist } from "@/components/PlaylistCard";
import PlaylistFilters, { FilterValues } from "@/components/PlaylistFilters";
import { fetchPlaylistsByMood } from "@/utils/spotify";
import { toast } from "sonner";

const Results = () => {
  const { mood = "" } = useParams<{ mood: string }>();
  const [allPlaylists, setAllPlaylists] = useState<Playlist[]>([]);
  const [filteredPlaylists, setFilteredPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterValues>({
    language: "all",
    yearRange: [1970, 2024],
  });

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
        
        // Add console logs to debug language data
        console.log("Loaded playlists:", data);
        
        setAllPlaylists(data);
        setFilteredPlaylists(data);
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

  // Filter playlists when filters change
  useEffect(() => {
    if (allPlaylists.length === 0) return;

    // Log the current filters for debugging
    console.log("Filtering with:", filters);
    
    const filtered = allPlaylists.filter((playlist) => {
      // Filter by language - fixed to properly handle all language options
      if (filters.language !== "all") {
        // Check if the playlist language matches exactly the selected language
        if (!playlist.language || playlist.language.toLowerCase() !== filters.language.toLowerCase()) {
          // If the playlist has mixed languages and user selected a specific language, don't show it
          if (playlist.language === "mixed" && filters.language !== "mixed") {
            return false;
          }
          // If user selected mixed languages, still show mixed language playlists
          if (filters.language === "mixed" && playlist.language !== "mixed") {
            return false;
          }
          // For all other cases where languages don't match exactly
          if (playlist.language !== filters.language) {
            return false;
          }
        }
      }

      // Filter by year range
      if (
        playlist.yearRange &&
        (playlist.yearRange[0] < filters.yearRange[0] ||
          playlist.yearRange[1] > filters.yearRange[1])
      ) {
        return false;
      }

      return true;
    });

    // Log filtered results for debugging
    console.log("Filtered playlists:", filtered);
    
    setFilteredPlaylists(filtered);
  }, [allPlaylists, filters]);

  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
  };

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
            <>
              <PlaylistFilters onFilterChange={handleFilterChange} />
              
              {filteredPlaylists.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No playlists match your filters</p>
                  <Button onClick={() => setFilters({ language: "all", yearRange: [1970, 2024] })}>
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <div className="results-container">
                  {filteredPlaylists.map((playlist) => (
                    <PlaylistCard key={playlist.id} playlist={playlist} mood={mood} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      
      <footer className="py-6 border-t">
        <div className="container text-center text-muted-foreground text-sm">
          <p>Powered by Spotify & YouTube. Made with ♥ by Moodify</p>
        </div>
      </footer>
    </div>
  );
};

export default Results;
