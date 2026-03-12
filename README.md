<div align="center">

# 🚀 CodeMaarg

**Turn Ideas into Shipped Projects. The Developer Project Ideation and Collaboration Platform.**

[![Next.js](https://img.shields.io/badge/Next.js-15.x-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.x-2D3748?style=for-the-badge&logo=prisma)](https://prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Vector_Search-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/products/platform/atlas-vector-search)

</div>

<br />

**CodeMaarg** is a platform built to solve the developer "Cold Start" problem. It offers single-player utility through AI-generated technical learning roadmaps and scales into a multi-sided community for open-source idea validation and semantic team matchmaking.

## ✨ Core Features

* **🧠 AI Architecture & Learning Roadmaps:** Enter a project idea and your skill level. Our heavily constrained LLM pipeline generates a strict JSON roadmap outlining actionable milestones, open-source dependency recommendations, and specific backend architectural strategies.
* **🔥 Idea Validation (Product Hunt for Code):** Post your architecture ideas or MVP repos. Gather community feedback via an optimized, low-latency upvote/downvote system.
* **💬 Nested Threaded Discussions:** Deep architectural debates powered by a high-performance **Materialized Path** database pattern, allowing infinite-depth comment trees without recursive SQL queries.
* **🤝 Semantic Matchmaking Engine:** Stop cold-messaging. CodeMaarg automatically embeds user bios, preferred languages, and project descriptions into a high-dimensional vector space, matching you with developers based on a Composite Fit Score (combining Semantic Similarity, Timezone proximity, and Skill Overlap).

## 🛠️ Technology Stack

| Category | Technology |
|---|---|
| **Frontend Framework** | React 19 + Next.js 15 (App Router) |
| **Styling** | Tailwind CSS v4, Lucide Icons |
| **Relational Database** | PostgreSQL via Prisma ORM |
| **Vector Database** | MongoDB Atlas Vector Search |
| **Matchmaking & AI** | OpenAI (`text-embedding-3-small` / `gpt-4o`) |
| **Language** | Strict TypeScript |

## 🏗️ Architectural Highlights

To handle scale and edge-deployments, CodeMaarg implements several advanced system patterns:

1. **Transactional Co-located Storage:** Upvotes and Downvotes are materialized and cached directly on the `Project` model using a Prisma interactive `$transaction`. This eliminates expensive `COUNT(*)` aggregations on high-traffic landing pages.
2. **Materialized Path (Ltree-style) Comments:** Comment threads use a concatenated `path` column (e.g., `/c1/c5/c12`). Fetching an entire nested thread or a specific subtree is a blazing-fast `O(1)` read (`WHERE path LIKE '/c1/%'`).
3. **Prisma Singleton & Accelerate-Ready:** Database connections in development utilize a persistent `globalThis` singleton to prevent hot-reload connection exhaustion. Production is configured to quickly swap to **Prisma Accelerate** for edge-based connection pooling.
4. **HNSW Vector Search:** Semantic team matching runs straight out of MongoDB Atlas using $vectorSearch for sub-100ms Approximate Nearest Neighbor (ANN) evaluation over millions of embeddings.

---

## 🚦 Getting Started

### 1. Prerequisites

* Node.js 20+
* A PostgreSQL instance (Local or hosted like Supabase / Neon)
* A MongoDB Atlas Cluster (for Vector Search)
* An OpenAI API Key

### 2. Clone the Repository

```bash
git clone https://github.com/your-username/codemaarg.git
cd codemaarg
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Environment Variables

Copy the example environment file and fill in your details:

```bash
cp .env.example .env
```

Ensure the following are set in your `.env`:
* `DATABASE_URL` (PostgreSQL connection string)
* `MONGODB_URI` (MongoDB Atlas connection string)
* `MONGODB_DB_NAME` (e.g., "codemaarg")
* `OPENAI_API_KEY` (Your OpenAI Key)

### 5. Database Setup

Push the schema to your PostgreSQL database and generate the Prisma Client:

```bash
npx prisma db push
npx prisma generate
```

*(Optional) To view your data visually:*
```bash
npm run db:studio
```

### 6. Run the Development Server

```bash
npm run dev
```

Your app should now be running on [http://localhost:3000](http://localhost:3000).

---

## 🗺️ Project Structure

```text
📁 codemaarg
├── 📁 prisma/
│   └── schema.prisma         # PostgreSQL Models, Enums, and Relations
├── 📁 src/
│   ├── 📁 app/               # Next.js App Router (Pages, API Routes)
│   │   ├── 📁 api/roadmap/   # AI Pipeline via OpenAI
│   │   ├── globals.css       # Tailwind v4 configuration
│   │   ├── layout.tsx
│   │   └── page.tsx          # Marketing Landing Page
│   └── 📁 lib/
│       ├── db.ts             # Prisma Client instance/singleton
│       ├── 📁 mutations/     # Complex backend operations (votes, comments)
│       └── 📁 vector/        # MongoDB Vector Search & Embeddings
└── package.json
```

## 🤝 Contributing

Contributions are welcome! Please ensure you adhere to the Strict TypeScript guidelines and follow the architectural choices currently in place (Materialized Paths for trees, Server Actions/Route handlers for mutations). 

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
