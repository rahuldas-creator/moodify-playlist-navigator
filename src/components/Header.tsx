
import { Music } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header 
      className="border-b border-border/40 bg-background/70 backdrop-blur-md supports-[backdrop-filter]:bg-background/40 sticky top-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
    >
      <div className="container flex h-16 items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-primary/20 rounded-full blur-md"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <Music className="h-6 w-6 text-primary relative" />
            </motion.div>
          </div>
          <span className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
            Moodify
          </span>
        </Link>
        <nav className="ml-auto flex items-center gap-6">
          <Link 
            to="/" 
            className="text-sm font-medium transition-colors hover:text-primary relative group"
          >
            Home
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </Link>
          <motion.a 
            href="https://github.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium transition-colors hover:text-primary relative group"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            GitHub
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </motion.a>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
