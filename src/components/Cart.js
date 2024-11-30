import React, { useState } from "react";
import books from "./booksData"; // Assuming you have a JSON data file
import styles from "./cart.module.css";

const Cart = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [cart, setCart] = useState([]);

  const handleHover = (id) => {
    setHoveredId(id);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
  };

  const handleAddToCart = (book) => {
    const existingItem = cart.find((item) => item.id === book.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...book, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (id, quantity) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const calculateTotalPrice = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className={styles.container}>
      <div className={styles.cartList}>
        {books.map((book) => (
          <div
            key={book.id}
            className={`${styles.cartItem} ${
              hoveredId === book.id ? styles.expanded : ""
            }`}
            onMouseEnter={() => handleHover(book.id)}
            onMouseLeave={handleMouseLeave}
          >
            <div className={styles.essentialDetails}>
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Price: &#8377; {book.price}</p>
              <p>{book.discount}</p>
            </div>

            {hoveredId === book.id && (
              <div className={styles.moreDetails}>
                <p>{book.description}</p>
                <p>Category: {book.category}</p>
                <p>Course Details: {book.courseDetails}</p>
                <button
                  className={styles.addToCartBtn}
                  onClick={() => handleAddToCart(book)}
                >
                  Add to Cart
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.cartSummary}>
        <h2>Cart Summary</h2>
        {cart.length > 0 ? (
          <div className={styles.cartItems}>
            {cart.map((item) => (
              <div key={item.id} className={styles.cartItemSummary}>
                <p>{item.title}</p>
                <p>&#8377; {item.price}</p>
                <div className={styles.quantityControls}>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, Number(e.target.value))
                    }
                  />
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
                <p>Total: &#8377; {item.price * item.quantity}</p>
              </div>
            ))}
            <h3>Total Price: &#8377; {calculateTotalPrice()}</h3>
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
