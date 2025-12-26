const Additem = require("../models/additem-model");

const addItemForm = async (req, res) => {
  try {
    const response = req.body;
    await Additem.create(response);
    return res.status(200).json({ message: "mesaage send successfully" });
  }
  catch (error) {
    return res.status(500).json({ message: "message not deliverd" });
  }
};

module.exports = addItemForm;