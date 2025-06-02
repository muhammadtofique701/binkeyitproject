// import { userDetails } from "../../../server/controllers/user.controller";

// import { get } from "mongoose";
import { logout } from "../store/userSlice";
export const baseURL = import.meta.env.VITE_API_URL

const SummaryApi = {
  register: {
    method: 'POST',
    url: '/user/register' // ✅ now it resolves to http://localhost:8080/api/user/register
  },
  login : {
    url : "/user/login",
    method : 'POST'
  },
    forgot_password : {
    url : "user/forgot-password",
    method : 'PUT'
  },
    forgot_password_otp_verfication : {
    url : "user/verify-forgot-password-otp",
    method : 'PUT'
  },
    resetPassword : {
    url : "user/reset-password",
    method : 'PUT'
  },
  refresToken : {
    url : 'user/refresh-token',
    method : 'POST'
  },
  userDetails : {
    url : 'user/user-details',
    method : 'GET'
  },
  logout : {
    url : 'user/logout',
    method : 'GET'
  },
  uploadAvatar : {
    url : "user/upload-avatar",
    method : "PUT"
  },
  updateUserDetails : {
    url : "user/update-user",
    method : "PUT"
  },
  addCategory : {
    url : "/category/add-category",
    method : "POST"
  },
  uploadImage : {
    url : "/file/upload",
    method : "POST"
  },
  getCategory : {
    url : "/category/get",
    method : "GET"
  },
  updateCategory : {
    url : "/category/update",
    method : "PUT"
  },
  deleteCategory : {
    url : "/category/delete",
    method : "DELETE"
  },
  createSubCategory : {
    url : "/subcategory/create",
    method : "POST"
  },
  getSubCatgory : {
    url : "/subcategory/get",
    method : "POST"
  },
  updatesubcategory : {
    url : "/subcategory/update",
    method : "PUT"
  },
  deleteSubCategory : {
    url : "/subcategory/delete",
    method : "DELETE"
  },
  createProduct : {
    url : "/product/create",
    method :'Post'
  },
  getproduct : {
    url : "/product/get",
    method : "POST"
  },
  getproductBYCategory : {
    url : "/product/get-product-by-category",
    method : "POST"
  },
  getproductByCategoryAndSubCategory : {
    url : "/product/get-product-by-category-and-subcategory", 
    method : "POST"
  },
  getProductDetails : {
    url : "/product/get-product-details",
    method : "post"
  },
  updateProductDetails : {
    url : "/product/update-product-details",
    method : "PUT" 
  },
  deleteProduct : {
      url : "/product/product-delete",
      method : "Delete"
  },
  searchProduct : {
    url : "/product/search-product",
    method: "POST"
  },
  addToCart : {
    url : '/cart/create',
    method : "POST"
  },
  getCartItem : {
     url : '/cart/get',
     method : 'GET'
  },
  updateCartItemQty : {
    url : '/cart/update-qty',
    method : "PUT"
  },
  deleteCartItem : {
    url : '/cart/delete-cart-item',
    method : 'Delete'
  },
  createAddress : {
    url : '/address/create',
    method : 'POST'
  },
  getAddress : {
    url : '/address/get',
    method : 'GET'
  },
  updateAddress : {
    url : '/address/update',
    method : 'PUT'
  },
  disableAddress : {
    url : '/address/disable',
    method : 'DELETE'
  },
  CashOnDeliveryOrder : {
    url : '/order/cash-on-delivery',
    method : 'POST'
  }
   
  // other routes...

  
};

export default SummaryApi;
