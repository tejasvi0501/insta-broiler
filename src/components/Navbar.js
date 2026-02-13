import React from "react";
import "./Navbar.css";

function Navbar({ totalItems, totalPrice, setShowCart }) {
  return (
    <div className="navbar">
      <h2 className="logo">Insta-Broiler 🍔</h2>

      <div
        className="cart"
        onClick={() => setShowCart(true)}
      >
        🛒 {totalItems} | ₹ {totalPrice}
      </div>
    </div>
  );
}

export default Navbar;
