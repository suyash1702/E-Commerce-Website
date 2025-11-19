import { Button } from "./ui/button";
import { SheetHeader, SheetTitle } from "./ui/sheet";
import { ShoppingBag } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  quantity: number;
  size?: string | null;
  variant?: string | null;
}

interface CartProps {
  items: CartItem[];
  total: number;
  onClose?: () => void;
  onCheckout?: () => void;
}

export const Cart = ({ items, total, onCheckout }: CartProps) => {
  const hasItems = items.length > 0;

  return (
    <div className="flex flex-col h-full">
      <SheetHeader>
        <SheetTitle>Shopping Cart</SheetTitle>
      </SheetHeader>
      
      <div className="flex-1 py-6 space-y-4 overflow-y-auto">
        {hasItems ? (
          items.map((item) => (
            <div
              key={`${item.id}-${item.size ?? ""}-${item.variant ?? ""}`}
              className="flex items-center justify-between gap-4 border-b pb-4 last:border-b-0"
            >
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                {(item.size || item.variant) && (
                  <p className="text-xs text-muted-foreground">
                    {item.size && <span>Size: {item.size}</span>}
                    {item.size && item.variant && <span> · </span>}
                    {item.variant && <span>Variant: {item.variant}</span>}
                  </p>
                )}
                <p className="text-sm text-muted-foreground">
                  {item.quantity} × ₹{item.price.toFixed(2)}
                </p>
              </div>
              <div className="text-right font-semibold">
                ₹{(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Your cart is empty</p>
          </div>
        )}
      </div>
      
      <div className="border-t pt-4 space-y-4">
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
        <Button
          className="w-full"
          size="lg"
          disabled={!hasItems}
          onClick={onCheckout}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};
