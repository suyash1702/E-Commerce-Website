export interface SampleProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock: number;
  category_slug: string;
  // Optional brand and MRP for richer storefront display
  brand?: string;
  mrp?: number;
}

// Fallback demo products used when the database has no products or cannot be reached.
// Each product is mapped to one of the defined storefront categories.
export const SAMPLE_PRODUCTS: SampleProduct[] = [
  // Mobiles & Tablets (10)
  {
    id: "sample-mob-iphone-15-pro",
    name: "Apple iPhone 15 Pro",
    description: "Flagship smartphone with A17 Pro chip and advanced camera system.",
    price: 129999,
    image_url:
      "https://images.unsplash.com/photo-1695048133142-8b44c3abaddc?auto=format&fit=crop&w=800&q=80",
    stock: 12,
    category_slug: "mobiles-tablets",
  },
  {
    id: "sample-mob-galaxy-s24",
    name: "Samsung Galaxy S24",
    description: "Premium Android phone with bright AMOLED display and fast performance.",
    price: 89999,
    image_url:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    stock: 18,
    category_slug: "mobiles-tablets",
  },
  {
    id: "sample-mob-pixel-9",
    name: "Google Pixel 9",
    description: "Clean Android with powerful AI camera and all-day battery life.",
    price: 79999,
    image_url:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
    stock: 15,
    category_slug: "mobiles-tablets",
  },
  {
    id: "sample-mob-redmi-note",
    name: "Redmi Note Pro Max",
    description: "Budget-friendly powerhouse with 120 Hz display and large battery.",
    price: 22999,
    image_url:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80",
    stock: 42,
    category_slug: "mobiles-tablets",
  },
  {
    id: "sample-mob-oneplus-nord",
    name: "OnePlus Nord Neo",
    description: "Smooth OxygenOS experience with fast charging and slim design.",
    price: 27999,
    image_url:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80",
    stock: 30,
    category_slug: "mobiles-tablets",
  },
  {
    id: "sample-mob-ipad-air",
    name: "Apple iPad Air",
    description: "Lightweight tablet for work, drawing and entertainment.",
    price: 65999,
    image_url:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=800&q=80",
    stock: 10,
    category_slug: "mobiles-tablets",
  },
  {
    id: "sample-mob-galaxy-tab",
    name: "Samsung Galaxy Tab S9",
    description: "Premium Android tablet for movies, notes and sketching with S Pen.",
    price: 84999,
    image_url:
      "https://images.unsplash.com/photo-1557825835-70d97c4aa06a?auto=format&fit=crop&w=800&q=80",
    stock: 18,
    category_slug: "mobiles-tablets",
  },
  {
    id: "sample-mob-compact-5g",
    name: "Compact 5G Smartphone",
    description: "Pocket-sized phone with 5G and clean Android interface.",
    price: 18999,
    image_url:
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80",
    stock: 55,
    category_slug: "mobiles-tablets",
  },
  {
    id: "sample-mob-powerbank",
    name: "20000 mAh Fast Power Bank",
    description: "High-capacity portable charger with dual USB output.",
    price: 2499,
    image_url:
      "https://images.unsplash.com/photo-1585157605980-df0f4c2b6a1b?auto=format&fit=crop&w=800&q=80",
    stock: 80,
    category_slug: "mobiles-tablets",
  },
  {
    id: "sample-mob-bt-earbuds",
    name: "True Wireless Earbuds",
    description: "Compact earbuds with deep bass and charging case.",
    price: 3499,
    image_url:
      "https://images.unsplash.com/photo-1518449024471-68d48f1f3bf6?auto=format&fit=crop&w=800&q=80",
    stock: 60,
    category_slug: "mobiles-tablets",
  },

  // Electronics (10)
  {
    id: "sample-elec-ultrabook",
    name: "UltraSlim 14-inch Creator Laptop",
    description: "Lightweight laptop with QHD display, 16 GB RAM and fast SSD.",
    price: 99999,
    image_url:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    stock: 9,
    category_slug: "electronics",
  },
  {
    id: "sample-elec-gaming-laptop",
    name: "15-inch Gaming Laptop",
    description: "High-refresh display with dedicated graphics for smooth gaming.",
    price: 119999,
    image_url:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    stock: 6,
    category_slug: "electronics",
  },
  {
    id: "sample-elec-monitor",
    name: "27-inch QHD Monitor",
    description: "Bezel-less IPS display ideal for work and entertainment.",
    price: 24999,
    image_url:
      "https://images.unsplash.com/photo-1587613864521-9ef8f3a8f060?auto=format&fit=crop&w=800&q=80",
    stock: 20,
    category_slug: "electronics",
  },
  {
    id: "sample-elec-mechanical-kb",
    name: "Mechanical RGB Keyboard",
    description: "Tactile switches, per-key RGB and metal top plate.",
    price: 5999,
    image_url:
      "https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?auto=format&fit=crop&w=800&q=80",
    stock: 35,
    category_slug: "electronics",
  },
  {
    id: "sample-elec-mouse",
    name: "Wireless Productivity Mouse",
    description: "Ergonomic wireless mouse with silent clicks.",
    price: 2499,
    image_url:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80",
    stock: 50,
    category_slug: "electronics",
  },
  {
    id: "sample-elec-headphones",
    name: "Noise-Cancelling Wireless Headphones",
    description: "Over-ear Bluetooth headphones with active noise cancellation.",
    price: 6999,
    image_url:
      "https://images.unsplash.com/photo-1518449029471-8150c5219d9a?auto=format&fit=crop&w=800&q=80",
    stock: 35,
    category_slug: "electronics",
  },
  {
    id: "sample-elec-bluetooth-speaker",
    name: "Portable Bluetooth Speaker",
    description: "Water-resistant speaker with rich bass and LED lighting.",
    price: 3299,
    image_url:
      "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=800&q=80",
    stock: 45,
    category_slug: "electronics",
  },
  {
    id: "sample-elec-smartwatch",
    name: "Smartwatch with AMOLED Display",
    description: "Track workouts, sleep and notifications on your wrist.",
    price: 10999,
    image_url:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
    stock: 28,
    category_slug: "electronics",
  },
  {
    id: "sample-elec-router",
    name: "Wi-Fi 6 Dual-Band Router",
    description: "Stable high-speed internet for streaming and gaming.",
    price: 5499,
    image_url:
      "https://images.unsplash.com/photo-1587202372607-14848b37cff1?auto=format&fit=crop&w=800&q=80",
    stock: 24,
    category_slug: "electronics",
  },
  {
    id: "sample-elec-external-ssd",
    name: "1 TB External SSD",
    description: "Pocket-sized SSD for fast backups and file transfers.",
    price: 11999,
    image_url:
      "https://images.unsplash.com/photo-1527430253228-e93688616381?auto=format&fit=crop&w=800&q=80",
    stock: 32,
    category_slug: "electronics",
  },

  // Men's Fashion (10)
  {
    id: "sample-men-oxford-shirt",
    name: "Urban Edge Men Slim Fit Oxford Shirt",
    description: "Smart casual cotton shirt with a sharp collar – perfect for office days and Friday dinners.",
    price: 1899,
    image_url:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    stock: 40,
    category_slug: "mens-fashion",
  },
  {
    id: "sample-men-casual-tee",
    name: "StreetMode Oversized Cotton T-shirt",
    description: "Soft, breathable graphic tee with relaxed drop-shoulder fit for all-day comfort.",
    price: 799,
    image_url:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80",
    stock: 60,
    category_slug: "mens-fashion",
  },
  {
    id: "sample-men-denim",
    name: "Denim District Tapered Fit Jeans",
    description: "Mid-wash stretch denim with tapered legs – pairs well with shirts and tees alike.",
    price: 2199,
    image_url:
      "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=800&q=80",
    stock: 50,
    category_slug: "mens-fashion",
  },
  {
    id: "sample-men-formal-trousers",
    name: "Boardroom Slim Fit Trousers",
    description: "Wrinkle-resistant formal trousers with clean tailoring for 9-to-9 dressing.",
    price: 1999,
    image_url:
      "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=800&q=80",
    stock: 35,
    category_slug: "mens-fashion",
  },
  {
    id: "sample-men-sneakers",
    name: "Clean Kick Minimal White Sneakers",
    description: "All-white low-top sneakers that elevate every casual look – jeans or joggers.",
    price: 2499,
    image_url:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
    stock: 38,
    category_slug: "mens-fashion",
  },
  {
    id: "sample-men-running-shoes",
    name: "RunPro Lightweight Running Shoes",
    description: "Cushioned midsole with breathable upper – built for everyday runs and walks.",
    price: 2999,
    image_url:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    stock: 32,
    category_slug: "mens-fashion",
  },
  {
    id: "sample-men-hoodie",
    name: "CozyCore Fleece Zip Hoodie",
    description: "Brushed fleece hoodie with front zip and kangaroo pockets for chilly evenings.",
    price: 1699,
    image_url:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    stock: 27,
    category_slug: "mens-fashion",
  },
  {
    id: "sample-men-jacket",
    name: "Weekend Rider Bomber Jacket",
    description: "Lightweight bomber with ribbed cuffs and zip closure – ideal for layering over tees.",
    price: 3499,
    image_url:
      "https://images.unsplash.com/photo-1495121553079-4c61bcce189c?auto=format&fit=crop&w=800&q=80",
    stock: 20,
    category_slug: "mens-fashion",
  },
  {
    id: "sample-men-belt",
    name: "ClassicCraft Genuine Leather Belt",
    description: "Reversible formal belt with polished metal buckle – made for tailored trousers.",
    price: 1299,
    image_url:
      "https://images.unsplash.com/photo-1523374228107-6e44bd2b524e?auto=format&fit=crop&w=800&q=80",
    stock: 65,
    category_slug: "mens-fashion",
  },
  {
    id: "sample-men-watch",
    name: "Timeless Dial Analog Watch",
    description: "Minimal round dial watch with leather strap that works for both office and outings.",
    price: 3999,
    image_url:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    stock: 29,
    category_slug: "mens-fashion",
  },

  // Women's Fashion (10)
  {
    id: "sample-women-midi-dress",
    name: "BlushLane Floral Midi Wrap Dress",
    description: "Flowy wrap dress with soft floral print and waist tie – perfect for brunch dates.",
    price: 2499,
    image_url:
      "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=800&q=80",
    stock: 26,
    category_slug: "womens-fashion",
  },
  {
    id: "sample-women-kurta-set",
    name: "IndieThread Printed Cotton Kurta Set",
    description: "Three-piece kurta set with straight pants and dupatta – easy festive dressing.",
    price: 2299,
    image_url:
      "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=800&q=80",
    stock: 34,
    category_slug: "womens-fashion",
  },
  {
    id: "sample-women-top",
    name: "Everyday Ease Ruffled Sleeve Top",
    description: "Lightweight blouse with soft ruffles on sleeves – pairs well with denim and skirts.",
    price: 1399,
    image_url:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
    stock: 48,
    category_slug: "womens-fashion",
  },
  {
    id: "sample-women-jeans",
    name: "High-Rise Mom Fit Jeans",
    description: "Vintage wash mom jeans with a relaxed leg and snug waist – weekend staple.",
    price: 2399,
    image_url:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
    stock: 39,
    category_slug: "womens-fashion",
  },
  {
    id: "sample-women-saree",
    name: "FestiveGlow Silk Blend Saree",
    description: "Silk blend saree with woven border and blouse piece – suited for weddings & pujas.",
    price: 3299,
    image_url:
      "https://images.unsplash.com/photo-1600093463592-9f61807aef11?auto=format&fit=crop&w=800&q=80",
    stock: 22,
    category_slug: "womens-fashion",
  },
  {
    id: "sample-women-sneakers",
    name: "CityWalk Chunky Sole Sneakers",
    description: "Chunky sole sneakers with cushioned insole – adds instant street-style vibes.",
    price: 2599,
    image_url:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
    stock: 31,
    category_slug: "womens-fashion",
  },
  {
    id: "sample-women-heels",
    name: "PartyReady Strappy Block Heels",
    description: "Strappy block heels with secure ankle strap – dance-friendly party pick.",
    price: 2199,
    image_url:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80",
    stock: 25,
    category_slug: "womens-fashion",
  },
  {
    id: "sample-women-handbag",
    name: "Aura Studio Structured Handbag",
    description: "Medium-size top-handle handbag with detachable sling strap for day-to-night looks.",
    price: 2799,
    image_url:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    stock: 30,
    category_slug: "womens-fashion",
  },
  {
    id: "sample-women-jewellery-set",
    name: "Minimal Glow Necklace & Earrings Set",
    description: "Delicate gold-tone necklace with matching studs – everyday office-friendly jewellery.",
    price: 1499,
    image_url:
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=800&q=80",
    stock: 52,
    category_slug: "womens-fashion",
  },
  {
    id: "sample-women-watch",
    name: "RoseGold Muse Analog Watch",
    description: "Slim rose gold dial watch with metal bracelet strap – a subtle festive accessory.",
    price: 3599,
    image_url:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    stock: 19,
    category_slug: "womens-fashion",
  },

  // Home & Kitchen (10)
  {
    id: "sample-home-coffee-maker",
    name: "Programmable Drip Coffee Maker",
    description: "Wake up to fresh coffee with auto-brew timer.",
    price: 4299,
    image_url:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    stock: 14,
    category_slug: "home-kitchen",
  },
  {
    id: "sample-home-air-fryer",
    name: "Compact Air Fryer",
    description: "Crispy snacks with little to no added oil.",
    price: 5999,
    image_url:
      "https://images.unsplash.com/photo-1615937691194-96f162713a1c?auto=format&fit=crop&w=800&q=80",
    stock: 20,
    category_slug: "home-kitchen",
  },
  {
    id: "sample-home-dinner-set",
    name: "16-Piece Dinner Set",
    description: "Microwave-safe plates and bowls for everyday use.",
    price: 2499,
    image_url:
      "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?auto=format&fit=crop&w=800&q=80",
    stock: 45,
    category_slug: "home-kitchen",
  },
  {
    id: "sample-home-cookware",
    name: "Non-stick Cookware Combo",
    description: "Set of pans with glass lids and wooden spoons.",
    price: 3299,
    image_url:
      "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=800&q=80",
    stock: 33,
    category_slug: "home-kitchen",
  },
  {
    id: "sample-home-knife-set",
    name: "Stainless Steel Knife Set",
    description: "Chef's knife, utility knife and chopping board.",
    price: 1899,
    image_url:
      "https://images.unsplash.com/photo-1604908176997-1251884b08a3?auto=format&fit=crop&w=800&q=80",
    stock: 40,
    category_slug: "home-kitchen",
  },
  {
    id: "sample-home-storage",
    name: "Airtight Storage Containers",
    description: "Set of stackable containers for pantry organization.",
    price: 2199,
    image_url:
      "https://images.unsplash.com/photo-1591109868545-5d15b0a30f1c?auto=format&fit=crop&w=800&q=80",
    stock: 55,
    category_slug: "home-kitchen",
  },
  {
    id: "sample-home-bedsheet",
    name: "Cotton Double Bedsheet",
    description: "Soft 300-thread-count bedsheet with pillow covers.",
    price: 1799,
    image_url:
      "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=800&q=80",
    stock: 37,
    category_slug: "home-kitchen",
  },
  {
    id: "sample-home-cushion-covers",
    name: "Printed Cushion Cover Set",
    description: "Set of 5 cushion covers to refresh your sofa.",
    price: 1299,
    image_url:
      "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=800&q=80",
    stock: 48,
    category_slug: "home-kitchen",
  },
  {
    id: "sample-home-lamp",
    name: "Metal Table Lamp",
    description: "Warm ambient light with fabric shade.",
    price: 1999,
    image_url:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80",
    stock: 22,
    category_slug: "home-kitchen",
  },
  {
    id: "sample-home-wall-art",
    name: "Framed Wall Art Set",
    description: "Trio of minimalist prints for living room decor.",
    price: 2499,
    image_url:
      "https://images.unsplash.com/photo-1521783593447-5702f2a783ec?auto=format&fit=crop&w=800&q=80",
    stock: 29,
    category_slug: "home-kitchen",
  },

  // Appliances (10)
  {
    id: "sample-app-fridge",
    name: "Double Door Refrigerator",
    description: "Frost-free fridge with inverter compressor.",
    price: 32999,
    image_url:
      "https://images.unsplash.com/photo-1580915411954-282cb1c9c450?auto=format&fit=crop&w=800&q=80",
    stock: 11,
    category_slug: "appliances",
  },
  {
    id: "sample-app-washing-machine",
    name: "Front Load Washing Machine",
    description: "Fully automatic washer with multiple wash programs.",
    price: 37999,
    image_url:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
    stock: 9,
    category_slug: "appliances",
  },
  {
    id: "sample-app-microwave",
    name: "Convection Microwave Oven",
    description: "Bake, grill and reheat with easy presets.",
    price: 17999,
    image_url:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    stock: 17,
    category_slug: "appliances",
  },
  {
    id: "sample-app-air-conditioner",
    name: "1.5 Ton Split AC",
    description: "Energy-efficient AC with fast cooling.",
    price: 42999,
    image_url:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    stock: 8,
    category_slug: "appliances",
  },
  {
    id: "sample-app-chimney",
    name: "Kitchen Chimney",
    description: "Filterless chimney with powerful suction.",
    price: 15999,
    image_url:
      "https://images.unsplash.com/photo-1581578017424-a5c52a190cf4?auto=format&fit=crop&w=800&q=80",
    stock: 14,
    category_slug: "appliances",
  },
  {
    id: "sample-app-induction",
    name: "Induction Cooktop",
    description: "Compact cooktop with touch controls and timer.",
    price: 3299,
    image_url:
      "https://images.unsplash.com/photo-1514512834903-21686fd16f5f?auto=format&fit=crop&w=800&q=80",
    stock: 40,
    category_slug: "appliances",
  },
  {
    id: "sample-app-mixer",
    name: "Mixer Grinder Set",
    description: "3-jar mixer grinder with powerful motor.",
    price: 4499,
    image_url:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
    stock: 33,
    category_slug: "appliances",
  },
  {
    id: "sample-app-iron",
    name: "Steam Iron",
    description: "Non-stick soleplate with vertical steam function.",
    price: 1999,
    image_url:
      "https://images.unsplash.com/photo-1616628182507-7c016ab85101?auto=format&fit=crop&w=800&q=80",
    stock: 37,
    category_slug: "appliances",
  },
  {
    id: "sample-app-vacuum",
    name: "Stick Vacuum Cleaner",
    description: "Lightweight vacuum for quick home cleanups.",
    price: 8999,
    image_url:
      "https://images.unsplash.com/photo-1582719478250-cc67fd68f153?auto=format&fit=crop&w=800&q=80",
    stock: 19,
    category_slug: "appliances",
  },
  {
    id: "sample-app-water-purifier",
    name: "RO Water Purifier",
    description: "Multi-stage purification with mineralizer.",
    price: 15999,
    image_url:
      "https://images.unsplash.com/photo-1618005198919-d3d4b5a92eee?auto=format&fit=crop&w=800&q=80",
    stock: 21,
    category_slug: "appliances",
  },

  // Beauty & Personal Care (10)
  {
    id: "sample-beauty-skin-care-set",
    name: "Daily Glow 3-Step Skin Care Kit",
    description: "Cleanser, toner and gel moisturizer combo to keep skin fresh from AM to PM.",
    price: 1599,
    image_url:
      "https://images.unsplash.com/photo-1612810432633-96f64dc8ccb6?auto=format&fit=crop&w=800&q=80",
    stock: 50,
    category_slug: "beauty-personal-care",
  },
  {
    id: "sample-beauty-face-wash",
    name: "Gentle Foam Face Wash",
    description: "Soap-free foaming face wash that removes oil without stripping moisture.",
    price: 399,
    image_url:
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80",
    stock: 80,
    category_slug: "beauty-personal-care",
  },
  {
    id: "sample-beauty-serum",
    name: "BrightFix Vitamin C Serum",
    description: "Lightweight Vitamin C serum that targets dullness and uneven skin tone.",
    price: 899,
    image_url:
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa3?auto=format&fit=crop&w=800&q=80",
    stock: 60,
    category_slug: "beauty-personal-care",
  },
  {
    id: "sample-beauty-moisturizer",
    name: "HydraCloud Gel Moisturizer",
    description: "Oil-free water gel with quick absorption – ideal for humid weather.",
    price: 699,
    image_url:
      "https://images.unsplash.com/photo-1612681621979-fffd8b9c7f33?auto=format&fit=crop&w=800&q=80",
    stock: 70,
    category_slug: "beauty-personal-care",
  },
  {
    id: "sample-beauty-sunscreen",
    name: "UltraShield SPF 50 PA+++ Sunscreen",
    description: "Matte finish sunscreen that sits light under makeup and protects from UVA/UVB.",
    price: 649,
    image_url:
      "https://images.unsplash.com/photo-1620912189865-40bb5c64f2e7?auto=format&fit=crop&w=800&q=80",
    stock: 75,
    category_slug: "beauty-personal-care",
  },
  {
    id: "sample-beauty-lip-balm",
    name: "Tint & Care Lip Balm",
    description: "Hydrating tinted lip balm that adds a soft flush of color.",
    price: 299,
    image_url:
      "https://images.unsplash.com/photo-1612810432633-96f64dc8ccb6?auto=format&fit=crop&w=800&q=80",
    stock: 90,
    category_slug: "beauty-personal-care",
  },
  {
    id: "sample-beauty-shampoo",
    name: "FrizzControl Smooth Shampoo",
    description: "Sulfate-free shampoo that tames frizz and adds shine to dull hair.",
    price: 499,
    image_url:
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80",
    stock: 65,
    category_slug: "beauty-personal-care",
  },
  {
    id: "sample-beauty-conditioner",
    name: "Deep Repair Hair Conditioner",
    description: "Rich conditioner that nourishes dry ends and makes hair easier to detangle.",
    price: 549,
    image_url:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
    stock: 62,
    category_slug: "beauty-personal-care",
  },
  {
    id: "sample-beauty-perfume",
    name: "Everyday Bloom Eau de Parfum",
    description: "Fresh floral perfume with soft notes that work for office and evenings.",
    price: 1299,
    image_url:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
    stock: 44,
    category_slug: "beauty-personal-care",
  },
  {
    id: "sample-beauty-grooming-kit",
    name: "UrbanMan Complete Grooming Kit",
    description: "All-in-one kit with trimmer, combs and grooming essentials for men.",
    price: 2599,
    image_url:
      "https://images.unsplash.com/photo-1619451427882-6aaaded0cc99?auto=format&fit=crop&w=800&q=80",
    stock: 28,
    category_slug: "beauty-personal-care",
  },

  // Sports & Fitness (10)
  {
    id: "sample-sport-dumbbells",
    name: "FlexPro Adjustable Dumbbell Set (20 kg)",
    description: "Space-saving adjustable dumbbell kit for full-body strength workouts at home.",
    price: 3499,
    image_url:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
    stock: 22,
    category_slug: "sports-fitness",
  },
  {
    id: "sample-sport-yoga-mat",
    name: "ZenGrip Non-slip Yoga Mat",
    description: "Cushioned yoga mat with textured surface and great grip for asanas.",
    price: 1299,
    image_url:
      "https://images.unsplash.com/photo-1603988363607-41a96cdcd875?auto=format&fit=crop&w=800&q=80",
    stock: 55,
    category_slug: "sports-fitness",
  },
  {
    id: "sample-sport-resistance-bands",
    name: "PowerBand Resistance Set (Pack of 5)",
    description: "Set of 5 resistance bands with varying intensity for mobility and strength.",
    price: 899,
    image_url:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80",
    stock: 70,
    category_slug: "sports-fitness",
  },
  {
    id: "sample-sport-kettlebell",
    name: "Cast Iron Kettlebell 8 kg",
    description: "Durable powder-coated kettlebell for swings, squats and functional moves.",
    price: 1999,
    image_url:
      "https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?auto=format&fit=crop&w=800&q=80",
    stock: 30,
    category_slug: "sports-fitness",
  },
  {
    id: "sample-sport-treadmill",
    name: "FoldFit Motorized Treadmill",
    description: "Foldable motorized treadmill with speed presets for walkers and runners.",
    price: 49999,
    image_url:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    stock: 7,
    category_slug: "sports-fitness",
  },
  {
    id: "sample-sport-cycle",
    name: "UrbanCommute Hybrid Bicycle",
    description: "Comfortable hybrid cycle with upright posture for city rides and weekend trails.",
    price: 18999,
    image_url:
      "https://images.unsplash.com/photo-1525104885119-8806dd94ad58?auto=format&fit=crop&w=800&q=80",
    stock: 12,
    category_slug: "sports-fitness",
  },
  {
    id: "sample-sport-football",
    name: "StreetPlay Machine Stitched Football",
    description: "Durable machine-stitched football ideal for both turf and ground play.",
    price: 999,
    image_url:
      "https://images.unsplash.com/photo-1549921296-3c7686e78002?auto=format&fit=crop&w=800&q=80",
    stock: 40,
    category_slug: "sports-fitness",
  },
  {
    id: "sample-sport-cricket-bat",
    name: "ProDrive English Willow Cricket Bat",
    description: "Lightweight English willow bat with thick edges for powerful shots.",
    price: 6499,
    image_url:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80",
    stock: 18,
    category_slug: "sports-fitness",
  },
  {
    id: "sample-sport-gym-bag",
    name: "MultiPocket Gym Duffel Bag",
    description: "Spacious gym duffel with dedicated shoe compartment and side pockets.",
    price: 1799,
    image_url:
      "https://images.unsplash.com/photo-1526401485004-2fa806b5e4de?auto=format&fit=crop&w=800&q=80",
    stock: 36,
    category_slug: "sports-fitness",
  },
  {
    id: "sample-sport-fitness-tracker",
    name: "TrackPro Fitness Band",
    description: "Slim fitness tracker band that monitors steps, heart rate and sleep.",
    price: 2499,
    image_url:
      "https://images.unsplash.com/photo-1557825835-70d97c4aa06a?auto=format&fit=crop&w=800&q=80",
    stock: 41,
    category_slug: "sports-fitness",
  },
];
