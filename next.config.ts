import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/artigos/stephen-king", destination: "/autor", permanent: true },
      { source: "/artigos/stephen-king-2", destination: "/autor", permanent: true },
      { source: "/artigos/derry", destination: "/map/derry", permanent: true },
      { source: "/artigos/castle-rock", destination: "/map/castle-rock", permanent: true },
      { source: "/artigos/jerusalems-lot", destination: "/map/jerusalems-lot", permanent: true },
      { source: "/artigos/adaptacoes", destination: "/adaptacoes", permanent: true },
      { source: "/artigos/adaptacoes-para-o-cinema", destination: "/adaptacoes", permanent: true },
      { source: "/artigos/adaptacoes-para-a-tv", destination: "/adaptacoes", permanent: true },
      { source: "/artigos/series", destination: "/adaptacoes?tipo=serie", permanent: true },
      { source: "/artigos/minisseries", destination: "/adaptacoes?tipo=minisserie", permanent: true },
      { source: "/artigos/continuacoes", destination: "/adaptacoes", permanent: true },
      { source: "/artigos/hqs", destination: "/adaptacoes?tipo=hq", permanent: true },
      { source: "/artigos", destination: "/", permanent: true },
      { source: "/artigos/:slug", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
