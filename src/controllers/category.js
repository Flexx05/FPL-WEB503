import Product from "../models/product";
import Category from "../models/category";
import Joi from "joi";

const categorySchema = Joi.object({
  name: Joi.string().min(3).trim().required(),
  description: Joi.string().min(6).trim().required(),
});

export const getCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const products = await Product.find({ categoryID: id });
    const category = await Category.findById(id);
    if (!category)
      return res.status(404).json({ message: "Không có danh mục tương ứng" });
    return res.status(200).json({ name: category.name, products });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { error, value } = categorySchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((err) => {
        err.message;
      });
      return res.status(400).json(errors);
    }
    const category = await Category.create(value);
    return res
      .status(201)
      .json({ message: "Tạo danh mục thành công", category });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
