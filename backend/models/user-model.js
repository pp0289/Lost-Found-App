const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  confirmPassword: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
  }
  catch (error) {
    next(error);
  }
});

// json web token
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userID: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d"
      }
    )
  }
  catch (error) {
    console.error(error);
  }
};

// compare password

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password)
};

// create a model or a collection
const User = new mongoose.model("User", userSchema);

module.exports = User;