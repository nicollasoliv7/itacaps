import type { NextConfig } from "next";

const config: NextConfig = {
  async redirects() {
    return [
      { source: "/colecao/:slug", destination: "/#loja", permanent: true },
      { source: "/informacoes", destination: "/#visite", permanent: true },
    ];
  },
};

export default config;
