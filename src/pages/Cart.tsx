import { useState, useEffect } from "react";
import { getCart, removeFromCart, updateQuantity, getCartTotal, clearCart } from "@/utils/cart";
import { CartItem } from "@/utils/cart";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  const loadCart = () => {
    setCartItems(getCart());
    setTotal(getCartTotal());
  };

  useEffect(() => {
    loadCart();
    
    const handleCartUpdate = () => {
      loadCart();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

  const handleQuantityChange = (comicId: string, newQuantity: number) => {
    updateQuantity(comicId, newQuantity);
  };

  const handleRemove = (comicId: string, title: string) => {
    removeFromCart(comicId);
    toast.success(`${title} removed from cart`);
  };

  const handleCheckout = () => {
    clearCart();
    toast.success("Order placed successfully! Thank you for your purchase!");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-6">
            <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground" />
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Your cart is empty</h1>
              <p className="text-muted-foreground">Start adding some comics to your collection!</p>
            </div>
            <Link to="/browse">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Browse Comics
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">
          Shopping <span className="text-primary">Cart</span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(({ comic, quantity }) => (
              <div
                key={comic.id}
                className="bg-card border border-border rounded-lg p-4 flex gap-4"
              >
                <Link to={`/comic/${comic.id}`} className="flex-shrink-0">
                  <img
                    src={comic.coverImage}
                    alt={comic.title}
                    className="w-24 h-36 object-cover rounded"
                  />
                </Link>

                <div className="flex-1 space-y-2">
                  <Link to={`/comic/${comic.id}`}>
                    <h3 className="font-bold text-lg hover:text-primary transition-colors">
                      {comic.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    {comic.publisher} • {comic.genre}
                  </p>
                  <p className="text-lg font-bold text-primary">
                    ${comic.price.toFixed(2)}
                  </p>

                  <div className="flex items-center gap-4 pt-2">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleQuantityChange(comic.id, quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">{quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleQuantityChange(comic.id, quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleRemove(comic.id, comic.title)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>

                {/* Item Total */}
                <div className="text-right">
                  <p className="font-bold text-lg">
                    ${(comic.price * quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 space-y-6 sticky top-20">
              <h2 className="text-2xl font-bold">Order Summary</h2>
              
              <div className="space-y-2">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-border pt-2 mt-2">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full bg-primary hover:bg-primary/90"
                onClick={handleCheckout}
              >
                Checkout
              </Button>

              <Link to="/browse" className="block">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
