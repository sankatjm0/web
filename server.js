//importing packages
const express = require("express");
const admin = require("firebase-admin");
const bcrypt = require("bcrypt");
const path = require("path");

//delare static path
let staticPath = path.join(__dirname, "Do_An_Web");

//intializing express.js

const app = express();

//middlewares
app.use(express.static(staticPath));
app.use(express.json());

//routes
//home route
app.get("/", (req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

//singup
app.get("/signup", (req, res) => {
  res.sendFile(path.join(staticPath, "signup.html"));
});

app.post("/signup", (req, res) => {
  let { name, email, password } = req.body;

  // form validations

  if (name.length < 3) {
    return res.json({ alert: "Tên phải lớn hơn 3 ký tự" });
  } else if (!email.length) {
    return res.json({ alert: "Nhập email của bạn" });
  } else if (password.length < 6) {
    return res.json({ alert: "Nhập mật khẩu (ít nhất 6 ký tự)" });
  } else {
    // store user in db
  }
  res.json("data recieved");
});

//404 route
app.get("/404", (req, res) => {
  res.sendFile(path.join(staticPath, "404.html"));
});

app.use((req, res) => {
  res.redirect("/404");
});

app.listen(3000, () => {
  console.log("listening on port 3000......");
});
