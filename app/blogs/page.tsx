import React from 'react'
// import { post } from '../data/posts'
import Link from 'next/link'
import { prisma } from '../lib/db';


const BlogsPage = async () => {

  const posts = await prisma.post.findMany ({
    orderBy: {
      createdAt: 'desc'
    },

    include: {
      author: true,
    }
  });

  console.log(posts)

  return (
    <div className='max-w-4xl mx-auto py-8'>
      <h1 className='text-3xl font-bold mb-4'>Blogs</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>

        {
            posts.map((post=>(
                <Link key={post.id} href={`/blogs/${post.id}`} className='bg-gray-300 p-4 rounded-md shadow'>
                <h2 className='text-xl font-bold'>{post.title}</h2>
                <p>Written by: {post.author?.name}</p>
            </Link>
            )))
        }
        
      </div>
    </div>
  )
}

export default BlogsPage