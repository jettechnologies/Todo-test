import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { CreateTodoRequest } from "@/types";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status") as any;
    const priority = searchParams.get("priority") as any;
    const search = searchParams.get("search");

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (search) {
      where.OR = [
        { taskName: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const [todos, totalCount] = await Promise.all([
      prisma.todo.findMany({
        where,
        include: {
          assignees: {
            include: {
              user: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.todo.count({ where }),
    ]);

    return NextResponse.json({
      data: todos,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching todos:", error);
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}

// new response

export async function POST(request: NextRequest) {
  try {
    const body: CreateTodoRequest = await request.json();
    const { taskName, status, dates, assigneeIds, priority, description } =
      body;

    const todo = await prisma.todo.create({
      data: {
        taskName,
        status,
        dates: new Date(dates),
        priority,
        description,
        assignees: {
          create: assigneeIds.map((userId) => ({
            user: {
              connect: { id: userId }, // ✅ connect existing users
            },
          })),
        },
      },
      include: {
        assignees: {
          include: {
            user: true,
          },
        },
      },
    });

    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    console.error("Error creating todo:", error);
    return NextResponse.json(
      {
        error: "Failed to create todo",
        details: (error as any).message,
      },
      { status: 500 }
    );
  }
}

// export async function POST(request: NextRequest) {
//   try {
//     const body: CreateTodoRequest = await request.json();
//     const { taskName, status, dates, assigneeIds, priority, description } =
//       body;

//     const todo = await prisma.todo.create({
//       data: {
//         taskName,
//         status,
//         dates: new Date(dates),
//         priority,
//         description,
//         assignees: {
//           create: assigneeIds.map((userId) => ({
//             userId,
//           })),
//         },
//       },
//       include: {
//         assignees: {
//           include: {
//             user: true,
//           },
//         },
//       },
//     });

//     return NextResponse.json(todo, { status: 201 });
//   } catch (error) {
//     console.error("Error creating todo:", error);
//     return NextResponse.json(
//       { error: "Failed to create todo" },
//       { status: 500 }
//     );
//   }
// }
