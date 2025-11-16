import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getFeaturedComics } from "@/data/comics";

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const featuredComics = getFeaturedComics();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredComics.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [featuredComics.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredComics.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredComics.length) % featuredComics.length);
  };

  if (featuredComics.length === 0) return null;

  const currentComic = featuredComics[currentSlide];

  return (
    <div className="relative h-[600px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={currentComic.coverImage}
          alt={currentComic.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl space-y-6 animate-fade-in">
          <div className="space-y-2">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Featured Comic
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground">
              {currentComic.title}
            </h1>
          </div>
          
          <p className="text-lg text-muted-foreground max-w-xl">
            {currentComic.description}
          </p>

          <div className="flex items-center gap-4">
            <Link to={`/comic/${currentComic.id}`}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                Read More
              </Button>
            </Link>
            <div className="text-2xl font-bold text-accent">
              ${currentComic.price.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/20 hover:bg-background/40 backdrop-blur-sm"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/20 hover:bg-background/40 backdrop-blur-sm"
        onClick={nextSlide}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {featuredComics.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? "w-8 bg-primary" : "w-2 bg-muted"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
