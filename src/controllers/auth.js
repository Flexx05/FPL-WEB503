import Joi from "joi";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signupSchema = Joi.object({
  username: Joi.string().min(3),
  email: Joi.string().email().required().trim(),
  phone: Joi.number().min(10),
  password: Joi.string().min(6).trim().required(),
  confirmPassword: Joi.string()
    .min(6)
    .trim()
    .required()
    .valid(Joi.ref("password")),
});

const signinSchema = Joi.object({
  email: Joi.string().email().required().trim(),
  password: Joi.string().min(6).trim().required(),
});

export const signup = async (req, res) => {
  try {
    const { error, value } = signupSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json(errors);
    }
    const userExist = await User.findOne({ email: value.email });
    if (userExist)
      return res.status(400).json({ message: "Tài khoản đã tồn tại" });
    const hashPassword = await bcrypt.hash(value.password, 10);
    const user = await User.create({ ...value, password: hashPassword });
    user.password = undefined;
    return res.status(201).json({
      message: "Đăng ký thành công",
      user,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const signin = async (req, res) => {
  try {
    const { error, value } = signinSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json(errors);
    }
    const userExist = await User.findOne({ email: value.email });
    if (!userExist)
      return res.status(400).json({ message: "Tài khoản chưa được đăng ký" });
    const isMatchPassword = await bcrypt.compare(
      value.password,
      userExist.password
    );
    if (!isMatchPassword)
      return res.status(400).json({ message: "Sai mật khẩu" });
    userExist.password = undefined;
    const token = jwt.sign({ userExist }, "manhlinh", { expiresIn: "15m" });
    return res
      .status(200)
      .json({ message: "Đăng nhập thành công", userExist, token });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
