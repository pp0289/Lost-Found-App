const User = require("../models/user-model");
const Additem = require("../models/additem-model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to world by using router");
  }
  catch (error) {
    console.log(error);
  }
};

// registration logic
const register = async (req, res) => {
  
  try {
    const { username, password, confirmPassword, email } = req.body;
    // console.log(req.body);
    
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // hash the password
    // const saltRound = 10;
    // const hash_password = await bcrypt.hash(password, saltRound);

    const userCreated = await User.create({ username, password, confirmPassword, email });

    res.status(201).json(
      {
        messagee: "Registration successful",
        token: await userCreated.generateToken(),
        userID: userCreated._id.toString()
      });
  }
  catch (error) {
    console.log(error);
  }
};


// login logic
const login = async (req, res) => {
  try {
    const { email, password, aan } = req.body;
    console.log("gggggggg", password);
    

    const userExists = await User.findOne({ email });
    console.log(userExists);


    if (!userExists) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // const isPassValid = await bcrypt.compare(password, userExists.password);

    const isPassValid = await userExists.comparePassword(password);

    if (isPassValid) {
      res.status(201).json(
        {
          messagee: "Login successful",
          token: await userExists.generateToken(),
          userID: userExists._id.toString()
        });
    }
    else {
      res.status(401).json({ message: "Invalid Email or Password" });
    }

  }
  catch (error) {
    res.status(500).json("internal sever error");
  }
};

// to send user data - user logic

const user = async (req, res) => {
  try {
    // res.status(200).json({msg: "hi user"});
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({ userData });
  } catch (error) {
    console.log(`error from the user route ${error}`);

  }
}


// to delete the item

const deleteItemByID = async (req, res) => {
  try {
    
    const id = req.params.id;
    await Additem.deleteOne({_id: id});
    return res.status(200).json({message: "Item Deleted Successfully"});
  } catch (error) {
    console.log(error);
    next(error);
    
  }
}

module.exports = { home, register, login, user, deleteItemByID };