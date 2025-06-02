import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import Search from './Search';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { VscTriangleDown } from "react-icons/vsc";
import { VscTriangleUp } from "react-icons/vsc";
import UserMenu from './UserMenu';
import DisplayPriceInPKr from '../utils/DisplayPriceInPKr';
import { useGlobalContext } from '../provider/GlobalProvider';
import DisplayCartItem from './DisplayCartItem';



function Header() {

    const navigate = useNavigate();
    const redirectToLoginPage = () => { navigate("/login"); }
    const cartItem = useSelector(state => state.cartItem.cart)
    // const [totalPrice, setTotalPrice] = useState(0)
    // const [totalQty, setTotalQty] = useState(0)
    const { totalPrice, totalQty } = useGlobalContext()
    const [openCartSection, setOpenCartSection] = useState(false)

    const handleCloseUserMenu = () => {
        setOpenUserMenu(false);
    }

    const user = useSelector((state) => state?.user);
    const [openUserMenu, setOpenUserMenu] = useState(false);


    const handleMobileUser = () => {
        if (!user._id) {
            navigate("/login");
            return;
        }
        navigate("/user");
    }

    //Total items and Total Price
    // useEffect(() => {
    //     const qty = cartItem.reduce((preve, curr) => {
    //         return preve + curr.quantity
    //     }, 0);
    //     setTotalQty(qty);

    //     const tPrice = cartItem.reduce((preve, curr) => {
    //         const price = Number(curr?.productId?.price) || 0;
    //         const quantity = Number(curr?.quantity) || 0;
    //         return preve + price * quantity;
    //     }, 0);
    //     setTotalPrice(tPrice);

    //     console.log('Cart total price:', tPrice);
    // }, [cartItem]);



    return (
        <header className="sticky top-0 bg-blue-50 z-50 shadow-md">
            <div className="max-w-screen-xl mx-auto px-4 h-20 flex items-center justify-between lg:justify-normal lg:gap-6">

                {/* ----------- Mobile: 3 Columns ----------- */}
                <div className="w-full flex items-center justify-between lg:hidden gap-2">

                    {/* Left: Logo */}
                    <Link to="/" className="shrink-0">
                        <img
                            src={logo}
                            width={100}
                            height={40}
                            alt="Logo"
                            className="block"
                        />
                    </Link>

                    {/* Center: Search */}
                    <div className="flex-grow px-2">
                        <Search />
                    </div>

                    {/* Icon display only for mobile user  */}
                    <button className="text-neutral-600 shrink-0 cursor-pointer" onClick={handleMobileUser}>
                        <FaRegUserCircle size={26} />
                    </button>
                </div>

                {/* ----------- Desktop Layout ----------- */}
                <div className="hidden lg:flex w-full items-center justify-between">

                    {/* Logo */}
                    <Link to="/" className="shrink-0">
                        <img
                            src={logo}
                            width={170}
                            height={60}
                            alt="Logo"
                        />
                    </Link>

                    {/* Search */}
                    <div className="w-full max-w-md px-6">
                        <Search />
                    </div>

                    {/* Desktop Part */}
                    <div className="flex items-center gap-10 text-neutral-800">
                        {
                            user?._id ? (
                                <div className='relative'>
                                    <div onClick={() => setOpenUserMenu(preve => !preve)} className='flex select-none items-center gap-2 cursor-pointer'>
                                        <p>Account</p>
                                        {
                                            openUserMenu ? (
                                                <VscTriangleUp size={20} />
                                            ) : (
                                                <VscTriangleDown size={20} />
                                            )
                                        }
                                    </div>
                                    {
                                        openUserMenu && (

                                            <div className="absolute right-0 top-12">
                                                <div className="bg-white rounded-md p-4 min-w-42 lg:w-52 shadow-lg">
                                                    <UserMenu close={handleCloseUserMenu} />
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            ) : (
                                <button onClick={redirectToLoginPage} className="text-lg p-2 hover:text-neutral-600 cursor-pointer" >
                                    Login
                                </button>
                            )
                        }
                        {/* Login Button */}

                        {/* Cart Icon & Details */}
                        <button onClick={() => setOpenCartSection(true)} className=''>
                            <div className="flex items-center space-x-3 cursor-pointer bg-green-800 hover:bg-green-700 px-3 py-3 rounded text-white">
                                <BsCart4 size={30} />
                                <div className='font-semibold'>
                                    {
                                        cartItem[0] ? (
                                            <div>
                                                <p>{totalQty} Items</p>
                                                <p>{DisplayPriceInPKr(totalPrice)} Price</p>
                                            </div>
                                        ) : (

                                            <p>My Cart</p>
                                        )
                                    }
                                </div>
                            </div>
                        </button>
                        {
                            openCartSection && (
                                <DisplayCartItem close={()=>setOpenCartSection(false)}/>
                            )
                        }
                    </div>
                </div>

            </div>
        </header>
    );
}

export default Header;
