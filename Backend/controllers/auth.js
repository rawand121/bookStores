import UserModel from "../models/user";
import BookStoreModel from "../models/bookStore";
import ErrorHandler from "../utils/errorHandler";
import bcrypt from "bcrypt";

const signupUser = async (req, res, next) => {
  try {
    const { email, password, name, phoneNumber, confirmPassword } = req.body;
    if (confirmPassword === password) {
      next(new ErrorHandler("You passwords is not match.", 401));
    }
    const emailExist = await UserModel.findOne({
      $or: [{ $phoneNumber: { $eq: phoneNumber } }, { $email: { $eq: email } }],
    });
    if (emailExist) {
      return next(
        new ErrorHandler(
          "Email Or Phone Number Exist, please try another email",
          401
        )
      );
    }
    const user = new UserModel({
      name,
      email: email.toLowerCase(),
      password,
      phoneNumber,
    });

    await user.save();

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    next(new ErrorHandler(err.message, 500));
  }
};

const selectUser = async (req, res, next) => {
  try {
    let user = await UserModel.findById(req.user._id);
    if (!user) {
      user = await BookStoreModel.findById(req.user._id);
    }
    if (!user) {
      return next(new ErrorHandler("No User found, please try again", 404));
    }
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    next(new ErrorHandler(err.message, 500));
  }
};

const updatePassword = async (req, res, next) => {
  try {
    const { current, newPass } = req.body;

    const isMatch = await bcrypt.compare(current, req.user.password);
    if (!isMatch) {
      return next(new ErrorHandler("The password is wrong", 400));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(newPass, salt);

    await UserModel.findByIdAndUpdate(req.user._id, { password: hashedPass });

    res.status(200).json({ Success: true });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

export { signupUser, selectUser, updatePassword };
