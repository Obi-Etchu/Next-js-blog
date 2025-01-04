import React, { FC } from 'react'
import Comments from '@/app/components/comments'
import FormComment from '@/app/components/form-comments'
import { prisma } from '@/app/lib/db';

interface BlogDetailPageProps{
  params: {
    id: string
  }
}

const BlogDetailPage: FC<BlogDetailPageProps> = async ({params}) => {
  const post = await prisma.post.findFirst ({
    where:{
      id: params.id
    },
    include: {
      author: true,
    }
  });

  console.log(post)

  return (
    <div className='max-w-4xl mx-auto py-8'>
      <h1 className='text-3xl font-bold'>{post?.title}</h1>
      <p>Written by: {post?.author?.name}</p>
      <div className='mt-4'>{post?.content}</div>
    
<Comments  postId={params.id}/>
<FormComment postId={params.id}/>

    </div>
  )
}

export default BlogDetailPage
