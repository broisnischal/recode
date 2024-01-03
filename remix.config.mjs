import { flatRoutes } from "remix-flat-routes";

/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  tailwind: true,
  postcss: true,
  mdx: async () => {
    const [rehypeHighlight, remarkToc, remarkMdxFrontmatter] =
      await Promise.all([
        import("rehype-highlight").then((mod) => mod.default),
        import("remark-toc").then((mod) => mod.default),
        import("remark-mdx-frontmatter").then((mod) => mod.default),
      ]);

    return {
      remarkPlugins: [remarkToc, remarkMdxFrontmatter],
      rehypePlugins: [rehypeHighlight],
    };
  },
  routes: async (defineRoutes) => {
    return flatRoutes("routes", defineRoutes, {
      ignoredRouteFiles: [
        ".*",
        "**/*.css",
        "**/*.test.{js,jsx,ts,tsx}",
        "**/__*.*",
      ],
    });
  },
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
};
