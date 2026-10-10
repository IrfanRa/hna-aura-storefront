/** @type {import('next').NextConfig} */
const nextConfig = {
  // (1) Static export — Node sirf `next build` ke waqt chalta hai.
  //     Hosting par sirf HTML/CSS/JS jata hai, Node runtime nahi chahiye.
  output: 'export',
};

export default nextConfig;
