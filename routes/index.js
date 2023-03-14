var express = require("express");
var router = express.Router();
const { Pool, Client } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Product",
  password: "long0808",
  port: 5432,
});
/* GET home page. */
router.get("/", function (req, res, next) {
  // res.render("index", { title: "Express" });
});

router.get("/test", function (req, res, next) {
  // Website chap nhan duong dan url:http://localhost:4000
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Website chap nhan cac phuong thuc nhu: GET, POST, OPTIONS, PUT, PATCH, DELETE
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  //get data from
  pool.query("SELECT * FROM product_banchay", (error, respone) => {
    //Neu loi thi xuat ra console dong chu "Loi error"
    if (error) {
      console.log(error);
    }
    //Neu khong loi thi xuat ra du lieu tu postgresql
    else {
      res.send(respone.rows);
    }
    // pool.end();
  });
});

//Them du lieu -GET
router.get("/them", function (req, res, next) {
  res.render("them", {});
});
//Lay du lieu -Lay
router.post("/them", function (req, res, next) {
  //Lya du lieu
  var id_sp = req.body.id_sp,
    hinh_sp = req.body.hinh_sp,
    gia_sp = req.body.gia_sp,
    ten_sp = req.body.ten_sp;
  pool.query(
    "INSERT INTO product_banchay (id_sp,hinh_sp,ten_sp,gia_sp) VALUES ($1,$2,$3,$4)",
    [id_sp, hinh_sp, ten_sp, gia_sp],
    (error, respone) => {
      if (error) {
        console.log(error);
      } else {
        res.send(
          "Nhan duoc du lieu " +
            id_sp +
            "-" +
            hinh_sp +
            "-" +
            ten_sp +
            "-" +
            gia_sp
        );
      }
      // pool.end();
    }
  );
  // console.log(hinh);
  // console.log(ten);
  // console.log(gia);
  // console.log(id);
  // res.render("them", { title: "Them du lieu vao postgre" });
});
module.exports = router;
