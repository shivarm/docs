import type { ZudokuConfig } from "zudoku";
import { devPortal, docs, policies, programming } from "./sidebar.js";
import { diagramPlugin } from "./src/diagrams/common/plugin.js";
import { HeadNavigation } from "./src/HeadNavigation";
import { mdxComponents } from "./src/mdx.js";
import rehypeStaticImages from "./src/mdx/static-images.js";
const config: ZudokuConfig = {
  basePath: "/docs",
  page: {
    pageTitle: "Zuplo Docs",
    logoUrl: "https://portal.zuplo.com/zuplo.svg",
  },
  metadata: {
    title: "%s - Zuplo Docs",
    description: "Zuplo Documentation",
    generator: "Zudoku",
    favicon: "https://cdn.zuplo.com/www/favicon.svg",
  },
  redirects: [
    {
      from: "/",
      to: "/articles/what-is-zuplo",
    },
  ],
  theme: {
    dark: {
      primary: "315.53 100% 50%",
      background: "0 0% 0%",
      border: "216 28.74% 17.06",
    },
    light: {
      primary: "316 91% 45%",
      background: "0 0 100%",
      border: "220 13.04% 90.98%",
    },
  },
  // Temporary hack to inject CSS: https://github.com/zuplo/zudoku/issues/473
  plugins: [diagramPlugin()],
  UNSAFE_slotlets: {
    "head-navigation-start": HeadNavigation,
  },
  search: {
    type: "inkeep",
    apiKey: "499c156cf7a9798343949c8bb5665ac95e48132c6d68c42e",
    integrationId: "clot3asdz0000s601nc8jwnzx",
    organizationId: "org_dDOlt2uJlMWM8oIS",
    primaryBrandColor: "#ff00bd",
    organizationDisplayName: "Zuplo",
  },
  topNavigation: [
    {
      id: "docs",
      label: "Documentation",
    },
    {
      id: "policies",
      label: "Policies & Handlers",
    },
    {
      id: "programming",
      label: "Programming API",
    },
    {
      id: "api",
      label: "REST API",
    },
  ],
  sidebar: {
    docs,
    policies,
    programming,
    devPortal,
  },
  mdx: {
    components: mdxComponents,
  },
  apis: {
    type: "file",
    input: "./api.json",
    navigationId: "api",
  },
  docs: [
    { files: "/docs/**/*.{md,mdx}" },
    { files: "/generated/**/*.{md,mdx}" },
  ],
  sitemap: {
    siteUrl: "https://zuplo.com/docs",
  },
  build: {
    rehypePlugins: [rehypeStaticImages],
  },
};

export default config;
