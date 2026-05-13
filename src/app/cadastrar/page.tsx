"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProperty, uploadPhoto } from "@/lib/api";
import type { PropertyFormData } from "@/lib/types";

const CITIES = ["Maputo", "Matola", "Beira", "Nampula"];
const TYPES = ["Apartamento", "Casa", "Terreno", "Comercial"];
const PROVINCES_LIST = ["Maputo Cidade", "Maputo Província", "Gaza", "Inhambane", "Sofala", "Manica", "Tete", "Zambézia", "Nampula", "Cabo Delgado", "Niassa"];

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
    province: "",
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
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
        province: form.province,
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
        await fetch(`/api/properties/${property.id}/photos`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ photos: photoUrls }),
        });
      }

      setSuccess(true);
      setTimeout(() => router.push("/"), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar o anúncio");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent-gold rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Anúncio Enviado!</h2>
        <p className="text-gray-500">O seu imóvel será publicado após aprovação da nossa equipa. Redirecionando...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 pt-28">
      <div className="mb-8">
        <span className="text-primary font-semibold text-sm uppercase tracking-wider">Publicar</span>
        <h1 className="text-3xl font-bold text-gray-900 mt-2">Listar Imóvel</h1>
        <p className="text-gray-500 mt-1">Preencha os dados do imóvel para publicar o anúncio.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm flex items-center gap-2">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormSection title="Informação do Imóvel" icon={
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        }>
          <Field label="Título do Anúncio *">
            <input
              type="text" name="title" required value={form.title} onChange={handleChange}
              placeholder="Ex: Apartamento T3 no Centro de Maputo"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm transition-all"
            />
          </Field>

          <Field label="Descrição *">
            <textarea
              name="description" required rows={4} value={form.description} onChange={handleChange}
              placeholder="Descreva o imóvel em detalhe..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm transition-all resize-none"
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Preço (MZN) *">
              <input type="number" name="price" required min={1} value={form.price} onChange={handleChange} placeholder="Ex: 5000000" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
            </Field>
            <Field label="Finalidade *">
              <select name="listing_type" required value={form.listing_type} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary text-sm appearance-none">
                <option value="">Selecionar</option>
                <option value="venda">Venda</option>
                <option value="arrendamento">Arrendamento</option>
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="Província *">
              <select name="province" required value={form.province} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary text-sm appearance-none">
                <option value="">Selecionar</option>
                {PROVINCES_LIST.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </Field>
            <Field label="Cidade *">
              <input type="text" name="city" required value={form.city} onChange={handleChange} placeholder="Ex: Maputo" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
            </Field>
            <Field label="Bairro">
              <input type="text" name="neighborhood" value={form.neighborhood} onChange={handleChange} placeholder="Ex: Sommerschield" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Tipo de Imóvel *">
              <select name="type" required value={form.type} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary text-sm appearance-none">
                <option value="">Selecionar</option>
                {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Área (m²)">
              <input type="number" name="size" min={0} value={form.size} onChange={handleChange} placeholder="Ex: 150" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="Quartos">
              <input type="number" name="bedrooms" min={0} value={form.bedrooms} onChange={handleChange} placeholder="Ex: 3" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
            </Field>
            <Field label="Casas de Banho">
              <input type="number" name="bathrooms" min={0} value={form.bathrooms} onChange={handleChange} placeholder="Ex: 2" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
            </Field>
            <Field label="Mobiliado">
              <select name="furnished" value={form.furnished} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary text-sm appearance-none">
                <option value="false">Não</option>
                <option value="true">Sim</option>
              </select>
            </Field>
          </div>
        </FormSection>

        <FormSection title="Informação do Agente" icon={
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        }>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Nome do Agente *">
              <input type="text" name="agent_name" required value={form.agent_name} onChange={handleChange} placeholder="Seu nome" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
            </Field>
            <Field label="WhatsApp *">
              <input type="tel" name="agent_whatsapp" required value={form.agent_whatsapp} onChange={handleChange} placeholder="Ex: 258840000000" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
              <p className="text-xs text-gray-400 mt-1">Número com código do país (258 para Moçambique)</p>
            </Field>
          </div>
        </FormSection>

        <FormSection title="Fotos" icon={
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        }>
          <p className="text-sm text-gray-500 mb-4">Adicione até 5 fotos do imóvel. Formatos: JPG, PNG.</p>
          <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-primary/50 transition-colors bg-gray-50/50">
            <input
              type="file" accept="image/*" multiple onChange={handleFiles}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark transition-colors cursor-pointer"
            />
            {files.length > 0 && (
              <p className="text-sm text-gray-500 mt-3">{files.length} foto{files.length > 1 ? "s" : ""} selecionada{files.length > 1 ? "s" : ""}</p>
            )}
          </div>
        </FormSection>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-gradient-to-r from-primary to-accent-gold text-white py-3.5 rounded-xl font-bold text-base hover:from-primary-dark hover:to-stone-500 transition-all hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "A enviar..." : "Enviar Anúncio"}
        </button>

        <p className="text-xs text-gray-400 text-center">O anúncio será analisado pela nossa equipa e publicado após aprovação.</p>
      </form>
    </div>
  );
}

function FormSection({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-5">
      <h2 className="font-bold text-gray-900 flex items-center gap-2 text-lg">
        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">{icon}</svg>
        {title}
      </h2>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      {children}
    </div>
  );
}
