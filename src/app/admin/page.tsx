"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { Property } from "@/lib/types";
import { approveProperty, deleteProperty, getPendingProperties } from "@/lib/actions";

const ADMIN_PASSWORD = "maputo2024";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [pendingProps, setPendingProps] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionMsg, setActionMsg] = useState("");

  async function loadPending() {
    setLoading(true);
    try {
      const data = await getPendingProperties();
      setPendingProps(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao carregar");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (authenticated) {
      loadPending();
    }
  }, [authenticated]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Palavra-passe incorreta");
    }
  }

  async function handleApprove(id: string) {
    try {
      await approveProperty(id);
      setActionMsg("Imóvel aprovado com sucesso!");
      loadPending();
    } catch {
      setError("Erro ao aprovar imóvel");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja eliminar este imóvel?")) return;
    try {
      await deleteProperty(id);
      setActionMsg("Imóvel eliminado!");
      loadPending();
    } catch {
      setError("Erro ao eliminar imóvel");
    }
  }

  if (!authenticated) {
    return (
      <div className="max-w-sm mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Administração
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Palavra-passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Introduza a palavra-passe"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Administração - Imóveis Pendentes
        </h1>
        <button
          onClick={loadPending}
          className="text-sm text-primary font-medium hover:underline"
        >
          Atualizar
        </button>
      </div>

      {actionMsg && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm">
          {actionMsg}
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-gray-500 text-center py-8">A carregar...</p>
      ) : pendingProps.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <svg
            className="w-16 h-16 mx-auto text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-gray-500">Nenhum imóvel pendente de aprovação.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingProps.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {property.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {property.city}
                    {property.neighborhood && `, ${property.neighborhood}`} |{" "}
                    {property.type} |{" "}
                    {property.listing_type === "venda"
                      ? "Venda"
                      : "Arrendamento"}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Agente: {property.agent_name} | WhatsApp:{" "}
                    {property.agent_whatsapp}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Enviado em{" "}
                    {new Date(property.created_at).toLocaleDateString("pt-PT")}
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleApprove(property.id)}
                    className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
                  >
                    Aprovar
                  </button>
                  <button
                    onClick={() => handleDelete(property.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
