const db = require("../models/db");

const bcrypt = require("bcrypt");
const saltRounds = 10;
let strongRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);
// module.exports.getAll = (req, res) => {
//   db.execute("SELECT * FROM  ")
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((err) => console.log(err));
//   res.send("Get all user");
// };

// module.exports.getById = (req, res) => {
//   res.send("Get user by id");
// };


module.exports.register = (req, res) => {
  let { gmail, password } = req.body;
  if (!gmail || !password) {
    res.status(200).json({
      message: "INvail gmail or password",
    });
  }
  if (!strongRegex.test(password)) {
    return res.status(500).json({
      message: "Password is not strong enough",
    });
  }
  let id = Math.floor(Math.random() * 999999);
  password = bcrypt.hashSync(password, saltRounds);

  db.execute("SELECT * FROM tbl_users WHERE gmail =?", [gmail])
    .then((data) => {
      let [rows] = data;
      console.log(rows);
      if (rows.length > 0) {
        return Promise.reject("User already exist");
      } else {
        return db.execute("INSERT INTO tbl_users VALUES(?, ?, ?, ?, ?,?)", [
          id,
          null,
          gmail,
          null,
          password,
          null
        ]);
      }
    })
    .then((data) => {
      res.status(200).json({
        message: "Create one successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};

module.exports.login=(req, res)=>{
 console.log("abc");
  let {gmail, password}= req.body
  if(!gmail || !password){
    res.status.json({
      message: "Invail gmail or password"
    })
  }
  db.execute("SELECT * FROM tbl_users WHERE gmail=?",[gmail])
  .then((data)=>{
    let [rows]= data
    console.log(rows);
    let find =rows[0]
    if(!find){
      res.status(404).json({
        message: "User is not exist"
      })
    }else{
      let passValid =bcrypt.compareSync(password, find.password);
      if(!passValid){
        res.status(404).json({
          message:"Wrong password"
        })
      }else{
        res.status(200).json({
          message:"Login succesfully"
        })
      }
    }
  })
  .catch((err)=>{
    res.status(500).json({
      message:err
    })
  })
}


// module.exports.updateUsers = (req, res) => {
//   res.send("update new user");
// };

// module.exports.deleteUsers = (req, res) => {
//   res.send("delete user info");
// };
