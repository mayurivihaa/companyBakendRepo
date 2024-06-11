const mongoose = require("mongoose");

const detailsSchema = new mongoose.Schema({
  name: String,
  company: String,
  turnover: Number,
  place: Array,
  cars: Array,
});

module.exports = mongoose.model("details", detailsSchema);
