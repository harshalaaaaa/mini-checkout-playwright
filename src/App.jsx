
import { useRef, useState } from "react";
import "./App.css";

const PRODUCTS = [
  {
    id: 1,
    name: "Classic Notebook",
    description: "Premium hardcover notebook",
    price: 299,
    icon: "📓",
  },
  {
    id: 2,
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse",
    price: 799,
    icon: "🖱️",
  },
];

const money = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);

function App() {
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [error, setError] = useState("");
  const [order, setOrder] = useState(null);
  const submitting = useRef(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const orderTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function addToCart(product) {
    if (order) return;
    setError("");
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
  }

  function changeQuantity(id, amount) {
    if (order) return;
    setError("");
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeItem(id) {
    if (order) return;
    setError("");
    setCart((current) => current.filter((item) => item.id !== id));
  }

  function placeOrder(event) {
    event.preventDefault();

    // Prevent duplicate submissions, including rapid double-clicks.
    if (submitting.current || order) return;

    if (cart.length === 0) {
      setError("Your cart is empty. Please add a product before checkout.");
      return;
    }

    if (!customerName.trim()) {
      setError("Please enter your name to continue.");
      return;
    }

    submitting.current = true;

    const reference = `SC-${Date.now().toString().slice(-8)}`;

    setOrder({
      name: customerName.trim(),
      reference,
      total: orderTotal,
      items: totalItems,
    });

    setError("");
  }

  function resetStore() {
    submitting.current = false;
    setCart([]);
    setCustomerName("");
    setError("");
    setOrder(null);
  }

  return (
    <main className="app">
      <header className="topbar">
        <a className="brand" href="#" aria-label="SwiftCart home">
          <span className="brand-icon">S</span>
          SwiftCart<span className="brand-dot">.</span>
        </a>
        <span className="header-note">Simple shopping. Secure checkout.</span>
        <div className="cart-indicator" aria-label={`${totalItems} items in cart`}>
          🛒 <span>{totalItems}</span>
        </div>
      </header>

      <section className="hero">
        <span className="eyebrow">THE MINI STORE</span>
        <h1>Good things, made simple.</h1>
        <p>Choose your favorites and enjoy a seamless checkout experience.</p>
      </section>

      {order ? (
        <section className="confirmation" aria-live="polite">
          <div className="success-icon">✓</div>
          <span className="eyebrow">ORDER COMPLETED</span>
          <h2>Order confirmed!</h2>
          <p>
            Thank you, <strong>{order.name}</strong>. Your order has been
            successfully placed.
          </p>
          <div className="confirmation-details">
            <div>
              <span>Order reference</span>
              <strong data-testid="order-reference">{order.reference}</strong>
            </div>
            <div>
              <span>Items ordered</span>
              <strong>{order.items}</strong>
            </div>
            <div>
              <span>Order total</span>
              <strong>{money(order.total)}</strong>
            </div>
          </div>
          <button className="primary-button" onClick={resetStore}>
            Continue shopping
          </button>
        </section>
      ) : (
        <div className="content">
          <section className="products-section">
            <div className="section-heading">
              <div>
                <span className="eyebrow">OUR COLLECTION</span>
                <h2>Featured products</h2>
              </div>
              <span className="product-count">02 PRODUCTS</span>
            </div>

            <div className="product-grid">
              {PRODUCTS.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className={`product-image product-${product.id}`}>
                    <span>{product.icon}</span>
                  </div>
                  <div className="product-info">
                    <span className="product-category">ESSENTIALS</span>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <div className="product-bottom">
                      <strong>{money(product.price)}</strong>
                      <button
                        className="add-button"
                        onClick={() => addToCart(product)}
                      >
                        + Add to cart
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="checkout-card">
            <div className="checkout-heading">
              <div>
                <span className="eyebrow">YOUR SELECTION</span>
                <h2>Your cart</h2>
              </div>
              <span className="cart-count">{totalItems} items</span>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <span>🛍️</span>
                <h3>Your cart is empty</h3>
                <p>Add something lovely to get started.</p>
              </div>
            ) : (
              <div className="cart-items">
                {cart.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <div className="item-icon">{item.icon}</div>
                    <div className="item-info">
                      <strong>{item.name}</strong>
                      <span>{money(item.price)} each</span>
                      <div className="quantity-control">
                        <button
                          aria-label={`Decrease quantity for ${item.name}`}
                          onClick={() => changeQuantity(item.id, -1)}
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          aria-label={`Increase quantity for ${item.name}`}
                          onClick={() => changeQuantity(item.id, 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="item-end">
                      <strong data-testid={`line-total-${item.id}`}>
                        {money(item.price * item.quantity)}
                      </strong>
                      <button
                        className="remove-button"
                        aria-label={`Remove ${item.name}`}
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="total-row">
              <span>Order total</span>
              <strong data-testid="order-total">{money(orderTotal)}</strong>
            </div>

            <form onSubmit={placeOrder}>
              <label htmlFor="customerName">Your name <span>*</span></label>
              <input
                id="customerName"
                type="text"
                placeholder="Enter your full name"
                value={customerName}
                onChange={(event) => {
                  setCustomerName(event.target.value);
                  setError("");
                }}
                disabled={!!order}
                autoComplete="name"
              />

              {error && (
                <p className="error-message" role="alert">
                  <span>!</span> {error}
                </p>
              )}

              <button className="primary-button" type="submit">
                Place order <span>→</span>
              </button>
              <p className="secure-note">🔒 Secure demo checkout · No payment required</p>
            </form>
          </aside>
        </div>
      )}

      <footer>
        <span>© 2026 SwiftCart</span>
        <span>Built with care. Tested with Playwright.</span>
      </footer>
    </main>
  );
}

export default App;
