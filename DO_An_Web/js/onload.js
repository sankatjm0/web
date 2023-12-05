function createAdmin() {
    if (!(user.find(value => value.username === "admin"))) {
      user.push( 
      {
        username: "admin",
        password: "admin",
      }
      );
    }
    localStorage.setItem('user', JSON.stringify(user));
  }
  
  function createProduct() {
    if (localStorage.getItem('product') === null) {
      var productArray = [
        { ID : 1,brand: 'chanel', img: 'img/product/10050.jpg', name: 'Chanel White Gold', price: 210000 },
        { ID : 2,brand: 'chanel', img: 'img/product/10049.jpg', name: 'Chanel Stan Smith Leather White', price: 303000 },
        { ID : 3,brand: 'chanel', img: 'img/product/10048.jpg', name: 'Chanel Snake Diamond', price: 1845000 },
        { ID : 4,brand: 'chanel', img: 'img/product/10047.jpg', name: 'Chanel Sneaker Dirty', price: 1500000 },
        { ID : 5,brand: 'chanel', img: 'img/product/10046.jpg', name: 'Chanel  Speed Trainer Triple Black', price: 1700000 },
        { ID : 6,brand: 'chanel', img: 'img/product/10045.jpg', name: 'Chanel  X OFF WHITE 2018', price: 750000 },
        { ID : 7,brand: 'chanel', img: 'img/product/10044.jpg', name: 'Chanel AIR MAX 270 ALL WHITE', price: 431900 },
        { ID : 8,brand: 'chanel', img: 'img/product/10043.jpg', name: 'Chanel Human Race China Exclusive Green', price: 1037500 },
        { ID : 9,brand: 'chanel', img: 'img/product/10042.jpg', name: 'Chanel Alpha Bounce Instinct All Black', price: 430000 },
        { ID : 10,brand: 'chanel', img: 'img/product/10041.jpg', name: 'Chanel Global Sneaker', price: 1605000 },
        { ID : 11,brand: 'louisvuitton', img: 'img/product/10040.jpg', name: 'Louisvuitton Superstar White Gold', price: 210000 },
        { ID : 12,brand: 'louisvuitton', img: 'img/product/10039.jpg', name: 'Louisvuitton Stan Smith Leather White', price: 303000 },
        { ID : 13,brand: 'louisvuitton', img: 'img/product/10038.jpg', name: 'Louisvuitton  Snake Diamond', price: 1845500 },
        { ID : 14,brand: 'louisvuitton', img: 'img/product/10037.jpg', name: 'Louisvuitton  Sneaker Dirty', price: 150000 },
        { ID : 15,brand: 'louisvuitton', img: 'img/product/10036.jpg', name: 'Louisvuitton  Speed Trainer Triple Black', price: 1705000 },
        { ID : 16,brand: 'louisvuitton', img: 'img/product/10035.jpg', name: 'Louisvuitton Vapormax X OFF WHITE 2018', price: 750000 },
        { ID : 17,brand: 'louisvuitton', img: 'img/product/10034.jpg', name: 'Louisvuitton AIR MAX 270 ALL WHITE', price: 431900 },
        { ID : 18,brand: 'louisvuitton', img: 'img/product/10033.jpg', name: 'Louisvuitton Human Race China Exclusive Green', price: 10375000 },
        { ID : 19,brand: 'louisvuitton', img: 'img/product/10032.jpg', name: 'Louisvuitton Alpha Bounce Instinct All Black', price: 430000 },
        { ID : 20,brand: 'louisvuitton', img: 'img/product/10031.jpg', name: 'Louisvuitton Global Sneaker', price: 1605000 },
        { ID : 21,brand: 'adidas', img: 'img/product/10030.jpg', name: 'Adidas Bee Black', price: 1600000 },
        { ID : 22,brand: 'adidas', img: 'img/product/10029.jpg', name: 'Adidas Triple S Grey', price: 3300000 },
        { ID : 23,brand: 'adidas', img: 'img/product/10028.jpg', name: 'Adidas Owens SS17 High', price: 1805000 },
        { ID : 24,brand: 'adidas', img: 'img/product/10027.jpg', name: 'Adidas 35 Black', price: 7350000 },
        { ID : 25,brand: 'adidas', img: 'img/product/10026.jpg', name: 'Adidas Max 97 Silver Bullet', price: 150000 },
        { ID : 26,brand: 'adidas', img: 'img/product/10025.jpg', name: 'Adidas Bounce Beyond Nude/Pink', price: 410000 },
        { ID : 27,brand: 'adidas', img: 'img/product/10024.jpg', name: 'Adidas YUNG1 Navy/Red', price: 459000 },
        { ID : 28,brand: 'adidas', img: 'img/product/10023.jpg', name: 'Adidas Snake Sneaker', price: 1600000 },
        { ID : 29,brand: 'adidas', img: 'img/product/10022.jpg', name: 'Adidas Global Silver Sneaker', price: 1800000 },
        { ID : 30,brand: 'adidas', img: 'img/product/10021.jpg', name: 'Adidas 350 v2 ‘ Zebra ‘ Rep', price: 1055000 },
        { ID : 31,brand: 'gucci', img: 'img/product/10020.jpg', name: 'Gucci 350 v2 Beluga 2.0', price: 950000 },
        { ID : 32,brand: 'gucci', img: 'img/product/10019.jpg', name: 'Gucci Max 270 Black Pink', price: 625000 },
        { ID : 33,brand: 'gucci', img: 'img/product/10018.jpg', name: 'Gucci max 1 x Parra', price: 1554900 },
        { ID : 34,brand: 'gucci', img: 'img/product/10017.jpg', name: 'Gucci Race China Exclusive Peace', price: 1037000 },
        { ID : 35,brand: 'gucci', img: 'img/product/10016.jpg', name: 'Gucci Frieza', price: 413000 },
        { ID : 36,brand: 'gucci', img: 'img/product/10015.jpg', name: 'Gucci Fox Sneaker', price: 1600000 },
        { ID : 37,brand: 'gucci', img: 'img/product/10014.jpg', name: 'Gucci Stripe Sneaker', price: 1509000 },
        { ID : 38,brand: 'gucci', img: 'img/product/10013.jpg', name: 'Gucci Owens SS17 Low', price: 2310000 },
        { ID : 39,brand: 'gucci', img: 'img/product/10012.jpg', name: 'Gucci Triple S Black', price: 2125500 },
        { ID : 40,brand: 'gucci', img: 'img/product/10011.jpg', name: 'Gucci max 1 Box Print', price: 233000 },
        { ID : 41,brand: 'nike', img: 'img/product/10010.jpg', name: 'Nike Element 87 Black', price: 529500 },
        { ID : 42,brand: 'nike', img: 'img/product/10009.jpg', name: 'Nike Race V3 Solar Black', price: 1235500 },
        { ID : 43,brand: 'nike', img: 'img/product/10008.jpg', name: 'Nike Alpha Bounce Instinct Grey', price: 279900 },
        { ID : 44,brand: 'nike', img: 'img/product/10007.jpg', name: 'Nike LOVED', price: 1560000 },
        { ID : 45,brand: 'nike', img: 'img/product/10006.jpg', name: 'Nike Flame Sneaker', price: 1709900 },
        { ID : 46,brand: 'nike', img: 'img/product/10005.jpg', name: 'Nike Triple S White', price: 2039500 },
        { ID : 47,brand: 'nike', img: 'img/product/10004.jpg', name: 'Nike Speed Trainer BB', price: 1702000 },
        { ID : 48,brand: 'nike', img: 'img/product/10003.jpg', name: 'Nike M2K John', price: 294900 },
        { ID : 49,brand: 'nike', img: 'img/product/10002.jpg', name: 'Nike Pegasus 35 Grey', price: 535000 },
        { ID : 50,brand: 'nike', img: 'img/product/10001.jpg', name: 'Nike Propher Undefeated', price: 699000 },
        { ID : 51,brand: 'gucci', img: 'img/product/10020.jpg', name: 'Gucci max 1 Bx Print', price: 230000 },
        { ID : 52,brand: 'gucci', img: 'img/product/10025.jpg', name: 'Gucci Race V3 Solr Black', price: 1235000 },
        { ID : 53,brand: 'nike', img: 'img/product/10001.jpg', name: 'Nike Alpha Bounc Instinct Grey', price: 279900 },
        { ID : 54,brand: 'nike', img: 'img/product/10005.jpg', name: 'Nike LOVE', price: 1560000 },
        { ID : 55,brand: 'adidas', img: 'img/product/10021.jpg', name: 'Adidas Flam Sneaker', price: 1709000 },
        { ID : 56,brand: 'adidas', img: 'img/product/10025.jpg', name: 'Adidas Triple White', price: 2095000 },
        { ID : 57,brand: 'louisvuitton', img: 'img/product/10031.jpg', name: 'Louisvuitton Speed BB', price: 1702000 },
        { ID : 58,brand: 'louisvuitton', img: 'img/product/10035.jpg', name: 'Louisvuitton M2 John', price: 294900 },
        { ID : 59,brand: 'chanel', img: 'img/product/10041.jpg', name: 'Chanel Pegasus  Grey', price: 535000 },
        { ID : 60,brand: 'chanel', img: 'img/product/10045.jpg', name: 'Chanel Prophere ', price: 659000 }
      ];
      localStorage.setItem('product', JSON.stringify(productArray));
    }
  }
  
  createAdmin();
createProduct();

function guest() {
    sessionStorage.clear()
    location.replace("index-user.html")
}