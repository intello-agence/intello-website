// src/hooks/useProtoManifest.js
import { useState, useEffect } from "react";

/**
 * Hook partagé pour charger et mettre en cache le manifest des prototypes
 * public/prototypes/manifest.json
 */
export default function useProtoManifest() {
  const [available, setAvailable] = useState([]);   // liste des IDs de prototypes
  const [loading, setLoading] = useState(true);     // état de chargement
  const [error, setError] = useState(null);         // message d’erreur éventuel

  useEffect(() => {
    let active = true; // évite update si le composant est démonté

    async function loadManifest() {
      setLoading(true);
      try {
        const res = await fetch("/prototypes/manifest.json", { cache: "no-store" });
        if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);

        const json = await res.json();
        if (active) {
          const list = Array.isArray(json.available) ? json.available : [];
          setAvailable(list);
          setError(null);
        }
      } catch (err) {
        if (active) {
          console.error("Erreur chargement manifest:", err);
          setError(err.message || "Erreur de chargement du manifest");
          setAvailable([]);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadManifest();
    return () => {
      active = false;
    };
  }, []);

  return { available, loading, error };
}
