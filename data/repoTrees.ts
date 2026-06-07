import type { RepoTree } from "@/types/repo";

// ─── Project Alpha: Next.js SaaS ─────────────────────────────────────────────
const alpha: RepoTree = {
  root: {
    name: "project-alpha",
    path: "root",
    type: "folder",
    children: ["src", "prisma", "package.json", "tsconfig.json"],
  },
  src: {
    name: "src",
    path: "src",
    type: "folder",
    children: ["src/app", "src/components", "src/server"],
  },
  "src/app": {
    name: "app",
    path: "src/app",
    type: "folder",
    children: ["src/app/layout.tsx", "src/app/page.tsx", "src/app/api"],
  },
  "src/app/api": {
    name: "api",
    path: "src/app/api",
    type: "folder",
    children: ["src/app/api/trpc"],
  },
  "src/app/api/trpc": {
    name: "trpc",
    path: "src/app/api/trpc",
    type: "folder",
    children: ["src/app/api/trpc/route.ts"],
  },
  "src/app/layout.tsx": {
    name: "layout.tsx",
    path: "src/app/layout.tsx",
    type: "file",
    language: "tsx",
    content: `import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/react";
import { SessionProvider } from "@/components/SessionProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Project Alpha",
  description: "Team task management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <TRPCReactProvider>
            {children}
          </TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
`,
  },
  "src/app/page.tsx": {
    name: "page.tsx",
    path: "src/app/page.tsx",
    type: "file",
    language: "tsx",
    content: `import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { Dashboard } from "@/components/Dashboard";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return <Dashboard userId={session.user.id} />;
}
`,
  },
  "src/app/api/trpc/route.ts": {
    name: "route.ts",
    path: "src/app/api/trpc/route.ts",
    type: "file",
    language: "typescript",
    content: `import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/server/routers/_app";
import { createTRPCContext } from "@/server/trpc";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createTRPCContext({ req }),
    onError: ({ error, path }) => {
      if (error.code === "INTERNAL_SERVER_ERROR") {
        console.error(\`tRPC error on \${path}:\`, error);
      }
    },
  });

export { handler as GET, handler as POST };
`,
  },
  "src/components": {
    name: "components",
    path: "src/components",
    type: "folder",
    children: ["src/components/TaskCard.tsx", "src/components/Dashboard.tsx"],
  },
  "src/components/TaskCard.tsx": {
    name: "TaskCard.tsx",
    path: "src/components/TaskCard.tsx",
    type: "file",
    language: "tsx",
    content: `"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import type { Task } from "@prisma/client";

interface TaskCardProps {
  task: Task;
  onUpdate?: () => void;
}

export function TaskCard({ task, onUpdate }: TaskCardProps) {
  const [optimistic, setOptimistic] = useState(task.completed);

  const updateTask = api.task.update.useMutation({
    onMutate: ({ completed }) => {
      setOptimistic(completed);      // optimistic update
    },
    onError: () => {
      setOptimistic(task.completed); // rollback on failure
    },
    onSettled: onUpdate,
  });

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={optimistic}
          onChange={(e) =>
            updateTask.mutate({ id: task.id, completed: e.target.checked })
          }
          className="mt-1"
        />
        <div>
          <p className={optimistic ? "line-through text-muted-foreground" : ""}>
            {task.title}
          </p>
          {task.description && (
            <p className="text-sm text-muted-foreground mt-1">
              {task.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
`,
  },
  "src/components/Dashboard.tsx": {
    name: "Dashboard.tsx",
    path: "src/components/Dashboard.tsx",
    type: "file",
    language: "tsx",
    content: `"use client";

import { api } from "@/trpc/react";
import { TaskCard } from "./TaskCard";
import { CreateTaskForm } from "./CreateTaskForm";

export function Dashboard({ userId }: { userId: string }) {
  const { data: tasks, refetch } = api.task.list.useQuery({ userId });

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Tasks</h1>
      <CreateTaskForm onCreated={refetch} />
      <div className="mt-6 space-y-3">
        {tasks?.map((task) => (
          <TaskCard key={task.id} task={task} onUpdate={refetch} />
        ))}
      </div>
    </main>
  );
}
`,
  },
  "src/server": {
    name: "server",
    path: "src/server",
    type: "folder",
    children: ["src/server/db.ts", "src/server/routers"],
  },
  "src/server/db.ts": {
    name: "db.ts",
    path: "src/server/db.ts",
    type: "file",
    language: "typescript",
    content: `import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Singleton pattern — prevents hot-reload from spawning multiple connections
export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
`,
  },
  "src/server/routers": {
    name: "routers",
    path: "src/server/routers",
    type: "folder",
    children: ["src/server/routers/task.ts"],
  },
  "src/server/routers/task.ts": {
    name: "task.ts",
    path: "src/server/routers/task.ts",
    type: "file",
    language: "typescript",
    content: `import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/trpc";

export const taskRouter = createTRPCRouter({
  list: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.task.findMany({
        where: { userId: input.userId },
        orderBy: { createdAt: "desc" },
      });
    }),

  create: protectedProcedure
    .input(z.object({
      title: z.string().min(1).max(256),
      description: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.task.create({
        data: {
          title: input.title,
          description: input.description,
          userId: ctx.session.user.id,
        },
      });
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      completed: z.boolean(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.task.update({
        where: { id: input.id },
        data: { completed: input.completed },
      });
    }),
});
`,
  },
  prisma: {
    name: "prisma",
    path: "prisma",
    type: "folder",
    children: ["prisma/schema.prisma"],
  },
  "prisma/schema.prisma": {
    name: "schema.prisma",
    path: "prisma/schema.prisma",
    type: "file",
    language: "plaintext",
    content: `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  emailVerified DateTime?
  image         String?
  createdAt     DateTime  @default(now())

  tasks    Task[]
  accounts Account[]
  sessions Session[]
}

model Task {
  id          String   @id @default(cuid())
  title       String
  description String?
  completed   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  userId String
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}
`,
  },
  "package.json": {
    name: "package.json",
    path: "package.json",
    type: "file",
    language: "json",
    content: `{
  "name": "project-alpha",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "db:push": "prisma db push",
    "db:studio": "prisma studio"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@prisma/client": "^5.0.0",
    "@trpc/client": "^11.0.0",
    "@trpc/react-query": "^11.0.0",
    "@trpc/server": "^11.0.0",
    "next-auth": "^4.24.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "prisma": "^5.0.0",
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^19.0.0"
  }
}
`,
  },
  "tsconfig.json": {
    name: "tsconfig.json",
    path: "tsconfig.json",
    type: "file",
    language: "json",
    content: `{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
`,
  },
};

