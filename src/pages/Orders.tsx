import { NavLink } from "@/components/NavLink";
import { GlassPage } from "@/components/GlassPage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Download, RefreshCcw, ShoppingBag } from "lucide-react";
import { useAuth } from "@/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface OrderRow {
  id: string;
  created_at: string;
  total: number;
  status: string;
  payment_method: string | null;
}

const Orders = () => {
  const { user } = useAuth();

  const { data: orders, isLoading, error } = useQuery<OrderRow[]>({
    queryKey: ["orders", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("id, created_at, total, status, payment_method")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      return (data || []) as OrderRow[];
    },
  });

  const hasOrders = !!orders && orders.length > 0;

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
            <ShoppingBag className="h-6 w-6 text-primary" />
            Orders
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Track your recent and past orders, repeat purchases, or download invoices.
          </p>
        </section>

        <section className="animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
          {!user && (
            <Card className="border-dashed border-white/20 bg-background/40 backdrop-blur-xl shadow-[0_0_45px_rgba(15,23,42,0.6)] mb-4">
              <CardHeader>
                <CardTitle className="text-base">Sign in to view your orders</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Orders are linked to your account. Go back to the home page and use the Login button
                to sign in.
              </CardContent>
            </Card>
          )}

          {user && isLoading && (
            <div className="py-16 text-center text-sm text-muted-foreground">
              Loading your orders...
            </div>
          )}

          {user && error && (
            <div className="py-16 text-center text-sm text-red-500">
              Failed to load orders. Please try again.
            </div>
          )}

          {user && hasOrders && (
            <div className="grid gap-4">
              {orders!.map((order) => (
                <Card key={order.id} className="bg-background/40 backdrop-blur-xl border-white/10">
                  <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
                    <div>
                      <CardTitle className="text-sm font-semibold">
                        Order #{order.id}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <CalendarDays className="h-3 w-3" />
                        <span>{new Date(order.created_at).toLocaleString()}</span>
                      </div>
                    </div>
                    <Badge
                      variant={
                        order.status === "delivered"
                          ? "default"
                          : order.status === "cancelled"
                          ? "destructive"
                          : "outline"
                      }
                    >
                      {order.status}
                    </Badge>
                  </CardHeader>
                  <CardContent className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm">
                    <p className="text-muted-foreground">
                      Total paid: <span className="font-semibold">₹{order.total.toFixed(2)}</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" className="gap-2" disabled>
                        <RefreshCcw className="h-3 w-3" />
                        Repeat order
                      </Button>
                      <Button size="sm" variant="outline" className="gap-2" disabled>
                        <Download className="h-3 w-3" />
                        Invoice
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {user && !isLoading && !error && !hasOrders && (
            <Card className="border-dashed border-white/20 bg-background/40 backdrop-blur-xl shadow-[0_0_45px_rgba(15,23,42,0.6)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                  No orders yet
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>
                  Once you place an order, it will show up here with live status tracking and quick
                  actions.
                </p>
                <NavLink to="/">
                  <Button size="sm">Start shopping</Button>
                </NavLink>
              </CardContent>
            </Card>
          )}
        </section>
      </main>
    </GlassPage>
  );
};

export default Orders;
