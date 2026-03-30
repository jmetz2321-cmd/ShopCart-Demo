import type { View } from "../types";

interface NavbarProps {
  cartCount: number;
  currentView: View;
  onViewChange: (view: View) => void;
}

export default function Navbar({ cartCount, currentView, onViewChange }: NavbarProps) {
  return (
    <nav className="navbar">
      <div
        className="navbar__logo"
        onClick={() => onViewChange("products")}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        <span>ShopCart</span>
      </div>

      <div className="navbar__search">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input type="text" placeholder="Search products..." readOnly />
      </div>

      <button
        className={`navbar__cart-btn ${currentView === "cart" ? "navbar__cart-btn--active" : ""}`}
        onClick={() => onViewChange(currentView === "cart" ? "products" : "cart")}
        aria-label="Toggle cart"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        {cartCount > 0 && <span className="navbar__badge">{cartCount}</span>}
      </button>
    </nav>
  );
}
