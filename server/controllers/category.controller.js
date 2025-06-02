import CategoryModel from "../models/category.model.js";
import SubCategoryModel from "../models/subCategory.model.js";
import ProductModel from "../models/product.model.js"


// Add Category Controller Section
export const AddCategoryController = async(request,response)=>{

    try {
        
        const {name,image} = request.body

        if(!name || !image){
            return response.status(400).json({
                message : "Please fill all fields",
                error : true,
                success : false
            }
        )}

        const addcategory = new CategoryModel({
            name,
            image,
        })

        const saveCategory = await addcategory.save()

        if(!saveCategory){
            return response.status(500).json({
                message : "Unable to add category",
                error : true,
                success : false
            })
        }

        return response.json({
            message : "Add Category Successfully",
            data : saveCategory,
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

// Get All Category Controller Section
export const getCategoryController = async (request,response)=>{
    try {
        const data = await CategoryModel.find().sort({ createdAt : -1})

        return response.json({
            message : "Get All Category Successfully",
            data : data,
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

// Update Category
export const updateCategoryController = async(request,response)=>{
    try {
        const { _id ,name,image} = request.body

        const update = await CategoryModel.updateOne({
            _id : _id, 
        },{
            name,
            image
        })
        return response.json({
            message : "Updated Category",
            success : true,
            error : false,
            data : update
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false 
        })
    }
}

//Delete Category
export const deleteCategoryController = async(request, response )=>{
    try {

        const { _id } = request.body
        
        const checkSubCategory = await SubCategoryModel.find({
            category : {
                "$in" : [ _id ]
            }
        }).countDocuments()

                const checkProduct = await ProductModel.find({
            category : {
                "$in" : [ _id ]
            }
        }).countDocuments()

        if(checkSubCategory > 0 || checkProduct > 0){
            return response.status(400).json({
                    message : "Category is alredy use can't delete",
                    error : true,
                    success : false
            })
        }

        const deleteCategory = await CategoryModel.deleteOne({
            _id : _id
        })

        return response.json({
            message : "Delte Category Successfully",
            data : deleteCategory,
            error : false ,
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