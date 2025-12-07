import React from "react";
import Card from "./Card";

export default function Lista({ items }) {
  return (
    <div className="grid">
      {items.map(m => (
        <Card key={m.id} movie={m} />
      ))}
    </div>
  );
}
