import React, { useState, useEffect } from "react";
import BurgerCard from "../components/BurgerCard";
import Navbar from "../components/Navbar";
import "./Home.css";

function Home() {
  // 🛒 Cart with localStorage persistence
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [category, setCategory] = useState("all");
  const [showCart, setShowCart] = useState(false);
  const [animateCart, setAnimateCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  // 🔔 Toast notifications
  const [toast, setToast] = useState({ show: false, message: "" });

  const menu = [
    { id: 1, name: "Fire Zinger Chicken", price: 199, category: "grill", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd" },
    { id: 2, name: "Smoky Paneer Blast", price: 179, category: "grill", image: "https://images.unsplash.com/photo-1550547660-d9450f859349" },
    { id: 3, name: "Royal Double Patty", price: 269, category: "royal", image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5" },
    { id: 4, name: "Royal Veg Supreme", price: 239, category: "royal", image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086" },
    { id: 5, name: "Aloo Crunch Burger", price: 69, category: "classic", image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092" },
    { id: 6, name: "Crispy Fish Delight", price: 159, category: "classic", image: "https://images.unsplash.com/photo-1550317138-10000687a72b" },
    { id: 7, name: "Peri Peri Fries", price: 99, category: "sides", image: "https://images.unsplash.com/photo-1576107232684-1279f390859f" },
    { id: 8, name: "Cheese Loaded Fries", price: 119, category: "sides", image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5" },
    { id: 9, name: "Classic Cold Coffee", price: 99, category: "drinks", image: "https://images.unsplash.com/photo-1498804103079-a6351b050096" },
    { id: 10, name: "Iced Chocolate Shake", price: 129, category: "drinks", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699" },
    { id: 11, name: "Oreo Cream Cup", price: 89, category: "dessert", image: "https://images.unsplash.com/photo-1505253716362-afaea6c85f2c" },
    { id: 12, name: "Molten Lava Cake", price: 109, category: "dessert", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c" }
  ];

  // 🔄 Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // 🔔 Toast
  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 2000);
  };

  // 🛒 Open Cart
  const openCart = () => {
    setShowCart(true);
    setTimeout(() => setAnimateCart(true), 10);
  };

  // ❌ Close Cart
  const closeCart = () => {
    setAnimateCart(false);
    setTimeout(() => setShowCart(false), 300);
    setShowCheckout(false);
  };

  // ✅ Add to Cart
  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
      showToast(`${item.name} added to cart!`);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
      showToast(`${item.name} added to cart!`);
    }
  };

  // ➕ Increase Quantity
  const increaseQty = (id) => {
    const item = cart.find((i) => i.id === id);
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
    showToast(`${item.name} added to cart!`);
  };

  // ➖ Decrease Quantity
  const decreaseQty = (id) => {
    const item = cart.find((i) => i.id === id);
    const newCart = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(newCart);

    if (item.quantity === 1) {
      showToast(`${item.name} removed from cart!`);
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const filteredMenu =
    category === "all"
      ? menu
      : menu.filter((item) => item.category === category);

  // 💳 Checkout
  const handleCheckout = () => {
    if (cart.length === 0) return;
    setShowCheckout(true);
  };

  // ✅ Place Order
  const placeOrder = () => {
    if (cart.length === 0) return;
    setCart([]);
    setShowCheckout(false);
    closeCart();
    showToast("Order placed successfully! 🔥");
  };

  return (
    <div>
      {/* NAVBAR */}
      <Navbar
        totalItems={totalItems}
        totalPrice={totalPrice}
        setShowCart={openCart}
      />

      {/* HERO SECTION */}
      <div className="hero">
        <div className="hero-text">
          <h1>🔥 Insta-Broiler</h1>
          <p>Grilled. Juicy. Unforgettable.</p>
        </div>
      </div>

      {/* CATEGORY BUTTONS */}
      <div className="category-container">
        <button className={category === "all" ? "active" : ""} onClick={() => setCategory("all")}>All</button>
        <button className={category === "grill" ? "active" : ""} onClick={() => setCategory("grill")}>Grill Specials</button>
        <button className={category === "royal" ? "active" : ""} onClick={() => setCategory("royal")}>Signature Royals</button>
        <button className={category === "classic" ? "active" : ""} onClick={() => setCategory("classic")}>Classic Bites</button>
        <button className={category === "sides" ? "active" : ""} onClick={() => setCategory("sides")}>Sides</button>
        <button className={category === "drinks" ? "active" : ""} onClick={() => setCategory("drinks")}>Drinks</button>
        <button className={category === "dessert" ? "active" : ""} onClick={() => setCategory("dessert")}>Desserts</button>
      </div>

      {/* MENU GRID */}
      <div className="menu-grid">
        {filteredMenu.map((item) => (
          <BurgerCard
            key={item.id}
            burger={item}
            addToCart={() => addToCart(item)}
            cart={cart}
            increaseQty={increaseQty}
            decreaseQty={decreaseQty}
          />
        ))}
      </div>

      {/* SLIDING CART */}
      {showCart && (
        <div className="cart-overlay" onClick={closeCart}>
          <div
            className={`cart-panel ${animateCart ? "open" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cart-header">
              <h2>Your Cart 🛒</h2>
              <button onClick={closeCart}>X</button>
            </div>

            {cart.length === 0 && <p>Cart is empty</p>}

            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div>
                  <h4>{item.name}</h4>
                  <p>₹ {item.price} x {item.quantity}</p>
                </div>

                <div className="cart-buttons">
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>
              </div>
            ))}

            <h3>Total: ₹ {totalPrice}</h3>

            {cart.length > 0 && !showCheckout && (
              <button className="checkout-btn" onClick={handleCheckout}>
                Checkout
              </button>
            )}

            {/* ✅ CHECKOUT MODAL */}
            {showCheckout && (
              <div className="checkout-modal">
                <h2>Review Your Order</h2>

                {cart.map((item) => (
                  <div key={item.id} className="checkout-item">
                    <span>{item.name}</span>
                    <div className="checkout-qty">
                      <button onClick={() => decreaseQty(item.id)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQty(item.id)}>+</button>
                    </div>
                    <span>₹ {item.price * item.quantity}</span>
                  </div>
                ))}

                <h3>Total: ₹ {totalPrice}</h3>

                <button className="place-order-btn" onClick={placeOrder}>
                  Place Order
                </button>

                <button className="back-btn" onClick={() => setShowCheckout(false)}>
                  Back to Cart
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 🔔 Toast Notification */}
      {toast.show && (
        <div className="toast">
          {toast.message}
        </div>
      )}
    </div>
  );
}

export default Home;
