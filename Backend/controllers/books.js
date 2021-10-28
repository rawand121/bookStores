import booksModel from "../models/book";
import ErrorHandler from "../utils/errorHandler";
import dbConfig from "../config/dbConfig";

const fetchAllBooks = async (req, res, next) => {
  try {
    // IF REMOVE THIS, I GET ERROR FOR FIRST TIME IF PRE RENDER A PAGE
    await dbConfig();

    const { name, writer, category, price } = req.query;
    let query = {};
    let sorted = { createdAt: -1 };
    if (name) query = { name: name };
    if (writer) query = { ...query, writer: writer };
    if (category) query = { ...query, category: category };
    if (price && price === "asc") sorted = { price: 1 };
    if (price && price === "des") sorted = { price: -1 };
    if (price && price === "none") sorted = { createdAt: -1 };

    const [books, itemCount] = await Promise.all([
      booksModel
        .find(query)
        .skip(
          parseInt(req.query.page) * parseInt(req.query.limit) -
            parseInt(req.query.limit)
        )
        .limit(parseInt(req.query.limit))
        .populate({
          path: "bookStore",
        })
        .sort(sorted)
        .exec(),
      booksModel.countDocuments(query),
    ]);

    const pageCount = Math.ceil(itemCount / parseInt(req.query.limit));

    if (books.length === 0) {
      return next(
        new ErrorHandler("Nothing Found match with your search :( ", 404)
      );
    }

    res.json({
      books,
      pageCount,
      itemCount,
    });
  } catch (err) {
    console.log("FETCH", err);
    next(new ErrorHandler(err.message, 500));
  }
};

const getABook = async (req, res, next) => {
  try {
    const bookId = req.query.bookId;
    const book = await booksModel.findById(bookId);
    if (!book) {
      return next(
        new ErrorHandler("No Book Found with this id, please try again", 404)
      );
    }
    res.status(200).json(book);
  } catch (err) {
    if (err.message.indexOf("Cast to ObjectId failed") !== -1)
      return next(new ErrorHandler("Data Not Found", 404));

    return next(new ErrorHandler(err.message, 500));
  }
};

const relatedBooks = async (req, res, next) => {
  try {
    const { category, bookId } = req.query;
    const books = await booksModel.find({
      $and: [{ category }, { _id: { $ne: bookId } }],
    });
    res.status(200).json({
      books: [books[0], books[1], books[2], books[3]],
    });
  } catch (err) {
    console.log("RELATED", err);
    next(new ErrorHandler(err.message, 500));
  }
};

const getLatest = async (req, res, next) => {
  try {
    await dbConfig();
    const books = await booksModel.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      books: [books[0], books[1], books[2], books[3], books[4], books[5]],
    });
  } catch (err) {
    console.log("LATEST", err);
    next(new ErrorHandler(err.message, 500));
  }
};

export { fetchAllBooks, getABook, relatedBooks, getLatest };
