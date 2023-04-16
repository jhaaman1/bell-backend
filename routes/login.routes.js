const express = require("express");
const loginRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/User.model");
require("dotenv").config();

loginRouter.get("/", (req, res) => {
  req;
  res("welcome to login page");
});

loginRouter.post("/user", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const hashed_password = user.password;
  const user_detail = {
    user_id: user._id,
    user_type: user.user_type,
  };

  bcrypt.compare(password, hashed_password, function (err, result) {
    if (err) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
    if (result) {
      const token = jwt.sign({ user_detail }, process.env.SECRET_KEY);
      res.cookie(`tokyo`, token);
      res.send({ mesg: "Login sucessfull", token: token });
    } else {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  });
});

module.exports = { loginRouter };
