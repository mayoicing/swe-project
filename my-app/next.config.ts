import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
<<<<<<< HEAD
    domains: ["www.google.com", "imdb.com"], // Add more allowed domains if needed
=======
    domains: ["www.google.com", "imdb.com", "upload.wikimedia.org", "m.media-amazon.com"],
  }
>>>>>>> connect-backend
  /* config options here */
  }
};

export default nextConfig;
