
import Header from "@/components/Header";
import MoodSelection from "@/components/MoodSelection";

const Index = () => {
  return (
    <div className="page-container">
      <Header />
      
      <main className="flex-1 flex flex-col">
        <div className="container py-12 md:py-24 flex-1 flex flex-col justify-center">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="gradient-text">Moodify</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the perfect playlist based on your mood. Select how you're feeling and let the music match your vibe.
            </p>
          </div>
          
          <MoodSelection />
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

export default Index;
