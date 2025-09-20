-- CreateEnum
CREATE TYPE "public"."TodoStatus" AS ENUM ('todo', 'in_progress', 'complete');

-- CreateEnum
CREATE TYPE "public"."Priority" AS ENUM ('urgent', 'important', 'normal', 'low');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."todos" (
    "id" TEXT NOT NULL,
    "task_name" TEXT NOT NULL,
    "status" "public"."TodoStatus" NOT NULL DEFAULT 'todo',
    "dates" TIMESTAMP(3) NOT NULL,
    "priority" "public"."Priority" NOT NULL DEFAULT 'normal',
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "todos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."todo_assignees" (
    "todo_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "todo_assignees_pkey" PRIMARY KEY ("todo_id","user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- AddForeignKey
ALTER TABLE "public"."todo_assignees" ADD CONSTRAINT "todo_assignees_todo_id_fkey" FOREIGN KEY ("todo_id") REFERENCES "public"."todos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."todo_assignees" ADD CONSTRAINT "todo_assignees_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
