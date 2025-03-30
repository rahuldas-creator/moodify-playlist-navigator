
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
import { Filter } from "lucide-react";

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
  
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    onFilterChange({ language: value, yearRange });
  };
  
  const handleYearChange = (value: number[]) => {
    const newRange: [number, number] = [value[0], value[1]];
    setYearRange(newRange);
    onFilterChange({ language, yearRange: newRange });
  };
  
  return (
    <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-primary" />
        <h3 className="font-medium">Filter Playlists</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="language" className="mb-2 block">Language</Label>
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger id="language">
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
        
        <div>
          <Label className="mb-2 block">Year Range ({yearRange[0]} - {yearRange[1]})</Label>
          <Slider
            defaultValue={[1970, 2024]}
            min={1950}
            max={2024}
            step={1}
            value={yearRange}
            onValueChange={handleYearChange}
            className="my-4"
          />
        </div>
      </div>
    </div>
  );
};

export default PlaylistFilters;
