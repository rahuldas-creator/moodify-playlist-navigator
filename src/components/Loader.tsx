
import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <Loader2 className="h-12 w-12 text-primary animate-spin" />
      <p className="mt-4 text-muted-foreground">Finding your perfect playlists...</p>
    </div>
  );
};

export default Loader;
