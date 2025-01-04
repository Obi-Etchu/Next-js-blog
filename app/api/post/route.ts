import { prisma } from "@/app/lib/db";
import { getCurrentUser } from "@/app/lib/session";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await getCurrentUser();

  if (!user?.email) {
    return NextResponse.json(
      { message: 'Not authenticated' },
      { status: 401 }
    );
  }

  try {
    const { title, content } = await req.json();

    // Validate request body
    if (!title || !content) {
      return NextResponse.json(
        { message: 'Title and content are required' },
        { status: 400 }
      );
    }

    // Create the new post in the database
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        authorEmail: user.email,
      },
    });

    // Return the newly created post
    return NextResponse.json(
      { message: 'Post created successfully', post: newPost },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Error creating post:', error.message, error.stack);
    return NextResponse.json(
      { message: 'Something went terribly wrong', error: error.message },
      { status: 500 }
    );
  }
}
