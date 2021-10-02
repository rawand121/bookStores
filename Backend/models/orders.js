import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    orders: [
      {
        qty: {
          type: Number,
          required: true,
        },
        bookStore: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "BookStores",
        },
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Books",
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    address: {
      street: {
        type: String,
        default: "",
      },
      address: {
        type: String,
        default: "",
      },
      longitude: {
        type: Number,
        default: 0,
      },
      latitude: {
        type: Number,
        default: 0,
      },
    },
    Note: {
      type: String,
      default: "Nothing",
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Orders || mongoose.model("Orders", orderSchema);
