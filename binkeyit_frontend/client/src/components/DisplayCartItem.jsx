import React from 'react'
import { IoClose } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../provider/GlobalProvider'
import DisplayPriceInPKr from '../utils/DisplayPriceInPKr'
import { FaCaretRight } from "react-icons/fa6"
import { useSelector } from 'react-redux'
import AddToCartButton from './AddToCartButton'
import imageEmpty from '../assets/empty_cart.webp'

const DisplayCartItem = ({ close }) => {
  const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext()
  const cartItem = useSelector(state => state.cartItem.cart)
  const hasItems = cartItem && cartItem.length > 0
  const user = useSelector(state => state.user)
  const navigate = useNavigate()

  const redirectToCheckoutPage = ()=>{
    if(user?._id){
      navigate('/checkout')
      if(close){
        close()
      }
      return
    }
    toast("Please Login")
  }

  return (
    <section className='bg-neutral-900/25 fixed top-0 bottom-0 right-0 left-0 z-50'>
      <div className='bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto shadow-lg'>

        {/* Header */}
        <div className='flex items-center p-2 shadow-md gap-3 justify-between'>
          <h2 className='font-semibold text-lg'>Cart</h2>
          <button onClick={close} className='cursor-pointer p-1'>
            <IoClose size={25} />
          </button>
        </div>

        {/* Body */}
        <div className='min-h-[86.5vh] h-full max-h-[calc(100vh-120px)] overflow-y-auto bg-blue-50 p-2 flex flex-col gap-4'>

          {hasItems ? (
            <>
              {/* Total Savings */}
              <div className='flex items-center px-4 py-2 bg-blue-100 text-blue-500 rounded-full justify-between'>
                <p>Your Total Savings</p>
                <p>{DisplayPriceInPKr(notDiscountTotalPrice)}</p>
              </div>

              {/* Items List */}
              <div className='bg-white rounded-lg p-4 grid gap-4'>
                {cartItem.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 border-b pb-2">
                    <div className='w-20 h-20 bg-gray-100 rounded overflow-hidden shrink-0 border border-neutral-200'>
                      <img
                        src={item?.productId?.image}
                        alt={item?.productId?.name || "Product"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col text-sm flex-1">
                      <p className="font-semibold">{item?.productId?.name || "Unnamed Product"}</p>
                      <div>
                        <AddToCartButton data={item?.productId} />
                      </div>
                      <p>Qty: {item?.quantity}</p>
                      <p className="text-green-700 font-medium">
                        {DisplayPriceInPKr(item?.productId?.price * item?.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bill Summary */}
              <div className='bg-white p-4 rounded shadow'>
                <h3 className='font-semibold mb-2'>Bill Details</h3>
                <div className="flex justify-between mb-1">
                  <p>Total Price</p>
                  <p>{DisplayPriceInPKr(totalPrice)}</p>
                </div>
                <div className="flex justify-between">
                  <p>Total Quantity</p>
                  <p>{totalQty} Items</p>
                </div>
                <div className="flex justify-between">
                  <p>Delivery Charges</p>
                  <p>Free</p>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center p-4">
              <img
                src={imageEmpty}
                className='w-full h-full object-contain'
                alt="Empty cart"
              />
              <p className="text-gray-500 mt-2">Your cart is empty.</p>
              <Link onClick={close} to={"/"} className='mt-4 inline-block bg-green-600 px-4 py-2 text-white rounded hover:bg-green-700'>
                Shop Now
              </Link>
            </div>
          )}

        </div>

        {/* Footer */}
        {hasItems && (
          <div className='p-2 bg-white'>
            <div className='bg-green-500 text-white p-4 font-bold text-base sticky bottom-0 rounded flex items-center gap-4 justify-between'>
              <div>{DisplayPriceInPKr(totalPrice)}</div>
              <button onClick={redirectToCheckoutPage} className='flex items-center gap-2 cursor-pointer hover:underline'>
                Proceed <FaCaretRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default DisplayCartItem
