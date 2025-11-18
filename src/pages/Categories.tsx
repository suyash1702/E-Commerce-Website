import { useMemo, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { NavLink } from "@/components/NavLink";
import { ChevronRight, Sparkles } from "lucide-react";
import { CATEGORIES, Category } from "@/constants/categories";
import { GlassPage } from "@/components/GlassPage";

const TAG_FILTERS: (Category["tag"] | "All")[] = [
  "All",
  "Top Deals",
  "Trending",
  "New",
  "Essentials",
];

const Categories = () => {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<(Category["tag"] | "All")>("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredCategories = useMemo(() => {
    return CATEGORIES.filter((cat) => {
      const matchesSearch = cat.name.toLowerCase().includes(search.toLowerCase());
      const matchesTag = activeTag === "All" || cat.tag === activeTag;
      return matchesSearch && matchesTag;
    });
  }, [search, activeTag]);

  return (
    <GlassPage>
      <div className="border-b bg-background/40 backdrop-blur-xl border-white/10">
        <div className="container flex h-16 items-center justify-between">
          <NavLink to="/" className="text-2xl font-bold text-primary">
            TREND FOCUS
          </NavLink>

          <div className="flex items-center gap-4">
            <Input
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-52 md:w-72"
            />
            <NavLink
              to="/"
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              Back to Home
            </NavLink>
          </div>
        </div>
      </div>

      <main className="container py-8 space-y-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
        ) : (
          <>
            {/* Hero banner */}
            <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-background/40 backdrop-blur-2xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 shadow-[0_0_50px_rgba(59,130,246,0.35)] animate-in fade-in-50 slide-in-from-top-4 duration-700">
              <div className="space-y-3 md:space-y-4 max-w-xl">
                <p className="inline-flex items-center gap-2 rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-primary border border-primary/30 shadow-sm">
                  <Sparkles className="h-3 w-3" />
                  Curated by TREND FOCUS
                </p>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Find your next <span className="text-primary">style, setup & vibe</span>
                </h1>
                <p className="text-muted-foreground text-sm md:text-base">
                  A mood-based way to shop. Explore bold electronics, everyday essentials and statement fashionall organized into clean, modern categories.
                </p>
              </div>
              <div className="relative w-full max-w-md aspect-[4/3] rounded-xl overflow-hidden shadow-xl ring-1 ring-border/60">
                <img
                  src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=900&q=80"
                  alt="Abstract collage of lifestyle products"
                  className="h-full w-full object-cover scale-105"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/10" />
              </div>
            </section>

            {/* Mood / tag filters + layout */}
            <section className="grid gap-8 lg:grid-cols-[280px,1fr] items-start animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
          {/* Left rail: mood filters + quick stats */}
          <aside className="space-y-4">
            <Card className="border-dashed">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold tracking-tight">
                  Vibe filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-xs text-muted-foreground">
                  Switch the mood of the grid with a single tap. Filters stack with your search box above.
                </p>
                <div className="flex flex-wrap gap-2">
                  {TAG_FILTERS.map((tag) => (
                    <Button
                      key={tag}
                      size="sm"
                      variant={activeTag === tag ? "default" : "outline"}
                      className="rounded-full text-xs"
                      onClick={() => setActiveTag(tag)}
                    >
                      {tag === "All" ? "All vibes" : tag}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/40">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Snapshot
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-[11px] text-muted-foreground mb-1">Categories live</p>
                  <p className="text-lg font-semibold">{CATEGORIES.length}</p>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground mb-1">Visible now</p>
                  <p className="text-lg font-semibold">{filteredCategories.length}</p>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Right: category canvas */}
          <div className="space-y-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-lg md:text-xl font-semibold">Category canvas</h2>
                <p className="text-xs text-muted-foreground">
                  Tap into a category to jump back to Products filtered for that vibe.
                </p>
              </div>
              <div className="text-[11px] text-muted-foreground flex items-center gap-1 justify-between sm:justify-end">
                <span className="hidden sm:inline">Tip:</span>
                <span>Use the search bar + vibe filters for ultra-quick discovery.</span>
              </div>
            </div>

            {filteredCategories.length === 0 ? (
              <div className="py-16 text-center text-muted-foreground text-sm border border-dashed rounded-xl">
                No categories match this vibe yet. Try clearing search or switching filters.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {filteredCategories.map((category, index) => (
                  <NavLink
                    key={category.id}
                    to={`/?category=${category.slug}`}
                    className="group"
                  >
                    <Card
                      className={`overflow-hidden h-full border-border/70 bg-background/80 backdrop-blur-sm group-hover:border-primary/70 group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-300 ${
                        index % 7 === 0 ? "sm:col-span-2" : ""
                      }`}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        {category.tag && (
                          <span className="absolute left-2 top-2 rounded-full bg-background/85 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary border border-primary/60">
                            {category.tag}
                          </span>
                        )}
                        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-background/75 via-transparent to-transparent transition-opacity duration-500" />
                      </div>
                      <CardHeader className="p-3 pb-2">
                        <CardTitle className="text-sm md:text-base flex items-center justify-between gap-2">
                          <span className="line-clamp-1">{category.name}</span>
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-3 pt-0">
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {category.description}
                        </p>
                      </CardContent>
                    </Card>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </section>
          </>
        )}
      </main>
    </GlassPage>
  );
};

export default Categories;
