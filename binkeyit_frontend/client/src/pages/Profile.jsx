import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { BiSolidUserCircle } from "react-icons/bi";
import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import toast from 'react-hot-toast';


const Profile = () => {

  const user = useSelector(state=> state?.user);
  const [openProfileAvatarEdit, setOpenProfileAvatarEdit] = useState(false); 
  const [userData, setUserData] = useState({
    name : user.name,
    email : user.email,
    mobile : user.mobile
  })

  useEffect(()=>{ 
    setUserData({
      name : user.name,
      email : user.email,
      mobile : user.mobile
    })
  },[user])
  

  const handleONChange = (e)=>{
    const {name, value} = e.target

    setUserData((preve)=>{
      return {
        ...preve,
        [name] : value
      }
    })
  }

  const [loading, setLoading] = useState(false)

  const handleSumbit  = async(e)=>{
    e.preventDefault()

    try {

      setLoading(true)
      const response = await Axios({
        ...SummaryApi.updateUserDetails,
        data : userData
      })

      const {data : responseData} = response
      if(responseData.success){
        toast.success(responseData.message)
      }

    } catch (error) {
      AxiosToastError(error)
    }
    finally{
      setLoading(false)
    }
  }


  return (
  <div>

    {/* profile upload and display image */}
      <div className='w-20 h-20  flex items-center justify-center rounded-full overflow-hidden'>
        {
          user.avatar ? (
            <img 
            alt={user.name} 
            src={user.avatar}
            className='w-full h-full '/>
          ) : (
            <BiSolidUserCircle size={65} className='text-gray-500'/>
          )
        }

      </div>
      <button  onClick={()=>setOpenProfileAvatarEdit(true)} className='text-sm min-w-20 border border-amber-300 hover:border-amber-400 hover:bg-amber-500 px-3 py-1 rounded-full mt-3 cursor-pointer'>Edit</button>
      
      {
        openProfileAvatarEdit && (
          <UserProfileAvatarEdit close={()=>setOpenProfileAvatarEdit(false)}/>
          
        )
      }
    {/* name , mobile ,email change password */}
      <form className='grid gap-4 my-4' onSubmit={handleSumbit}>
      <div className='grid'>
        <label>
          Name
        </label>
        <input 
              type='text' 
              placeholder='Enter Your Name' 
              className='p-2 bg-slate-300 border outline-none focus-within:border-amber-300 rounded'
              value={userData.name} 
              onChange={handleONChange}
              name='name'
              required
         />
      </div>

       <div className='grid'>
        <label htmlFor='email'>
          Email
        </label>
        <input 
              type='email'
              id='email'
              placeholder='Enter Your Email' 
              className='p-2 bg-slate-300 border outline-none focus-within:border-amber-300 rounded'
              value={userData.email} 
              onChange={handleONChange}
              name='email'
              required
         />
      </div>

        <div className='grid'>
        <label htmlFor='mobile'>
          Mobile
        </label>
        <input 
              type='Phone'
              id='text'
              placeholder='Enter Your Phone Number' 
              className='p-2 bg-slate-300 border outline-none focus-within:border-amber-300 rounded'
              value={userData.mobile} 
              onChange={handleONChange}
              name='mobile'
              required
         />
      </div>

      <button className='border px-4 py-2 font-samibold bg-amber-200 hover:bg-amber-300 cursor-pointer rounded'>
        {
          loading ? "Loading..." : "Sumbit"
        }
        </button>
      </form>
    </div>
  )
}

export default Profile
