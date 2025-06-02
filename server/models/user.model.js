import pkg from 'jsonwebtoken';
import mongoose, { Schema } from "mongoose";

const { verify } = pkg;


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , "Provide name"]
    },
    email : {
         type : String,
         required : [true ,"Provide email"],
         unique : true 
    },
    password : {
        type : String,
        required : [true , "Provide Password"]
    },
    avatar : {
        type : String,
        default : ""
    },
    mobile : {
        type : Number,
        default : ""
    },
    refresh_token : {
        type : String,
        default : ""
    },
    verify_email : {
        type : Boolean,
        default : false
    },
    last_login_date : {
        type : Date,
        default : ""
    },
    status : {
        type : String,
        enum : ["Active", "Inactive", "Suspended"],
        default : "Active"
    },
    address_details : [
        {
            type: mongoose.Schema.ObjectId,
            red : 'address'
        }
    ],
    shopping_cart : [
        {
            type: mongoose.Schema.ObjectId,
            red : 'cartProduct'
        }
    ],
    orderHistory : [
        {
            type: mongoose.Schema.ObjectId,
            red : 'order'
        }
    ],
    forgot_password_otp :{
        type : String,
        default : ""
    },
    forgot_password_expiry : {
        type : Date,
        default : ""
    },
    role : {
        type : String,
        enum : ["ADMIN", "USER"],
        default : "USER"
    }
},{
    timestamps : true
})

const UserModel = mongoose.model("User",userSchema)

export default UserModel