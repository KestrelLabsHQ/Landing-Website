import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kestrel Labs LLC",
    short_name: "Kestrel Labs",
    description:
      "Dependable digital systems for growing businesses, from polished websites to deeper software and infrastructure work.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/logos/KestrelLabs-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/logos/KestrelLabs-icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/logos/KestrelLabs-icon-dark-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
