# ShopCart -- E-Commerce Cart Prototype Spec

## Overview

A single-page, clickable e-commerce cart prototype built with React + TypeScript + Vite. All data is hardcoded (no backend). The prototype demonstrates product browsing, category filtering, quick-view modals, cart management with quantity editing, and a checkout confirmation flow.

**Status:** Prototype (not production-ready)
**Stack:** React 19, TypeScript, Vite, CSS custom properties
**Font:** Inter (Google Fonts)

---

## File Structure

```
Prototypes/ecommerce-cart/
├── index.html                          # Entry point with Google Fonts
├── package.json
├── tsconfig.json
├── vite.config.ts
├── ecommerce-cart-prototype.html       # Standalone single-file build (viewable without dev server)
├── spec.md                             # This file
└── src/
    ├── main.tsx                        # React root mount
    ├── App.tsx                         # Root component, all state management
    ├── App.css                         # All styles (CSS custom properties)
    ├── types/
    │   └── index.ts                    # Product, CartItem, Category, View, ModalContent
    ├── data/
    │   └── mockData.ts                 # 8 products, initial cart, categories
    └── components/
        ├── Navbar.tsx                  # Top bar: logo, search, cart icon + badge
        ├── Sidebar.tsx                 # Category filter list
        ├── ProductCard.tsx             # Product grid card
        ├── CartItem.tsx                # Cart row with qty stepper + remove
        ├── CartSummary.tsx             # Order summary + checkout button
        └── Modal.tsx                   # Reusable overlay (portal-based)
```

---

## Data Model

### Product

| Field         | Type     | Example                          |
| ------------- | -------- | -------------------------------- |
| `id`          | number   | `1`                              |
| `name`        | string   | `"Ultra Runner Pro"`             |
| `price`       | number   | `149.99`                         |
| `image`       | string   | Unsplash URL (400x400 crop)      |
| `category`    | Category | `"Shoes"`                        |
| `description` | string   | Short product blurb              |

### CartItem

| Field     | Type    | Description                |
| --------- | ------- | -------------------------- |
| `product` | Product | Reference to product       |
| `quantity`| number  | Quantity in cart (min: 1)   |

### Category (union type)

`"All" | "Shoes" | "Apparel" | "Accessories" | "Electronics"`

### View

`"products" | "cart"` -- controls which main content area is visible.

### ModalContent (discriminated union)

- `{ type: "quick-view", product: Product }` -- product detail overlay
- `{ type: "checkout-confirm", total: number }` -- order confirmation overlay
- `null` -- no modal open

---

## Mock Data

**8 products** spanning 4 categories:

| ID | Name                                 | Price    | Category    |
|----|--------------------------------------|----------|-------------|
| 1  | Ultra Runner Pro                     | $149.99  | Shoes       |
| 2  | Canvas Weekender Bag                 | $89.99   | Accessories |
| 3  | Merino Wool Crewneck                 | $78.00   | Apparel     |
| 4  | Wireless Noise-Cancelling Headphones | $249.99  | Electronics |
| 5  | Leather Minimalist Wallet            | $45.00   | Accessories |
| 6  | Trail Hiking Boots                   | $189.99  | Shoes       |
| 7  | Portable Bluetooth Speaker           | $59.99   | Electronics |
| 8  | Fitted Stretch Chinos                | $68.00   | Apparel     |

**Initial cart** (pre-populated on load):
- Ultra Runner Pro x1
- Wireless Noise-Cancelling Headphones x2

---

## Component Spec

### App.tsx (Root)

**State:**

| State            | Type          | Default        | Purpose                            |
| ---------------- | ------------- | -------------- | ---------------------------------- |
| `cart`           | CartItem[]    | `initialCart`  | Items currently in cart            |
| `activeCategory` | Category      | `"All"`        | Selected sidebar filter            |
| `currentView`    | View          | `"products"`   | Toggle between product grid & cart |
| `modal`          | ModalContent  | `null`         | Controls which modal is open       |

**Derived values:**
- `cartItemCount` -- sum of all item quantities (drives badge)
- `filteredProducts` -- products filtered by `activeCategory`

**Actions:**
- `addToCart(product)` -- adds item or increments existing quantity
- `incrementQty(productId)` -- increases quantity by 1
- `decrementQty(productId)` -- decreases quantity by 1 (min: 1)
- `removeFromCart(productId)` -- removes item entirely
- `handleCheckout()` -- computes total with 8% tax, opens confirmation modal
- `handleCheckoutClose()` -- clears cart, closes modal, returns to products view

**Layout:** CSS Grid with sidebar (240px) + main area (1fr), navbar fixed top.

### Navbar.tsx

- **Logo** ("ShopCart" with cart SVG icon) -- click navigates to products view
- **Search input** -- decorative placeholder, read-only
- **Cart button** -- toggles between products and cart view; shows badge with total item count; highlighted when cart view is active

### Sidebar.tsx

- Renders all 5 categories as buttons in a vertical list
- Active category has indigo highlight (`sidebar__item--active`)
- Clicking a category updates the filter and switches to products view

### ProductCard.tsx

- **Image** (1:1 aspect ratio) -- click opens quick-view modal; hover scales image 1.05x
- **Product name** -- click opens quick-view modal; hover turns indigo
- **Category badge** -- small gray pill
- **Price** -- bold, left-aligned
- **"Add to Cart" button** -- adds item to cart directly (no modal)

### CartItem.tsx

- **Thumbnail** (80x80)
- **Product name + unit price**
- **Quantity stepper** -- minus button (disabled at qty 1), value display, plus button
- **Line total** -- `price * quantity`, right-aligned
- **Remove button** (trash icon) -- hover turns red

