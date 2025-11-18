import { NavLink } from "@/components/NavLink";
import { GlassPage } from "@/components/GlassPage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { useAuth } from "@/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface WishlistRow {
  id: string;
  product: {
    id: string;
    name: string;
    price: number;
    image_url: string | null;
  } | null;
}

const Wishlist = () => {
  const { user } = useAuth();

  const { data: items, isLoading, error, refetch } = useQuery<WishlistRow[]>({
    queryKey: ["wishlist", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("wishlist_items")
        .select("id, product:products(id, name, price, image_url)")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      return (data || []) as WishlistRow[];
    },
  });

  const isEmpty = !user || !items || items.length === 0;

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
            Back to Home
          </NavLink>
        </div>
      </header>

      <main className="container py-8 space-y-6">
        <section className="space-y-2 animate-in fade-in-50 slide-in-from-top-4 duration-700">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            Wishlist
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Save your favourite products here and move them to your cart when you are ready to buy.
          </p>
        </section>

        <section className="animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
          {!user && (
            <Card className="border-dashed border-white/20 bg-background/40 backdrop-blur-xl shadow-[0_0_45px_rgba(15,23,42,0.6)] mb-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Heart className="h-5 w-5 text-primary" />
                  Sign in to save your wishlist
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>
                  Your wishlist is linked to your TREND FOCUS account. Go back to the home page and
                  use the Login button to sign in.
                </p>
                <NavLink to="/">
                  <Button size="sm">Go to home</Button>
                </NavLink>
              </CardContent>
            </Card>
          )}

          {user && isLoading && (
            <div className="py-16 text-center text-sm text-muted-foreground">
              Loading your wishlist...
            </div>
          )}

          {user && error && (
            <div className="py-16 text-center text-sm text-red-500">
              Failed to load wishlist. Please try again.
            </div>
          )}

          {user && isEmpty && !isLoading && !error && (
            <Card className="border-dashed border-white/20 bg-background/40 backdrop-blur-xl shadow-[0_0_45px_rgba(15,23,42,0.6)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Heart className="h-5 w-5 text-primary" />
                  Your wishlist is empty
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>
                  Start by exploring products you love. In a later iteration you can tap a heart
                  icon on any product to save it here.
                </p>
                <NavLink to="/">
                  <Button size="sm">Browse products</Button>
                </NavLink>
              </CardContent>
            </Card>
          )}

          {user && !isEmpty && !isLoading && !error && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items!.map((item) => (
                <Card
                  key={item.id}
                  className="border border-white/10 bg-background/40 backdrop-blur-xl shadow-[0_0_45px_rgba(15,23,42,0.5)]"
                >
                  <CardHeader>
                    <CardTitle className="text-sm">
                      {item.product?.name || "Unknown product"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-2 text-sm text-muted-foreground">
                    {item.product?.price != null && (
                      <p className="font-medium">
                        ₹{item.product.price.toLocaleString("en-IN")}
                      </p>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={async () => {
                        await supabase.from("wishlist_items").delete().eq("id", item.id);
                        refetch();
                      }}
                    >
                      Remove
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
    </GlassPage>
  );
};

export default Wishlist;
