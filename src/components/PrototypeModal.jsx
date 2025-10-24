// src/components/PrototypeModal.jsx
import React from "react";

/**
 * PrototypeModal (version sandbox sécurisée)
 * - url: chemin vers /prototypes/<id>/index.html
 * - open: boolean (ouvrir/fermer)
 * - onClose: fonction
 * - hasProto: boolean (si true -> affiche iframe, sinon message)
 *
 * NOTE sécurité: iframe a "allow-forms allow-scripts" MAIS PAS "allow-same-origin".
 * Cela réduit les risques d'évasion du sandbox. Si ton prototype a besoin d'accéder
 * aux cookies du parent ou à des ressources same-origin, il peut être limité.
 */
export default function PrototypeModal({ url, open, onClose, hasProto }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative w-[95%] max-w-[1200px] h-[88%] bg-black rounded-xl overflow-hidden border border-gray-800 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-50 px-3 py-1 bg-gray-900/70 text-white rounded hover:opacity-90"
          aria-label="Fermer prototype"
        >
          Fermer
        </button>

        {/* Header mini */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-black/60">
          <div className="text-sm text-gray-300">Prototype interactif</div>
          <div className="text-xs text-gray-400">
            {hasProto ? "Chargement du prototype..." : "Aucun prototype disponible"}
          </div>
        </div>

        {/* Contenu */}
        <div className="w-full h-full bg-[#0b0e12] flex items-center justify-center">
          {hasProto ? (
            // ← sandbox sécurisé : allow-forms + allow-scripts (PAS allow-same-origin)
            <iframe
              title="Prototype"
              src={url}
              className="w-full h-full border-0"
              sandbox="allow-forms allow-scripts"
            />
          ) : (
            // message central quand pas de prototype
            <div className="text-center p-8 max-w-xl">
              <div className="mb-4 text-3xl font-semibold text-gray-200">Prototype non disponible</div>
              <p className="mb-6 text-gray-400">
                Il n'existe pas encore de prototype interactif pour ce projet.
                Si vous le souhaitez, vous pouvez demander la création d'un prototype.
              </p>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => {
                    window.open("/contact", "_blank", "noopener");
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded"
                >
                  Demander un prototype
                </button>

                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-700 text-gray-300 rounded"
                >
                  Fermer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