// ─── Project Beta: React dashboard ──────────────────────────────────────────
const beta: RepoTree = {
  root: {
    name: "project-beta",
    path: "root",
    type: "folder",
    children: ["src", "docker-compose.yml", "package.json"],
  },
  src: {
    name: "src",
    path: "src",
    type: "folder",
    children: ["src/components", "src/hooks", "src/server"],
  },
  "src/components": {
    name: "components",
    path: "src/components",
    type: "folder",
    children: ["src/components/Dashboard.tsx", "src/components/charts"],
  },
  "src/components/charts": {
    name: "charts",
    path: "src/components/charts",
    type: "folder",
    children: ["src/components/charts/SalesChart.tsx"],
  },
  "src/components/Dashboard.tsx": {
    name: "Dashboard.tsx",
    path: "src/components/Dashboard.tsx",
    type: "file",
    language: "tsx",
    content: `"use client";

import { useEffect, useState } from "react";
import { SalesChart } from "./charts/SalesChart";
import { InventoryAlert } from "./InventoryAlert";
import { useRealtimeData } from "@/hooks/useRealtimeData";

export function Dashboard() {
  const { events, connected } = useRealtimeData();
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    conversion: 0,
  });

  useEffect(() => {
    // Accumulate events into running totals
    const purchases = events.filter((e) => e.type === "purchase");
    setStats({
      revenue: purchases.reduce((sum, e) => sum + e.amount, 0),
      orders: purchases.length,
      conversion: purchases.length / Math.max(events.length, 1),
    });
  }, [events]);

  return (
    <div className="p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Live Analytics</h1>
        <span className={connected ? "text-green-500" : "text-red-500"}>
          {connected ? "● Live" : "○ Reconnecting..."}
        </span>
      </header>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard label="Revenue" value={\`$\${stats.revenue.toLocaleString()}\`} />
        <StatCard label="Orders" value={stats.orders.toString()} />
        <StatCard label="Conversion" value={\`\${(stats.conversion * 100).toFixed(1)}%\`} />
      </div>

      <SalesChart events={events} />
      <InventoryAlert />
    </div>
  );
}
`,
  },
  "src/components/charts/SalesChart.tsx": {
    name: "SalesChart.tsx",
    path: "src/components/charts/SalesChart.tsx",
    type: "file",
    language: "tsx",
    content: `"use client";

import { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { StreamEvent } from "@/hooks/useRealtimeData";

interface SalesChartProps {
  events: StreamEvent[];
}

export function SalesChart({ events }: SalesChartProps) {
  const data = useMemo(() => {
    const buckets: Record<string, number> = {};

    events
      .filter((e) => e.type === "purchase")
      .forEach((e) => {
        const minute = new Date(e.ts).toISOString().slice(0, 16);
        buckets[minute] = (buckets[minute] ?? 0) + e.amount;
      });

    return Object.entries(buckets)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([time, revenue]) => ({ time: time.slice(11), revenue }));
  }, [events]);

  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data}>
        <XAxis dataKey="time" tick={{ fontSize: 11 }} />
        <YAxis tick={{ fontSize: 11 }} />
        <Tooltip />
        <Line type="monotone" dataKey="revenue" dot={false} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}
`,
  },
  "src/hooks": {
    name: "hooks",
    path: "src/hooks",
    type: "folder",
    children: ["src/hooks/useRealtimeData.ts"],
  },
  "src/hooks/useRealtimeData.ts": {
    name: "useRealtimeData.ts",
    path: "src/hooks/useRealtimeData.ts",
    type: "file",
    language: "typescript",
    content: `import { useEffect, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";

export interface StreamEvent {
  type: "purchase" | "stock_change" | "funnel_step";
  ts: number;
  amount: number;
  productId?: string;
  step?: string;
}

export function useRealtimeData() {
  const [events, setEvents] = useState<StreamEvent[]>([]);
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_WS_URL ?? "http://localhost:4000");
    socketRef.current = socket;

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    socket.on("event", (event: StreamEvent) => {
      setEvents((prev) => [event, ...prev].slice(0, 500)); // cap at 500
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return { events, connected };
}
`,
  },
  "src/server": {
    name: "server",
    path: "src/server",
    type: "folder",
    children: ["src/server/websocket.ts"],
  },
  "src/server/websocket.ts": {
    name: "websocket.ts",
    path: "src/server/websocket.ts",
    type: "file",
    language: "typescript",
    content: `import { createServer } from "http";
import { Server } from "socket.io";
import { createClient } from "redis";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: { origin: process.env.FRONTEND_URL },
});

const redis = createClient({ url: process.env.REDIS_URL });
await redis.connect();

// Subscribe to the Redis Stream via blocking XREAD
async function consumeStream() {
  let lastId = "$";

  while (true) {
    const results = await redis.xRead(
      { key: "events", id: lastId },
      { COUNT: 100, BLOCK: 1000 }
    );

    if (!results) continue;

    for (const { messages } of results) {
      for (const { id, message } of messages) {
        lastId = id;
        const event = JSON.parse(message.data as string);
        io.emit("event", event); // broadcast to all connected dashboards
      }
    }
  }
}

consumeStream().catch(console.error);

httpServer.listen(4000, () => {
  console.log("WebSocket server running on :4000");
});
`,
  },
  "docker-compose.yml": {
    name: "docker-compose.yml",
    path: "docker-compose.yml",
    type: "file",
    language: "yaml",
    content: `version: "3.9"

services:
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    command: redis-server --appendonly yes

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: beta
      POSTGRES_USER: beta
      POSTGRES_PASSWORD: secret
    ports:
      - "5432:5432"
    volumes:
      - pg_data:/var/lib/postgresql/data

  websocket:
    build: .
    environment:
      REDIS_URL: redis://redis:6379
      FRONTEND_URL: http://localhost:3000
    ports:
      - "4000:4000"
    depends_on:
      - redis

volumes:
  redis_data:
  pg_data:
`,
  },
  "package.json": {
    name: "package.json",
    path: "package.json",
    type: "file",
    language: "json",
    content: `{
  "name": "project-beta",
  "version": "0.1.0",
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "socket.io-client": "^4.7.0",
    "recharts": "^2.12.0",
    "redis": "^4.6.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/react": "^19.0.0"
  }
}
`,
  },
};

