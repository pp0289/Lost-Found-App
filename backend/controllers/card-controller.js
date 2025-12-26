const Additem = require("../models/additem-model");

const cards = async (req, res) => {
  try {
    const response = await Additem.find();
    if(!response) {
      // Handle the case where no document was found
      res.status(404).json({msg: "No Lost/Found items found"});
      return;
    }
    res.status(200).json({msg: response});
  } catch (error) {
    console.log(`cards: ${error}`);
    
  }
};

module.exports = cards;