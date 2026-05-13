"use client";

import { useState, useEffect } from "react";
import type { Property } from "@/lib/types";
import { approveProperty, deleteProperty, getPendingProperties } from "@/lib/actions";
import Logo from "@/components/Logo";

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
    if (authenticated) loadPending();
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
    } catch { setError("Erro ao aprovar imóvel"); }
  }

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja eliminar este imóvel?")) return;
    try {
      await deleteProperty(id);
      setActionMsg("Imóvel eliminado!");
      loadPending();
    } catch { setError("Erro ao eliminar imóvel"); }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-10 max-w-sm w-full">
          <div className="text-center mb-8">
            <Logo size="md" className="justify-center mb-6" />
            <h1 className="text-2xl font-bold text-gray-900">Administração</h1>
            <p className="text-gray-500 text-sm mt-1">Introduza a palavra-passe para aceder</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}
            <div>
              <input
                type="password" value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                placeholder="Palavra-passe"
              />
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-primary to-accent-gold text-white py-3 rounded-xl font-semibold hover:from-primary-dark hover:to-stone-500 transition-all active:scale-[0.98]">
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 pt-28">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Admin</span>
          <h1 className="text-2xl font-bold text-gray-900 mt-1">Imóveis Pendentes</h1>
        </div>
        <button onClick={loadPending} className="text-sm text-primary font-medium hover:underline flex items-center gap-1.5 bg-primary-light px-4 py-2 rounded-full">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Atualizar
        </button>
      </div>

      {actionMsg && (
        <div className="bg-primary-light border border-primary/20 text-primary px-4 py-3 rounded-xl mb-4 text-sm flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {actionMsg}
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-16">
          <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">A carregar...</p>
        </div>
      ) : pendingProps.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl">
          <div className="w-20 h-20 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-500 font-medium">Nenhum imóvel pendente de aprovação.</p>
          <p className="text-gray-400 text-sm mt-1">Todos os anúncios foram processados.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingProps.map((property) => (
            <div key={property.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                    <span className="text-xs font-medium text-amber-600 uppercase">Pendente</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 truncate">{property.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {property.city}{property.neighborhood && `, ${property.neighborhood}`} &middot; {property.type} &middot; {property.listing_type === "venda" ? "Venda" : "Arrendamento"}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Agente: {property.agent_name} &middot; WhatsApp: {property.agent_whatsapp}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Enviado em {new Date(property.created_at).toLocaleDateString("pt-PT")}
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => handleApprove(property.id)} className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-dark transition-all active:scale-[0.97] flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Aprovar
                  </button>
                  <button onClick={() => handleDelete(property.id)} className="bg-red-50 text-red-600 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-red-100 transition-all active:scale-[0.97] flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
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
