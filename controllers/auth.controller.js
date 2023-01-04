const db = require("../models/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
let strongRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);

module.exports.register = (req, res) => {
  let { name, phone, gmail, password } = req.body;
  if (!name || !gmail || !phone || !password) {
    res.status(200).json({
      message: "Invail name or phone or gmail or password ",
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
      if (rows.length > 0) {
        return res.status(500).json({ message: "User already exist" });
      } else {
        db.execute("SELECT * FROM tbl_users WHERE phone = ?", [phone]).then(
          (data) => {
            if (data[0].length > 0) {
              return res.status(500).json({ message: "Phone already exist" });
            } else {
              db.execute("INSERT INTO tbl_users VALUES(?, ?, ?, ?, ?, ?, ?)", [
                id,
                name,
                gmail,
                phone,
                password,
                "user",
                "https://kynguyenlamdep.com/wp-content/uploads/2022/06/avatar-cute-vui-nhon.jpg",
              ])
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
            }
          }
        );
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};

module.exports.login = (req, res) => {
  let { gmail, password } = req.body;
  if (!gmail || !password) {
    res.status(404).json({
      message: "Invail gmail or password",
    });
  }
  db.execute("SELECT * FROM tbl_users WHERE gmail=?", [gmail])
    .then((data) => {
      let [rows] = data;
      let find = rows[0];
      if (!find) {
        res.status(404).json({
          message: "User is not exist",
        });
      } else {
        let passValid = bcrypt.compareSync(password, find.password);
        if (!passValid) {
          res.status(404).json({
            message: "Wrong password",
          });
        } else {
          // res.cookie("userId", find.id, { signed: true });
          // res.cookie("role", find.role, { signed: true });
          // res.cookie("name", find.name, { signed: true });
          console.log("a");
          res.status(200).json({
            message: "Login succesfully",
            cookie: {
              userId: find.id,
              role: find.role,
              name: find.name,
              avatar: find.avatar,
            },
          });
        }
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};

module.exports.UpdataUserProfile = (req, res) => {
  let { id } = req.params;
  let { name, avatar } = req.body;

  db.execute("UPDATE tbl_users SET name=?, avatar=? WHERE id=?", [
    name,
    avatar,
    id,
  ])
    .then((data) => {
      res.status(200).json({
        message: "Update one successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};

module.exports.getAllUserProfile = (req, res) => {
  let { id } = req.params;
  db.execute("SELECT * FROM tbl_users WHERE id=?", [id])
    .then((data) => {
      let [rows] = data;
      res.status(200).json({
        data: rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};
