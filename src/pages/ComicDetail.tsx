import { useParams, Link } from "react-router-dom";
import { getComicById } from "@/data/comics";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { addToCart } from "@/utils/cart";
import { toast } from "sonner";

const ComicDetail = () => {
  const { id } = useParams<{ id: string }>();
  const comic = id ? getComicById(id) : undefined;

  if (!comic) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Comic Not Found</h1>
            <Link to="/browse">
              <Button>Browse Comics</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(comic);
    toast.success(`${comic.title} added to cart!`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Link to="/browse">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Browse
          </Button>
        </Link>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="aspect-[2/3] overflow-hidden rounded-lg border-2 border-border shadow-glow">
              <img
                src={comic.coverImage}
                alt={comic.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex gap-2">
                <Badge variant="outline">{comic.publisher}</Badge>
                <Badge variant="outline">{comic.genre}</Badge>
                {comic.newRelease && (
                  <Badge className="bg-accent text-accent-foreground">NEW</Badge>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">{comic.title}</h1>
              <p className="text-muted-foreground">
                Released: {new Date(comic.releaseDate).toLocaleDateString()}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-primary mb-2">
                  ${comic.price.toFixed(2)}
                </h2>
              </div>

              <Button
                size="lg"
                className="w-full md:w-auto bg-primary hover:bg-primary/90"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
            </div>

            <div className="space-y-4 pt-6 border-t border-border">
              <div>
                <h3 className="font-bold text-lg mb-2">Synopsis</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {comic.description}
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">Creators</h3>
                <div className="space-y-1 text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">Writer:</span>{" "}
                    {comic.creators.writer}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Artist:</span>{" "}
                    {comic.creators.artist}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">Details</h3>
                <div className="space-y-1 text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">Publisher:</span>{" "}
                    {comic.publisher}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Genre:</span>{" "}
                    {comic.genre}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Character:</span>{" "}
                    {comic.character}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ComicDetail;
