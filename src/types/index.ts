export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: Category;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type Category = "All" | "Shoes" | "Apparel" | "Accessories" | "Electronics";

export type View = "products" | "cart";

export type ModalContent =
  | { type: "quick-view"; product: Product }
  | { type: "checkout-confirm"; total: number }
  | null;
