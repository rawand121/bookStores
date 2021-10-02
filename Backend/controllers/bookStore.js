import BooksModel from "../models/book";
import UsersModel from "../models/user";
import OrdersModel from "../models/orders";
import BookStoreModel from "../models/bookStore";
import ErrorHandler from "../utils/errorHandler";
import mongoose from "mongoose";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const dashboard = async (req, res, next) => {
  try {
    const SortCategory = await OrdersModel.aggregate([
      {
        $addFields: {
          OrdersModel: {
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
          localField: "orders.book",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      { $unwind: "$bookDetails" },
      { $sortByCount: "$bookDetails.category" },
    ]);

    const allOrders = await OrdersModel.aggregate([
      {
        $addFields: {
          OrdersModel: {
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
    ]);

    const months = [];
    for (let i = 1; i <= 12; i++) {
      let repetation = 0;
      allOrders.forEach((order) => {
        if (new Date(order.createdAt).getMonth() + 1 === i) {
          repetation += 1;
        }
      });
      months.push(repetation);
    }

    const totalBooks = req.user.books.length;

    let totalMoney = 0;

    allOrders.forEach((order) => {
      totalMoney += order.orders.reduce((a, b) => a + b.price * b.qty, 0);
    });

    const sumAll = SortCategory.reduce((a, b) => a + b.count, 0);
    const sumSome =
      SortCategory[0].count + SortCategory[1].count + SortCategory[2].count;

    res.status(200).json({
      sortCategories: {
        first: SortCategory[0],
        second: SortCategory[1],
        third: SortCategory[2],
        others: sumAll - sumSome,
      },
      allOrders: allOrders.length,
      totalMoney,
      totalBooks,
      months,
    });
  } catch (err) {
    console.log(err);
    next(new ErrorHandler(err.message, 500));
  }
};

const todayOrders = async (req, res, next) => {
  try {
    const allMyOrders = await OrdersModel.aggregate([
      {
        $addFields: {
          orders2: {
            $filter: {
              input: "$orders",
              as: "order",
              cond: {
                $and: [
                  {
                    $eq: [
                      "$$order.bookStore",
                      mongoose.Types.ObjectId(req.user._id),
                    ],
                  },
                  { $eq: ["$isDelivered", false] },
                ],
              },
            },
          },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "orders2.book",
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

    let todayOrders = allMyOrders.map((prod) => {
      if (
        prod.orders2.length > 0 &&
        prod.createdAt.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0)
      ) {
        return prod;
      }
    });
    todayOrders = todayOrders.filter((order) => {
      return order !== undefined && order !== null;
    });

    res.status(200).json(todayOrders);
  } catch (err) {
    console.log(err);
    next(new ErrorHandler(err.message, 500));
  }
};

const updatedDelivered = async (req, res, next) => {
  try {
    const updatedOrder = await OrdersModel.findByIdAndUpdate(req.body.bookId, {
      isDelivered: true,
    });

    if (!updatedOrder) {
      return next(new ErrorHandler("Product Was Not Found..", 500));
    }
    res.status(200).json("سەرکەوتو بوو");
  } catch (err) {
    console.log(err);
    next(new ErrorHandler(err.message, 500));
  }
};

const createProd = async (req, res, next) => {
  try {
    const { name, price, description, language, writer, parts, category } =
      req.body;
    const result = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "/bookStore/book",
      width: 150,
      crop: "scale",
    });

    const createProduct = BooksModel({
      name,
      price,
      description,
      language,
      writer,
      parts,
      category,
      image: {
        url: result.secure_url,
        public_id: result.public_id,
      },
      bookStore: req.user._id,
    });

    req.user.books.push(createProduct._id);

    await req.user.save();

    await createProduct.save();

    res.status(200).json("سەرکەوتو بوو");
  } catch (err) {
    console.log(err);
    next(new ErrorHandler(err.message, 500));
  }
};

const deleteProd = async (req, res, next) => {
  try {
    const { bookId } = req.query;

    const deletedProduct = await BooksModel.findByIdAndDelete(bookId);

    if (!deletedProduct) {
      return next(new ErrorHandler("Product Was Not Found", 404));
    }

    req.user.books = req.user.books.filter((book) => {
      return book.toString() !== deletedProduct._id.toString();
    });

    await req.user.save();

    await cloudinary.v2.uploader.destroy(deletedProduct.image.public_id);

    res.status(200).json("سەرکەوتو بوو");
  } catch (err) {
    if (err.message.indexOf("Cast to ObjectId failed") !== -1)
      return next(new ErrorHandler("Product Was Not Found", 404));

    next(new ErrorHandler(err.message, 500));
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { bookId } = req.query;

    let params = {};

    for (const key in req.body) {
      if (req.body[key] && key === "image") {
        const result = await cloudinary.v2.uploader.upload(req.body.image, {
          folder: "/bookStore/book",
          width: 150,
          crop: "scale",
        });
        params[key] = {
          url: result.secure_url,
          public_id: result.public_id,
        };
      } else if (req.body[key]) {
        params[key] = req.body[key];
      }
    }

    const updatedProduct = await BooksModel.findByIdAndUpdate(bookId, params, {
      useFindAndModify: false,
    });

    if (!updatedProduct) {
      return next(new ErrorHandler("Product Was Not Found", 404));
    }
    await cloudinary.v2.uploader.destroy(updatedProduct.image.public_id);

    res.status(200).json("سەرکەوتو بوو");
  } catch (err) {
    if (err.message.indexOf("Cast to ObjectId failed") !== -1)
      return next(new ErrorHandler("Product Was Not Found", 404));
    console.log(err);
    next(new ErrorHandler(err.message, 500));
  }
};

export {
  dashboard,
  todayOrders,
  updatedDelivered,
  createProd,
  deleteProd,
  updateProduct,
};
