const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//Login User
exports.loginUser = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email) {
    return res.status(401).json({
      message: "please provide the email",
    });
  }
  if (!password) {
    return res.status(401).json({
      message: "please provide the password",
    });
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(401).json({
      message:
        "Sorry! this email is not regestered. Please regestered the email ",
    });
  }
  const hash = user.password;
  const isMatched = await bcrypt.compare(password, hash);
  if (!isMatched) {
    return res.status(401).json({
      message: "Sorry! Your password is wrong",
    });
  }
  const token = jwt.sign(
    { user: user },
    "junaidarshad03105640408satti03319123970satti",
    { expiresIn: "1h" }
  );
  res
    .status(200)
    .cookie("token", token, {
      expires: new Date(Date.now() + 40000),
      httpOnly: true,
    })
    .json({
      user,
    });
};
//Logout User
exports.logoutUser = (req, res, next) => {
  res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });
  res.status(200).json({
    message: "You are logged out",
  });
};

//Create User
exports.createuser = async (req, res, next) => {
  let newuser = {
    username: req.body.username,
    cnic: req.body.cnic,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10),
    phone_no: req.body.phone_no,
    address: req.body.address,
  } 
  if(req.file){
    newuser.avatar = req.file.path
  }

  try {
    await User.create(newuser);
    res.status(200).json({
      message: "user added successfully",
    });
  } catch (err) {
    next(err);
  }
},
  //Getall User
exports.getAllusers = async (req, res, next) => {
    try {
      const users = await User.find();
      res.status(200).json({
        mmessage: "success",
        users: users,
      });
    } catch (err) {
      next(err);
    }
  },
  //Getuser By ID
  exports.getuserById = async (req, res, next) => {
    try {
      await User.findById(req.params.id);
      res.status(200).json({
        message: "success",
      });
    } catch (err) {
      next(err);
    }
  };

//Update User
exports.updateuser = async (req, res, next) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          username: req.body.username,
          cnic: req.body.cnic,
          email: req.body.email,
          password: req.body.password,
          phone_no: req.body.phone_no,
          address:  req.body.address
        },
      }
    ).then((result) => {
      res.status(200).json({
        updated_user: result,
      });
    });
  } catch (err) {
    next(err);
  }
};

//Delete User
exports.deleteuser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Delete Product successfully ",
    });
  } catch (err) {
    next(err);
  }
};
