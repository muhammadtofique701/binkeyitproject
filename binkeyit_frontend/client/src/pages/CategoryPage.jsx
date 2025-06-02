import React, { useEffect } from 'react'
import UploadCategoryModel from '../components/UploadCategoryModel.jsx'
import { useState } from 'react'
// import { set } from 'mongoose'
import Loading from '../components/Loading.jsx'
import NoData from '../components/NoData.jsx'
import Axios from '../utils/Axios.js'
import SummaryApi from '../common/SummaryApi.js'
import EditCategory from '../components/EditCategory.jsx'
import ConfirmBox from '../components/ConfirmBox.jsx'
import AxiosToastError from '../utils/AxiosToastError.js'
import { useSelector, useDispatch } from 'react-redux'
import { setAllCategory } from '../store/productSlice.js'
import toast from 'react-hot-toast'

const CategoryPage = () => {
  const dispetch = useDispatch();
  const [openUploadCategory, setOpenUploadCategory] = useState(false)
  const [loading, setLoading] = useState(false)
  const [categoryData,setCategoryData] = useState([])
  const [openEdit,setOpenEdit] = useState(false)
  const [editData,setEditData] = useState({
    name : "",
    image : "",
  })
  const [OpenConfirmBoxDelete,setOpenConfirmBoxDelete] = useState(false)
  const [deleteCategory,setDeleteCategory] = useState({
    _id : ""
  })
  
  // const allCategory = useSelector(state => state.product.allCategory)

  // useEffect(()=>{
  //   setCategoryData(allCategory)
  // },[allCategory])
  
  const fetchCategory = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getCategory
      })

      const {data : responseData} = response
      if(responseData.success){
        setCategoryData(responseData.data)
      }
      
    } catch (error) {
      AxiosToastError(error)
    }finally {
      setLoading(false)
    }
  }
  
  useEffect(()=>{
    fetchCategory() 
  },[])

  const handleDeleteCategory = async()=>{
      try {
        const response = await Axios({
          ...SummaryApi.deleteCategory,
          data : deleteCategory
        })
        const { data : responseData} = response
        console.log("Response",response)
        if(responseData.success){
          toast.success(responseData.message)
          const updatedCategories = allCategory.filter((category)=> category._id !== deleteCategory._id)
          dispetch(setAllCategory(updatedCategories))
          console.log("updated Categories",updatedCategories)
          setOpenConfirmBoxDelete(false)
        }
      } catch (error) {
        AxiosToastError(error)
      }
  }
  
  return (
    
    <section>
      <div className='p-2 bg-white flex items-center justify-between'>
        <h2 className='font-semibold flex'>Category</h2>
        <button onClick={()=>{
          setOpenUploadCategory(true)
        }} className='tex-sm border border-amber-300 hover:bg-amber-400 px-3 py-1 cursor-pointer rounded'>Add Category</button>
      </div>
      {
        !categoryData[0] && !loading && (
          <NoData/>
        )
      }
       <div className='p-4 grid  grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2'>
            {
                categoryData.map((category,index)=>{
                    return(
                        <div className='w-32 h-56 rounded shadow-md' key={category._id}>
                            <img 
                                alt={category.name}
                                src={category.image}
                                className='w-full object-scale-down'
                            />
                            <div className='items-center h-9 flex gap-2'>
                                <button onClick={()=>{
                                    setOpenEdit(true)
                                    setEditData(category)
                                }} className='flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded cursor-pointer'>
                                    Edit
                                </button>
                                <button onClick={()=>{
                                    setOpenConfirmBoxDelete(true)
                                    setDeleteCategory({_id : category._id  })
                                }} className='flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded cursor-pointer'>
                                    Delete
                                </button>
                            </div>
                        </div>
                    )
                })
            }
        </div>

      {
        loading && (
          <Loading/>
        )
      }

      {
        openUploadCategory && (
          <UploadCategoryModel fetchData={fetchCategory} close={()=>setOpenUploadCategory(false)}/>
        )
      }
      {
        openEdit && (
          <EditCategory data={editData} close={()=> setOpenEdit(false)} fetchData={fetchCategory}/>
        )
      }
      {
        OpenConfirmBoxDelete && (
          <ConfirmBox 
          close={()=> setOpenConfirmBoxDelete(false)} 
          cancel={()=> setOpenConfirmBoxDelete(false)} 
          confirm={handleDeleteCategory}/>
        )
      }
      
      
    </section>



  )
}

export default CategoryPage
