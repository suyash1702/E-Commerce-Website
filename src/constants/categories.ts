export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  tag: "Top Deals" | "Trending" | "New" | "Essentials" | "";
}

export const CATEGORIES: Category[] = [
  {
    id: "mobiles",
    name: "Mobiles & Tablets",
    slug: "mobiles-tablets",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    description: "Smartphones, tablets, and accessories",
    tag: "Top Deals",
  },
  {
    id: "electronics",
    name: "Electronics",
    slug: "electronics",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    description: "Laptops, monitors, and gadgets",
    tag: "Trending",
  },
  {
    id: "fashion-men",
    name: "Men's Fashion",
    slug: "mens-fashion",
    image:
      "https://images.unsplash.com/photo-1528701800489-20be3c30c1d5?auto=format&fit=crop&w=600&q=80",
    description: "Clothing, footwear & accessories",
    tag: "New",
  },
  {
    id: "fashion-women",
    name: "Women's Fashion",
    slug: "womens-fashion",
    image:
      "https://images.unsplash.com/photo-1528701800484-402f636c0f87?auto=format&fit=crop&w=600&q=80",
    description: "Latest trends in women's clothing",
    tag: "Trending",
  },
  {
    id: "home",
    name: "Home & Kitchen",
    slug: "home-kitchen",
    image:
      "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=600&q=80",
    description: "Decor, cookware & essentials",
    tag: "Essentials",
  },
  {
    id: "appliances",
    name: "Appliances",
    slug: "appliances",
    image:
      "https://images.unsplash.com/photo-1580915411954-282cb1c9c450?auto=format&fit=crop&w=600&q=80",
    description: "ACs, refrigerators & more",
    tag: "Top Deals",
  },
  {
    id: "beauty",
    name: "Beauty & Personal Care",
    slug: "beauty-personal-care",
    image:
      "https://images.unsplash.com/photo-1612810432633-96f64dc8ccb6?auto=format&fit=crop&w=600&q=80",
    description: "Makeup, grooming & wellness",
    tag: "Trending",
  },
  {
    id: "sports",
    name: "Sports & Fitness",
    slug: "sports-fitness",
    image:
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=600&q=80",
    description: "Workout gear & sports essentials",
    tag: "Essentials",
  },
];
