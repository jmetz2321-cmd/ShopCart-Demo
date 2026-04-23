import { useState, useCallback } from "react";
import type { CartItem as CartItemType, Category, ModalContent, Product, View } from "./types";
import { products, initialCart } from "./data/mockData";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProductCard from "./components/ProductCard";
import CartItemRow from "./components/CartItem";
import CartSummary from "./components/CartSummary";
import Modal from "./components/Modal";
import "./App.css";

export default function App() {
  const [cart, setCart] = useState<CartItemType[]>(initialCart);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [currentView, setCurrentView] = useState<View>("products");
  const [modal, setModal] = useState<ModalContent>(null);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const incrementQty = useCallback((productId: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }, []);

  const decrementQty = useCallback((productId: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const handleCheckout = () => {
    const total = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const tax = total * 0.08;
    setModal({ type: "checkout-confirm", total: total + tax });
  };

  const handleCheckoutClose = () => {
    setModal(null);
    setCart([]);
    setCurrentView("products");
  };

  return (
    <div className="app">
      <Navbar
        cartCount={cartItemCount}
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      <div className="app__body">
        <Sidebar
          activeCategory={activeCategory}
          onCategoryChange={(cat) => {
            setActiveCategory(cat);
            setCurrentView("products");
          }}
        />

        <main className="main">
          {currentView === "products" ? (
            <>
              <div className="main__header">
                <h1 className="main__title">
                  {activeCategory === "All" ? "Product Wall" : activeCategory}
                </h1>
                <span className="main__count">
                  {filteredProducts.length} item{filteredProducts.length !== 1 && "s"}
                </span>
              </div>
              <div className="product-grid">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setModal({ type: "quick-view", product: p })}
                    onAddToCart={addToCart}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="main__header">
                <h1 className="main__title">Cart</h1>
                <span className="main__count">
                  {cart.length} item{cart.length !== 1 && "s"}
                </span>
              </div>
              {cart.length === 0 ? (
                <div className="cart-empty">
                  <p>Your cart is empty.</p>
                  <button
                    className="btn"
                    onClick={() => setCurrentView("products")}
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="cart-layout">
                  <div className="cart-items">
                    {cart.map((item) => (
                      <CartItemRow
                        key={item.product.id}
                        item={item}
                        onIncrement={incrementQty}
                        onDecrement={decrementQty}
                        onRemove={removeFromCart}
                      />
                    ))}
                  </div>
                  <CartSummary cart={cart} onCheckout={handleCheckout} />
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Quick-view modal */}
      <Modal
        open={modal?.type === "quick-view"}
        onClose={() => setModal(null)}
      >
        {modal?.type === "quick-view" && (
          <div className="quick-view">
            <img
              src={modal.product.image}
              alt={modal.product.name}
              className="quick-view__image"
            />
            <div className="quick-view__info">
              <span className="quick-view__category">{modal.product.category}</span>
              <h2 className="quick-view__name">{modal.product.name}</h2>
              <p className="quick-view__desc">{modal.product.description}</p>
              <span className="quick-view__price">
                ${modal.product.price.toFixed(2)}
              </span>
              <button
                className="btn btn--lg"
                onClick={() => {
                  addToCart(modal.product);
                  setModal(null);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Checkout confirmation modal */}
      <Modal
        open={modal?.type === "checkout-confirm"}
        onClose={handleCheckoutClose}
      >
        {modal?.type === "checkout-confirm" && (
          <div className="checkout-confirm">
            <div className="checkout-confirm__icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h2>Order Confirmed!</h2>
            <p className="checkout-confirm__total">
              Total charged: <strong>${modal.total.toFixed(2)}</strong>
            </p>
            <p className="checkout-confirm__note">
              This is a prototype — no real charge was made.
            </p>
            <button className="btn btn--lg" onClick={handleCheckoutClose}>
              Continue Shopping
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
