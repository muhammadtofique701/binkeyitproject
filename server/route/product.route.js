import {Router} from 'express'
import auth from "../middleware/auth.js"
import { createProductController, getProductByCategory, getProductByCategoryAndSubCategory, getProductController, getProductDetails, ProductDeleteDetails, searchProduct, updateProductDetails } from '../controllers/product.controller.js'
import { admin } from '../middleware/Admin.js'

const productRouter = Router()

productRouter.post("/create",auth,admin,createProductController)
productRouter.post("/get",getProductController)
productRouter.post("/get-product-by-category",getProductByCategory)
productRouter.post("/get-product-by-category-and-subcategory",getProductByCategoryAndSubCategory)
productRouter.post('/get-product-details',getProductDetails)

//Update Product
productRouter.put("/update-product-details",auth,admin,updateProductDetails)

//Delte Product
productRouter.delete("/product-delete",auth,admin,ProductDeleteDetails)

//Search Product
productRouter.post('/search-product',searchProduct)

export default productRouter