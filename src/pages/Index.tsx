
import Header from "@/components/Header";
import MoodSelection from "@/components/MoodSelection";
import { motion } from "framer-motion";
import { Music, Headphones, Disc, Radio } from "lucide-react";

const Index = () => {
  return (
    <div className="page-container overflow-hidden bg-gradient-to-br from-background via-secondary/10 to-primary/5">
      <Header />
      
      <main className="flex-1 flex flex-col relative">
        {/* Animated background shapes */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div 
            className="absolute top-20 right-10 w-[350px] h-[350px] rounded-full bg-gradient-to-r from-primary/10 to-accent/10 blur-3xl"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
              rotate: [0, 15, 0]
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
          <motion.div 
            className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-accent/10 to-primary/10 blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.5, 0.2],
              rotate: [0, -15, 0]
            }}
            transition={{ 
              duration: 18, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
          
          {/* Music icons floating in background */}
          <motion.div 
            className="absolute top-[15%] left-[10%]"
            animate={{ 
              y: [0, -15, 0], 
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
          >
            <Music className="text-primary/20 h-12 w-12" />
          </motion.div>
          
          <motion.div 
            className="absolute top-[60%] right-[15%]"
            animate={{ 
              y: [0, 20, 0], 
              rotate: [0, -10, 0]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              repeatType: "reverse",
              delay: 1
            }}
          >
            <Headphones className="text-accent/20 h-14 w-14" />
          </motion.div>
          
          <motion.div 
            className="absolute top-[35%] right-[25%]"
            animate={{ 
              y: [0, 10, 0], 
              rotate: [0, 15, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              repeatType: "reverse",
              delay: 2
            }}
          >
            <Disc className="text-primary/15 h-10 w-10" />
          </motion.div>
          
          <motion.div 
            className="absolute bottom-[25%] left-[20%]"
            animate={{ 
              y: [0, -12, 0], 
              rotate: [0, -8, 0]
            }}
            transition={{ 
              duration: 7, 
              repeat: Infinity, 
              repeatType: "reverse",
              delay: 3
            }}
          >
            <Radio className="text-accent/15 h-9 w-9" />
          </motion.div>
        </div>

        {/* Hero content */}
        <div className="container mt-8 md:mt-12 lg:mt-16 mb-8 relative z-10">
          <div className="text-center mb-8 relative">
            <motion.div
              className="inline-block relative"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <motion.h1 
                className="text-6xl md:text-8xl font-bold relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                <span className="font-display gradient-text bg-gradient-to-r from-primary via-accent to-primary inline-block">
                  Moodify
                </span>
              </motion.h1>
              <motion.div
                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-2/3 h-2 rounded-full"
                style={{
                  background: "linear-gradient(90deg, transparent, var(--primary), var(--accent), var(--primary), transparent)"
                }}
                initial={{ opacity: 0, width: '0%' }}
                animate={{ opacity: 1, width: '80%' }}
                transition={{ duration: 1.2, delay: 1 }}
              />
            </motion.div>
            
            <motion.p 
              className="mt-12 text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.2 }}
            >
              Discover the perfect soundtrack to match your emotions. Select how you're feeling and let the music elevate your experience.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.5 }}
            className="py-8 px-4"
          >
            <MoodSelection />
          </motion.div>
        </div>
        
        {/* Decorative vinyl record */}
        <motion.div 
          className="hidden md:block absolute -right-36 top-1/2 transform -translate-y-1/2 z-0 opacity-25"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <div className="relative w-72 h-72 rounded-full bg-gradient-to-r from-black to-gray-800 flex items-center justify-center">
            <div className="absolute w-20 h-20 rounded-full bg-primary/30 ring-1 ring-white/10" />
            <div className="absolute inset-0 rounded-full border-8 border-gray-700" />
            <div className="absolute inset-4 rounded-full border border-gray-600" />
            <div className="absolute inset-8 rounded-full border border-gray-600" />
            <div className="absolute inset-12 rounded-full border border-gray-600" />
            <div className="absolute inset-16 rounded-full border border-gray-600" />
          </div>
        </motion.div>
      </main>
      
      <motion.footer 
        className="py-6 border-t bg-background/80 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.8 }}
      >
        <div className="container text-center">
          <p className="text-muted-foreground text-sm">Powered by Spotify & YouTube. Made with 
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
      </motion.footer>
    </div>
  );
};

export default Index;
