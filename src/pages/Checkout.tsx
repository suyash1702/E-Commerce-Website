import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NavLink } from "@/components/NavLink";
import { useState } from "react";
import { GlassPage } from "@/components/GlassPage";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/AuthProvider";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  quantity: number;
}

interface CheckoutLocationState {
  items?: CartItem[];
  total?: number;
}

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const state = (location.state || {}) as CheckoutLocationState;
  const items = state.items || [];
  const total = state.total ?? 0;

  const [paymentMethod, setPaymentMethod] = useState<"upi" | "cod" | "card">("upi");
  const [upiId, setUpiId] = useState("");
  const [address, setAddress] = useState("");

  const isCartEmpty = !items.length || total <= 0;

  const handlePlaceOrder = async () => {
    if (!user) {
      alert("Please sign in to place an order.");
      return;
    }

    try {
      const { data: insertedOrder, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          total,
          payment_method: paymentMethod,
          shipping_address: address || null,
        })
        .select("id")
        .single();

      if (orderError || !insertedOrder) {
        throw orderError || new Error("Failed to create order");
      }

      const orderId = insertedOrder.id as string;

      if (items.length) {
        const payload = items.map((item) => ({
          order_id: orderId,
          product_id: item.id,
          quantity: item.quantity,
          price_each: item.price,
        }));

        const { error: itemsError } = await supabase.from("order_items").insert(payload);
        if (itemsError) {
          throw itemsError;
        }
      }

      alert(
        `Order placed with ${
          paymentMethod === "upi"
            ? `UPI (${upiId || "no UPI ID"})`
            : paymentMethod === "cod"
            ? "Cash on Delivery"
            : "Card"
        } for ₹${total.toFixed(2)}. (Stored in Supabase orders table for demo)`
      );
      navigate("/orders");
    } catch (err: any) {
      console.error("Failed to place order", err);
      alert(err?.message || "Failed to place order. Please try again.");
    }
  };

  if (isCartEmpty) {
    return (
      <GlassPage>
        <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md border border-white/10 bg-background/40 backdrop-blur-2xl shadow-[0_0_45px_rgba(15,23,42,0.6)]">
          <CardHeader>
            <CardTitle>Cart is empty</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Add some products to your cart before going to checkout.
            </p>
            <NavLink to="/">
              <Button className="w-full">Back to Home</Button>
            </NavLink>
          </CardContent>
        </Card>
      </div>
    </GlassPage>
  );
  }

  return (
    <GlassPage>
      <header className="border-b bg-background/40 backdrop-blur-xl border-white/10">
        <div className="container flex h-16 items-center justify-between">
          <NavLink to="/" className="text-xl font-bold text-primary">
            TREND FOCUS
          </NavLink>
          <NavLink
            to="/"
            className="text-sm font-medium text-muted-foreground hover:text-primary"
          >
            Continue shopping
          </NavLink>
        </div>
      </header>

      <main className="container py-8 grid gap-8 lg:grid-cols-[2fr,1fr] animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
        {/* Order summary */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Order summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 border-b pb-3 last:border-b-0"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Qty: {item.quantity} × ₹{item.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="text-sm font-semibold">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="text-emerald-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-base font-semibold pt-1 border-t mt-2">
                  <span>Total payable</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Payment & address */}
        <section className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup
                value={paymentMethod}
                onValueChange={(val) => setPaymentMethod(val as any)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="upi" id="upi" />
                  <Label htmlFor="upi">UPI</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod">Cash on Delivery (COD)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card">Card (demo)</Label>
                </div>
              </RadioGroup>

              {paymentMethod === "upi" && (
                <div className="space-y-2">
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input
                    id="upiId"
                    placeholder="example@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    This is a demo checkout. No real payment will be initiated.
                  </p>
                </div>
              )}

              {paymentMethod === "cod" && (
                <p className="text-xs text-muted-foreground">
                  Pay in cash when your order arrives at your doorstep.
                </p>
              )}

              {paymentMethod === "card" && (
                <p className="text-xs text-muted-foreground">
                  Card payment flow is mocked for now. Integrate your gateway here.
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delivery address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Label htmlFor="address">Address</Label>
              <textarea
                id="address"
                className="min-h-[96px] w-full rounded-md border bg-background px-3 py-2 text-sm"
                placeholder="Flat / House no., Street, Area, City, Pincode"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                For demo purposes this is not sent anywhere, but your backend can use it to create orders.
              </p>
            </CardContent>
          </Card>

          <Button
            className="w-full"
            size="lg"
            onClick={handlePlaceOrder}
          >
            Place order securely
          </Button>
        </section>
      </main>
    </GlassPage>
  );
};

export default Checkout;
