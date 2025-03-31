
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Music, ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import PlaylistCard, { Playlist } from "@/components/PlaylistCard";
import PlaylistFilters, { FilterValues } from "@/components/PlaylistFilters";
import { fetchPlaylistsByMood } from "@/utils/spotify";
import { toast } from "sonner";
import { motion } from "framer-motion";

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="page-container bg-gradient-to-b from-background to-secondary/30">
      <Header />
      
      <main className="flex-1">
        <div className={`py-16 relative overflow-hidden ${gradientClass}`}>
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-noise mix-blend-overlay"></div>
          <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button
                variant="outline"
                size="sm"
                className="mb-8 bg-white/20 hover:bg-white/30 border-white/10 backdrop-blur-sm"
                asChild
              >
                <Link to="/" className="flex items-center gap-2">
                  <ChevronLeft className="h-4 w-4" />
                  Back to moods
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                  <Music className="h-8 w-8" />
                </span>
                <span>{moodTitle} Playlists</span>
              </h1>
              <p className="text-white/90 text-xl font-light">
                Perfect music selections for when you're feeling {mood}. Explore our curated playlists from Spotify and YouTube.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="container mb-20 mt-8">
          {loading ? (
            <Loader />
          ) : error ? (
            <motion.div 
              className="text-center py-12 glass-effect rounded-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button asChild>
                <Link to="/">Try another mood</Link>
              </Button>
            </motion.div>
          ) : (
            <>
              <PlaylistFilters onFilterChange={handleFilterChange} />
              
              {filteredPlaylists.length === 0 ? (
                <motion.div 
                  className="text-center py-16 glass-effect rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="mb-4 bg-muted inline-flex rounded-full p-3">
                    <ListFilter className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground mb-4 text-lg">No playlists match your filters</p>
                  <Button 
                    onClick={() => setFilters({ language: "all", yearRange: [1970, 2024] })}
                    className="rounded-full px-6"
                  >
                    Reset Filters
                  </Button>
                </motion.div>
              ) : (
                <motion.div 
                  className="results-container"
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  {filteredPlaylists.map((playlist) => (
                    <motion.div key={playlist.id} variants={item}>
                      <PlaylistCard playlist={playlist} mood={mood} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </>
          )}
        </div>
      </main>
      
      <footer className="py-8 border-t">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">Powered by Spotify & YouTube</p>
            <div className="flex items-center">
              <p className="text-muted-foreground text-sm flex items-center">
                Made with 
                <motion.span 
                  className="text-red-500 inline-block mx-1"
                  animate={{ 
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    repeatType: "reverse" 
                  }}
                >♥</motion.span> 
                by Moodify
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Results;
