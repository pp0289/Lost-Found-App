const { Schema, model } = require("mongoose");

const addItemSchema = new Schema(
  {
    item: { type: String, required: true },
    itemType: { type: String, required: true },
    imgURL: { type: String, required: true },
    location: { type: String, required: true },
    contName: { type: String, required: true },
    contTel: { type: String, required: true },
    username: { type: String, required: true }
  }
);

// create a model or a collection
const Additem = new model("Items", addItemSchema);

module.exports = Additem;