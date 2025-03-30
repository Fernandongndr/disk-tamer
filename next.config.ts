import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: true,
            svgoConfig: {
              plugins: [
                {
                  // Removes SVG attributes that would otherwise prevent coloring using CSS
                  name: "removeAttrs",
                  params: { attrs: "(fill|stroke|style)" },
                },
              ],
            },
          },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
