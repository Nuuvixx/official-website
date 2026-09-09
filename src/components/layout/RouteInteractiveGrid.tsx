"use client";

import { usePathname } from "next/navigation";
import InteractiveGrid from "@/components/projects/InteractiveGrid";

export default function RouteInteractiveGrid() {
  const pathname = usePathname();

  // Exclude landing page ("/") and contact page ("/contact")
  if (!pathname || pathname === "/" || pathname === "/contact" || pathname.startsWith("/contact/")) {
    return null;
  }

  return <InteractiveGrid />;
}
