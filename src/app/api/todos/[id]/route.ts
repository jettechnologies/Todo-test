import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { UpdateTodoRequest } from "@/types";

interface Context {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, context: Context) {
  try {
    const { id } = await context.params;

    const todo = await prisma.todo.findUnique({
      where: { id },
      include: {
        assignees: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(todo);
  } catch (error) {
    console.error("Error fetching todo:", error);
    return NextResponse.json(
      { error: "Failed to fetch todo" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, context: Context) {
  try {
    const { id } = await context.params;
    const body: UpdateTodoRequest = await request.json();
    const { taskName, status, dates, assigneeIds, priority, description } =
      body;

    // Prepare update data
    const updateData: any = {};
    if (taskName !== undefined) updateData.taskName = taskName;
    if (status !== undefined) updateData.status = status;
    if (dates !== undefined) updateData.dates = new Date(dates);
    if (priority !== undefined) updateData.priority = priority;
    if (description !== undefined) updateData.description = description;

    const todo = await prisma.todo.update({
      where: { id },
      data: {
        ...updateData,
        ...(assigneeIds && {
          assignees: {
            deleteMany: {},
            create: assigneeIds.map((userId) => ({ userId })),
          },
        }),
      },
      include: {
        assignees: {
          include: {
            user: true,
          },
        },
      },
    });

    return NextResponse.json(todo);
  } catch (error) {
    console.error("Error updating todo:", error);
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, context: Context) {
  try {
    const { id } = await context.params;

    await prisma.todo.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: 500 }
    );
  }
}
