import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  seller: {
    type: Boolean,
    default: false,
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});


module.exports = mongoose.models.Users || mongoose.model("Users", userSchema);
