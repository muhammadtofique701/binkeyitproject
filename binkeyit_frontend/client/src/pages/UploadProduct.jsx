import React, { useState } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../utils/UploadImage';
import Loading from '../components/Loading';
import ViewImage from '../components/ViewImage';
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux';
import { IoMdClose } from "react-icons/io";
import AddFieldComponent from '../components/AddFieldComponent';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import successAlert from '../utils/SuccessAlert';


const UploadProduct = () => {
  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",  
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
  });

  const [imageloading,setimageLoading] = useState(false)
  const [ViewImageURL,setViewImageURL] = useState("")
  const allCategory = useSelector(state => state.product.allCategory)
  const [selectCategory,setSelectCategory] = useState()
  const [selectSubCategory,setSelectSubCategory] = useState("")
  const allSubCategory = useSelector(state => state.product.allSubCategory)

  const [openAddField,setopenAddField] = useState(false)
  const[fieldName,setfieldName] = useState("")

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => ({
      ...preve,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    console.log("Files",file)
    
    if (!file) {
      return
    }
      setimageLoading(true)
      const response = await uploadImage(file);
      const {data : ImageResponse} = response
      const imageUrl = ImageResponse.data?.url;

      setData((preve)=>{
        return {
          ...preve,
          image : [...preve.image,imageUrl]
        }
      })
      setimageLoading(false)
    }
  
  const handleDeleteImage = async(index)=>{
      data.image.splice(index,1)
      setData((preve)=>{
        return{
          ...preve
        }
      })
    }

  const handleRemoveCategory = async(index)=>{
    data.category.splice(index,1)
    setData((preve)=>{
      return{
        ...preve
      }
    })
  }

  const handleRemoveSubCategory = async(index)=>{
    data.subCategory.splice(index,1)
    setData((preve)=>{
      return{
        ...preve
      }
    })
  }

  const handleAddField = ()=>{
    setData((preve)=>{
      return{
        ...preve,
        more_details:{
          ...preve.more_details,
          [fieldName] : ""
        }
      }
    })
    setfieldName("")
    setopenAddField(false)
  }

  const handlesubmit = async(e)=>{
    e.preventDefault()

    console.log("Handle Data",data)

    try {
      const response = await Axios({
      ...SummaryApi.createProduct,
      data : data   
      })

      const { data : responseData} = response
      if(responseData.success){
        successAlert(responseData.message)
        setData({
          name: "",
          image: [],
          category: [],
          subCategory: [],
          unit: "",  
          stock: "",
          price: "",
          discount: "",
          description: "",
          more_details: {},
        })
      }
    } catch (error) {
      AxiosToastError(error)
    }


  }
    return (
    <section className='p-4'>
      <div className='p-4 bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibold text-lg'>Upload Product</h2>
      </div>

      <div className='grid p-4'>
        <form className='grid gap-4' onSubmit={handlesubmit}>
          {/* Name Field */}
          <div className='grid gap-1'>
            <label htmlFor='name' className='font-medium'>Name</label>
            <input
              type='text'
              id='name'
              name='name'
              placeholder='Enter Product Name'
              value={data.name}
              onChange={handleChange}
              required
              className='bg-blue-50 p-2 outline-none border focus-within:border-amber-200 rounded'
            />
          </div>

          {/* Description Field */}
          <div className='grid gap-1'>
            <label htmlFor='description' className='font-medium'>Description</label>
            <textarea
              id='description'
              name='description'
              placeholder='Enter Product Description'
              value={data.description}
              onChange={handleChange}
              rows={3}
              required
              className='bg-blue-50 p-2 outline-none border focus-within:border-amber-200 rounded resize-none'
            />
          </div>

          {/* Image Upload */}
          <div>
            <p className='font-medium mb-1'>Image</p>
            <label
              htmlFor='productImage'
              className='bg-blue-50 h-24 border rounded flex justify-center items-center cursor-pointer hover:bg-blue-100'
            >
              <div className='text-center flex justify-center items-center flex-col text-gray-700'>
                {
                  imageloading ? <Loading/> : (
                    <>
                      <FaCloudUploadAlt size={28} />
                      <p>Upload Image</p>
                    </>
                  )
                }
              </div>
              <input
                type='file'
                id='productImage'
                className='hidden'
                accept='image/*'
                onChange={handleUploadImage}
              />
            </label>

            {/* Display Uploaded Images */}
            <div className='flex flex-wrap gap-2'>
              {
                data.image.map((img,index)=>{
                  return(
                    <div key={img+index} className='h-20 mt-1 w-20 min-w-20 bg-blue-50 relative group'>
                      <img
                      src={img}
                      alt={index}
                      className='w-full h-full object-scale-down cursor-pointer'
                      onClick={()=>setViewImageURL(img)}
                      />
                      <div onClick={()=>handleDeleteImage(index)} className='absolute bottom-1 right-1 p-1 bg-red-500 hover:bg-red-600 rounded text-white hidden cursor-pointer group-hover:block'>
                        <MdDelete />
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          
          {/** Category */}
          <div className='frid gap-1'>
              <div>
              <label>Category</label>
              <select className='bg-blue-50 border w-full p-2 rounded'
              value={selectCategory}
              onChange={(e)=>{ 
                const value = e.target.value
                const category = allCategory.find(el => el._id === value)
                console.log("Value",category)

                setData((preve)=>{
                  return{
                    ...preve,
                    category : [...preve.category,category]
                  }
                })
                setSelectCategory("")
              }} 
              >
                <option value={""}>Select Category</option>
                {
                   allCategory.map((c,index)=>{
                    return (
                      <option value={c?._id}>{c.name}</option>
                    )
                   })
                  }
                  
              </select>
              <div className='flex flex-wrap gap-3'>
              {
                data.category.map((c,index)=>{
                    return(
                      <div key={c._id+index+"ProductSection"} className='flex gap-2 text-sm items-center bg-blue-50 mt-2 p-1' onClick={()=>handleRemoveCategory(index)}>
                        <p>{c.name}</p>
                        <div className='cursor-pointer hover:text-red-500'>
                          <IoMdClose size={25}/>
                        </div>
                      </div>
                  )
                })
              }
              </div>
              </div>
          </div>
          
          {/**Sub Category */}
          <div className='frid gap-1'>
              <div>
              <label>Sub Category</label>
              <select className='bg-blue-50 border w-full p-2 rounded'
              value={selectSubCategory}
              onChange={(e)=>{ 
                const value = e.target.value
                const subCategory = allSubCategory.find(el => el._id === value)
                setData((preve)=>{
                  return{
                    ...preve,
                    subCategory : [...preve.subCategory,subCategory]
                  }
                })
                setSelectSubCategory("")
              }} 
              >
                <option value={""}>Select Sub Category</option>
                {
                   allSubCategory.map((c,index)=>{
                    return (
                      <option value={c?._id}>{c.name}</option>
                    )
                   })
                  }
                   
              </select>
              <div className='flex flex-wrap gap-3'>
              {
                data.subCategory.map((c,index)=>{
                    return(
                      <div key={c._id+index+"ProductSection"} className='flex gap-2 text-sm items-center bg-blue-50 mt-2 p-1' onClick={()=>handleRemoveSubCategory(index)}>
                        <p>{c.name}</p>
                        <div className='cursor-pointer hover:text-red-500'>
                          <IoMdClose size={25}/>
                        </div>
                      </div>
                  )
                })
              }
              </div>
              </div>
          </div>
          
          {/**Unit Section */}
          <div className='grid gap-1'>
            <label htmlFor='unit' className='font-medium'>Unit</label>
            <input
              type='text'
              id='unit'
              name='unit'
              placeholder='Enter Product Unit'
              value={data.unit}
              onChange={handleChange}
              required
              className='bg-blue-50 p-2 outline-none border focus-within:border-amber-200 rounded'
            />
          </div>

          {/**Stock Section */}
          <div className='grid gap-1'>
            <label htmlFor='stock' className='font-medium'>Number of Stock</label>
            <input
              type='number'
              id='stock'
              name='stock'
              placeholder='Enter Product Stock'
              value={data.stock}
              onChange={handleChange}
              required
              className='bg-blue-50 p-2 outline-none border focus-within:border-amber-200 rounded'
            />
          </div>

          {/**Price Section */}
          <div className='grid gap-1'>
            <label htmlFor='price' className='font-medium'>Price</label>
            <input
              type='number'
              id='price'
              name='price'
              placeholder='Enter Product Price'
              value={data.price}
              onChange={handleChange}
              required
              className='bg-blue-50 p-2 outline-none border focus-within:border-amber-200 rounded'
            />
          </div>

          {/**Discount Section */}
          <div className='grid gap-1'>
            <label htmlFor='discount' className='font-medium'>Discount</label>
            <input
              type='number'
              id='discount'
              name='discount'
              placeholder='Enter Product discount'
              value={data.discount}
              onChange={handleChange}
              required
              className='bg-blue-50 p-2 outline-none border focus-within:border-amber-200 rounded'
            />
          </div>
          
          {/**Add More Field */}
            {
              Object.keys(data.more_details).map((k,index)=>{
                return(
                    <div className='grid gap-1'>
                      <label htmlFor={k} className='font-medium'>{k}</label>
                      <input
                        type='text'
                        id={k}
                        value={data?.more_details[k]}
                        onChange={(e)=>{
                           const value = e.target.value
                           setData((preve)=>{
                            return{
                              ...preve,
                              more_details : {
                                ...preve.more_details,
                                [k] : value
                              }
                            }
                           })
                        }}
                        required
                        className='bg-blue-50 p-2 outline-none border focus-within:border-amber-200 rounded'
                      />
                    </div>
                )
              }) 
            }
      
          <div onClick={()=>setopenAddField(true)} className='inline-block bg-amber-300 hover:bg-white py-1 px-3 w-32 text-center font-semibold border border-yellow-400 hover:text-neutral-900 cursor-pointer rounded'>
            Add Fields
          </div>
          <button className='bg-yellow-300 hover:bg-yellow-400 py-2 rounded font-semibold cursor-pointer'>Submit</button>
        </form>
      </div>
      {
        ViewImageURL && (
          <ViewImage 
          url={ViewImageURL} 
          close={()=>setViewImageURL("")}/>
        )
      }
      {
        openAddField && (
          <AddFieldComponent 
          value={fieldName}
          onChange={(e)=>{setfieldName(e.target.value)}}
          submit={handleAddField}
          close={()=>setopenAddField(false)}/>
        )
      }
    </section>
  );
};

export default UploadProduct;
