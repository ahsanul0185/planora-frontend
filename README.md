# Planora – Premium Event Management Experience

Planora is a state-of-the-art frontend application designed to provide a seamless, high-performance experience for event organizers and participants. Focused on modern design principles, it delivers a fluid, animated interface with industrial-grade reliability.

---

## 🎨 Design & Experience

- **Aesthetics**: Premium editorial design with dynamic typography and dark mode support.
- **Interactions**: Smooth micro-animations powered by [Framer Motion](https://www.framer.com/motion/).
- **Responsiveness**: Mobile-first architecture with adaptive layouts for all viewports.
- **Components**: High-quality UI components built with [Radix UI](https://www.radix-ui.com) and [Shadcn UI](https://ui.shadcn.com).

---

## 🚀 Built With

### Core Tech
- **Framework**: [Next.js 15](https://nextjs.org) (App Router, Server Components)
- **Library**: [React 19](https://react.dev)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com) (Modern utility-first styling)
- **Scripts**: [Bun Runtime](https://bun.sh) (Ultra-fast development)

### State & Logic
- **Data Fetching**: [TanStack Query v5](https://tanstack.com/query) (Hydration & Caching)
- **Form Handling**: [TanStack Form](https://tanstack.com/form) (Headless & Type-safe)
- **Tables**: [TanStack Table](https://tanstack.com/table) (Sorting, Filtering, Pagination)
- **Validation**: [Zod](https://zod.dev)

### Infrastructure
- **Transitions**: [Framer Motion](https://framer.com/motion)
- **Charts**: [Recharts](https://recharts.org) & [Chart.js](https://www.chartjs.org)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski) (Toasts)
- **Carousel**: [Embla Carousel](https://www.embla-carousel.com)

---

## ✨ Key Features

### 🔍 Discovery Engine
- **Search & Filter**: Real-time event discovery with category tagging and multi-sort logic.
- **Interactive Details**: Detailed event views with map integration, organizers, and dynamic reviews.

### 🎭 Multi-Role Dashboards
- **Admin**: Full-scale moderation tools, user management, and visually rich analytics charts.
- **User**: Comprehensive event lifecycle management, participation tracking, and secure payment history.
- **Host**: Intuitive event creation (Rich Text), participant approval workflows, and invitation systems.

### 💳 Seamless Integration
- **Stripe Payments**: Integrated checkout flows for paid events.
- **Real-time Feedback**: Instant UI updates and toast notifications for all critical actions.
- **Optimized Performance**: Next.js Server-Side Rendering (SSR) for SEO and lightning-fast page loads.

---

## 🛠️ Getting Started

### Prerequisites
- [Bun](https://bun.sh) (Recommended) or Node.js (v20+)
- Planora Backend API (Running)

### Installation

1. **Clone & Install Dependencies**:
   ```bash
   git clone <repository-url>
   cd planora-frontend
   bun install
   ```

2. **Environment Configuration**:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL="http://localhost:5000/api/v1"
   # Add additional variables as needed
   ```

3. **Run Development Server**:
   ```bash
   bun dev
   ```

---

## 📝 Available Scripts
- `bun dev`: Start development server with Bun.
- `bun run build`: Build for production.
- `bun run start`: Start production server.
- `bun run lint`: Run ESLint checks.

---

## 👨‍💻 Author

**Ahsanul Haque**
- Website: [ahsanul.dev](https://ahsanul.dev)
- Portfolio: [GitHub](https://github.com/ahsanul-dev)

---

## ⚖️ License
Distributed under the ISC License.
