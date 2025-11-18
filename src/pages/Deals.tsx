import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import { ProductGrid } from "@/components/ProductGrid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/constants/categories";
import { GlassPage } from "@/components/GlassPage";

const Deals = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const dealCategories = CATEGORIES.filter((category) => category.tag === "Top Deals");
  const [activeCategorySlug, setActiveCategorySlug] = useState<string | null>(
    dealCategories[0]?.slug ?? null,
  );

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

      <main className="container py-8 space-y-8">
        <section className="space-y-3 animate-in fade-in-50 slide-in-from-top-4 duration-700">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Today&apos;s Deals</h1>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Handpicked offers across top categories. Filter by category or search for a product name.
          </p>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {dealCategories.map((category) => (
                <Button
                  key={category.id}
                  size="sm"
                  variant={activeCategorySlug === category.slug ? "default" : "outline"}
                  onClick={() => setActiveCategorySlug(category.slug)}
                  className="rounded-full text-xs"
                >
                  {category.name}
                </Button>
              ))}
            </div>
            <Input
              placeholder="Search deals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-xs"
            />
          </div>
        </section>

        <section className="animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
          <div className="rounded-3xl border border-white/10 bg-background/40 backdrop-blur-2xl px-4 py-6 shadow-[0_0_45px_rgba(15,23,42,0.6)]">
            <ProductGrid
              searchQuery={searchQuery}
              categorySlug={activeCategorySlug}
              onAddToCart={() => {}}
              isAdmin={false}
            />
          </div>
        </section>
      </main>
    </GlassPage>
  );
};

export default Deals;
