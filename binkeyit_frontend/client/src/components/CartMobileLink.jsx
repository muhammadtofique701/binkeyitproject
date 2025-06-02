import React from 'react';
import { useGlobalContext } from '../provider/GlobalProvider';
import { IoCartSharp } from 'react-icons/io5';
import DisplayPriceInPKr from '../utils/DisplayPriceInPKr';
import { FaCaretRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CartMobileLink = () => {
    const { totalPrice, totalQty } = useGlobalContext();
    const cartItem = useSelector(state => state.cartItem.cart)

    return (
        <>
            {
                cartItem[0] && (
                    <div className='sticky bottom-4 p-2 lg:hidden'>
                        <div className="fixed bottom-4 left-4 right-4 z-50 bg-green-600 text-white rounded-lg shadow-md px-4 py-3 flex items-center justify-between gap-3">

                            {/* Cart Icon */}
                            <div className="bg-green-800 p-2 rounded-full">
                                <IoCartSharp size={24} />
                            </div>

                            {/* Text Info */}
                            <div className="flex flex-col text-sm leading-tight">
                                <span className="font-semibold">{totalQty} Items</span>
                                <span className="text-xs opacity-90">{DisplayPriceInPKr(totalPrice)} Total</span>
                            </div>

                            {/* View Cart Button */}
                            <Link
                                to="/cart"
                                className="flex items-center gap-1 text-sm font-medium bg-white text-green-700 px-3 py-1 rounded-full hover:bg-gray-100 transition"
                            >
                                <span>View Cart</span>
                                <FaCaretRight />
                            </Link>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default CartMobileLink;
