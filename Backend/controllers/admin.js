import BooksModel from "../models/book";
import UsersModel from "../models/user";
import OrdersModel from "../models/orders";
import BookStoreModel from "../models/bookStore";
import ErrorHandler from "../utils/errorHandler";

const dashboard = async (req, res, next) => {
  try {
    const users = await UsersModel.countDocuments();
    // const bookStores = await StoresModel.countDocuments();
    const books = await BooksModel.countDocuments();
    const orders = await OrdersModel.find({});

    const months = [];
    for (let i = 1; i <= 12; i++) {
      let repetation = 0;
      orders.forEach((order) => {
        if (new Date(order.createdAt).getMonth() + 1 === i) {
          repetation += 1;
        }
      });
      months.push(repetation);
    }

    res.status(200).json({
      users,
      books,
      months,
      numOfAllOrders: orders.length,
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

const getBooks = async (req, res, next) => {
  try {
    let books, itemCount;

    [books, itemCount] = await Promise.all([
      BooksModel.find()
        .skip(
          parseInt(req.query.page) * parseInt(req.query.limit) -
            parseInt(req.query.limit)
        )
        .limit(parseInt(req.query.limit))
        .exec(),
      BooksModel.count(),
    ]);
    const pageCount = Math.ceil(itemCount / parseInt(req.query.limit));

    res.json({
      books,
      pageCount,
      itemCount,
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const bookId = req.query.bookId;
    const deletedBook = await BooksModel.findByIdAndDelete(bookId);
    if (!deletedBook) {
      return next(new ErrorHandler("The book was not found..", 404));
    }

    const deletedBookInOrders = await OrdersModel.find({
      "orders.book": deletedBook._id,
    });
    await OrdersModel.deleteMany(deletedBookInOrders);

    res.status(200).json({
      Message: "Successfully deleted",
    });
  } catch (err) {
    if (err.message.indexOf("Cast to ObjectId failed") !== -1)
      return next(new ErrorHandler("Book Not Found", 404));

    next(new ErrorHandler(err.message, 500));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.query.userId;
    const deletedUser = await UsersModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      return next(new ErrorHandler("The User was not found..", 404));
    }
    res.status(200).json({
      Message: "Successfully deleted",
    });
  } catch (err) {
    if (err.message.indexOf("Cast to ObjectId failed") !== -1)
      return next(new ErrorHandler("Book Not Found", 404));

    next(new ErrorHandler(err.message, 500));
  }
};

const updateBook = async (req, res, next) => {
  try {
    let params = {};
    for (let prop in req.body) {
      if (req.body[prop]) {
        params[prop] = req.body[prop];
      }
    }
    const bookId = req.query.bookId;
    const updatedBook = await BooksModel.findByIdAndUpdate(bookId, params, {
      useFindAndModify: false,
    });
    if (!updatedBook) {
      return next(new ErrorHandler("The book was not found..", 404));
    }
    res.status(200).json({
      Message: "Successfully Updated",
    });
  } catch (err) {
    if (err.message.indexOf("Cast to ObjectId failed") !== -1)
      return next(new ErrorHandler("Book Not Found", 404));

    next(new ErrorHandler(err.message, 500));
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name, email, password, phoneNumber, address } = req.body;

    // CREATE BOOKSTORE
    if (address) {
      const emailExist = await BookStoreModel.findOne({
        email: email.toLowerCase(),
      });
      if (emailExist) {
        return next(
          new ErrorHandler("Email Exist, please try another email", 400)
        );
      }

      const bookStore = BookStoreModel({
        name,
        email: email.toLowerCase(),
        password,
        phoneNumber,
        address,
      });
      bookStore.save();
    } else {
      // CREATE ADMIN
      const emailExist = await UsersModel.findOne({
        email: email.toLowerCase(),
      });
      if (emailExist) {
        return next(
          new ErrorHandler("Email Exist, please try another email", 400)
        );
      }

      const admin = UsersModel({
        name,
        email,
        password,
        phoneNumber,
        isAdmin: true,
      });
      await admin.save();
    }

    res.status(200).json("Successfully Added");
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

const getUsers = async (req, res, next) => {
  try {
    let users, itemCount;

    [users, itemCount] = await Promise.all([
      UsersModel.find({})
        .skip(
          parseInt(req.query.page) * parseInt(req.query.limit) -
            parseInt(req.query.limit)
        )
        .limit(parseInt(req.query.limit))
        .exec(),
      UsersModel.count(),
    ]);
    const pageCount = Math.ceil(itemCount / parseInt(req.query.limit));

    res.json({
      users,
      pageCount,
      itemCount,
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

const getBookStores = async (req, res, next) => {
  try {
    let bookStores, itemCount;

    [bookStores, itemCount] = await Promise.all([
      BookStoreModel.find({})
        .skip(
          parseInt(req.query.page) * parseInt(req.query.limit) -
            parseInt(req.query.limit)
        )
        .limit(parseInt(req.query.limit))
        .exec(),
      BookStoreModel.count(),
    ]);
    const pageCount = Math.ceil(itemCount / parseInt(req.query.limit));

    res.json({
      bookStores,
      pageCount,
      itemCount,
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

const deleteBookStore = async (req, res, next) => {
  try {
    const deletedBookStore = await BookStoreModel.findByIdAndDelete(
      req.query.bookStoreId
    );

    if (!deletedBookStore) {
      return next(new ErrorHandler("ئەو بەشداربووە نەدۆزرایەوە..", 404));
    }

    res.status(200).json("Deleted");
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

export {
  dashboard,
  getBooks,
  deleteBook,
  updateBook,
  getUsers,
  deleteUser,
  createUser,
  getBookStores,
  deleteBookStore,
};
