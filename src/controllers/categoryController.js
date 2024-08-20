import Category from "../models/category.js";

const createCategory = async (req, res) => {
  try {
    const categoryData = req.body;
    const createdCategory = await Category.create(categoryData);
    return res.status(201).json({
      message: "Category created successfully.",
      data: createdCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while creating the category.",
      error,
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categoriesList = await Category.find(); 
    return res.status(200).json({
      message: "All categories retrieved successfully.",
      data: categoriesList,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving the categories.",
      error,
    });
  }
};


export { createCategory, getAllCategories };
