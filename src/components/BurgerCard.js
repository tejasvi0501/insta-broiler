import React from "react";
import "./BurgerCard.css";

function BurgerCard({ burger, addToCart, cart, increaseQty, decreaseQty }) {
  const cartItem = cart.find((item) => item.id === burger.id);

  return (
    <div className="burger-card">
      <img src={burger.image} alt={burger.name} />
      <h3>{burger.name}</h3>
      <p>₹ {burger.price}</p>

      {!cartItem ? (
        <button onClick={addToCart}>Add to Cart</button>
      ) : (
        <div className="quantity-controls">
          <button onClick={() => decreaseQty(burger.id)}>-</button>
          <span>{cartItem.quantity}</span>
          <button onClick={() => increaseQty(burger.id)}>+</button>
        </div>
      )}
    </div>
  );
}

export default BurgerCard;
