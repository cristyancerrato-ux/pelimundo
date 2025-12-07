import React, { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Carrito() {
  const { items, updateQty, removeItem, clearCart, totalItems, totalPrice, checkout } = useCart();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  if (!items || items.length === 0) {
    return (
      <div className="container">
        <h2>Carrito</h2>
        <p>Tu carrito está vacío.</p>
      </div>
    );
  }

  async function handleCheckout() {
    setLoading(true);
    setResult(null);
    const customer = { name: "Usuario", email: "Prueba@prueb.com" };
    await new Promise(res => setTimeout(res, 600));
    const res = checkout(customer);
    setLoading(false);
    if (res.success) {
      setResult({ ok: true, order: res.order });
    } else {
      setResult({ ok: false, message: res.message || "Error en el pago" });
    }
  }

  return (
    <div className="container">
      <h2>Carrito ({totalItems})</h2>

      <div style={{display:'grid', gap:12, marginBottom:12}}>
        {items.map(it => (
          <div key={it.id} style={{display:'flex', gap:12, alignItems:'center', background:'#111', padding:12, borderRadius:8}}>
            <img src={it.poster} alt={it.title} style={{width:72, height:105, objectFit:'cover', borderRadius:6}} />
            <div style={{flex:1}}>
              <strong>{it.title}</strong>
              <div style={{marginTop:6}}>Precio: ${Number(it.price).toFixed(2)}</div>
              <div style={{marginTop:8, display:'flex', gap:8, alignItems:'center'}}>
                <button onClick={() => updateQty(it.id, (it.qty||1) - 1)}>-</button>
                <input type="number" value={it.qty} onChange={e => updateQty(it.id, Number(e.target.value)||1)} style={{width:56, textAlign:'center'}} />
                <button onClick={() => updateQty(it.id, (it.qty||1) + 1)}>+</button>
                <button onClick={() => removeItem(it.id)} style={{marginLeft:12}}>Eliminar</button>
              </div>
            </div>
            <div style={{minWidth:100, textAlign:'right'}}>${((Number(it.price)||0) * (it.qty||0)).toFixed(2)}</div>
          </div>
        ))}
      </div>

      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:12}}>
        <div>
          <button onClick={clearCart} disabled={loading}>Vaciar carrito</button>
        </div>

        <div style={{textAlign:'right'}}>
          <div style={{marginBottom:8}}>Total: <strong>${totalPrice.toFixed(2)}</strong></div>
          <button onClick={handleCheckout} disabled={loading} style={{padding:'8px 14px', background:'#e50914', color:'#fff', border:'none', borderRadius:6, cursor:'pointer'}}>
            {loading ? "Procesando..." : "Comprar ahora"}
          </button>
        </div>
      </div>

      {result && result.ok && (
        <div style={{marginTop:16, padding:12, background:'#0b3', borderRadius:8, color:'#012'}}>
          <h3>Compra realizada</h3>
          <p>Pedido: {result.order.id}</p>
          <p>Total: ${result.order.totalPrice.toFixed(2)}</p>
        </div>
      )}

      {result && !result.ok && (
        <div style={{marginTop:16, padding:12, background:'#300', borderRadius:8, color:'#fdd'}}>
          <h3>Error</h3>
          <p>{result.message}</p>
        </div>
      )}

    </div>
  );
}
