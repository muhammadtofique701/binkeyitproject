import React, { useState } from 'react'
import UploadSubCategoryModel from '../components/UploadSubCategoryModel'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { useEffect } from 'react'
import DisplayTable from '../components/DisplayTable'
import {createColumnHelper} from '@tanstack/react-table'
import ViewImage from '../components/ViewImage'
import { RiPencilFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import EditSubCategory from '../components/EditSubCategory'
import ConfirmBox from '../components/ConfirmBox'
import toast from 'react-hot-toast'



const SubCategoryPage = () => {

  const [openAddSubCategory,setopenAddSubCategory] = useState(false)
  const [data, setData] = useState([])
  const [loading,setLoading] = useState(false)
  const columnHelper = createColumnHelper()
  const [ImageURL,setImageURL] = useState("")
  const [openEdit,setOpenEdit] = useState(false)
  const [editData,seteditData] = useState({
    _id : ""
  })
  const [deleteSubCategory,setdeleteSubCategory] = useState({ 
    _id : ""
  })
  const [openDeleteConfirmBox,setopenDeleteConfirmBox] = useState(false)

  const fetchSubCategory = async()=>{
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getSubCatgory
      })
      const {data : responseData} = response

      if(responseData.success){
        setData(responseData.data)
      }

    } catch (error) {
      AxiosToastError(error)
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchSubCategory();
  },[])

  const column = [
    columnHelper.accessor('name',{
      header : "Name"
    }),
        columnHelper.accessor('image',{
      header : "Image",
      cell : ({row})=>{
        return <div className='flex justify-center items-center'>
          <img 
        src={row.original.image}
        alt={row.original.image}
        className='w-8 h-8 cursor-pointer'
        onClick={()=>{
          setImageURL(row.original.image)
        }}
        />
        </div>
      }
    }),
    columnHelper.accessor("Category",{
      header : "Category",
      cell : ({row})=>{
        return(
          <>{
            row.original.category.map((c,index)=>{
              return(
                <p key={c._id+"table"} className='shadow-md px-1 inline-block'>{c.name}{console.log("Practice",c.name)}</p>
              )
            })
          }</>
        )
      }
    }),
    columnHelper.accessor("_id",{
      header : "Action",
      cell  : ({row})=>{
        return(
          <div className='flex justify-center text-center gap-5'>
            <button onClick={()=>{
              setOpenEdit(true)
              seteditData(row.original)
            }} className='cursor-pointer p-4 bg-green-100 rounded-full hover:text-green-300'>
              <RiPencilFill size={20}/>
            </button>
            <button onClick={()=>{
              setopenDeleteConfirmBox(true)
              setdeleteSubCategory(row.original)
            }} className='cursor-pointer p-4 bg-red-100 rounded-full hover:text-red-600'>
              <MdDelete size={20}/>
            </button>
          </div>
        )
      }
    })
  ]

  const handleDeleteSubCategory = async()=>{
    try {
      const response = await Axios({
        ...SummaryApi.deleteSubCategory,
        data : deleteSubCategory
      })

      const {data : responseData} = response

      if(responseData.success){
        toast.success(responseData.message)
        fetchSubCategory(
        setopenDeleteConfirmBox(false),
        setdeleteSubCategory({_id : ""})
        )
      }

    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
      <section>
      <div className='p-2 bg-white flex items-center justify-between'>
        <h2 className='font-semibold flex'>Sub Category</h2>
        <button onClick={()=>setopenAddSubCategory(true)} className='tex-sm border border-amber-300 hover:bg-amber-400 px-3 py-1 cursor-pointer rounded'>Add Sub Category</button>
      </div>

      <div className='overflow-auto w-full max-w-[95vw]'>
        <DisplayTable
          data = {data}
          column = {column}
        />


      </div>

      {
        openAddSubCategory && (
          <UploadSubCategoryModel
          close={()=>setopenAddSubCategory(false)}
          fetchData={fetchSubCategory}
          />
        )
      }
      {
        ImageURL &&
        <ViewImage url={ImageURL} close={()=>setImageURL("")}/>
      }
      {
        openEdit &&
        <EditSubCategory 
        data={editData} 
        close={()=>setOpenEdit(false)}
        fetchData={fetchSubCategory}
        />
      }
      {
        openDeleteConfirmBox && (
          <ConfirmBox
          cancel={()=>setopenDeleteConfirmBox(false)}
          close={()=>setopenDeleteConfirmBox(false)}
          confirm={handleDeleteSubCategory}
          />
        )
      }
      </section>
  )
}

export default SubCategoryPage
