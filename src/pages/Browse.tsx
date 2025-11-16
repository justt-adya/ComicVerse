import { useState, useMemo } from "react";
import { comics } from "@/data/comics";
import ComicCard from "@/components/ComicCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Browse = () => {
  const [selectedPublisher, setSelectedPublisher] = useState<string>("all");
  const [selectedGenre, setSelectedGenre] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("title");

  const publishers = ["all", ...Array.from(new Set(comics.map(c => c.publisher)))];
  const genres = ["all", ...Array.from(new Set(comics.map(c => c.genre)))];

  const filteredAndSortedComics = useMemo(() => {
    let filtered = comics;

    if (selectedPublisher !== "all") {
      filtered = filtered.filter(c => c.publisher === selectedPublisher);
    }

    if (selectedGenre !== "all") {
      filtered = filtered.filter(c => c.genre === selectedGenre);
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "date":
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
        case "title":
        default:
          return a.title.localeCompare(b.title);
      }
    });

    return sorted;
  }, [selectedPublisher, selectedGenre, sortBy]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Browse <span className="text-primary">Comics</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Explore our complete collection of {comics.length} comics
          </p>
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">Publisher</label>
            <Select value={selectedPublisher} onValueChange={setSelectedPublisher}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {publishers.map(publisher => (
                  <SelectItem key={publisher} value={publisher}>
                    {publisher === "all" ? "All Publishers" : publisher}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">Genre</label>
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {genres.map(genre => (
                  <SelectItem key={genre} value={genre}>
                    {genre === "all" ? "All Genres" : genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">Sort By</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Title (A-Z)</SelectItem>
                <SelectItem value="price-low">Price (Low to High)</SelectItem>
                <SelectItem value="price-high">Price (High to Low)</SelectItem>
                <SelectItem value="date">Release Date</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(selectedPublisher !== "all" || selectedGenre !== "all") && (
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedPublisher("all");
                  setSelectedGenre("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6 text-muted-foreground">
          Showing {filteredAndSortedComics.length} comics
        </div>

        {/* Comics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedComics.map(comic => (
            <ComicCard key={comic.id} comic={comic} />
          ))}
        </div>

        {filteredAndSortedComics.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-muted-foreground">No comics found matching your filters</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Browse;
