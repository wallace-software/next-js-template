"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Github } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import NavLink from "./nav-link";

const nav = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export const Header = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { dir, atTop } = useScrollDirection({ offset: 80, threshold: 10 });

  return (
    <motion.header
      initial={false}
      animate={{ y: dir === "down" && !open && !atTop ? -64 : 0 }}
      transition={{ type: "tween", duration: 0.2 }}
      className={cn(
        "sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur",
        "supports-backdrop-filter:bg-background/60"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand + Desktop Nav */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="font-semibold tracking-tight"
            aria-label="Go to home"
          >
            wallace<span className="text-muted-foreground">.software</span>
          </Link>

          <Separator orientation="vertical" className="hidden h-5 md:block" />

          <nav className="relative hidden md:block" aria-label="Primary">
            <NavigationMenu>
              <NavigationMenuList className="relative">
                {nav.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <NavigationMenuItem key={item.href}>
                      <NavigationMenuLink asChild>
                        <NavLink
                          href={item.href}
                          label={item.label}
                          isActive={isActive}
                        />
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>

        {/* Right actions + Mobile trigger */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Button
            asChild
            variant="outline"
            size="sm"
            className="hidden md:inline-flex"
          >
            <a
              href="https://github.com/wallace-software"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open GitHub"
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80" asChild>
              <motion.div
                initial={{ x: -16, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "tween", duration: 0.15 }}
              >
                <SheetHeader>
                  <SheetTitle className="text-left">
                    Wallace
                    <span className="text-muted-foreground">.software</span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-6 grid gap-1" aria-label="Mobile Primary">
                  {nav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "inline-flex items-center rounded-md px-3 py-2 text-sm transition",
                        pathname === item.href
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <Separator className="my-6" />
                <div className="grid gap-2">
                  <Button asChild variant="outline">
                    <a
                      href="https://github.com/wallace-software"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                  </Button>
                </div>
              </motion.div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
};
