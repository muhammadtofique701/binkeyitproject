import { Router } from "express";
import auth from "../middleware/auth.js";
import { AddCategoryController, getCategoryController } from "../controllers/category.controller.js";
import { deleteSubCategoryController, updateSubCategoryController } from "../controllers/subCategory.Controller.js";

const categoryRouter = Router();

categoryRouter.post("/add-category",auth,AddCategoryController);
categoryRouter.get("/get",getCategoryController)
categoryRouter.put('/update',auth,updateSubCategoryController)
categoryRouter.delete('/delete',auth,deleteSubCategoryController)

export default categoryRouter;