class BookValidator {
  static _isParamValid(param, type) {
    if (type === "array") return Array.isArray(param);
    return (param !== undefined && param !== null && typeof param === type);
  }

  static _isYearPlausible(yearParam) {
    const currentYear = new Date().getFullYear();
    return (yearParam <= currentYear);
  }

  static validateBookData(bookData) {
    const { userId, title, year, genre, ratings, averageRating } = bookData;

    if (!this._isParamValid(userId, "string")) throw new Error("userId is required and must be a string");
    if (!this._isParamValid(title, "string")) throw new Error("title is required");
    if (!this._isParamValid(year, "number")) throw new Error("year is required");
    if (!this._isParamValid(genre, "string")) throw new Error("genre is required");
    if (!this._isParamValid(ratings, "array")) throw new Error("ratings must be an array");
    if (!this._isParamValid(averageRating, "number")) throw new Error("averageRating must be a number");

    if (!this._isYearPlausible(year)) throw new Error("year is not possible")

    return true;
  }
}

module.exports = BookValidator