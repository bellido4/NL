/**
 * Tipado manual provisional de las tablas de Supabase.
 * Sustituir por los tipos autogenerados con:
 *   npx supabase gen types typescript --project-id <id> > src/types/database.ts
 */

export type UserRole = 'client' | 'admin';

export type OrderStatus =
  | 'pending'
  | 'accepted'
  | 'preparing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface Profile {
  id: string;
  role: UserRole;
  full_name: string;
  company_name: string | null;
  tax_id: string | null; // CIF
  phone: string | null;
  is_active: boolean;
  must_change_password: boolean;
  created_at: string;
}

export interface Brand {
  id: string;
  name: string;
  logo_url: string | null;
}

export interface Category {
  id: string;
  name: string;
  parent_id: string | null;
  icon: string | null;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  brand_id: string;
  category_id: string;
  reference: string;
  format: string | null; // ej: "5L", "20L", "208L"
  viscosity: string | null;
  price: number;
  vat_rate: number;
  stock: number;
  is_visible: boolean;
  is_featured: boolean;
  images: string[];
  datasheet_url: string | null;
  created_at: string;
}

export interface Address {
  id: string;
  client_id: string;
  label: string;
  street: string;
  city: string;
  postal_code: string;
  province: string;
  is_default: boolean;
}

export interface Order {
  id: string;
  client_id: string;
  status: OrderStatus;
  address_id: string;
  notes: string | null;
  total: number;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
}

export interface Favorite {
  id: string;
  client_id: string;
  product_id: string;
  created_at: string;
}

export interface Promotion {
  id: string;
  title: string;
  banner_url: string;
  discount_percent: number | null;
  starts_at: string;
  ends_at: string;
  product_ids: string[];
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  target: 'all' | 'client' | 'segment';
  target_id: string | null;
  sent_at: string;
}

// Placeholder mínimo para que supabase-js pueda tipar el cliente
// hasta generar el esquema real.
export interface Database {
  public: {
    Tables: Record<string, { Row: Record<string, unknown> }>;
  };
}
