import React from 'react'
import UserMenu from '../components/UserMenu';
import { IoIosClose } from "react-icons/io";


function UserMenuMobile() {
  return (
    
    <section className='bg-white h-full w-full' >
      <button onClick={()=>window.history.back()} className='text-neutral-900 block w-fit ml-auto p-4 cursor-pointer ' >
        <IoIosClose size={30}/>
      </button>
      <div className='container mx-auto p-3'>
      <UserMenu/>
      </div>
          
    </section>
  )
}

export default UserMenuMobile;
