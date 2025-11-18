import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { NavLink } from "@/components/NavLink";

const BANNERS = [
  {
    id: "festive-offer",
    title: "Festive Sale is Live",
    subtitle: "Up to 60% off on top electronics & fashion drops",
    tag: "Limited time",
    cta: "Shop Festive Picks",
    href: "/categories",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "trending-gadgets",
    title: "Trending Tech for 2025",
    subtitle: "Curated phones, laptops and audio gear everyone is talking about",
    tag: "Trending",
    cta: "View Tech Vibes",
    href: "/?category=electronics",
    image:
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "daily-essentials",
    title: "Everyday Essentials, Better Prices",
    subtitle: "Home, kitchen and personal care picks that just work",
    tag: "Essentials",
    cta: "Browse Essentials",
    href: "/categories",
    image:
      "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1200&q=80",
  },
];

export const TrendingBanners = () => {
  return (
    <section className="container py-12 space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Today on TREND FOCUS
          </p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-1">
            Banners for trending products & smart offers
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-2xl">
            Swipe through live vibesfrom hot drops to everyday steals. Tap a banner to jump straight into the right products.
          </p>
        </div>
      </div>

      <Carousel className="mt-4">
        <CarouselContent>
          {BANNERS.map((banner) => (
            <CarouselItem key={banner.id} className="md:basis-2/3 lg:basis-1/2">
              <Card className="overflow-hidden border-border/70 bg-background/80 backdrop-blur">
                <div className="relative aspect-[16/7] overflow-hidden">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-background/10" />
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                    <div className="space-y-2 max-w-md">
                      <Badge variant="outline" className="bg-background/80 backdrop-blur text-xs font-semibold">
                        {banner.tag}
                      </Badge>
                      <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                        {banner.title}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        {banner.subtitle}
                      </p>
                    </div>
                    <NavLink to={banner.href} className="mt-4 w-max">
                      <Button size="sm" className="shadow-sm">
                        {banner.cta}
                      </Button>
                    </NavLink>
                  </div>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </section>
  );
};
