import { useState, useEffect } from "react";

const BASE = "/api";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;
    setLoading(true);
    fetch(BASE + url)
      .then((r) => r.json())
      .then((d) => { setData(d.data ?? d); setLoading(false); })
      .catch((e) => { setError(e.message); setLoading(false); });
  }, [url]);

  return { data, loading, error };
};

export const postOrder = async (body) => {
  const r = await fetch(`${BASE}/products/checkout/order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return r.json();
};