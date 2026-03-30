import type { Product, CartItem, Category } from "../types";

export const categories: Category[] = [
  "All",
  "Shoes",
  "Apparel",
  "Accessories",
  "Electronics",
];

export const products: Product[] = [
  {
    id: 1,
    name: "Ultra Runner Pro",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    category: "Shoes",
    description:
      "Lightweight performance running shoes with responsive cushioning and breathable mesh upper. Perfect for daily training and race day.",
  },
  {
    id: 2,
    name: "Canvas Weekender Bag",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    category: "Accessories",
    description:
      "Durable waxed canvas weekender bag with leather accents. Spacious main compartment and interior pockets for organized travel.",
  },
  {
    id: 3,
    name: "Merino Wool Crewneck",
    price: 78.0,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=400&fit=crop",
    category: "Apparel",
    description:
      "Extra-fine merino wool crewneck sweater. Temperature-regulating, odor-resistant, and incredibly soft against the skin.",
  },
  {
    id: 4,
    name: "Wireless Noise-Cancelling Headphones",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "Electronics",
    description:
      "Premium over-ear headphones with adaptive noise cancellation, 30-hour battery life, and Hi-Res Audio support.",
  },
  {
    id: 5,
    name: "Leather Minimalist Wallet",
    price: 45.0,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop",
    category: "Accessories",
    description:
      "Slim bifold wallet crafted from full-grain leather. Holds up to 8 cards with a quick-access slot and bill compartment.",
  },
  {
    id: 6,
    name: "Trail Hiking Boots",
    price: 189.99,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
    category: "Shoes",
    description:
      "Waterproof hiking boots with Vibram outsole and ankle support. Built for rugged terrain and all-day comfort.",
  },
  {
    id: 7,
    name: "Portable Bluetooth Speaker",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    category: "Electronics",
    description:
      "Compact waterproof speaker with 360-degree sound, 12-hour playtime, and built-in microphone for hands-free calls.",
  },
  {
    id: 8,
    name: "Fitted Stretch Chinos",
    price: 68.0,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop",
    category: "Apparel",
    description:
      "Modern slim-fit chinos with 2% stretch for comfort. Garment-dyed for a rich color and soft hand feel.",
  },
];

export const initialCart: CartItem[] = [
  { product: products[0], quantity: 1 },
  { product: products[3], quantity: 2 },
];
