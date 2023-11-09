//importing packages
const express = require('express');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const path = require('path');

// firebase admin setup

let serviceAccount = require("./shopquanao-3475d-firebase-adminsdk-c6mz2-f31f70b0fa.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
let db = admin.firestore();


//delare static path
let staticPath = path.join(__dirname, "Do_An_Web");

//intializing express.js

const app = express();

//middlewares
app.use(express.static(staticPath));
app.use(express.json());

//routes
//home user route
app.get('/', (req, res) => {
  res.sendFile(path.join(staticPath, "index-user.html"));
});

//home admin route
app.get('/admin', (req, res) => {
  res.sendFile(path.join(staticPath, "index-admin.html"));
});

//singup
app.get('/signup', (req, res) => {
  res.sendFile(path.join(staticPath, "signup.html"));
});

app.post('/signup', (req, res) => {
  let { name, email, password } = req.body;

  // form validations

  if (name.length < 3) {
    return res.json({ alert: "Tên phải lớn hơn 3 ký tự" });
  } else if (!email.length) {
    return res.json({ alert: "Nhập email của bạn" });
  } else if (password.length < 6) {
    return res.json({ alert: "Nhập mật khẩu (ít nhất 6 ký tự)" });
  }

  // store user in db
  db.collection("users")
    .doc(email)
    .get()
    .then((user) => {
      if (user.exists) {
        return res.json({ alert: "Email đã tồn tại" });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            req.body.password = hash;
            db.collection("users")
              .doc(email)
              .set(req.body)
              .then((data) => {
                res.json({
                  name: req.body.name,
                  email: req.body.email,
                });
              });
          });
        });
      }
    });
});

//login route
app.get('/login', (req, res) => {
  res.sendFile(path.join(staticPath, "login.html"));
});

app.post('/login', (req, res) => {
  let { email, password } = req.body;

  if (!email.length || !password.length) {
    return res.json({ alert: "Điền đầy đủ thông tin" });
  }

  db.collection("users")
    .doc(email)
    .get()
    .then((user) => {
      if (!user.exists) {
        return res.json({ alert: "Email hoặc mật khẩu không chính xác" });
      } else {
        bcrypt.compare(password, user.data().password, (err, result) => {
          if (result) {
            let data = user.data();
            // console.log(data.name);
            return res.json({
              name: data.name,
              email: data.email,
            });
          } else {
            return res.json({ alert: "Email hoặc mật khẩu không chính xác" });
          }
        });
      }
    });
});

//404 route
app.get('/404', (req, res) => {
  res.sendFile(path.join(staticPath, "404.html"));
});

app.use((req, res) => {
  res.redirect('/404');
});

//addProduct route
app.get('/add-product', (req, res) => {
  res.sendFile(path.join(staticPath, "addProduct.html"));
});

// seller
app.get('/seller', (req, res) => {
  res.sendFile(path.join(staticPath, "seller.html"));
});

app.listen(300, () => {
  console.log("listening on port 300......");
});
