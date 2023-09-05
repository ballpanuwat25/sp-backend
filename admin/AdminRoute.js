import express from "express";
import mysql from "mysql";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"; // <-- Changed from 'bcrypt' to 'bcryptjs'

const saltRounds = 10; // <-- Changed the variable name to 'saltRounds'
const app = express();

const db = mysql.createConnection({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'b31dc6ab9dc1a5',
    password: 'ab7f1437',
    database: 'heroku_aaa3e2329909778'
});

app.get("/admin-list", (req, res) => {
  db.query("SELECT * FROM admin", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

const verifyAdmin = (req, res, next) => {
  const adminToken = req.cookies.adminToken;
  if (!adminToken) {
    return res.json({ Error: "Access denied" });
  } else {
    jwt.verify(adminToken, "jwtSecret", (err, decoded) => {
      if (err) {
        return res.json({ Error: "Access denied" });
      } else {
        req.adminName = decoded.adminName;
        req.adminUsername = decoded.adminUsername;
        req.adminPassword = decoded.adminPassword;
        req.adminTel = decoded.adminTel;
        next();
      }
    });
  }
};

app.get("/admin", verifyAdmin, (req, res) => {
  res.json({
    adminName: req.adminName,
    adminUsername: req.adminUsername,
    adminPassword: req.adminPassword,
    adminTel: req.adminTel,
  });
});

app.post("/admin-login", (req, res) => {
  const sql = "SELECT * FROM admin WHERE Admin_Username = ?";
  db.query(sql, [req.body.Admin_Username], (err, result) => {
    if (err) return res.json({ Error: err });
    if (result.length > 0) {
      bcrypt.compare(req.body.Admin_Password, result[0].Admin_Password, (error, response) => {
        if (error) return res.json({ Error: error });
        if (response) {
          const adminToken = jwt.sign(
            {
              adminName: result[0].Admin_Name,
              adminUsername: result[0].Admin_Username,
              adminPassword: result[0].Admin_Password,
              adminTel: result[0].Admin_Tel,
            },
            "jwtSecret",
            { expiresIn: "1d" }
          );
          res.cookie("adminToken", adminToken, { httpOnly: true }).send();
        } else {
          res.json({ Error: "Password is incorrect" });
        }
      });
    } else {
      res.json({ Error: "Username does not exist" });
    }
  });
});

app.post("/admin-register", (req, res) => {
  const sql = "INSERT INTO admin (Admin_Name, Admin_Username, Admin_Password, Admin_Tel) VALUES (?, ?, ?, ?)";
  bcrypt.hash(req.body.Admin_Password, saltRounds, (err, hash) => {
    if (err) return res.json({ Error: err });
    db.query(sql, [req.body.Admin_Name, req.body.Admin_Username, hash, req.body.Admin_Tel], (error, result) => {
      if (error) return res.json({ Error: error });
      res.send(result);
    });
  });
});

app.post("/admin-forget-password", (req, res) => {
  const sqlSelect = "SELECT * FROM admin WHERE Admin_Username = ?";
  const sqlUpdate = "UPDATE admin SET Admin_Password = ? WHERE Admin_Username = ?";

  db.query(sqlSelect, [req.body.Admin_Username], (err, result) => {
    if (err) {
      return res.json({ Error: err });
    }

    if (result.length > 0) {
      const username = result[0].Admin_Username;
      if (req.body.Admin_Password.length < 8) {
        return res.json({ Error: "Password must be at least 8 characters" });
      }

      bcrypt.hash(req.body.Admin_Password, saltRounds, (error, hash) => {
        if (error) {
          return res.json({ Error: error });
        }

        db.query(sqlUpdate, [hash, username], (error, result) => {
          if (error) {
            return res.json({ Error: error });
          }

          res.send(result);
        });
      });
    } else {
      res.json({ Error: "Username does not exist" });
    }
  });
});

app.get("/admin-logout", (req, res) => {
  res.clearCookie("adminToken").send();
});

export default app;
