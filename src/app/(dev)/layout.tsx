import { redirect } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";

const DevLayout = ({ children }: { children: React.ReactNode }) => {
  // Redirect to home if not in development
  if (process.env.NODE_ENV === "production") {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1 bg-muted/30">
        <div className="border-b bg-yellow-500/10 backdrop-blur">
          <div className="container mx-auto max-w-6xl px-4 py-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔧</span>
              <p className="text-sm font-medium text-yellow-600 dark:text-yellow-500">
                Development Mode Only
              </p>
              <Badge
                variant="outline"
                className="border-yellow-600 text-yellow-600 dark:border-yellow-500 dark:text-yellow-500"
              >
                Testing
              </Badge>
            </div>
          </div>
        </div>
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default DevLayout;
