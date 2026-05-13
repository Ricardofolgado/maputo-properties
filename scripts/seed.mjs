#!/usr/bin/env node
import { createClient } from "@supabase/supabase-js";
import ws from "ws";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env.local
try {
  const envPath = resolve(__dirname, "..", ".env.local");
  const lines = readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const [key, ...rest] = line.split("=");
    if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
  }
} catch {}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  realtime: { transport: ws },
});

const PROVINCES = [
  "Maputo Cidade", "Maputo Província", "Gaza", "Inhambane", "Sofala",
  "Manica", "Tete", "Zambézia", "Nampula", "Cabo Delgado", "Niassa",
];

const CITIES_BY_PROVINCE = {
  "Maputo Cidade": ["Maputo"],
  "Maputo Província": ["Matola", "Boane", "Manhiça", "Marracuene"],
  Gaza: ["Xai-Xai", "Chókwè", "Chibuto", "Praia do Bilene"],
  Inhambane: ["Inhambane", "Maxixe", "Vilanculos"],
  Sofala: ["Beira", "Dondo", "Gorongosa"],
  Manica: ["Chimoio", "Manica", "Gondola"],
  Tete: ["Tete", "Moatize", "Cahora-Bassa"],
  Zambézia: ["Quelimane", "Gurúè", "Mocuba"],
  Nampula: ["Nampula", "Nacala", "Ilha de Moçambique"],
  "Cabo Delgado": ["Pemba", "Montepuez", "Mocímboa da Praia"],
  Niassa: ["Lichinga", "Cuamba", "Metangula"],
};

const NEIGHBORHOODS = {
  "Maputo": ["Sommerschield", "Polana", "Alto Maé", "Central", "Baixa", "Coop", "Triunfo", "Costa do Sol"],
  "Matola": ["Matola A", "Matola B", "Fomento", "Machava", "Infulene"],
  "Beira": ["Ponta-Gêa", "Matacuane", "Estoril", "Macuti", "Manga", "Munhava"],
  "Nampula": ["Namicopo", "Carrupeia", "Muhala", "Natala", "Muatala"],
  "Xai-Xai": ["Praia", "Chilunguine", "Cimento"],
  "Chimoio": ["Vila Nova", "Trangrossa", "Mandarinnen"],
  "Tete": ["Matundo", "Chingodzi", "Moatize"],
  "Quelimane": ["Pedreira", "Sambalangue", "Madiane"],
  "Pemba": ["Cimento", "Marringanha", "Paquite"],
  "Vilanculos": ["Aeroporto", "Vila Nova", "Macovane"],
  "Maxixe": ["Chambone", "Muele"],
  "Nacala": ["Porto", "Sede", "Matadouro"],
  "Lichinga": ["Cimento", "Massangulo", "Sanjala"],
};

