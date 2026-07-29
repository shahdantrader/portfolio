import type { NextConfig } from "next";

// GitHub Actions sets GITHUB_PAGES=true only for the Pages deploy build.
// Vercel / local dev never set it, so those builds stay root-relative.
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = "portfolio";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: isGithubPages ? `/${repoName}` : undefined,
  assetPrefix: isGithubPages ? `/${repoName}/` : undefined,
};

export default nextConfig;
