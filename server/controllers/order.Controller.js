import CartProductModel from '../models/cartproduct.model.js'
import OrderModel from '../models/order.model.js'
import UserModel from '../models/user.model.js'
import mongoose from 'mongoose'

export async function CashOnDeliveryOrderController(request,response){
    try {
        
        const userId = request.userId //middleware
        const { list_items, totalAmt, addressId,subTotalAmt} = request.body 
        
        console.log("item lists",list_items)
        console.log("totalAmt",totalAmt)
        console.log("addressId",addressId)
        console.log("subTotalAmt",subTotalAmt)
        
        const payload = list_items.map(el=>{
            return({
                userId : userId,
                orderId : `ORD-${new mongoose.Types.ObjectId()}`,
                productId : el.productId._id,
                product_details : {
                    name : el.productId.name,
                    image : el.productId.image
                },
                paymentId : "",
                payment_status :"Cash On Delivery",
                delivery_address : addressId,
                subTotalAmt : subTotalAmt,
                TotalAmt : totalAmt
            })
        })

        const generateOrder = await OrderModel.insertMany(payload)

        //remove from the cart

        const removeCartItems = await CartProductModel.deleteMany({userId: userId})
        const updateInUser = await UserModel.updateOne({_id : userId},{shopping_cart  : []})

        return response.json({
            message : "Order Successfully",
            error : false,
            success : true,
            data : generateOrder
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            succces : false
        })
    }
}