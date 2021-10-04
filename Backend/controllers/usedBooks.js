import UsedBooks from "../models/usedBooks";
import ErrorHandler from "../utils/errorHandler";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const addUsedBook = async (req, res, next) => {
  try {
    const result = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "bookStore/usedBooks",
      width: "150",
      crop: "scale",
    });

    const {
      price,
      language,
      name,
      parts,
      category,
      description,
      address,
      typeOfTransaction,
    } = req.body;

    const newBook = new UsedBooks({
      price,
      language,
      name,
      parts,
      image: {
        url: result.secure_url,
        public_id: result.public_id,
      },
      typeOfTransaction,
      address,
      category,
      description,
      author: req.user._id,
    });

    await newBook.save();

    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    next(new ErrorHandler(err.message, 500));
  }
};

const getUsedBooks = async (req, res, next) => {
  try {
    let query = { approved: true };

    const { name, writer, category } = req.query;
    if (name) query = { ...query, name: name };
    if (writer) query = { ...query, writer: writer };
    if (category) query = { ...query, category: category };

    const books = await UsedBooks.find(query)
      .populate({
        path: "author",
      })

      .skip(
        parseInt(req.query.limit) * parseInt(req.query.page) -
          parseInt(req.query.limit)
      )
      .limit(parseInt(req.query.limit))
      .exec();

    const itemCount = books.length;

    const pageCount = Math.ceil(itemCount / parseInt(req.query.limit));

    if (books.length === 0) {
      return next(
        new ErrorHandler("Nothing Found match with your search :( ", 404)
      );
    }

    res.status(200).json({ books, pageCount, itemCount });
  } catch (err) {
    console.log(err);
    next(new ErrorHandler(err.message, 500));
  }
};

const getUsedBooksAdmin = async (req, res, next) => {
  try {
    const books = await UsedBooks.find({ approved: false }).populate({
      path: "author",
    });

    res.status(200).json(books);
  } catch (err) {
    console.log(err);
    next(new ErrorHandler(err.message, 500));
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const deletedBook = await UsedBooks.findByIdAndDelete(req.query.bookId);
    if (!deletedBook) {
      return next(new ErrorHandler("Sorry This Book Not Found", 404));
    }
    res.status(200).json({
      Message: "The Book was Rejected Succesfully..",
    });
  } catch (err) {
    if (err.message.indexOf("Cast to ObjectId failed") !== -1)
      return next(new ErrorHandler("Data Not Found", 404));
    next(new ErrorHandler(err.message, 500));
  }
};

const approveBook = async (req, res, next) => {
  try {
    const approvedBook = await UsedBooks.findByIdAndUpdate(req.query.bookId, {
      approved: true,
    });
    if (!approvedBook) {
      return next(new ErrorHandler("Sorry This Book Not Found", 404));
    }
    res.status(200).json({
      Message: "The Book was Approved Succesfully..",
    });
  } catch (err) {
    if (err.message.indexOf("Cast to ObjectId failed") !== -1)
      return next(new ErrorHandler("Data Not Found", 404));

    next(new ErrorHandler(err.message, 500));
  }
};

const getBook = async (req, res, next) => {
  try {
    const usedBook = await UsedBooks.findById(req.query.bookId).populate({
      path: "author",
    });
    if (!usedBook) {
      return next(new ErrorHandler("Sorry This Book Not Found", 404));
    }
    res.status(200).json(usedBook);
  } catch (err) {
    if (err.message.indexOf("Cast to ObjectId failed") !== -1)
      return next(new ErrorHandler("Data Not Found", 404));

    next(new ErrorHandler(err.message, 500));
  }
};

export {
  addUsedBook,
  getUsedBooks,
  deleteBook,
  approveBook,
  getBook,
  getUsedBooksAdmin,
};
