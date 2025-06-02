import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Divider from './Divider.jsx';
import Axios from '../utils/Axios.js';
import SummaryApi from '../common/SummaryApi.js';
import { logout } from '../store/userSlice.js';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError.js';
import { FiExternalLink } from "react-icons/fi";
import isAdmin from '../utils/isAdmin.js';


function UserMenu({ close }) {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout,
      });

      if (response?.data?.success) {
        if (close) close();
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message || "Logged out successfully");
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleClose = () => {
    if (close) close();
  }

  return (
    <div className="text-sm text-neutral-800 space-y-2">
      {/* Account Header */}
      <div className="font-semibold text-base">My Account</div>
      <div className="text-gray-600 truncate items-center gap-2 flex">
       <span className='max-w-52 text-ellipsis line-clamp-1'>{user?.name || user?.mobile}</span><span className='text-medium text-red-600'>{user.role === "ADMIN" ? "(Admin)" : ""}</span> 
        <Link onClick={handleClose} to={"/dashboard/profile"} className='hover:text-yellow-500'>
        <FiExternalLink size={15} className='flex mb-1'/>

        </Link>
      </div>

      <Divider />

      {/* Menu Options */}
      <div className="flex flex-col space-y-1">
        {
          isAdmin(user.role) && (

        <Link
        onClick={handleClose}
        to="/dashboard/category"
        className="px-2 py-1 rounded hover:bg-orange-100 transition-colors"
        >
          Category
        </Link>

          )
        }

         {
          isAdmin(user.role) && (
        <Link
        onClick={handleClose}
        to="/dashboard/subcategory"
        className="px-2 py-1 rounded hover:bg-orange-100 transition-colors"
        >
          Sub-Category
        </Link>
          )
        }

        {
          isAdmin(user.role) && (
        <Link
        onClick={handleClose}
        to="/dashboard/upload-product"
        className="px-2 py-1 rounded hover:bg-orange-100 transition-colors"
        >
          Upload Product
        </Link>
          )
        }

        {
          isAdmin(user.role) && (
        <Link
        onClick={handleClose}
        to="/dashboard/product"
        className="px-2 py-1 rounded hover:bg-orange-100 transition-colors"
        >
          Products
        </Link>
          )
        }


        <Link
        onClick={handleClose}
        to="/dashboard/myorders"
        className="px-2 py-1 rounded hover:bg-orange-100 transition-colors"
        >
          My Orders
        </Link>

        <Link
          onClick={handleClose}
          to="/dashboard/address"
          className="px-2 py-1 rounded hover:bg-orange-100 transition-colors"
        >
          Saved Addresses
        </Link>


        <button
          onClick={handleLogout}
          className="text-left px-2 py-1 rounded hover:bg-orange-100 transition-colors cursor-pointer"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default UserMenu;
