import React, { useState } from 'react'
import { IoClose } from "react-icons/io5"
import uploadImage from '../utils/UploadImage'
import Axios from '../utils/Axios.js'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError.js'



const EditCategory = ({fetchData,close, data: CategoryData }) => {
  const [data, setData] = useState({
    _id: CategoryData._id,
    name: CategoryData.name,
    image: CategoryData.image
  })

  const [loading, setLoading] = useState(false)

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleUploadCategoryImage = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      setLoading(true)
      const response = await uploadImage(file)
      const { data: imageResponse } = response

      setData(prev => ({
        ...prev,
        image: imageResponse.data.url
      }))
    } catch (error) {
      toast.error("Image upload failed.")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!data.name || !data.image) {
      toast.error("Name and image are required.")
      return
    }

    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.updateCategory,
        data
      })

      const { data: responseData } = response
      if (responseData.success) {
        toast.success(responseData.message)
        fetchData()
        close()
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="fixed inset-0 bg-neutral-800/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-semibold">Update Category</h1>
          <button onClick={close} className="text-gray-500 cursor-pointer">
            <IoClose size={24} />
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="space-y-1">
            <label htmlFor="categoryName" className="block text-sm font-medium">Name</label>
            <input
              type="text"
              id="categoryName"
              name="name"
              value={data.name}
              onChange={handleOnChange}
              placeholder="Enter category name"
              className="w-full p-2 border border-gray-300 rounded bg-blue-50 focus:ring-2 focus:ring-blue-300 outline-none"
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-1">
            <p className="text-sm font-medium">Image</p>
            <div className="flex flex-col lg:flex-row items-center gap-4">
              <div className="border bg-blue-50 h-36 w-36 flex items-center justify-center rounded overflow-hidden">
                {data.image ? (
                  <img
                    alt={data.name || "Category Image"}
                    src={data.image}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <p className="text-sm text-neutral-500">No Image</p>
                )}
              </div>

              <label htmlFor="uploadCategoryImage" className="cursor-pointer">
                <div className={`px-4 py-2 rounded border text-center font-medium transition ${
                  data.name ? 'bg-blue-100 hover:bg-blue-200 border-blue-300' : 'bg-gray-300 cursor-not-allowed'
                }`}>
                  {loading ? 'Uploading...' : 'Upload Image'}
                </div>
                <input
                  type="file"
                  id="uploadCategoryImage"
                  onChange={handleUploadCategoryImage}
                  disabled={!data.name || loading}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!data.name || !data.image || loading}
            className={`w-full py-2 rounded font-semibold cursor-pointer text-white transition ${
              data.name && data.image && !loading
                ? 'bg-blue-500 hover:bg-blue-600'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {loading ? 'Updating...' : 'Update Category'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default EditCategory
