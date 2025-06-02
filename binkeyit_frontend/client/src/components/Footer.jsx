import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";





function Footer() {
  return (
    <footer className='boarder-t-2 border-gray-300 bg-bkue-50 shadow-md h-20'>
      <div className='container mx-auto p-4 text-center flex flex-col gap-2 lg:flex-row lg:justify-between lg:items-center'>
        <p>&copy; All Rights Reserved 2025,</p>


        <div className='flex gap-4 items-center justify-center text-2xl'>
            <a href="" className='text-blue-600 hover:text-blue-800'>
                <FaFacebook />        
            </a>
            <a href="" className='text-pink-600 hover:text-pink-800'>
                <FaInstagramSquare />
            </a>
            <a href="" className='text-blue-800 hover:text-blue-600'>
                <FaLinkedin />
            </a>
        </div> 
      </div>
    </footer>
  )
}

export default Footer
