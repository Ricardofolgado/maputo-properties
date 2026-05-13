# Maputo Properties

Plataforma de anúncios imobiliários para Moçambique. Construída com Next.js, Tailwind CSS e Supabase.

## Tech Stack

- **Frontend:** Next.js 16 (App Router) + Tailwind CSS v4 + TypeScript
- **Database & Storage:** Supabase (PostgreSQL + Storage para fotos)
- **Deploy:** Vercel

## Getting Started

### 1. Clone e instale dependências

```bash
npm install
```

### 2. Configure o Supabase

Crie um projeto em [supabase.com](https://supabase.com) e execute o SQL em `supabase-migration.sql` no SQL Editor.

Crie um bucket público chamado `property-photos` no Storage do Supabase.

### 3. Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha:

```bash
cp .env.example .env.local
```

| Variável | Descrição | Onde encontrar |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL do teu projeto Supabase | Settings > API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave anónima (pública) | Settings > API |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave de serviço (privada) | Settings > API (nunca expor ao cliente) |

### 4. Executar em desenvolvimento

```bash
npm run dev
```

### 5. Fazer deploy na Vercel

Conecta o repositório à Vercel e adiciona as mesmas variáveis de ambiente no painel da Vercel.

## Credenciais de Admin

A página de administração está em `/admin`. A password predefinida é `maputo2024`. Altere-a no código em `src/app/admin/page.tsx`.

## Estrutura do Projeto

```
src/
├── app/
│   ├── page.tsx            # Página inicial
│   ├── layout.tsx          # Layout global (Navbar + Footer)
│   ├── listings/page.tsx   # Lista de imóveis com filtros
│   ├── imovel/[id]/page.tsx # Página detalhada do imóvel
│   ├── cadastrar/page.tsx  # Formulário de submissão de imóvel
│   ├── admin/page.tsx      # Painel de administração
│   └── api/                # API routes
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── PropertyCard.tsx
│   ├── PropertyFilters.tsx
│   ├── PhotoGallery.tsx
│   └── SearchBar.tsx
└── lib/
    ├── types.ts            # TypeScript types
    ├── supabase.ts         # Cliente Supabase (público)
    ├── supabase-admin.ts   # Cliente Supabase (admin/service role)
    ├── api.ts              # Funções de acesso a dados
    └── actions.ts          # Server actions (admin)
```
