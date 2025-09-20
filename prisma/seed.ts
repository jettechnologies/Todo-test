import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create users
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: "john@example.com" },
      update: {},
      create: {
        name: "John Doe",
        email: "john@example.com",
      },
    }),
    prisma.user.upsert({
      where: { email: "jane@example.com" },
      update: {},
      create: {
        name: "Jane Smith",
        email: "jane@example.com",
      },
    }),
    prisma.user.upsert({
      where: { email: "mike@example.com" },
      update: {},
      create: {
        name: "Mike Johnson",
        email: "mike@example.com",
      },
    }),
    prisma.user.upsert({
      where: { email: "sarah@example.com" },
      update: {},
      create: {
        name: "Sarah Wilson",
        email: "sarah@example.com",
      },
    }),
  ]);

  console.log("✅ Users created:", users.length);

  // Create todos
  const todos = await Promise.all([
    prisma.todo.create({
      data: {
        taskName: "Implement user authentication",
        status: "IN_PROGRESS",
        dates: new Date("2025-01-15"),
        priority: "URGENT",
        description: "Set up NextAuth.js with OAuth providers",
        assignees: {
          create: [{ userId: users[0].id }, { userId: users[1].id }],
        },
      },
    }),
    prisma.todo.create({
      data: {
        taskName: "Design database schema",
        status: "COMPLETE",
        dates: new Date("2025-01-10"),
        priority: "IMPORTANT",
        description: "Create Prisma schema for todos and users",
        assignees: {
          create: [{ userId: users[2].id }],
        },
      },
    }),
    prisma.todo.create({
      data: {
        taskName: "Setup CI/CD pipeline",
        status: "TODO",
        dates: new Date("2025-01-25"),
        priority: "NORMAL",
        description: "Configure GitHub Actions for automated deployment",
        assignees: {
          create: [{ userId: users[0].id }, { userId: users[3].id }],
        },
      },
    }),
    prisma.todo.create({
      data: {
        taskName: "Write unit tests",
        status: "TODO",
        dates: new Date("2025-01-20"),
        priority: "IMPORTANT",
        description: "Add comprehensive test coverage for API endpoints",
        assignees: {
          create: [{ userId: users[1].id }, { userId: users[2].id }],
        },
      },
    }),
    prisma.todo.create({
      data: {
        taskName: "Update documentation",
        status: "TODO",
        dates: new Date("2025-01-30"),
        priority: "LOW",
        description: "Update README and API documentation",
        assignees: {
          create: [{ userId: users[3].id }],
        },
      },
    }),
  ]);

  console.log("✅ Todos created:", todos.length);
  console.log("🎉 Seeding completed!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seeding failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
