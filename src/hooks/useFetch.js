import { useEffect, useState } from "react";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    fetch(url)
      .then(r => {
        if (!r.ok) throw new Error("Fetch error");
        return r.json();
      })
      .then(json => mounted && setData(json))
      .catch(e => mounted && setError(e))
      .finally(() => mounted && setLoading(false));

    return () => { mounted = false };
  }, [url]);

  return { data, loading, error };
}
