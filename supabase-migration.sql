-- Migration: Create properties table for Maputo Properties
-- Run this in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price BIGINT NOT NULL,
  province TEXT NOT NULL DEFAULT '',
  city TEXT NOT NULL,
  neighborhood TEXT DEFAULT '',
  type TEXT NOT NULL CHECK (type IN ('Apartamento', 'Casa', 'Terreno', 'Comercial')),
  listing_type TEXT NOT NULL CHECK (listing_type IN ('venda', 'arrendamento')),
  bedrooms INTEGER DEFAULT 0,
  bathrooms INTEGER DEFAULT 0,
  size INTEGER DEFAULT 0,
  furnished BOOLEAN DEFAULT false,
  agent_name TEXT NOT NULL,
  agent_whatsapp TEXT NOT NULL,
  photos TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add province column if upgrading from old schema
ALTER TABLE properties ADD COLUMN IF NOT EXISTS province TEXT NOT NULL DEFAULT '';

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_province ON properties(province);
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(type);
CREATE INDEX IF NOT EXISTS idx_properties_listing_type ON properties(listing_type);
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON properties(created_at DESC);

-- Storage bucket for property photos (run separately in Storage UI)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('property-photos', 'property-photos', true);
