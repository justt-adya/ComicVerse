import HeroCarousel from "@/components/HeroCarousel";
import ComicCard from "@/components/ComicCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getNewReleases, comics } from "@/data/comics";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const newReleases = getNewReleases();
  const marvelComics = comics.filter(c => c.publisher === "Marvel").slice(0, 4);
  const dcComics = comics.filter(c => c.publisher === "DC").slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <HeroCarousel />

        {/* New Releases Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                New <span className="text-primary">Releases</span>
              </h2>
              <p className="text-muted-foreground">Check out the latest additions to our collection</p>
            </div>
            <Link to="/browse">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newReleases.slice(0, 4).map(comic => (
              <ComicCard key={comic.id} comic={comic} />
            ))}
          </div>
        </section>

        {/* Marvel Spotlight */}
        <section className="bg-card py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  Marvel <span className="text-primary">Spotlight</span>
                </h2>
                <p className="text-muted-foreground">Discover the Marvel Universe</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {marvelComics.map(comic => (
                <ComicCard key={comic.id} comic={comic} />
              ))}
            </div>
          </div>
        </section>

        {/* DC Spotlight */}
        <section className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                DC <span className="text-primary">Universe</span>
              </h2>
              <p className="text-muted-foreground">Explore DC's finest heroes</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dcComics.map(comic => (
              <ComicCard key={comic.id} comic={comic} />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-hero-gradient py-20">
          <div className="container mx-auto px-4 text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              Start Your Collection Today
            </h2>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              Join thousands of comic enthusiasts and discover your next favorite story
            </p>
            <Link to="/browse">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold">
                Browse All Comics
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
