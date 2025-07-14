import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  sassOptions: {
    additionalData: `
    @import "styles/variables.scss";
    @import "styles/mixins.scss";
    @import "styles/animations.scss";
  `,
  },
};

export default nextConfig;
