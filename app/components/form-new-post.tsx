"use client"

import  axios from 'axios'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import { Formdata } from '../types/blog';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';



const inputClass= 'w-full px-3 border-gray-300 rounded-md focus:outline-none focus:ring'

function FormNewPost() {
    const [formdata, setFormData ] = useState<Formdata>({
        title: '',
        content: '',
    })
     
    const {data} = useSession();
    console.log(data)

    const router = useRouter()

    const handleChange =(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        e.preventDefault();
        const  {name, value} = e.target
        setFormData({
            ...formdata, 
            [name]:value,
        })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        console.log(formdata)
        setFormData({
            title: '',
            content: '',
        })

        try{
          const response = await axios.post('/api/post', formdata);

          if(response.status === 200 ){
             router.push(`/blogs/${response.data.newPost.id}`)
          }

        }catch(error){
            console.log(error)
        }
    }
  return (
    <form className='max-w-md mx-auto p-4' onSubmit={handleSubmit}>
      <div className='mb-4'>
        <input type='text' className={inputClass} placeholder='Enter the title' name='title'
        value={formdata.title}
        onChange={handleChange}/>
      </div>
      <div className='mb-4'>
       <TextareaAutosize 
       minRows={5}
       name='content'
       className={inputClass}
       placeholder='Enter the content'
       value={formdata.content}
       onChange={handleChange}
       />

       <button type='submit' className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 
       rounded-md focus:outline-none focus:border-blue-300 w-full disabled:bg-gray-400 focus:ring'>Submit</button>
      </div>
    </form>
  )
}

export default FormNewPost