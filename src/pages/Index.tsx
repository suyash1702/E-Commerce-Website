import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search, Menu, LogIn, LogOut, Shield, MessageCircle, Heart, ShoppingBag, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Cart } from "@/components/Cart";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { IntroAnimation } from "@/components/IntroAnimation";
import { AddProduct } from "@/components/AddProduct";
import { NavLink } from "@/components/NavLink";
import { TrendingBanners } from "@/components/TrendingBanners";
import { ProductGrid } from "@/components/ProductGrid";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/AuthProvider";
import { GlassPage } from "@/components/GlassPage";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  quantity: number;
  size?: string | null;
  variant?: string | null;
}

const GUEST_CART_KEY = "trend_focus_guest_cart";

const Index = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeCategorySlug = searchParams.get("category");
  const { user, isAdmin, loading, signInWithEmail, signUpWithEmail, signOut, role } = useAuth();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showIntro, setShowIntro] = useState(true);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [loginRole, setLoginRole] = useState<"user" | "admin">("user");
  const [isAccountDialogOpen, setIsAccountDialogOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<
    { id: number; from: "user" | "assistant"; text: string }[]
  >([
    {
      id: 1,
      from: "assistant",
      text: "Hi! I can help with product questions, orders, or your account.",
    },
  ]);

  const handleAddToCart = (
    product: any,
    options?: { size?: string; variant?: string },
  ) => {
    setCartItems((prev) => {
      const sizeKey = options?.size || "";
      const variantKey = options?.variant || "";

      const existing = prev.find(
        (item) =>
          item.id === product.id &&
          (item.size || "") === sizeKey &&
          (item.variant || "") === variantKey,
      );

      const next = existing
        ? prev.map((item) =>
            item.id === product.id &&
            (item.size || "") === sizeKey &&
            (item.variant || "") === variantKey
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [
            ...prev,
            {
              id: product.id,
              name: product.name,
              price: product.price,
              image_url: product.image_url ?? null,
              quantity: 1,
              size: options?.size ?? null,
              variant: options?.variant ?? null,
            } as CartItem,
          ];

      // Compute total quantity for this product across all size/variant combinations
      const totalQuantityForProduct = next
        .filter((item) => item.id === product.id)
        .reduce((sum, item) => sum + item.quantity, 0);

      // Persist to Supabase cart for logged-in users (one row per product)
      if (user) {
        supabase
          .from("cart_items")
          .upsert({
            user_id: user.id,
            product_id: product.id,
            quantity: totalQuantityForProduct,
          })
          .then(({ error }) => {
            if (error) {
              console.error("Failed to sync cart item", error);
            }
          });
      }

      return next;
    });
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    navigate("/checkout", {
      state: {
        items: cartItems,
        total: cartTotal,
      },
    });
    setIsCartOpen(false);
  };

  const handleLogin = async () => {
    try {
      setIsLoggingIn(true);
      await signInWithEmail(loginEmail, loginPassword);
      setLoginPassword("");
    } catch (err: any) {
      alert(err.message || "Failed to sign in");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSignup = async () => {
    try {
      setIsLoggingIn(true);
      await signUpWithEmail(loginEmail, loginPassword);
      alert("Check your email inbox to confirm your account.");
      setLoginPassword("");
    } catch (err: any) {
      alert(err.message || "Failed to sign up");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (err: any) {
      alert(err.message || "Failed to sign out");
    } finally {
      // Close the account dialog after logging out so the UI clearly reflects the change
      setIsAccountDialogOpen(false);
    }
  };

  // Load cart from Supabase when a user logs in and merge any guest cart
  useEffect(() => {
    const loadCart = async () => {
      try {
        // When not logged in, use guest cart from localStorage
        if (!user) {
          try {
            const stored = localStorage.getItem(GUEST_CART_KEY);
            if (stored) {
              const parsed: CartItem[] = JSON.parse(stored);
              setCartItems(parsed);
            } else {
              setCartItems([]);
            }
          } catch (e) {
            console.error("Failed to load guest cart from localStorage", e);
            setCartItems([]);
          }
          return;
        }

        // When user logs in, merge any guest cart items into Supabase, then load from Supabase
        const storedGuest = localStorage.getItem(GUEST_CART_KEY);
        let guestItems: CartItem[] = [];
        if (storedGuest) {
          try {
            guestItems = JSON.parse(storedGuest) as CartItem[];
          } catch (e) {
            console.error("Failed to parse guest cart", e);
          }
        }

        const { data: cartRows, error } = await supabase
          .from("cart_items")
          .select("product_id, quantity")
          .eq("user_id", user.id);

        if (error) {
          console.error("Failed to load cart from Supabase", error);
          return;
        }

        // Build a map of product -> quantity from Supabase
        const quantityByProduct = new Map<string, number>();
        (cartRows || []).forEach((row: any) => {
          quantityByProduct.set(row.product_id, row.quantity);
        });

        // Merge guest cart quantities into the map
        guestItems.forEach((item) => {
          const current = quantityByProduct.get(item.id) ?? 0;
          quantityByProduct.set(item.id, current + item.quantity);
        });

        // Persist merged quantities back to Supabase
        if (quantityByProduct.size > 0) {
          const upserts = Array.from(quantityByProduct.entries()).map(
            ([productId, quantity]) =>
              supabase.from("cart_items").upsert({
                user_id: user.id,
                product_id: productId,
                quantity,
              }),
          );

          const results = await Promise.all(upserts);
          results.forEach(({ error: upsertError }) => {
            if (upsertError) {
              console.error("Failed to persist merged cart item", upsertError);
            }
          });
        }

        // Clear guest cart after successful merge
        if (guestItems.length > 0) {
          localStorage.removeItem(GUEST_CART_KEY);
        }

        const productIds = Array.from(quantityByProduct.keys());
        if (productIds.length === 0) {
          setCartItems([]);
          return;
        }

        const { data: products, error: prodError } = await supabase
          .from("products")
          .select("id, name, price, image_url")
          .in("id", productIds);

        if (prodError) {
          console.error("Failed to load products for cart", prodError);
          return;
        }

        const items: CartItem[] = productIds.map((productId) => {
          const product = products?.find((p: any) => p.id === productId);
          return {
            id: productId,
            name: product?.name ?? "Unknown",
            price: product?.price ?? 0,
            image_url: product?.image_url ?? null,
            quantity: quantityByProduct.get(productId) ?? 0,
          };
        });

        setCartItems(items);
      } catch (err) {
        console.error("Unexpected error loading cart", err);
      }
    };

    loadCart();
  }, [user]);

  // Persist guest cart in localStorage when user is not logged in
  useEffect(() => {
    if (user) return;
    try {
      localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error("Failed to persist guest cart", e);
    }
  }, [cartItems, user]);

  // Skip intro animation if it takes too long or if there's an issue
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowIntro(false);
    }, 5000); // Max 5 seconds for intro
    return () => clearTimeout(timeout);
  }, []);

  if (showIntro) {
    return <IntroAnimation onComplete={() => setShowIntro(false)} />;
  }

  return (
    <GlassPage>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/40 backdrop-blur-xl supports-[backdrop-filter]:bg-background/30 border-white/10 shadow-[0_0_35px_rgba(15,23,42,0.4)]">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <NavLink to="/" className="text-2xl font-bold text-primary">
              TREND FOCUS
            </NavLink>
            <nav className="hidden md:flex gap-6">
              <NavLink
                to="/"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                activeClassName="text-primary"
              >
                Products
              </NavLink>
              <NavLink
                to="/categories"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                activeClassName="text-primary"
              >
                Categories
              </NavLink>
              <NavLink
                to="/deals"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                activeClassName="text-primary"
              >
                Deals
              </NavLink>
              {isAdmin && (
                <NavLink
                  to="/admin"
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  activeClassName="text-primary"
                >
                  Admin
                </NavLink>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center relative">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-9 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Chat Now (AI Assist) */}
            <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden md:inline-flex">
                  <MessageCircle className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Chat now</DialogTitle>
                  <DialogDescription>
                    Ask about products, orders, or your account. This is a demo assistant.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-3 text-sm">
                  <div className="max-h-64 overflow-y-auto rounded-md border border-white/10 bg-background/60 px-3 py-2 space-y-2 text-sm">
                    {chatMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={
                          msg.from === "user"
                            ? "flex justify-end"
                            : "flex justify-start"
                        }
                      >
                        <div
                          className={
                            msg.from === "user"
                              ? "rounded-2xl bg-primary text-primary-foreground px-3 py-1.5 text-xs max-w-[80%]"
                              : "rounded-2xl bg-muted/70 text-xs px-3 py-1.5 max-w-[80%]"
                          }
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {chatMessages.length === 0 && (
                      <p className="text-xs text-muted-foreground">
                        Ask anything about products, your orders, or account.
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && chatInput.trim()) {
                          const nextId = chatMessages.length
                            ? chatMessages[chatMessages.length - 1].id + 1
                            : 1;
                          const userMessage = {
                            id: nextId,
                            from: "user" as const,
                            text: chatInput.trim(),
                          };
                          const replyMessage = {
                            id: nextId + 1,
                            from: "assistant" as const,
                            text: "Thanks for your message! In a full version, I would look up products, orders, or account details for you.",
                          };
                          setChatMessages((prev) => [...prev, userMessage, replyMessage]);
                          setChatInput("");
                        }
                      }}
                    />
                    <Button
                      size="sm"
                      disabled={!chatInput.trim()}
                      onClick={() => {
                        if (!chatInput.trim()) return;
                        const nextId = chatMessages.length
                          ? chatMessages[chatMessages.length - 1].id + 1
                          : 1;
                        const userMessage = {
                          id: nextId,
                          from: "user" as const,
                          text: chatInput.trim(),
                        };
                        const replyMessage = {
                          id: nextId + 1,
                          from: "assistant" as const,
                          text: "Thanks for your message! In a full version, I would look up products, orders, or account details for you.",
                        };
                        setChatMessages((prev) => [...prev, userMessage, replyMessage]);
                        setChatInput("");
                      }}
                    >
                      Send
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:inline-flex"
              onClick={() => navigate("/wishlist")}
            >
              <Heart className="h-5 w-5" />
            </Button>

            {/* Orders */}
            {user && (
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:inline-flex"
                onClick={() => navigate("/orders")}
              >
                <ShoppingBag className="h-5 w-5" />
              </Button>
            )}

            {/* Cart */}
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {cartCount}
                  </span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <Cart
                  onClose={() => setIsCartOpen(false)}
                  items={cartItems}
                  total={cartTotal}
                  onCheckout={handleCheckout}
                />
              </SheetContent>
            </Sheet>

            {/* Profile / account */}
            <Dialog open={isAccountDialogOpen} onOpenChange={setIsAccountDialogOpen}>
              {user ? (
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="hidden md:inline-flex gap-2">
                    <User className="h-4 w-4" />
                    <span className="text-xs font-medium">
                      {isAdmin ? "Admin" : "Profile"}
                    </span>
                  </Button>
                </DialogTrigger>
              ) : (
                <div className="hidden md:flex gap-2">
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="inline-flex gap-2"
                      onClick={() => setAuthMode("login")}
                    >
                      <LogIn className="h-4 w-4" />
                      <span className="text-xs font-medium">Login</span>
                    </Button>
                  </DialogTrigger>
                  <DialogTrigger asChild>
                    <Button
                      variant="default"
                      size="sm"
                      className="inline-flex gap-2"
                      onClick={() => setAuthMode("signup")}
                    >
                      <Shield className="h-4 w-4" />
                      <span className="text-xs font-medium">Sign up</span>
                    </Button>
                  </DialogTrigger>
                </div>
              )}
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {user
                      ? "Profile & account"
                      : authMode === "login"
                      ? "Sign in"
                      : "Create an account"}
                  </DialogTitle>
                  <DialogDescription>
                    {user
                      ? "View your profile, account role, and sign out of TREND FOCUS."
                      : authMode === "login"
                      ? "Sign in with your email and password to continue shopping."
                      : "Create a new account using your email and password to start shopping."}
                  </DialogDescription>
                </DialogHeader>
                {user ? (
                  <div className="space-y-4 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold uppercase">
                        {user.email?.[0]?.toUpperCase() || "U"}
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium break-all">{user.email}</p>
                        <p className="text-xs text-muted-foreground">
                          Role: <span className="font-medium">{role || "user"}</span>
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-3 rounded-md border border-white/10 bg-background/40 p-3 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Reward points</span>
                        <span className="font-semibold">0 pts</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Offers</span>
                        <span className="text-[11px]">Personalized offers coming soon</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Terms</span>
                        <button className="text-[11px] underline-offset-2 hover:underline">
                          View terms
                        </button>
                      </div>
                    </div>

                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-3 text-xs">
                      <span className="font-medium text-muted-foreground">Continue as</span>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          size="sm"
                          variant={loginRole === "user" ? "default" : "outline"}
                          className="h-7 px-3 text-[11px] rounded-full"
                          onClick={() => setLoginRole("user")}
                        >
                          User
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant={loginRole === "admin" ? "default" : "outline"}
                          className="h-7 px-3 text-[11px] rounded-full"
                          onClick={() => setLoginRole("admin")}
                        >
                          Admin
                        </Button>
                      </div>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      Admin access is determined by the profile role in Supabase. New accounts are
                      regular users by default.
                    </p>
                    <div className="space-y-2">
                      <Label htmlFor="auth-email">Email</Label>
                      <Input
                        id="auth-email"
                        type="email"
                        placeholder="you@example.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="auth-password">Password</Label>
                      <Input
                        id="auth-password"
                        type="password"
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                    </div>
                    <Button
                      className="w-full"
                      disabled={isLoggingIn || !loginEmail || !loginPassword}
                      onClick={authMode === "login" ? handleLogin : handleSignup}
                    >
                      {isLoggingIn
                        ? authMode === "login"
                          ? "Signing in..."
                          : "Creating account..."
                        : authMode === "login"
                        ? "Sign in"
                        : "Sign up"}
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      {authMode === "login"
                        ? "Use an existing account. Admins will automatically see admin tools once signed in."
                        : "After signing up, confirm your email inbox. Admin role can be granted later from the dashboard."}
                    </p>
                  </div>
                )}
              </DialogContent>
            </Dialog>

            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Trending banners instead of full product grid */}
      <TrendingBanners />

      {/* Products section - visible to everyone, with extra controls for admins */}
      <section id="products" className="container pb-12">
        <div className="mb-6 flex justify-between items-end gap-2 animate-in fade-in-50 slide-in-from-bottom-2 duration-500">
          <div>
            <h3 className="text-lg font-semibold">Explore products</h3>
            <p className="text-xs text-muted-foreground">
              Browse all products across every category.
            </p>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-background/40 backdrop-blur-2xl px-4 py-6 shadow-[0_0_45px_rgba(15,23,42,0.6)] animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
          <ProductGrid
            searchQuery={searchQuery}
            categorySlug={activeCategorySlug}
            onAddToCart={handleAddToCart}
            isAdmin={isAdmin}
            mode="storefront"
          />
        </div>
      </section>

      {/* Admin tools (hidden for normal users) */}
      {isAdmin && (
        <section className="container pb-12 animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
          <div className="mb-6 flex justify-between gap-2 items-center">
            <h3 className="text-sm font-semibold text-muted-foreground">Admin Tools</h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowAddProduct(!showAddProduct)}
              >
                {showAddProduct ? "Hide" : "Add"} Product
              </Button>
            </div>
          </div>

          {showAddProduct && (
            <div className="mb-8">
              <AddProduct />
            </div>
          )}
        </section>
      )}
    </GlassPage>
  );
};

export default Index;
