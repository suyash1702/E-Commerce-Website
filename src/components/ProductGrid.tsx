import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProductCard } from "./ProductCard";
import { Skeleton } from "./ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { SAMPLE_PRODUCTS } from "@/constants/sampleProducts";

interface ProductGridProps {
  searchQuery: string;
  categorySlug?: string | null;
  onAddToCart: (product: any, options?: { size?: string; variant?: string }) => void;
  isAdmin?: boolean;
  /**
   * storefront: show fallback sample products when DB is empty or errors
   * admin: show only real DB products (no fallback samples)
   */
  mode?: "storefront" | "admin";
}

export const ProductGrid = ({
  searchQuery,
  categorySlug,
  onAddToCart,
  isAdmin,
  mode = "storefront",
}: ProductGridProps) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  // Use fallback sample products both on the storefront and in the admin grid
  // so admins can still see a full catalog even before the database is populated.
  const useFallbackSamples = mode === "storefront" || mode === "admin";

  const buildSampleProducts = () => {
    let samples = SAMPLE_PRODUCTS;

    if (categorySlug) {
      samples = samples.filter((p) => p.category_slug === categorySlug);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      samples = samples.filter((p) => p.name.toLowerCase().includes(q));
    }

    return samples;
  };

  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products", { searchQuery, categorySlug, mode }],
    queryFn: async () => {
      try {
        let query = supabase.from("products").select("*");

        if (categorySlug) {
          // Expect a `category_slug` column in the `products` table for category filtering
          query = query.eq("category_slug", categorySlug);
        }

        if (searchQuery) {
          query = query.ilike("name", `%${searchQuery}%`);
        }

        const { data, error } = await query.order("created_at", { ascending: false });

        if (error) {
          console.error("Supabase error:", error);
          return useFallbackSamples ? buildSampleProducts() : [];
        }

        const rows = data || [];
        if (!rows.length) {
          return useFallbackSamples ? buildSampleProducts() : [];
        }

        return rows;
      } catch (err) {
        console.error("Error fetching products:", err);
        return useFallbackSamples ? buildSampleProducts() : [];
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Product deleted" });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err: any) => {
      toast({
        title: "Failed to delete product",
        description: err.message || "An error occurred",
        variant: "destructive",
      });
    },
  });

  const updateStockMutation = useMutation({
    mutationFn: async ({ id, stock }: { id: string; stock: number }) => {
      const { error } = await supabase.from("products").update({ stock }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Stock updated" });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err: any) => {
      toast({
        title: "Failed to update stock",
        description: err.message || "An error occurred",
        variant: "destructive",
      });
    },
  });

  const handleDelete = (id: string) => {
    if (!isAdmin) return;
    if (!window.confirm("Delete this product permanently?")) return;
    deleteMutation.mutate(id);
  };

  const handleUpdateStock = (id: string, stock: number) => {
    if (!isAdmin) return;
    updateStockMutation.mutate({ id, stock });
  };

  if (error && !useFallbackSamples) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          Failed to load products from the store. Check your database connection.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          {useFallbackSamples
            ? "No products match this search yet. Try clearing filters or exploring another category."
            : "No products found in the database yet. Add a product to get started."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          isAdmin={!!isAdmin}
          onDelete={handleDelete}
          onUpdateStock={handleUpdateStock}
        />
      ))}
    </div>
  );
};
