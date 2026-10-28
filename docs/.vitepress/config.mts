import { defineConfig } from "vitepress";
export default defineConfig({
  title: "Groovepost SDK",
  description: "Build independent tenant applications with Groovepost",
  base: "/sdk/",
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: "Guide", link: "/getting-started" },
      { text: "Examples", link: "/examples" },
      { text: "Packages", link: "/packages" },
    ],
    sidebar: [
      {
        text: "Start",
        items: [
          { text: "Overview", link: "/" },
          { text: "Getting started", link: "/getting-started" },
          { text: "Packages and versions", link: "/packages" },
          { text: "Architecture", link: "/architecture" },
        ],
      },
      {
        text: "Build",
        items: [
          { text: "REST client", link: "/client" },
          { text: "Hosted apps", link: "/hosted-apps" },
          { text: "Developer contract", link: "/developer-contract" },
          { text: "Tenant onboarding", link: "/onboarding" },
          { text: "Environments", link: "/environments" },
          { text: "Authentication", link: "/authentication" },
          { text: "Theming and controls", link: "/theming" },
          { text: "Data and sessions", link: "/data-and-sessions" },
          { text: "Forms and submissions", link: "/forms-submissions" },
          { text: "Submission email", link: "/submission-email" },
          { text: "Services", link: "/services" },
          { text: "Advertising", link: "/advertising" },
          { text: "Commerce", link: "/commerce" },
          { text: "Design authoring", link: "/design-agent-kit" },
          { text: "Site layouts", link: "/site-layouts" },
          { text: "Site transfer", link: "/site-transfer" },
          { text: "CLI and MCP", link: "/tooling" },
          { text: "Examples", link: "/examples" },
        ],
      },
      {
        text: "Ship",
        items: [
          { text: "Repository setup and builds", link: "/repository-builds" },
          { text: "Build history", link: "/releases" },
          { text: "Troubleshooting", link: "/troubleshooting" },
        ],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/groovepost/sdk" },
    ],
    search: { provider: "local" },
  },
});
