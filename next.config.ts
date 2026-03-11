import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const pagesBasePath = process.env.PAGES_BASE_PATH ?? (isGithubActions && repositoryName ? `/${repositoryName}` : "");

const nextConfig: NextConfig = {
  output: "export",
  typedRoutes: true,
  outputFileTracingRoot: process.cwd(),
  trailingSlash: true,
  ...(pagesBasePath
    ? {
        basePath: pagesBasePath,
        assetPrefix: pagesBasePath
      }
    : {}),
  images: {
    unoptimized: true
  }
};

export default nextConfig;
