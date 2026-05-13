"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProperty, uploadPhoto } from "@/lib/api";
import type { PropertyFormData } from "@/lib/types";

const CITIES = ["Maputo", "Matola", "Beira", "Nampula"];
const TYPES = ["Apartamento", "Casa", "Terreno", "Comercial"];

export default function CadastrarPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    neighborhood: "",
    type: "",
    listing_type: "",
    bedrooms: "",
    bathrooms: "",
    size: "",
    furnished: "false",
    agent_name: "",
    agent_whatsapp: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFiles(Array.from(e.target.files).slice(0, 5));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const formData: PropertyFormData = {
        title: form.title,
        description: form.description,
        price: Number(form.price),
        city: form.city,
        neighborhood: form.neighborhood,
        type: form.type as PropertyFormData["type"],
        listing_type: form.listing_type as PropertyFormData["listing_type"],
        bedrooms: Number(form.bedrooms) || 0,
        bathrooms: Number(form.bathrooms) || 0,
        size: Number(form.size) || 0,
        furnished: form.furnished === "true",
        agent_name: form.agent_name,
        agent_whatsapp: form.agent_whatsapp.replace(/[^0-9]/g, ""),
        photos: [],
      };

      const property = await createProperty(formData);

      if (files.length > 0) {
        const photoUrls: string[] = [];
        for (let i = 0; i < files.length; i++) {
          const url = await uploadPhoto(files[i], property.id, i);
          photoUrls.push(url);
        }
        // Update property with photo URLs
        await fetch(`/api/properties/${property.id}/photos`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ photos: photoUrls }),
        });
      }

      setSuccess(true);
      setTimeout(() => router.push("/"), 3000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao enviar o anúncio"
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Anúncio Enviado!
        </h2>
        <p className="text-gray-500">
          O seu imóvel será publicado após aprovação da nossa equipa.
          Redirecionando...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Listar Imóvel
      </h1>
      <p className="text-gray-500 mb-8">
        Preencha os dados do imóvel para publicar o anúncio.
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Informação do Imóvel</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título do Anúncio *
            </label>
            <input
              type="text"
              name="title"
              required
              value={form.title}
              onChange={handleChange}
              placeholder="Ex: Apartamento T3 no Centro de Maputo"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição *
            </label>
            <textarea
              name="description"
              required
              rows={4}
              value={form.description}
              onChange={handleChange}
              placeholder="Descreva o imóvel em detalhe..."
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preço (MZN) *
              </label>
              <input
                type="number"
                name="price"
                required
                min={1}
                value={form.price}
                onChange={handleChange}
                placeholder="Ex: 5000000"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Finalidade *
              </label>
              <select
                name="listing_type"
                required
                value={form.listing_type}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Selecionar</option>
                <option value="venda">Venda</option>
                <option value="arrendamento">Arrendamento</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cidade *
              </label>
              <select
                name="city"
                required
                value={form.city}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Selecionar</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bairro
              </label>
              <input
                type="text"
                name="neighborhood"
                value={form.neighborhood}
                onChange={handleChange}
                placeholder="Ex: Sommerschield"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Imóvel *
              </label>
              <select
                name="type"
                required
                value={form.type}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Selecionar</option>
                {TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Área (m²)
              </label>
              <input
                type="number"
                name="size"
                min={0}
                value={form.size}
                onChange={handleChange}
                placeholder="Ex: 150"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quartos
              </label>
              <input
                type="number"
                name="bedrooms"
                min={0}
                value={form.bedrooms}
                onChange={handleChange}
                placeholder="Ex: 3"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Casas de Banho
              </label>
              <input
                type="number"
                name="bathrooms"
                min={0}
                value={form.bathrooms}
                onChange={handleChange}
                placeholder="Ex: 2"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobiliado
              </label>
              <select
                name="furnished"
                value={form.furnished}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="false">Não</option>
                <option value="true">Sim</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Informação do Agente</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome do Agente *
              </label>
              <input
                type="text"
                name="agent_name"
                required
                value={form.agent_name}
                onChange={handleChange}
                placeholder="Seu nome"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                WhatsApp *
              </label>
              <input
                type="tel"
                name="agent_whatsapp"
                required
                value={form.agent_whatsapp}
                onChange={handleChange}
                placeholder="Ex: 258840000000"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <p className="text-xs text-gray-400 mt-1">
                Número com código do país (258 para Moçambique)
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Fotos</h2>
          <p className="text-sm text-gray-500">
            Adicione até 5 fotos do imóvel. Formatos: JPG, PNG.
          </p>

          <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFiles}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:bg-primary-dark cursor-pointer"
            />
            {files.length > 0 && (
              <p className="text-sm text-gray-500 mt-2">
                {files.length} foto{files.length > 1 ? "s" : ""} selecionada
                {files.length > 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "A enviar..." : "Enviar Anúncio"}
        </button>

        <p className="text-xs text-gray-400 text-center">
          O anúncio será analisado pela nossa equipa e publicado após aprovação.
        </p>
      </form>
    </div>
  );
}
