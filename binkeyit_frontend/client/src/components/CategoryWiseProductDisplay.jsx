import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import CardLoading from '../components/CardLoading'
import CardProduct from '../components/CardProduct'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { useSelector } from 'react-redux'
import { validURLConvert } from '../utils/validURLConvert'

const CategoryWiseProductDisplay = ({ id, name }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true) // Force loading to true
  const containerRef = useRef(null)
  
  const loadingCardNumber = new Array(7).fill(null)
  const subCategoryData = useSelector(state => state.product.allSubCategory);

  const fetchCategoryWiseProduct = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getproductBYCategory,
        data: { id }
      })

      const { data: responseData } = response

      // console.log("Response Data", responseData)
      
      if (responseData.success) {
        setData(responseData.data)
      } else {
        console.error("Error fetching category wise product", responseData.message)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategoryWiseProduct() // Comment this to prevent fetch during test
  }, [])

  const handleScrollRight = () => {
    containerRef.current?.scrollBy({
      left: 200,
      behavior: 'smooth'
    });
  }

  const handleScrollLeft = () => {
    containerRef.current?.scrollBy({
      left: -200,
      behavior: 'smooth'
    });
    
  }
  
const handleRedirectProductListPage = () => {
  const subCategory = subCategoryData.find(sub =>
    sub.category?.some(c => c._id === id)
  )

  if (!subCategory) {
    // fallback: prevent crash and optionally show a fallback route
    return `/${validURLConvert(name)}-${id}/unknown-subcategory`
  }

  return `/${validURLConvert(name)}-${id}/${validURLConvert(subCategory?.name)}-${subCategory?._id}`
}


  return (
    <div className="relative mb-8">
      {/* Header */}
      <div className="container mx-auto p-4 flex items-center justify-between gap-4">
        <h3 className="font-semibold text-lg md:text-xl">{name}</h3>
        <Link to={handleRedirectProductListPage()} className="text-green-600 hover:text-green-400">
          See All
        </Link>
      </div>

      {/* Scrollable Product List with Arrows */}
      <div className="relative container mx-auto px-4">
        {/* Products */}
        <div
          ref={containerRef}
          className="flex gap-4 md:gap-6 lg:gap-8 overflow-x-scroll scroll-smooth no-scrollbar pb-4"
        >
          {loading
            ? loadingCardNumber.map((_, index) => (
                <CardLoading key={"CategoryWiseProductDisplayLoading" + index} />
              ))
            :
            // Commented this section to only show loading during testing
            data.map((p, index) => (
              <CardProduct data={p} key={p._id + "CategoryWiseProductDisplay" + index} />
            ))
            }
        </div>

        {/* Arrows */}
        <div className="hidden lg:block">
          <div className="absolute top-1/2 left-0 right-0 px-4 flex justify-between -translate-y-1/2 pointer-events-none">
            <button
              onClick={handleScrollLeft}
              className="pointer-events-auto z-10 bg-white hover:bg-gray-100 shadow-lg p-2 rounded-full text-lg cursor-pointer"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={handleScrollRight}
              className="pointer-events-auto z-10 bg-white hover:bg-gray-100 shadow-lg p-2 rounded-full text-lg cursor-pointer"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryWiseProductDisplay
