import React, { useEffect, useRef, useState } from "react";

export default function Slider({ imagenes }) {
  const [index, setIndex] = useState(0);
  const ref = useRef();

  useEffect(() => {
    ref.current = setInterval(() => {
      setIndex(i => (i + 1) % imagenes.length);
    }, 3000);
    return () => clearInterval(ref.current);
  }, []);

  return (
    <div className="slider">
      <img src={imagenes[index]} className="slider__img" />
    </div>
  );
}
