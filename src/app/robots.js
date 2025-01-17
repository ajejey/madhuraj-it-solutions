export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/services/',
        '/products/',
        '/about',
        '/contact',
        '/login'
      ],
      disallow: [
        '/admin/',
        '/api/'
      ]
    },
    sitemap: 'https://madhurajsystems.com/sitemap.xml',
    host: 'https://madhurajsystems.com'
  }
}
