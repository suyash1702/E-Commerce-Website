import { useState } from "react";
import { useAuth } from "@/AuthProvider";
import { NavLink } from "@/components/NavLink";
import { ProductGrid } from "@/components/ProductGrid";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AddProduct } from "@/components/AddProduct";
import { GlassPage } from "@/components/GlassPage";
import { LogOut } from "lucide-react";

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddProduct, setShowAddProduct] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (err: any) {
      alert(err.message || "Failed to sign out");
    }
  };

  if (loading) {
    return (
      <GlassPage>
        <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Checking admin access...</p>
      </div>
    </GlassPage>
  );
  }

  if (!user || !isAdmin) {
    return (
      <GlassPage>
        <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md border border-white/10 bg-background/40 backdrop-blur-2xl shadow-[0_0_45px_rgba(15,23,42,0.6)]">
          <CardHeader>
            <CardTitle>Not authorized</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              You must be signed in as an admin to access this page.
            </p>
            <NavLink to="/">
              <Button className="w-full">Go back home</Button>
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
            TREND FOCUS Admin
          </NavLink>
          <div className="flex items-center gap-3">
            <NavLink
              to="/"
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              Back to storefront
            </NavLink>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8 space-y-8">
        <section className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between animate-in fade-in-50 slide-in-from-top-4 duration-700">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Admin dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Manage products and review orders from a single place.
            </p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[2fr,1.1fr] items-start animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
          {/* Products management */}
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">Products</h2>
                <p className="text-xs text-muted-foreground">
                  Add new products, edit stock or delete products directly from the grid.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Search products..."
                  className="max-w-xs"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddProduct((prev) => !prev)}
                >
                  {showAddProduct ? "Hide" : "Add"} product
                </Button>
              </div>
            </div>

            {showAddProduct && (
              <AddProduct />
            )}

            <ProductGrid
              searchQuery={searchQuery}
              categorySlug={undefined}
              onAddToCart={() => {}}
              isAdmin={true}
              mode="admin"
            />
          </div>

          {/* Orders placeholder */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Orders (coming soon)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>
                  An orders table has not been wired into this project yet.
                </p>
                <p>
                  When you are ready, you can create a `orders` table in Supabase,
                  capture orders from the checkout page, and list them here for
                  admins to review.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </GlassPage>
  );
};

export default Admin;
