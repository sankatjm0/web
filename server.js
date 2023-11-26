// //importing packages
// const express = require("express");
// const admin = require("firebase-admin");
// const bcrypt = require("bcrypt");
// const path = require("path");
// const nodemailer = require("nodemailer");

// // firebase admin setup

// let serviceAccount = require("./shopquanao-3475d-firebase-adminsdk-c6mz2-f31f70b0fa.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });
// let db = admin.firestore();

// //delare static path
// let staticPath = path.join(__dirname, "Do_An_Web");

// //intializing express.js

// const app = express();

// //middlewares
// app.use(express.static(staticPath));
// app.use(express.json());

// //routes
// //home user route
// app.get("/", (req, res) => {
//   res.sendFile(path.join(staticPath, "index-user.html"));
// });

// //home admin route
// app.get("/admin", (req, res) => {
//   res.sendFile(path.join(staticPath, "index-admin.html"));
// });
// app.get("/LocalStorage", (req, res) => {
//   res.sendFile(path.join(staticPath, "LocalStorage.html"));
// });

// //singup
// app.get("/signup", (req, res) => {
//   res.sendFile(path.join(staticPath, "signup.html"));
// });

// app.post("/signup", (req, res) => {
//   let { name, email, password } = req.body;

//   // form validations

//   if (name.length < 3) {
//     return res.json({ alert: "Tên phải lớn hơn 3 ký tự" });
//   } else if (!email.length) {
//     return res.json({ alert: "Nhập email của bạn" });
//   } else if (password.length < 6) {
//     return res.json({ alert: "Nhập mật khẩu (ít nhất 6 ký tự)" });
//   }

//   // store user in db
//   db.collection("users")
//     .doc(email)
//     .get()
//     .then((user) => {
//       if (user.exists) {
//         return res.json({ alert: "Email đã tồn tại" });
//       } else {
//         bcrypt.genSalt(10, (err, salt) => {
//           bcrypt.hash(password, salt, (err, hash) => {
//             req.body.password = hash;
//             db.collection("users")
//               .doc(email)
//               .set(req.body)
//               .then((data) => {
//                 res.json({
//                   name: req.body.name,
//                   email: req.body.email,
//                 });
//               });
//           });
//         });
//       }
//     });
// });

// //login route
// app.get("/login", (req, res) => {
//   res.sendFile(path.join(staticPath, "login.html"));
// });

// app.post("/login", (req, res) => {
//   let { email, password } = req.body;

//   if (!email.length || !password.length) {
//     return res.json({ alert: "Điền đầy đủ thông tin" });
//   }

//   db.collection("users")
//     .doc(email)
//     .get()
//     .then((user) => {
//       if (!user.exists) {
//         return res.json({ alert: "Email hoặc mật khẩu không chính xác" });
//       } else {
//         bcrypt.compare(password, user.data().password, (err, result) => {
//           if (result) {
//             let data = user.data();
//             // console.log(data.name);
//             return res.json({
//               name: data.name,
//               email: data.email,
//             });
//           } else {
//             return res.json({ alert: "Email hoặc mật khẩu không chính xác" });
//           }
//         });
//       }
//     });
// });

// //add product
// app.post("/add-product", (req, res) => {
//   let {
//     name,
//     shortDes,
//     des,
//     images,
//     sizes,
//     actualPrice,
//     discount,
//     sellPrice,
//     stock,
//     tags,
//     tac,
//     email,
//     draft,
//     id,
//   } = req.body;

//   //validation
//   if (!draft) {
//     if (!name.length) {
//       return res.json({ alert: "enter product name" });
//     } else if (shortDes.length > 100 || shortDes.length < 10) {
//       return res.json({
//         alert: "short description must be between 10 to 100 letters long",
//       });
//     } else if (!des.length) {
//       return res.json({ alert: "enter detail description about the product" });
//     } else if (!imagePaths.length) {
//       //image link array
//       return res.json({ alert: "upload atleast one product image" });
//     } else if (!sizes.length) {
//       // size array
//       return res.json({ alert: "select at least one size" });
//     } else if (!actualPrice.length || !discount.length || !sellPrice.length) {
//       return res.json({ alert: "you must add pricings" });
//     } else if (stock < 20) {
//       return res.json({ alert: "you should have at least 20 items in stock" });
//     } else if (!tags.length) {
//       return res.json({
//         alert: "enter few tags to help ranking your product in search",
//       });
//     } else if (!tac) {
//       return res.json({ alert: "you must agree to our terms and conditions" });
//     }
//   }

//   //add product
//   let docName =
//     id == undefined
//       ? "${name.toLowerCase()}-${Math.floor(Math.random() *5000)}"
//       : id;
//   db.collection("products")
//     .doc(docName)
//     .set(req.body)
//     .then((data) => {
//       res.json({ product: name });
//     })
//     .catch((err) => {
//       return res.json({ alert: "some error occured. Try again" });
//     });
// });

// //get products
// app.post(".get-products", (req, res) => {
//   let { email, id } = req.body;
//   let docRef = id
//     ? db.collection("products").doc(id)
//     : db.collection("products").where("email", "==", email);

//   docRef.get().then((products) => {
//     if (products.empty) {
//       return res.json("no products");
//     }
//     let productArr = [];
//     if (id) {
//       return res.json(products.data());
//     } else {
//       products.forEach((item) => {
//         let data = item.data();
//         data.id = item.id;
//         productArr.push(data);
//       });
//       res.json(productArr);
//     }
//   });
// });

// app.post("/delete-product", (req, res) => {
//   let { id } = req.body;

//   db.collection("products")
//     .doc(id)
//     .delete()
//     .then((data) => {
//       res.json("success");
//     })
//     .catch((err) => {
//       res.json("err");
//     });
// });
// //product page
// app.get("/products/:id", (req, res) => {
//   res.sendFile(path.join(staticPath, "product.html"));
// });
// app.get("/search/:key", (req, res) => {
//   res.sendFile(path.join(staticPath, "search.html"));
// });
// app.get("/Do_An_Web/cart.html", (req, res) => {
//   res.sendFile(path.join(staticPath, "/cart.html"));
// });
// app.get("/checkout", (req, res) => {
//   res.sendFile(path.join(staticPath, "checkout.html"));
// });

// app.post("/oder", (req, res) => {
//   res.sendFile(path.join(staticPath, "checkout.html"));
// });
// //404 route
// app.get("/404", (req, res) => {
//   res.sendFile(path.join(staticPath, "404.html"));
// });

// app.use((req, res) => {
//   res.redirect("/404");
// });

// //addProduct route
// app.get("/add-product", (req, res) => {
//   res.sendFile(path.join(staticPath, "addProduct.html"));
// });

// app.get("/add-product/:id", (req, res) => {
//   res.sendFile(path.join(staticPath, "addProduct.html"));
// });

// // seller
// app.get("/seller", (req, res) => {
//   res.sendFile(path.join(staticPath, "seller.html"));
// });
// app.post("/seller", (req, res) => {
//   let { name, address, number, email } = req.body;
//   if (
//     !name.length ||
//     !address.length ||
//     !number.length < 10 ||
//     !Number(number)
//   ) {
//     return res.json({ alert: "some informations is/are invalid" });
//   } else {
//     db.collection("sellers")
//       .doc(email)
//       .set(req.body)
//       .then((data) => {
//         db.collection("users")
//           .doc(email)
//           .update({
//             seller: true,
//           })
//           .then((data) => {
//             res.json(true);
//           });
//       });
//   }
// });

// app.listen(300, () => {
//   console.log("listening on port 300......");
// });
