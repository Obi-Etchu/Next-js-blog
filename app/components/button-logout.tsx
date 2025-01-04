"use client"

import { signOut } from 'next-auth/react'
import React from 'react'

const ButtonLogout = () => {
  return (
    <div>
      <button className='text-white hover:underline' onClick={()=>signOut}>Logout </button>
    </div>
  )
}

export default ButtonLogout
