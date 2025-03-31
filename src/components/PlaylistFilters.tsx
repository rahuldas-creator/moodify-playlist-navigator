
import { useState } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Filter, Languages, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export interface FilterValues {
  language: string;
  yearRange: [number, number];
}

interface PlaylistFiltersProps {
  onFilterChange: (filters: FilterValues) => void;
}

const PlaylistFilters: React.FC<PlaylistFiltersProps> = ({ onFilterChange }) => {
  const [language, setLanguage] = useState<string>("all");
  const [yearRange, setYearRange] = useState<[number, number]>([1970, 2024]);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    onFilterChange({ language: value, yearRange });
  };
  
  const handleYearChange = (value: number[]) => {
    const newRange: [number, number] = [value[0], value[1]];
    setYearRange(newRange);
    onFilterChange({ language, yearRange: newRange });
  };

  const resetFilters = () => {
    setLanguage("all");
    setYearRange([1970, 2024]);
    onFilterChange({ language: "all", yearRange: [1970, 2024] });
  };
  
  return (
    <motion.div 
      className="glass-effect rounded-2xl mb-8 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div 
        className="p-4 flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          <h3 className="font-medium">Filter Playlists</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}>
          {isExpanded ? <X className="h-4 w-4" /> : <span className="text-xs">Click to expand</span>}
        </Button>
      </div>
      
      {isExpanded && (
        <motion.div 
          className="p-5 pt-0 border-t border-border"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Languages className="h-4 w-4 text-primary" />
                <Label htmlFor="language" className="font-medium">Language</Label>
              </div>
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger id="language" className="w-full">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">Hindi</SelectItem>
                  <SelectItem value="tamil">Tamil</SelectItem>
                  <SelectItem value="telugu">Telugu</SelectItem>
                  <SelectItem value="punjabi">Punjabi</SelectItem>
                  <SelectItem value="bengali">Bengali</SelectItem>
                  <SelectItem value="marathi">Marathi</SelectItem>
                  <SelectItem value="gujarati">Gujarati</SelectItem>
                  <SelectItem value="kannada">Kannada</SelectItem>
                  <SelectItem value="malayalam">Malayalam</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="korean">Korean</SelectItem>
                  <SelectItem value="instrumental">Instrumental</SelectItem>
                  <SelectItem value="mixed">Mixed Languages</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <Label className="font-medium">Year Range ({yearRange[0]} - {yearRange[1]})</Label>
              </div>
              <Slider
                defaultValue={[1970, 2024]}
                min={1950}
                max={2024}
                step={1}
                value={yearRange}
                onValueChange={handleYearChange}
                className="my-6"
              />
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={resetFilters}
              className="text-xs"
            >
              Reset Filters
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PlaylistFilters;
