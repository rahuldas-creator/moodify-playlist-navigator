
import Header from "@/components/Header";
import MoodSelection from "@/components/MoodSelection";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="page-container overflow-hidden bg-gradient-to-b from-background to-secondary/20">
      <Header />
      
      <main className="flex-1 flex flex-col">
        <div className="container py-12 flex-1 flex flex-col justify-center relative">
          {/* Decorative Elements */}
          <motion.div 
            className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-primary/5 -z-10"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
          <motion.div 
            className="absolute bottom-24 left-8 w-[200px] h-[200px] rounded-full bg-accent/5 -z-10"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
          
          <div className="text-center mb-8 relative">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-4 relative"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <span className="gradient-text text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary inline-block">Moodify</span>
            </motion.h1>
            
            <motion.div
              className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto my-6"
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            />
            
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1 }}
            >
              Discover the perfect soundtrack to match your emotions. Select how you're feeling and let the music elevate your experience.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2 }}
          >
            <MoodSelection />
          </motion.div>
        </div>
      </main>
      
      <motion.footer 
        className="py-6 border-t bg-background"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.5 }}
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
