import { request, response } from 'express'
import AddressModel from '../models/address.model.js'
import UserModel from '../models/user.model.js'
import { useState } from 'react'

export const addAddressController =  async(request,response)=>{
    try {
        
        const userId = request.userId // middleware
        const { address_line , city, state, pincode, country,mobile,status} = request.body

        const createAddress = new AddressModel({
            address_line,
            city,
            state,
            pincode,
            country,
            mobile,
            userId : userId
        })

        const savaAddress = await createAddress.save()

        const addUserAddressId = await UserModel.findByIdAndUpdate(userId,{
            $push : {
                address_details : savaAddress._id
            }
        })

        return response.json({
            message : "Address Created Successfully",
            error : false,
            success : true,
            data : savaAddress
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true ,
            success : false
        })
    }
}

export const getAddressController = async(request,response)=>{
    try {
        const userId = request.userId //middleware auth

        const data = await AddressModel.find({userId : userId}).sort({createdAt : -1})

        return response.json({
            data : data,
            message : "List of address",
            error : false,
            success : true
        })
    } catch (error) {
            return response.status(500).json({
                message : error.message || error,
                error : true,
                success : false
            })
    }
}

export const updateAddressController = async (request, response) => {
    try {
        const userId = request.userId; // From auth middleware
        const { _id, address_line, city, state, country, pincode, mobile } = request.body;

        if (!_id) {
            return response.status(400).json({
                message: "Address ID (_id) is required",
                error: true,
                success: false,
            });
        }

        const updateResult = await AddressModel.updateOne(
            { _id, userId },
            {
                address_line,
                city,
                state,
                country,
                pincode,
                mobile,
            }
        );

        if (updateResult.modifiedCount === 0) {
            return response.status(404).json({
                message: "Address not found or nothing to update",
                error: true,
                success: false,
            });
        }

        return response.json({
            message: "Address updated successfully",
            error: false,
            success: true,
            data: updateResult,
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || "Internal Server Error",
            error: true,
            success: false,
        });
    }
};

export const deleteAddressController = async(request,response)=>{
    try {
        const userId = request.userId //Auth Middleware
        const { _id } = request.body


        const disableAddress = await AddressModel.updateOne({ _id : _id , userId},{
            status : false
        })

        return response.json({
            message : "Address Remove",
            error : false,
            success : true,
            data : disableAddress
        })
    } catch (error) {
            return response.status(500).json({
                message : error.message || error,
                error : true,
                success : false
            })
    }
}