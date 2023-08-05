import express from "express";
import mysql from "mysql";
import jwt from "jsonwebtoken";

import CreateStaff from "../controllers/CreateStaff.js";
import DeleteStaff from "../controllers/DeleteStaff.js";
import UpdateStaff from "../controllers/UpdateStaff.js";
import GetStaffs from "../controllers/GetStaffs.js";
import GetStaffsById from "../controllers/GetStaffsById.js";

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'special_problem'
});

app.get("/staff-list", (req, res) => {
    db.query("SELECT * FROM staff", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

const verifyStaff = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Error: "Access denied" });
    } else {
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if (err) {
                return res.json({ Error: "Access denied" });
            } else {
                req.staffId = decoded.staffId;
                req.staffFirstName = decoded.staffFirstName;
                req.staffLastName = decoded.staffLastName;
                req.staffUsername = decoded.staffUsername;
                req.staffPassword = decoded.staffPassword;
                req.staffTel = decoded.staffTel;
                next();
            }
        });
    }
};

app.get("/staff", verifyStaff, (req, res) => {
    res.json({
        staffId: req.staffId,
        staffFirstName: req.staffFirstName,
        staffLastName: req.staffLastName,
        staffUsername: req.staffUsername,
        staffPassword: req.staffPassword,
        staffTel: req.staffTel,
    });
});

app.post("/staff-login", (req, res) => {
    const sql = "SELECT * FROM staff WHERE Staff_Username = ?";
    db.query(sql, [req.body.Staff_Username], (err, result) => {
        if (err) return res.json({ Error: err });
        if (result.length > 0) {
            if (req.body.Staff_Password === result[0].Staff_Password) {
                const token = jwt.sign(
                    {
                        staffId: result[0].Staff_Id,
                        staffFirstName: result[0].Staff_FName,
                        staffLastName: result[0].Staff_LName,
                        staffUsername: result[0].Staff_Username,
                        staffPassword: result[0].Staff_Password,
                        staffTel: result[0].Staff_Tel,
                    },
                    "jwtSecret",
                    { expiresIn: "1d" }
                );
                res.cookie("token", token, { httpOnly: true }).send();
            } else {
                res.json({ Error: "Password is incorrect" });
            }
        } else {
            res.json({ Error: "Username does not exist" });
        }
    });
});

app.post("/staff-register", (req, res) => {
    const sql = "INSERT INTO staff (Staff_FName, Staff_LName, Staff_Username, Staff_Password, Staff_Tel) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [req.body.Staff_FName, req.body.Staff_LName, req.body.Staff_Username, req.body.Staff_Password, req.body.Staff_Tel], (err, result) => {
        if (err) return res.json({ Error: err });
        res.send(result);
    });
});

app.post("/staff-forget-password", (req, res) => {
    const sqlSelect = "SELECT * FROM staff WHERE Staff_Username = ?";
    const sqlUpdate = "UPDATE staff SET Staff_Password = ? WHERE Staff_Username = ?";

    db.query(sqlSelect, [req.body.Staff_Username], (err, result) => {
        if (err) {
            return res.json({ Error: err });
        }

        if (result.length > 0) {
            const username = result[0].Staff_Username;
            if (req.body.Staff_Password.length < 8) {
                return res.json({ Error: "Password must be at least 8 characters" });
            }

            const newPassword = req.body.Staff_Password;

            db.query(sqlUpdate, [newPassword, username], (error, result) => {
                if (error) {
                    return res.json({ Error: error });
                }

                res.send(result);
            });
        } else {
            res.json({ Error: "Username does not exist" });
        }
    });
});

app.get("/staff-logout", (req, res) => {
    res.clearCookie("token").send();
});

app.get('/staff-list', GetStaffs);
app.get('/staff-list/:id', GetStaffsById);
app.post('/staff-list', CreateStaff);
app.patch('/staff-list/:id', UpdateStaff);
app.delete('/staff-list/:id', DeleteStaff);

export default app;