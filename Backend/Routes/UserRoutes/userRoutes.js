const express = require("express");
const userRouter = express.Router();
const {userLogin,userRegister} = require("../../Controller/UserController/userlogin")


userRouter.post("/api/register",userRegister);
userRouter.post("/api/login",userLogin);
module.exports = userRouter;