const agents = [
  { name: "Carlos Tembe", whatsapp: "258820000001" },
  { name: "Maria Langa", whatsapp: "258820000002" },
  { name: "João Matsinhe", whatsapp: "258820000003" },
  { name: "Ana Muchanga", whatsapp: "258820000004" },
  { name: "Pedro Nkuna", whatsapp: "258820000005" },
  { name: "Helena Cossa", whatsapp: "258820000006" },
];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateProperty() {
  const province = randomItem(PROVINCES);
  const cities = CITIES_BY_PROVINCE[province];
  const city = randomItem(cities);
  const hoods = NEIGHBORHOODS[city] || ["Centro", "Cidade Nova", "Bairro Central"];
  const neighborhood = randomItem(hoods);

  const types = ["Apartamento", "Casa", "Terreno", "Comercial"];
  const type = randomItem(types);
  const bedrooms = type === "Apartamento" ? randomInt(1, 4) : type === "Casa" ? randomInt(2, 5) : 0;
  const bathrooms = Math.max(1, bedrooms - randomInt(0, 1));
  const size = type === "Terreno" ? randomInt(300, 2000) : type === "Comercial" ? randomInt(50, 500) : randomInt(60, 300);
  const furnished = type === "Apartamento" ? Math.random() > 0.5 : false;
  const listingType = type === "Terreno" ? "venda" : Math.random() > 0.4 ? "venda" : "arrendamento";

  let title;
  if (type === "Terreno") title = `Terreno de ${size}m² em ${neighborhood}, ${city}`;
  else if (type === "Comercial") title = `Espaço Comercial em ${neighborhood}, ${city}`;
  else if (type === "Apartamento") title = `Apartamento T${bedrooms} em ${neighborhood}, ${city}`;
  else title = `Casa T${bedrooms} em ${neighborhood}, ${city}`;

  const priceMinMax = {
    "Apartamento": listingType === "venda" ? [3500000, 15000000] : [15000, 60000],
    "Casa": listingType === "venda" ? [5000000, 25000000] : [25000, 100000],
    "Terreno": [500000, 8000000],
    "Comercial": listingType === "venda" ? [3000000, 30000000] : [20000, 120000],
  };

  const [priceMin, priceMax] = priceMinMax[type];
  const price = randomInt(priceMin, priceMax);

  const descTemplates = {
    "Apartamento": [
      `Deslumbrante apartamento localizado em ${neighborhood}, ${city}. Com ${bedrooms} quarto${bedrooms > 1 ? "s" : ""}, ${bathrooms} casa${bathrooms > 1 ? "s" : ""} de banho e ${size}m² de área. Conta com cozinha equipada, sala espaçosa, varanda e lugar de estacionamento. Próximo de supermercados, escolas e transportes.`,
      `Excelente apartamento com acabamentos de primeira qualidade em ${city}, bairro ${neighborhood}. ${bedrooms} quartos, sala ampla com ar condicionado, cozinha moderna. Prédio com segurança 24h. Ideal para quem procura conforto e comodidade.`,
    ],
    "Casa": [
      `Linda casa localizada em ${neighborhood}, ${city}. Com ${bedrooms} quarto${bedrooms > 1 ? "s" : ""}, ${bathrooms} casa${bathrooms > 1 ? "s" : ""} de banho e ${size}m² de construção. Cozinha ampla, sala de estar, área de lazer e jardim. Garagem para ${randomInt(1, 3)} carros.`,
      `Moradia moderna em ${city}, bairro ${neighborhood}. Casa com ${bedrooms} quartos (1 suíte), sala de estar e jantar, cozinha planejada, área de serviço. Quintal espaçoso. Ótimo estado de conservação.`,
    ],
    "Terreno": [
      `Terreno com ${size}m² em ${neighborhood}, ${city}. Plano, vedado e com acesso a água e electricidade. Excelente para construção de moradia. Zona em crescimento com infra-estruturas básicas.`,
      `Excelente terreno com potencial construtivo em ${city}, ${neighborhood}. ${size}m², documentação regularizada. Perfeito para investimento. Preço negociável.`,
    ],
    "Comercial": [
      `Espaço comercial em ${neighborhood}, ${city}. ${size}m² ideal para restaurante, loja ou escritório. Boa visibilidade e movimento. Estacionamento privativo. Pronto a funcionar.`,
      `Gabinete moderno em ${city}, ${neighborhood}. ${size}m² com recepção, ${randomInt(2, 4)} salas e copa. Ar condicionado e alarme. Perfeito para escritórios ou consultórios.`,
    ],
  };

  const description = randomItem(descTemplates[type]);
  const agent = randomItem(agents);

  const photos = [
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
    "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
  ];

  return {
    title, description, price, province, city, neighborhood,
    type, listing_type: listingType, bedrooms, bathrooms, size, furnished,
    agent_name: agent.name, agent_whatsapp: agent.whatsapp,
    photos, status: "approved",
  };
}

async function seed() {
  console.log("Generating 25 properties across Mozambique...\n");
  const properties = Array.from({ length: 25 }, generateProperty);

  console.log(`Inserting ${properties.length} properties...`);
  const { data, error } = await supabase.from("properties").insert(properties).select();

  if (error) {
    console.error("Error inserting:", error);
    process.exit(1);
  }

  console.log(`\n✅ Successfully inserted ${data?.length || 0} properties!\n`);
  console.log("--- Summary ---");
  const counts = {};
  for (const p of properties) { counts[p.province] = (counts[p.province] || 0) + 1; }
  for (const [province, count] of Object.entries(counts).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${province}: ${count} imóve${count > 1 ? "is" : "l"}`);
  }
  console.log(`\nTotal: ${properties.length} imóveis em ${Object.keys(counts).length} províncias`);
}

seed();
