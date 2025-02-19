import Joi from "joi";
import Product from "../models/product";

// schema validation
const productSchema = Joi.object({
  id: Joi.number().positive().integer().messages({
    "number.base": "ID phải là số",
    "number.positive": "ID phải là số dương",
  }),
  name: Joi.string().min(3).trim().required().messages({
    "string.base": "Tên sản phẩm phải là chuỗi",
    "string.min": "Tên sản phẩm chứa ít nhất 3 ký tự",
    "string.trim": "Tên sản phẩm không được để trống",
    "any.required": "Tên sản phẩm bắt buộc nhập",
  }),
  price: Joi.number().required().positive().messages({
    "number.base": "Giá sản phẩm phải là số",
    "number.positive": "Giá sản phẩm phải là số dương",
    "any.required": "Giá sản phẩm bắt buộc nhập",
  }),
  categoryID: Joi.string().required(),
});

// Lấy tất cả sản phẩm

/**
 * @route   GET /products
 * @desc    Lấy toàn bộ danh sách sản phẩm
 * @access  Public
 * @returns {Array} Danh sách sản phẩm hiện tại
 * */
export const getALLProducts = async (req, res) => {
  try {
    const { _page = 1, _limit = 10, _sort = "price", _order } = req.query;
    const options = {
      page: parseInt(_page),
      limit: parseInt(_limit),
      sort: { [_sort]: _order === "desc" ? -1 : 1 },
    };
    const product = await Product.paginate({}, options);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// Lấy sản phẩm theo ID

/**
 * @route   GET /products/:id
 * @desc    Lấy thông tin chi tiết của một sản phẩm theo ID
 * @access  Public
 * @param   {number} req.params.id - ID của sản phẩm cần lấy
 * @returns {Object} Thông tin sản phẩm hoặc thông báo lỗi
 * */
export const getProductsById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// Xóa sản phẩm
export const removeProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
/**
 * @route   DELETE /products/:id
 * @desc    Xóa một sản phẩm khỏi danh sách theo ID
 * @access  Public
 * @param   {Object} req.params - Tham số URL
 * @property {number} id - ID của sản phẩm cần xóa (bắt buộc)
 * @returns {Object} Thông báo kết quả xóa hoặc thông báo lỗi
 */

// Cập nhật sản phẩm
export const updateProduct = async (req, res) => {
  try {
    const { error, value } = productSchema.validate(req.body, {
      abortEarly: false, // cho phép hiển thị nhiều lỗi
      convert: false, // Không cho phép convert dữ liệu đầu vào
    });
    if (error) {
      const errors = error.details.map((error) => error.message);
      return res.status(400).json(errors);
    }
    const product = await Product.findByIdAndUpdate(req.params.id, value, {
      new: true,
    });
    return res.status(200).json({
      message: "Cập nhật sản phẩm thành công!",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
/**
 * @route   PUT /products/:id
 * @desc    Cập nhật thông tin một sản phẩm theo ID
 * @access  Public
 * @param   {number} req.params.id - ID của sản phẩm cần cập nhật
 * @param   {Object} req.body - Dữ liệu mới của sản phẩm
 * @property {string} name - Tên mới của sản phẩm (tuỳ chọn)
 * @property {number} price - Giá mới của sản phẩm (tuỳ chọn)
 * @returns {Object} Thông báo trạng thái và thông tin sản phẩm đã cập nhật
 * */

// Thêm sản phẩm mới
export const createProduct = async (req, res) => {
  try {
    const { error, value } = productSchema.validate(req.body, {
      abortEarly: false, // Cho phép hiển thị nhiều lỗi
      convert: false, // Không cho phép convert dữ liệu đầu vào
    });
    if (error) {
      const errors = error.details.map((error) => error.message);
      return res.status(400).json(errors);
    }

    const product = await Product.create(value);
    return res.status(201).json(product);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
/**
 * @route   POST /products
 * @desc    Thêm một sản phẩm mới vào danh sách
 * @access  Public
 * @param   {Object} req.body - Dữ liệu sản phẩm được gửi trong body của request
 * @property {number} id - ID của sản phẩm (bắt buộc)
 * @property {string} name - Tên của sản phẩm (bắt buộc)
 * @property {number} price - Giá của sản phẩm (bắt buộc)
 * @returns {Object} Thông tin sản phẩm vừa được thêm hoặc thông báo lỗi
 * */
