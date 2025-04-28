const mongoose = require("mongoose");
const valid = require("validator");

const storeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  img: {
    type: String,
    required: true,
    validate: [valid.isURL, "wrong url"]
  },
  status: {
    type: String,
    enum: ["Show", "Hide"],
    default: "Show",
  },
}, {
  timestamps: true
});

const Store = mongoose.model('Store', storeSchema);
module.exports = Store;