// ─── Project Gamma: CLI migration tool ──────────────────────────────────────
const gamma: RepoTree = {
  root: {
    name: "project-gamma",
    path: "root",
    type: "folder",
    children: ["src", "migrations", "package.json"],
  },
  src: {
    name: "src",
    path: "src",
    type: "folder",
    children: ["src/commands", "src/db", "src/index.ts"],
  },
  "src/commands": {
    name: "commands",
    path: "src/commands",
    type: "folder",
    children: ["src/commands/up.ts", "src/commands/down.ts", "src/commands/types.ts"],
  },
  "src/commands/up.ts": {
    name: "up.ts",
    path: "src/commands/up.ts",
    type: "file",
    language: "typescript",
    content: `import { readMigrationFiles } from "../db/migrations";
import { getApplied, markApplied } from "../db/client";
import { runSQL } from "../db/runner";

export async function up() {
  const all = await readMigrationFiles();
  const applied = new Set(await getApplied());

  const pending = all.filter((m) => !applied.has(m.id));

  if (pending.length === 0) {
    console.log("Nothing to apply.");
    return;
  }

  for (const migration of pending) {
    console.log(\`  → \${migration.id}\`);
    await runSQL(migration.upSQL);
    await markApplied(migration.id);
  }

  console.log(\`✓ Applied \${pending.length} migration(s).\`);
}
`,
  },
  "src/commands/down.ts": {
    name: "down.ts",
    path: "src/commands/down.ts",
    type: "file",
    language: "typescript",
    content: `import { readMigrationFiles } from "../db/migrations";
import { getApplied, markRolledBack } from "../db/client";
import { runSQL } from "../db/runner";

export async function down(steps = 1) {
  const all = await readMigrationFiles();
  const applied = await getApplied();

  // Roll back the last \`steps\` applied migrations in reverse order
  const toRollback = applied
    .filter((id) => all.some((m) => m.id === id))
    .slice(-steps)
    .reverse();

  if (toRollback.length === 0) {
    console.log("Nothing to roll back.");
    return;
  }

  for (const id of toRollback) {
    const migration = all.find((m) => m.id === id)!;
    console.log(\`  ← \${id}\`);
    await runSQL(migration.downSQL);
    await markRolledBack(id);
  }

  console.log(\`✓ Rolled back \${toRollback.length} migration(s).\`);
}
`,
  },
  "src/commands/types.ts": {
    name: "types.ts",
    path: "src/commands/types.ts",
    type: "file",
    language: "typescript",
    content: `import { sql } from "../db/client";
import { generateTypes } from "../db/typegen";
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

export async function types(outPath: string) {
  const columns = await sql\`
    SELECT table_name, column_name, data_type, is_nullable
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name NOT LIKE '\\_%'
    ORDER BY table_name, ordinal_position
  \`;

  const ts = generateTypes(columns);
  const resolved = resolve(process.cwd(), outPath);
  await writeFile(resolved, ts, "utf8");

  console.log(\`✓ Types written to \${resolved}\`);
}
`,
  },
  "src/db": {
    name: "db",
    path: "src/db",
    type: "folder",
    children: ["src/db/client.ts", "src/db/runner.ts"],
  },
  "src/db/client.ts": {
    name: "client.ts",
    path: "src/db/client.ts",
    type: "file",
    language: "typescript",
    content: `import { Database } from "bun:sqlite";
import postgres from "postgres";

// Postgres connection for running migrations
export const sql = postgres(Bun.env.DATABASE_URL ?? "");

// SQLite for local state (applied migrations cache)
const cache = new Database(
  Bun.env.GAMMA_CACHE ?? ".gamma/cache.db",
  { create: true }
);

cache.run(\`
  CREATE TABLE IF NOT EXISTS _applied (
    id TEXT PRIMARY KEY,
    applied_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
\`);

export async function getApplied(): Promise<string[]> {
  return cache
    .query<{ id: string }, []>("SELECT id FROM _applied ORDER BY applied_at")
    .all()
    .map((r) => r.id);
}

export async function markApplied(id: string): Promise<void> {
  cache.run("INSERT INTO _applied (id) VALUES (?)", [id]);
}

export async function markRolledBack(id: string): Promise<void> {
  cache.run("DELETE FROM _applied WHERE id = ?", [id]);
}
`,
  },
  "src/db/runner.ts": {
    name: "runner.ts",
    path: "src/db/runner.ts",
    type: "file",
    language: "typescript",
    content: `import { sql } from "./client";

export async function runSQL(query: string): Promise<void> {
  // Execute raw SQL — split on statement boundaries for multi-statement files
  const statements = query
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean);

  for (const statement of statements) {
    await sql.unsafe(statement);
  }
}
`,
  },
  "src/index.ts": {
    name: "index.ts",
    path: "src/index.ts",
    type: "file",
    language: "typescript",
    content: `#!/usr/bin/env bun
import { program } from "commander";
import { up } from "./commands/up";
import { down } from "./commands/down";
import { types } from "./commands/types";

program
  .name("gamma")
  .description("Database migration manager for Node.js projects")
  .version("1.0.0");

program
  .command("up")
  .description("Apply pending migrations")
  .action(up);

program
  .command("down [steps]")
  .description("Roll back the last N migrations (default: 1)")
  .action((steps) => down(Number(steps ?? 1)));

program
  .command("types")
  .description("Generate TypeScript types from current schema")
  .requiredOption("--out <path>", "Output file path")
  .action(({ out }) => types(out));

program.parse();
`,
  },
  migrations: {
    name: "migrations",
    path: "migrations",
    type: "folder",
    children: ["migrations/001_create_users.sql", "migrations/002_create_tasks.sql"],
  },
  "migrations/001_create_users.sql": {
    name: "001_create_users.sql",
    path: "migrations/001_create_users.sql",
    type: "file",
    language: "sql",
    content: `-- up
CREATE TABLE users (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  email      TEXT        NOT NULL UNIQUE,
  name       TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users (email);

-- rollback
DROP TABLE IF EXISTS users;
`,
  },
  "migrations/002_create_tasks.sql": {
    name: "002_create_tasks.sql",
    path: "migrations/002_create_tasks.sql",
    type: "file",
    language: "sql",
    content: `-- up
CREATE TABLE tasks (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT        NOT NULL,
  description TEXT,
  completed   BOOLEAN     NOT NULL DEFAULT FALSE,
  user_id     UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_tasks_user_id ON tasks (user_id);

-- rollback
DROP TABLE IF EXISTS tasks;
`,
  },
  "package.json": {
    name: "package.json",
    path: "package.json",
    type: "file",
    language: "json",
    content: `{
  "name": "gamma",
  "version": "1.0.0",
  "type": "module",
  "bin": { "gamma": "./src/index.ts" },
  "dependencies": {
    "commander": "^12.0.0",
    "postgres": "^3.4.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "@types/bun": "latest",
    "typescript": "^5.0.0"
  }
}
`,
  },
};

export const repoTrees: Record<string, RepoTree> = {
  "project-alpha": alpha,
  "project-beta": beta,
  "project-gamma": gamma,
};
