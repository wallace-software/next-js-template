import Link from "next/link";
import { cn } from "@/lib/utils";
import { Twitter, Github, Linkedin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const footerLinks = {
  product: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Changelog", href: "/changelog" },
    { label: "Docs", href: "/docs" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "License", href: "/license" },
  ],
  social: [
    { label: "Twitter", href: "https://twitter.com", icon: Twitter },
    { label: "GitHub", href: "https://github.com", icon: Github },
    { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  ],
};

interface FooterProps {
  className?: string;
}

export const Footer = ({ className }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60",
        className
      )}
    >
      <div className="container mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-lg font-semibold tracking-tight">
                wallace<span className="text-muted-foreground">.software</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Building modern web applications with cutting-edge technologies.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} wallace.software. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex gap-2">
            {footerLinks.social.map((link) => {
              const Icon = link.icon;
              return (
                <Button key={link.href} variant="ghost" size="icon" asChild>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};
