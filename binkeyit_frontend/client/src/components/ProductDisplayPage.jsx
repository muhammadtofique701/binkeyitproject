import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import DisplayPriceInPKr from '../utils/DisplayPriceInPKr'
import Divider from '../components/Divider'
import image1 from "../assets/minute_delivery.png"
import image2 from "../assets/Best_Prices_Offers.png"
import image3 from "../assets/Wide_Assortment.png"
import { PriceWithDiscount } from '../utils/PriceWithDiscount'
import AddToCartButton from './AddToCartButton'

const ProductDisplayPage = () => {
  const params = useParams()
  const productId = params?.product?.split("-")?.slice(-1)[0] || ""

  const [data, setData] = useState({
    name: "",
    image: []
  })
  const [image, setImage] = useState(0)
  const [loading, setLoading] = useState(false)
  const imageContainer = useRef()

  const fetchProductDetails = async () => {
    setLoading(true)
    try {
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: {
          productId: productId
        }
      })
      const { data: responseData } = response

      // Fix: use responseData.success (not Response.success)
      if (responseData.success) {
        setData(responseData.data)
      }

    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductDetails()
  }, [params])

  const handleScrollRight = () => {
    imageContainer.current.scrollLeft += 100
  }

  const handleScrollLeft = () => {
    imageContainer.current.scrollLeft -= 100
  }

  return (
    <section className='container mx-auto p-4 grid lg:grid-cols-2 '>
      <div>
        <div className='bg-white lg:min-h-[60vh] lg:max-h-[60vh] rounded min-h-56 max-h-56 h-full w-full'>
          <img
            src={data.image[image]}
            className='w-full h-full object-scale-down'
          />
        </div>
        <div className='flex items-center justify-center gap-3 my-3'>
          {
            data.image.map((img, index) => {
              return (
                <div key={img + index + "point"} className={`bg-slate-200 w-5 h-5 lg:w-5 lg:h-5 rounded-full ${index === image && "bg-slate-300"}`}></div>
              )
            })
          }
        </div>
        <div className='grid relative'>
          <div ref={imageContainer} className='flex gap-4 z-10 relative w-full overflow-x-auto scrollbar-none'>
            {
              data.image.map((img, index) => {
                return (
                  <div className='w-20 h-20 min-h-20 min-w-20 cursor-pointer shadow-md' key={img + index}>
                    <img
                      src={img}
                      alt='mini-product'
                      onClick={() => setImage(index)}
                      className='w-full h-full object-scale-down'
                    />
                  </div>
                )
              })
            }
          </div>
          <div className='w-full -ml-4 h-full flex justify-between absolute items-center'>
            <button onClick={handleScrollLeft} className='z-10 bg-white relative p-1 rounded-full shadow cursor-pointer'>
              <FaAngleLeft />
            </button>
            <button onClick={handleScrollRight} className='z-10 bg-white relative p-1 rounded-full shadow cursor-pointer'>
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className='p-4 lg:pl-7 tex-base lg:text-lg'>
          <p className='bg-green-300 w-fit px-2 rounded-full'>10 mints</p>
          <h2 className='text-lg-font-semibold lg:text-3xl'>{data.name}</h2>
          <p className='my-2'>{data.unit}</p>
          <Divider />
          <div className=''>
            <p className=''>Price</p>
            <div className='flex items-center gap-4'>
              <div className='border border-green-600 px-2 py-2 my-1 lg:my-2 rounded bg-green-50 w-fit'>
                <p className='font-semibold text-lg lg:text-xl'>{DisplayPriceInPKr(PriceWithDiscount(data.price, data.discount))}</p>
              </div>
              {
                data.discount && (
                  <p className="line-through text-lg text-gray-500">
                    {DisplayPriceInPKr(data.price)}
                  </p>
                )
              }

              {
                data.discount && (
                  <p className='font-semibold text-green-600 lg:text-2xl my-1'>{data.discount}%<span className='text-base text-neutral-500'> Discount</span></p>
                )
              }
            </div>

          </div>
          {
            data.stock === 0 ? (
              <p className='text-lg text-red-500 my-2'>Out of Stock</p>
            ) : (
              // <button className='cursor-pointer my-4 px-4 py-1 bg-green-500 hover:bg-green-600 text-white rounded '>Add</button>
              <div>
                <AddToCartButton data={data}/>
              </div>
            )
          }

          <h2 className='font-semibold'>Why shop from binkeyit ?</h2>
          <div className='flex items-center gap-4 my-4'>
            <div>
              <img
                src={image1}
                alt='superfast delivery'
                className='w-20 h-20'
              />
            </div>
            <div className='text-sm'>
              <div className='font-semibold'>Superfast Delivery</div>
              <p>Get your order delivered to your doorstep at the earliest from dark stores near you.</p>
            </div>
          </div>
          <div className='flex items-center gap-4 my-4'>
            <div>
              <img
                src={image2}
                alt='best prices offers'
                className='w-20 h-20'
              />
            </div>
            <div className='text-sm'>
              <div className='font-semibold'>Best Prices & offers</div>
              <p>Best price destination with offers directly from the menufactures.</p>
            </div>
          </div>
          <div className='flex items-center gap-4 my-4'>
            <div>
              <img
                src={image3}
                alt='best prices offers'
                className='w-20 h-20'
              />
            </div>
            <div className='text-sm'>
              <div className='font-semibold'>Wide Assortment</div>
              <p>Choose from 5000+ products acros food personal care, household & other categories.</p>
            </div>
          </div>



        </div>
      </div>

      <div className='my-4 hidden lg:grid gap-3 '>
        <div>
          <p className='font-semibold'>Discreption</p>
          <p className='text-base'>{data.description}</p>
        </div>
        <div>
          <p className='font-semibold'>Unit</p>
          <p className='text-base'>{data.unit}</p>
        </div>
        {
          data?.more_details && Object.keys(data?.more_details).map((Element, index) => {
            return (
              <div>
                <p className='font-semibold'>{Element}</p>
                <p className='text-base'>{data?.more_details[Element]}</p>
              </div>
            )
          })
        }
      </div>
    </section>
  )
}

export default ProductDisplayPage
