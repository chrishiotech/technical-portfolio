# Technical Decision Framework

## 🎯 Valor en 1 Oración

"Herramienta interactiva que ayuda a CTOs y líderes técnicos a elegir entre Microservicios y Monolitos con ROI medible, evitando costosos errores arquitectónicos."

## 📊 Métricas de Éxito

- **Técnicas:** Lighthouse score >95, carga <2s, accesibilidad WCAG AA
- **Negocio:** 80% usuarios completan el flujo de 4 pasos, tiempo promedio <3 minutos
- **Usuario:** Comprende la recomendación sin necesidad de explicación adicional

## 👥 Audiencias Diferenciadas

### Versión "Humana" (Todo Público)

- **Para:** Founders, Product Managers, stakeholders no técnicos
- **Lenguaje:** Simple, analogías de negocio, ROI en $$$
- **Ejemplo:** "Microservicios = departamentos independientes, Monolito = oficina abierta"

### Versión "Especialista" (Técnicos)

- **Para:** CTOs, Arquitectos, Tech Leads
- **Lenguaje:** Técnico preciso, métricas de performance, trade-offs técnicos
- **Ejemplo:** "Latencia de red vs coherencia de datos, overhead de orquestación"

## 🏗️ Stack Tecnológico

**Frontend:** React 18, TypeScript, Tailwind CSS, Radix UI, Recharts  
**Routing:** React Router v7.13.0  
**State:** Zustand (wizardStore)  
**Visualización:** D3.js / Recharts para gráficos ROI

## 🎬 Demo en Vivo

- **URL:** [Pendiente - Vercel]
- **Flujo recomendado:**
  1. Project Overview (nombre, equipo, carga)
  2. Technical Requirements (escalabilidad, performance, expertise)
  3. Business Goals (time-to-market, costos, flexibilidad)
  4. Results (recomendación + ROI + explicación dual)

## 📈 Caso de Éxito Anonimizado

"Startup de fintech con 50k usuarios mensuales logró reducir tiempo de onboarding de features de 3 semanas a 3 días (+700% velocidad) al migrar de Monolito a Microservicios basado en esta herramienta."

## 📁 Estructura del Proyecto

07-technical-decision/
├── src/
│ ├── app/
│ │ ├── main.tsx
│ │ ├── routes.tsx
│ │ └── store.ts
│ ├── components/
│ │ ├── ProjectOverview.tsx
│ │ ├── TechnicalRequirements.tsx
│ │ ├── BusinessGoals.tsx
│ │ ├── Results.tsx
│ │ ├── WizardLayout.tsx
│ │ └── ui/ (componentes Radix UI)
│ └── styles/
│ ├── index.css
│ ├── tailwind.css
│ └── theme.css
├── ADR-001.md
├── content-dual.json
├── package.json
├── vite.config.ts
└── README.md

## 🚀 Desarrollo Local

```bash
# Instalar dependencias
pnpm install

# Ejecutar servidor de desarrollo
pnpm dev --port 3000

# Acceder en navegador
open http://localhost:3000
```

## 📝 Decisiones Clave

Ver `ADR-001.md` para decisiones arquitectónicas completas.

## 🎯 Proyecto 07 - Technical Decision Framework

Parte del portfolio técnico de Christian Aguirre (Arquitecto Frontend Senior).
Organizado en 4 dimensiones profesionales según PORTAFOLIO_UNIFICADO_20260207_200514.txt.

**Categoría:** Liderazgo Técnico
**Prioridad:** P1 (Alto Impacto)
**Timeline:** Semanas 1-2 (Febrero 2026)

## 📄 Licencia

MIT License - Christian Aguirre © 2026