### CartSummary.tsx

- **Subtotal** -- sum of all line totals
- **Estimated Tax (8%)** -- `subtotal * 0.08`
- **Divider line**
- **Total** -- `subtotal + tax`, bold
- **"Proceed to Checkout" button** -- full-width, disabled when cart is empty
- Sticky positioning so it stays visible while scrolling cart items

### Modal.tsx

- **Portal-based** -- renders to `document.body` via `createPortal`
- **Backdrop** -- semi-transparent black overlay; click-to-close
- **Escape key** closes the modal
- **Close button** -- circular X in top-right corner
- **Two uses:**
  1. **Quick-view:** 2-column grid (image left, info right); shows category, name, description, price, "Add to Cart" button
  2. **Checkout confirmation:** centered layout with green checkmark icon, "Order Confirmed!" heading, total amount, prototype disclaimer, "Continue Shopping" button

---

## User Flows

### Flow 1: Browse & Filter Products

1. Page loads showing all 8 products in a responsive grid under the heading "Product Wall"
2. Sidebar displays 5 category buttons ("All" is active by default)
3. Click a category -- grid instantly filters to matching products
4. Header updates to show category name and item count (unfiltered view shows "Product Wall")

### Flow 2: Quick-View a Product

1. Click a product card image or name
2. Modal opens with large image, category label, name, description, price
3. Click "Add to Cart" -- item added to cart, modal closes, badge increments
4. Click backdrop, X button, or press Escape to close without adding

### Flow 3: Add to Cart (Direct)

1. Click "Add to Cart" on any product card
2. If item is new: added to cart with quantity 1
3. If item already in cart: quantity increments by 1
4. Navbar badge updates immediately

### Flow 4: Manage Cart

1. Click cart icon in navbar to switch to cart view
2. Cart displays all items with thumbnails, names, prices, quantity steppers, line totals
3. Click "+" to increase quantity; click "-" to decrease (disabled at 1)
4. Click trash icon to remove an item entirely
5. Order Summary recalculates live (subtotal, tax, total)
6. If cart becomes empty, shows empty state with "Continue Shopping" button

### Flow 5: Checkout

1. Click "Proceed to Checkout" in Order Summary
2. Confirmation modal opens with green checkmark, total charged, disclaimer
3. Click "Continue Shopping" or close the modal
4. Cart clears, view returns to product grid

---

## Design Tokens

```css
--color-bg: #f5f5f7           /* Page background */
--color-surface: #ffffff       /* Cards, navbar, sidebar */
--color-text: #1d1d1f          /* Primary text */
--color-text-secondary: #6e6e73/* Muted text */
--color-accent: #4f46e5        /* Indigo (buttons, links, badges) */
--color-accent-hover: #4338ca  /* Darker indigo on hover */
--color-accent-light: #eef2ff  /* Active sidebar item background */
--color-border: #e5e5ea        /* Borders and dividers */
--color-danger: #ef4444        /* Remove button hover */
--color-success: #10b981       /* Checkout confirmation icon */

--radius-sm: 8px               /* Buttons, inputs, small cards */
--radius-md: 12px              /* Product cards, cart items */
--radius-lg: 16px              /* Modal */

--shadow-sm: 0 1px 2px rgba(0,0,0,0.05)    /* Default card shadow */
--shadow-md: 0 4px 12px rgba(0,0,0,0.08)   /* Card hover shadow */
--shadow-lg: 0 8px 24px rgba(0,0,0,0.12)   /* Modal shadow */

--navbar-height: 64px
--sidebar-width: 240px
--font: "Inter", system-ui, -apple-system, sans-serif
```

---

## Responsive Behavior

**Breakpoint:** 768px

| Element       | Desktop (>768px)            | Mobile (<=768px)              |
| ------------- | --------------------------- | ----------------------------- |
| Sidebar       | 240px fixed left column     | Hidden (`display: none`)      |
| Product grid  | Auto-fill columns (260px+)  | Single column                 |
| Cart layout   | Items (1fr) + Summary (340px)| Stacked single column        |
| Quick-view    | 2-column (image + info)     | Stacked (image top, info below)|
| Main padding  | 32px                        | 24px 16px                     |

---

## Interactions & Animations

| Interaction              | Effect                                              |
| ------------------------ | --------------------------------------------------- |
| Product card hover       | Shadow lifts (`shadow-md`), card rises 2px          |
| Product image hover      | Image scales to 1.05x                               |
| Product name hover       | Text color changes to indigo                         |
| Button click             | Scales to 0.97x (press feedback)                     |
| Quantity "-" at 1        | Button disabled (opacity 0.35, not-allowed cursor)   |
| Remove button hover      | Icon turns red, background turns light red            |
| Cart icon (active)       | Border and icon turn indigo                          |
| Modal open               | Backdrop fades in (0.15s), content slides up (0.2s)  |
| Sidebar item hover       | Background turns light gray                          |
| Active sidebar item      | Background indigo-light, text indigo                 |

---

## Running the Prototype

**Development server:**
```bash
cd Prototypes/ecommerce-cart
npm install
npm run dev
```

**Standalone (no server needed):**
Open `ecommerce-cart-prototype.html` in any browser. Requires internet for Google Fonts and Unsplash images.

---

## Known Limitations

- Search input is decorative (no filtering logic)
- No routing -- view state is managed via React state, not URL
- No persistence -- cart resets on page reload
- No accessibility audit (focus management, screen reader testing)
- Product images load from Unsplash (requires internet)
- Sidebar hidden on mobile with no hamburger menu alternative
- No loading states or error handling
- Tax rate (8%) is hardcoded
