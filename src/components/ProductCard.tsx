import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { ShoppingCart, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  stock: number;
  brand?: string | null;
  mrp?: number | null;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, options?: { size?: string; variant?: string }) => void;
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
  onUpdateStock?: (id: string, stock: number) => void;
}

const DEFAULT_SIZES = ["S", "M", "L", "XL"];
const DEFAULT_VARIANTS = ["Standard", "Premium"];

export const ProductCard = ({
  product,
  onAddToCart,
  isAdmin,
  onDelete,
  onUpdateStock,
}: ProductCardProps) => {
  const { toast } = useToast();
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [localStock, setLocalStock] = useState<number>(product.stock);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(DEFAULT_VARIANTS[0]);

  const brandLabel = (product.brand || product.name.split(" ")[0] || "TREND FOCUS").toString();

  const computedMrp = (() => {
    if (product.mrp && product.mrp > product.price) {
      return product.mrp;
    }
    // Fallback: assume ~40% higher MRP for discount display
    const raw = product.price * 1.4;
    return Math.round(raw / 10) * 10;
  })();

  const hasDiscount = computedMrp > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((computedMrp - product.price) / computedMrp) * 100)
    : 0;

  const handleAddToCart = () => {
    if (product.stock === 0) return;
    if (!selectedSize) {
      toast({
        title: "Select a size",
        description: "Please choose a size before adding this product to your cart.",
        variant: "destructive",
      });
      return;
    }

    onAddToCart(product, {
      size: selectedSize,
      variant: selectedVariant ?? undefined,
    });
    toast({
      title: "Added to cart",
      description: `${product.name} (${selectedSize}${
        selectedVariant ? ` · ${selectedVariant}` : ""
      }) has been added to your cart.`,
    });
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleAdminUpdateStock = () => {
    if (!isAdmin || !onUpdateStock) return;
    const normalized = Number.isNaN(localStock) ? 0 : Math.max(0, localStock);
    onUpdateStock(product.id, normalized);
  };

  const handleAdminDelete = () => {
    if (!isAdmin || !onDelete) return;
    onDelete(product.id);
  };

  const canAddToCart = product.stock > 0 && !!selectedSize;

  return (
    <Dialog>
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.25 }}
      >
        <DialogTrigger asChild>
          <Card className="overflow-hidden border border-white/10 bg-background/40 backdrop-blur-2xl shadow-[0_0_40px_rgba(15,23,42,0.5)] cursor-pointer">
            <div className="aspect-square bg-muted relative overflow-hidden">
              {product.image_url && !imageError ? (
                <>
                  {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted">
                      <div className="animate-pulse text-muted-foreground">Loading...</div>
                    </div>
                  )}
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      imageLoading ? "opacity-0" : "opacity-100"
                    }`}
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                    loading="lazy"
                  />
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-gradient-to-br from-muted to-muted/50">
                  <ImageIcon className="h-12 w-12 mb-2 opacity-50" />
                  <span className="text-sm">No image</span>
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                {brandLabel}
              </p>
              <h3 className="font-semibold mb-1 line-clamp-2">{product.name}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                {product.description || "No description available"}
              </p>
              <div className="flex items-baseline gap-2 mb-1">
                <p className="text-2xl font-bold text-primary">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>
                {hasDiscount && (
                  <>
                    <p className="text-xs text-muted-foreground line-through">
                      ₹{computedMrp.toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs font-semibold text-green-500">
                      {discountPercent}% OFF
                    </p>
                  </>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex flex-col gap-2">
              <Button className="w-full gap-2" disabled={product.stock === 0}>
                <ShoppingCart className="h-4 w-4" />
                View details & add
              </Button>

              {isAdmin && (
                <div className="w-full border-t pt-2 mt-1 space-y-2">
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground font-medium">
                    Admin controls
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="whitespace-nowrap">Stock:</span>
                    <input
                      type="number"
                      min={0}
                      className="h-8 w-20 rounded border bg-background px-2 text-xs"
                      value={localStock}
                      onChange={(e) =>
                        setLocalStock(parseInt(e.target.value || "0", 10))
                      }
                    />
                    <Button
                      size="xs"
                      variant="outline"
                      className="ml-auto"
                      onClick={handleAdminUpdateStock}
                    >
                      Update
                    </Button>
                  </div>
                  <Button
                    size="xs"
                    variant="destructive"
                    className="w-full"
                    onClick={handleAdminDelete}
                  >
                    Delete product
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        </DialogTrigger>

        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{product.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="aspect-video w-full overflow-hidden rounded-md bg-muted">
              {product.image_url && !imageError ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-gradient-to-br from-muted to-muted/50">
                  <ImageIcon className="h-10 w-10 mb-2 opacity-50" />
                  <span className="text-xs">No image</span>
                </div>
              )}
            </div>
            <p className="text-sm font-semibold text-muted-foreground">
              {brandLabel}
            </p>
            <p className="text-sm text-muted-foreground">
              {product.description || "No description available for this product yet."}
            </p>
            <div className="flex items-baseline gap-2">
              <p className="text-xl font-bold text-primary">
                ₹{product.price.toLocaleString("en-IN")}
              </p>
              {hasDiscount && (
                <>
                  <p className="text-xs text-muted-foreground line-through">
                    ₹{computedMrp.toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs font-semibold text-green-500">
                    {discountPercent}% OFF
                  </p>
                </>
              )}
            </div>
            <div className="space-y-3">
              <div className="space-y-1">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                  Size
                </Label>
                <RadioGroup
                  className="grid grid-cols-4 gap-2"
                  value={selectedSize ?? undefined}
                  onValueChange={(value) => setSelectedSize(value)}
                >
                  {DEFAULT_SIZES.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`text-xs py-1.5 rounded-md border text-center transition-colors ${
                        selectedSize === size
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-background hover:bg-muted"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-1">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                  Variant (optional)
                </Label>
                <div className="flex gap-2 flex-wrap">
                  {DEFAULT_VARIANTS.map((variant) => (
                    <button
                      key={variant}
                      type="button"
                      onClick={() => setSelectedVariant(variant)}
                      className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                        selectedVariant === variant
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-background hover:bg-muted"
                      }`}
                    >
                      {variant}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="mt-4 flex flex-col gap-2">
            <Button
              className="w-full gap-2"
              onClick={handleAddToCart}
              disabled={!canAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
              {product.stock > 0 ? "Add to cart" : "Out of stock"}
            </Button>
            <p className="text-[11px] text-muted-foreground text-center">
              Click a size to select it, then add the product to your cart.
            </p>
          </DialogFooter>
        </DialogContent>
      </motion.div>
    </Dialog>
  );
};
