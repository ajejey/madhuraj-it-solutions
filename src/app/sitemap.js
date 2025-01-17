import { Product } from "@/models/Product";
import { connectDB } from "./lib/db";

export default async function sitemap() {
  // Connect to database
  await connectDB();

  // Fetch all products
  const products = await Product.find({}).lean();

  // Generate product sitemap entries
  const productEntries = products.map((product) => ({
    url: `https://madhurajsystems.com/products/${product._id}`,
    lastModified: product.updatedAt || new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Static page entries
  const staticEntries = [
    {
      url: 'https://madhurajsystems.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://madhurajsystems.com/services/web-development',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://madhurajsystems.com/services/cctv',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://madhurajsystems.com/services/computer-sales',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://madhurajsystems.com/services/hardware-sales',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://madhurajsystems.com/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://madhurajsystems.com/login',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: 'https://madhurajsystems.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://madhurajsystems.com/products',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }
  ];

  // Combine static and dynamic entries
  return [...staticEntries, ...productEntries];
}
