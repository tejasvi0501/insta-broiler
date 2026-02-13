import React, { useState } from "react";
import BurgerCard from "../components/BurgerCard";
import Navbar from "../components/Navbar";
import "./Home.css";

function Home() {
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("all");
  const [showCart, setShowCart] = useState(false);
  const [animateCart, setAnimateCart] = useState(false);

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
    { id: 11, name: "Oreo Cream Cup", price: 89, category: "dessert", image: "https://bestfriendsforfrosting.com/wp-content/uploads/2021/10/EASY-OREO-CHEESECAKE-CUPS-4-763x1024.jpg" },
    { id: 12, name: "Molten Lava Cake", price: 109, category: "dessert", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c" }
  ];

  // 🛒 Cart functions
  const openCart = () => { setShowCart(true); setTimeout(() => setAnimateCart(true), 10); };
  const closeCart = () => { setAnimateCart(false); setTimeout(() => setShowCart(false), 300); };

  const addToCart = (item) => {
    const existing = cart.find((c) => c.id === item.id);
    if (existing) {
      setCart(cart.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
    } else setCart([...cart, { ...item, quantity: 1 }]);
  };

  const increaseQty = (id) => setCart(cart.map(c => c.id === id ? { ...c, quantity: c.quantity + 1 } : c));
  const decreaseQty = (id) => setCart(cart.map(c => c.id === id ? { ...c, quantity: c.quantity - 1 } : c).filter(c => c.quantity > 0));

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const filteredMenu = category === "all" ? menu : menu.filter(i => i.category === category);

  return (
    <div>
      <Navbar totalItems={totalItems} totalPrice={totalPrice} setShowCart={openCart} />

      {/* HERO */}
      <div className="hero">
        <div className="hero-text">
          <h1>🔥 Insta-Broiler</h1>
          <p>Grilled. Juicy. Unforgettable.</p>
        </div>
      </div>

      {/* CATEGORY */}
      <div className="category-container">
        {["all","grill","royal","classic","sides","drinks","dessert"].map(cat => (
          <button
            key={cat}
            className={category === cat ? "active" : ""}
            onClick={() => setCategory(cat)}
          >
            {cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* MENU */}
      <div className="menu-grid">
        {filteredMenu.map(item => (
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

      {/* CART */}
      {showCart && (
        <div className="cart-overlay" onClick={closeCart}>
          <div className={`cart-panel ${animateCart ? "open" : ""}`} onClick={e => e.stopPropagation()}>
            <div className="cart-header">
              <h2>Your Cart 🛒</h2>
              <button onClick={closeCart}>X</button>
            </div>

            <div className="cart-items">
              {cart.length === 0 && <p>Cart is empty</p>}
              {cart.map(item => (
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
            </div>

            <div className="cart-footer">
              <h3>Total: ₹ {totalPrice}</h3>
              <button className="checkout-btn">Checkout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
