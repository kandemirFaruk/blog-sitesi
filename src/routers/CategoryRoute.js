import express from "express"
import * as categoryContoller from "../controllers/categoryController.js"
const router=express.Router()

router.route("/createCategory").post(categoryContoller.createCategory)
router.route("/getAllCategories").get(categoryContoller.getAllCategories)

export default router