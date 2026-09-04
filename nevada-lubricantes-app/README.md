# Nevada Lubricantes — App Móvil

Scaffold inicial (Fase 1) de la app B2B para Nevada Lubricantes: React Native + Expo + TypeScript + Supabase.

## Qué incluye este scaffold

- Estructura de carpetas Clean Architecture (`src/{components,features,services,hooks,store,types,utils,constants,theme,lib}`)
- Expo Router con navegación por grupos: `(auth)`, `(client)`, `(admin)`
- Sistema de theming completo (claro/oscuro) con la paleta de marca exacta
- Escala tipográfica con Inter
- Cliente de Supabase con sesión persistida en Secure Store
- Store de autenticación (Zustand) con enrutado automático por rol — nunca se elige manualmente
- Store de carrito (Zustand + MMKV) con regla de "sin stock, no se añade"
- Componentes base: `Button` (con haptics + spring animation), `ProductCard`
- Pantalla de login funcional con validación Zod
- Tipos de dominio provisionales para las 12 tablas descritas (sustituir por los generados por Supabase CLI)

## Instalación

```bash
npm install
cp app.json.example app.json   # y rellena supabaseUrl / supabaseAnonKey
npx expo start
```

## Próximos pasos (por fases)

**Fase 2 — Base de datos Supabase**
Esquema SQL completo: `profiles`, `products`, `categories`, `brands`, `clients`, `orders`,
`order_items`, `favorites`, `addresses`, `notifications`, `promotions`, `audit_logs`.
Row Level Security, triggers (actualizar stock, auditoría) y funciones.

**Fase 3 — App cliente**
Catálogo con FlashList + filtros, detalle de producto, carrito, checkout, listado y detalle
de pedidos, perfil, favoritos.

**Fase 4 — Panel administrador**
Dashboard con KPIs y gráficas, CRUD de productos (con importación CSV / exportación Excel),
gestión de clientes, Kanban de pedidos con drag & drop y Realtime, promociones, envío de push.

**Fase 5 — Pulido**
Modo offline (cache + sync), exportación PDF de pedidos, tests (Jest + Testing Library),
accesibilidad (VoiceOver/TalkBack), CI con Husky + Conventional Commits.

## Notas de arquitectura

- Ningún archivo de pantalla debe crecer sin control: extraer a `src/features/<módulo>/components`.
- Todo el acceso a Supabase pasa por `src/services/`, nunca directamente desde componentes.
- Los colores viven únicamente en `src/theme/colors.ts` — no hardcodear hex en componentes.
