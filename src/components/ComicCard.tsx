import { Comic } from "@/data/comics";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { addToCart, getCart, updateQuantity } from "@/utils/cart";
import { toast } from "sonner";
import { useState, useEffect } from "react";

interface ComicCardProps {
  comic: Comic;
}

const ComicCard = ({ comic }: ComicCardProps) => {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const cart = getCart();
    const item = cart.find(item => item.comic.id === comic.id);
    setQuantity(item ? item.quantity : 0);

    const handleCartUpdate = () => {
      const updatedCart = getCart();
      const updatedItem = updatedCart.find(item => item.comic.id === comic.id);
      setQuantity(updatedItem ? updatedItem.quantity : 0);
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, [comic.id]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(comic);
    toast.success(`${comic.title} added to cart!`);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(comic.id, quantity + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (quantity > 0) {
      updateQuantity(comic.id, quantity - 1);
      if (quantity === 1) {
        toast.success(`${comic.title} removed from cart`);
      }
    }
  };

  return (
    <Link to={`/comic/${comic.id}`}>
      <Card className="group overflow-hidden hover:shadow-glow transition-all duration-300 cursor-pointer h-full flex flex-col border-border bg-card">
        <CardHeader className="p-0 relative overflow-hidden">
          <div className="aspect-[2/3] overflow-hidden">
            <img
              src={comic.coverImage}
              alt={comic.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          {comic.newRelease && (
            <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
              NEW
            </Badge>
          )}
        </CardHeader>
        
        <CardContent className="flex-1 p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="outline" className="text-xs">
              {comic.publisher}
            </Badge>
            <span>{comic.genre}</span>
          </div>
          <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {comic.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {comic.description}
          </p>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <span className="text-xl font-bold text-primary">
            ${comic.price.toFixed(2)}
          </span>
          {quantity === 0 ? (
            <Button
              size="sm"
              onClick={handleAddToCart}
              className="bg-primary hover:bg-primary/90 font-semibold"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add
            </Button>
          ) : (
            <div className="flex items-center gap-2 bg-primary/10 rounded-lg px-2 py-1 border-2 border-primary">
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={handleDecrement}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="min-w-[24px] text-center font-bold text-primary">
                {quantity}
              </span>
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={handleIncrement}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ComicCard;
