import type { CartItem } from "../types";

interface CartSummaryProps {
  cart: CartItem[];
  onCheckout: () => void;
}

const TAX_RATE = 0.08;

export default function CartSummary({ cart, onCheckout }: CartSummaryProps) {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  return (
    <div className="cart-summary">
      <h3 className="cart-summary__title">Order Summary</h3>
      <div className="cart-summary__row">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="cart-summary__row">
        <span>Estimated Tax (8%)</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      <div className="cart-summary__divider" />
      <div className="cart-summary__row cart-summary__row--total">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <button
        className="btn btn--lg btn--full"
        onClick={onCheckout}
        disabled={cart.length === 0}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
