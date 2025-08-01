/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://codersyap.vercel.app', // or use your custom domain
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/404', '/_app', '/_document'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
