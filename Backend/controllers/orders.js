import ordersModel from "../models/orders";
import userModel from "../models/user";
import ErrorHandler from "../utils/errorHandler";
import mongoose from "mongoose";

const setOrder = async (req, res, next) => {
  try {
    const { address, orders, note } = req.body;
    const newOrder = {
      address: { ...address },
      user: req.user._id,
      orders,
      Note: note,
    };
    const order = await new ordersModel(newOrder);

    // ADD TO ORDERS ARRAY OF USERS COLLECTION
    const userOrders = req.user.orders;
    userOrders.push(order._id);
    const user = await userModel.findByIdAndUpdate(req.user._id, {
      orders: userOrders,
    });

    order.save();
    res.status(200).json({ message: "SUCCESS" });
  } catch (err) {
    console.log(err);
    next(new ErrorHandler(err.message, 500));
  }
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await ordersModel
      .find({ user: req.user._id })
      .populate({ path: "orders.book" })
      .populate({ path: "orders.bookStore" })
      .exec();

    res.status(200).json({ orders });
  } catch (err) {
    console.log(err);
    next(new ErrorHandler(err.message, 500));
  }
};

const getOneOrder = async (req, res, next) => {
  try {
    const { orderId } = req.query;

    const order = await ordersModel
      .findById(orderId)
      .populate({ path: "orders.book" })
      .populate({ path: "user" });

    res.status(200).json(order);
  } catch (err) {
    if (err.message.indexOf("Cast to ObjectId failed") !== -1)
      return next(new ErrorHandler("Data Not Found", 404));

    return next(new ErrorHandler(err.message, 500));
  }
};

const getMyOrders = async (req, res, next) => {
  try {
    const allOrders = await ordersModel.aggregate([
      {
        $addFields: {
          myOrders: {
            $filter: {
              input: "$orders",
              as: "order",
              cond: {
                $eq: [
                  "$$order.bookStore",
                  mongoose.Types.ObjectId(req.user._id),
                ],
              },
            },
          },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "myOrders.book",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userDetails",
        },
      },
    ]);

    let myOrders = allOrders.map((order) => {
      return order.myOrders.length > 0 ? order : undefined;
    });

    res.status(200).json(myOrders);
  } catch (err) {
    if (err.message.indexOf("Cast to ObjectId failed") !== -1)
      return next(new ErrorHandler("Product Was Not Found", 404));
    console.log(err);
    next(new ErrorHandler(err.message, 500));
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const { orderId } = req.query;
    const deletedOrder = await ordersModel.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return next(new ErrorHandler(err.message, 500));
    }

    res.status(200).json("SUCCESS..");
  } catch (err) {
    console.log(err);
    next(new ErrorHandler(err.message, 500));
  }
};

export { setOrder, getOrders, getOneOrder, getMyOrders, deleteOrder };
