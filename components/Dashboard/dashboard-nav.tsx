"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Blog", href: "/dashboard/generate/blog" },
  { name: "LinkedIn", href: "/dashboard/generate/linkedin" },
  { name: "Video", href: "/dashboard/generate/video" },
  { name: "Settings", href: "/dashboard/settings" },
];

export default function DashboardNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error);
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="flex w-full items-center justify-between">
      <nav className="flex items-center space-x-2 md:space-x-4 text-sm font-medium">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "transition-colors hover:text-white px-3 py-2 rounded-md",
              (pathname.startsWith(item.href) && item.href !== '/dashboard') || pathname === item.href
                ? "bg-zinc-800 text-white"
                : "text-zinc-400"
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>
      <Button
        variant="ghost"
        onClick={handleLogout}
        className="transition-colors hover:text-white px-3 py-2 rounded-md text-zinc-400"
      >
        Logout
      </Button>
    </div>
  );
}
