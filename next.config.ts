import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * optimizePackageImports tells Next.js to tree-shake these packages
   * at build time, only bundling the specific icons/components actually used.
   *
   * @phosphor-icons/react ships ~1000 icons. Without this, the entire icon
   * library is bundled. With it, only imported icons are included.
   *
   * framer-motion has a large internal module graph; opt-in tree-shaking
   * reduces the client bundle significantly.
   */
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "@phosphor-icons/react",
      "gsap",
    ],
  },
};

export default nextConfig;
