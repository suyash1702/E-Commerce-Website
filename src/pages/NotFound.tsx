import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { GlassPage } from "@/components/GlassPage";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <GlassPage>
      <div className="flex min-h-screen items-center justify-center">
      <div className="text-center rounded-3xl border border-white/10 bg-background/40 backdrop-blur-2xl px-8 py-10 shadow-[0_0_45px_rgba(15,23,42,0.6)]">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
      </div>
    </GlassPage>
  );
};

export default NotFound;
