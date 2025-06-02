import React, { useState } from 'react'
import DisplayPriceInPKr from '../utils/DisplayPriceInPKr'
import { useGlobalContext } from '../provider/GlobalProvider'
import AddAddress from '../components/AddAddress'
import { useSelector } from 'react-redux'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

const CheckOutPage = () => {
    const { notDiscountTotalPrice, totalPrice, totalQty ,fetchCartItem} = useGlobalContext()
    const [openAddress, setopenAddress] = useState(false)
    const addressList = useSelector(state => state.addresses.addressList)
    const [selectAddress, setSelectAddress] = useState(0)
    const cartItemsList = useSelector(state => state.cartItem.cart)
    const naviagte = useNavigate()
    
    const handleCashOnDelivey = async()=>{
        try {
            const response = await Axios({
                ...SummaryApi.CashOnDeliveryOrder,
                data : {
                    list_items : cartItemsList,
                    addressId : addressList[selectAddress]._id,
                    totalAmt : totalPrice,
                    subTotalAmt : totalPrice
                }   
            })

            const {data : responseData} = response

            if(responseData.success){
                toast.success(responseData.message)
                if(fetchCartItem){
                    fetchCartItem()
                }
                naviagte('/success',{
                    state : {
                        text : 'Order'
                    }
                })
            }

        } catch (error) {
            AxiosToastError(error)
        }
    }


    return (
        <section className='bg-blue-50 '>
            <div className='container mx-auto p-4 flex flex-row w-full gap-5 justify-between'>
                <div className='w-full'>
                    {/**Address */}
                    <h3 className='text-lg font-semibold'>Choose Your Address</h3>
                    <div className='bg-white p-2 grid gap-4'>
                        {
                            addressList.map((address, index) => {
                                return (
                                    <label htmlFor={'address'+index} className={!address.status && "hidden"}>
                                        <div className='border rounded p-3 flex gap-3 hover:bg-blue-50'>
                                            <div>
                                                <input id={'address'+index} onChange={(e) => setSelectAddress(e.target.value)} type='radio' value={index} name='address' />
                                            </div>
                                            <div>
                                                <p>{address.address_line}</p>
                                                <p>{address.city}</p>
                                                <p>{address.state}</p>
                                                <p>{address.country} - {address.pincode}</p>
                                                <p>{address.mobile}</p>
                                            </div>
                                        </div>
                                    </label>
                                )
                            })
                        }
                        <div onClick={() => setopenAddress(true)} className='h-16 bg-blue-50 border-2 border-dashed flex justify-center items-center cursor-pointer'>
                            Add Address
                        </div>
                    </div>
                </div>

                <div className='w-full mx-w-md bg-white px-2 py-4'>
                    {/**Summary */}
                    <h3 className='text-lg font-semibold'>Summary</h3>
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
                    <div className='w-fulln flex flex-col gap-4 p-2'>
                        <button className='bg-green-600 hover:bg-green-700 py-2 px-4 border-2 text-white font-semibold rounded cursor-pointer'>Online Payment</button>
                        <button onClick={handleCashOnDelivey} className='bg-green-600 hover:bg-green-700 py-2 px-4 text-white font-semibold rounded cursor-pointer'>Cash On Delivery</button>
                    </div>
                </div>
            </div>
            {
                openAddress && (
                    <AddAddress close={() => setopenAddress(false)} />
                )
            }
        </section>
    )
}

export default CheckOutPage
