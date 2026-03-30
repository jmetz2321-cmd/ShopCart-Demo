import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({
  product,
  onQuickView,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="product-card">
      <div className="product-card__image-wrap" onClick={() => onQuickView(product)}>
        <img src={product.image} alt={product.name} className="product-card__image" />
      </div>
      <div className="product-card__body">
        <h3 className="product-card__name" onClick={() => onQuickView(product)}>
          {product.name}
        </h3>
        <span className="product-card__category">{product.category}</span>
        <div className="product-card__footer">
          <span className="product-card__price">${product.price.toFixed(2)}</span>
          <button className="btn btn--sm" onClick={() => onAddToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
