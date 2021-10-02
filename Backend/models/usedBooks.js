import mongoose from "mongoose";
const Schema = mongoose.Schema;

const usedBooksSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    parts: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    image: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },
    approved: {
      type: Boolean,
      default: false,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    typeOfTransaction: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.UsedBooks || mongoose.model("UsedBooks", usedBooksSchema);
