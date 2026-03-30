import type { CartItem as CartItemType } from "../types";

interface CartItemProps {
  item: CartItemType;
  onIncrement: (productId: number) => void;
  onDecrement: (productId: number) => void;
  onRemove: (productId: number) => void;
}

export default function CartItem({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}: CartItemProps) {
  const { product, quantity } = item;
  const lineTotal = product.price * quantity;

  return (
    <div className="cart-item">
      <img
        src={product.image}
        alt={product.name}
        className="cart-item__image"
      />
      <div className="cart-item__details">
        <h4 className="cart-item__name">{product.name}</h4>
        <span className="cart-item__price">${product.price.toFixed(2)}</span>
      </div>
      <div className="cart-item__qty">
        <button
          className="qty-btn"
          onClick={() => onDecrement(product.id)}
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="qty-value">{quantity}</span>
        <button
          className="qty-btn"
          onClick={() => onIncrement(product.id)}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      <span className="cart-item__total">${lineTotal.toFixed(2)}</span>
      <button
        className="cart-item__remove"
        onClick={() => onRemove(product.id)}
        aria-label="Remove item"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
      </button>
    </div>
  );
}
