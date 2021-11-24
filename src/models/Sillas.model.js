const mongoose = require("mongoose");
const { Schema } = mongoose;

const sillasSchema = new Schema({
  sillas: { type: String },
});
module.exports = mongoose.model("Sillas", sillasSchema);
