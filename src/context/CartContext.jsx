import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem("peli_cart");
    if (raw) {
      try {
        setItems(JSON.parse(raw));
      } catch (e) {
        setItems([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("peli_cart", JSON.stringify(items));
  }, [items]);

  function addItem(product, qty = 1) {
    setItems(prev => {
      const exist = prev.find(i => i.id === product.id);
      if (exist) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, { ...product, qty }];
    });
  }

  function updateQty(productId, qty) {
    setItems(prev => prev.map(i => i.id === productId ? { ...i, qty: Math.max(1, qty) } : i));
  }

  function removeItem(productId) {
    setItems(prev => prev.filter(i => i.id !== productId));
  }

  function clearCart() {
    setItems([]);
  }

  const totalItems = items.reduce((s, it) => s + (it.qty || 0), 0);
  const totalPrice = items.reduce((s, it) => s + ((Number(it.price) || 0) * (it.qty || 0)), 0);

  function checkout(customer = { name: "Cliente", email: "demo@example.com" }) {
    if (!items || items.length === 0) {
      return { success: false, message: "Carrito vacío" };
    }

    const order = {
      id: `ORD-${Date.now()}`,
      createdAt: new Date().toISOString(),
      customer,
      items: items.map(i => ({ id: i.id, title: i.title, qty: i.qty, price: Number(i.price) || 0 })),
      totalItems,
      totalPrice
    };

    try {
      const raw = localStorage.getItem("peli_orders");
      const orders = raw ? JSON.parse(raw) : [];
      orders.push(order);
      localStorage.setItem("peli_orders", JSON.stringify(orders));
      setItems([]);
      return { success: true, order };
    } catch (e) {
      return { success: false, message: "Error guardando pedido" };
    }
  }

  return (
    <CartContext.Provider value={{
      items, addItem, updateQty, removeItem, clearCart,
      totalItems, totalPrice, checkout
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
