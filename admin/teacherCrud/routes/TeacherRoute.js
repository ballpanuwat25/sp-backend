import express from "express";
import mysql from "mysql";
import jwt from "jsonwebtoken";

import CreateTeacher from "../controllers/CreateTeacher.js";
import DeleteTeacher from "../controllers/DeleteTeacher.js";
import UpdateTeacher from "../controllers/UpdateTeacher.js";
import GetTeachers from "../controllers/GetTeachers.js";
import GetTeachersById from "../controllers/GetTeachersById.js";

const app = express();

const db = mysql.createConnection({
    host: 'bs9ssq5ixcbio4pdec3s-mysql.services.clever-cloud.com',
    user: 'up4j6tz34shhjklb',
    password: 'BaQCmWDsJNjzdClEdW0O',
    database: 'bs9ssq5ixcbio4pdec3s'
});

app.get("/teacher-list", (req, res) => {
    db.query("SELECT * FROM teacher", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

const verifyTeacher = (req, res, next) => {
    const teacherToken = req.cookies.teacherToken;
    if (!teacherToken) {
        return res.json({ Error: "Access denied" });
    } else {
        jwt.verify(teacherToken, "jwtSecret", (err, decoded) => {
            if (err) {
                return res.json({ Error: "Access denied" });
            } else {
                req.teacherId = decoded.teacherId;
                req.teacherFirstName = decoded.teacherFirstName;
                req.teacherLastName = decoded.teacherLastName;
                req.teacherUsername = decoded.teacherUsername;
                req.teacherPassword = decoded.teacherPassword;
                req.teacherTel = decoded.teacherTel;
                next();
            }
        });
    }
};

app.get("/teacher", verifyTeacher, (req, res) => {
    res.json({
        teacherId: req.teacherId,
        teacherFirstName: req.teacherFirstName,
        teacherLastName: req.teacherLastName,
        teacherUsername: req.teacherUsername,
        teacherPassword: req.teacherPassword,
        teacherTel: req.teacherTel,
    });
});

app.post("/teacher-login", (req, res) => {
    const sql = "SELECT * FROM teacher WHERE Teacher_Username = ?";
    db.query(sql, [req.body.Teacher_Username], (err, result) => {
        if (err) return res.json({ Error: err });
        if (result.length > 0) {
            if (req.body.Teacher_Password === result[0].Teacher_Password) {
                const teacherToken = jwt.sign(
                    {
                        teacherId: result[0].Teacher_Id,
                        teacherFirstName: result[0].Teacher_FName,
                        teacherLastName: result[0].Teacher_LName,
                        teacherUsername: result[0].Teacher_Username,
                        teacherPassword: result[0].Teacher_Password,
                        teacherTel: result[0].Teacher_Tel,
                    },
                    "jwtSecret",
                    { expiresIn: "1d" }
                );
                res.cookie("teacherToken", teacherToken, { httpOnly: true }).send();
            } else {
                res.json({ Error: "Password is incorrect" });
            }
        } else {
            res.json({ Error: "Username does not exist" });
        }
    });
});

app.post("/teacher-register", (req, res) => {
    const sql = "INSERT INTO teacher (Teacher_FName, Teacher_LName, Teacher_Username, Teacher_Password, Teacher_Tel) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [req.body.Teacher_FName, req.body.Teacher_LName, req.body.Teacher_Username, req.body.Teacher_Password, req.body.Teacher_Tel], (err, result) => {
        if (err) return res.json({ Error: err });
        res.send(result);
    });
});

app.post("/teacher-forget-password", (req, res) => {
    const sqlSelect = "SELECT * FROM teacher WHERE Teacher_Username = ?";
    const sqlUpdate = "UPDATE teacher SET Teacher_Password = ? WHERE Teacher_Username = ?";

    db.query(sqlSelect, [req.body.Teacher_Username], (err, result) => {
        if (err) {
            return res.json({ Error: err });
        }

        if (result.length > 0) {
            const username = result[0].Teacher_Username;
            if (req.body.Teacher_Password.length < 8) {
                return res.json({ Error: "Password must be at least 8 characters" });
            }

            const newPassword = req.body.Teacher_Password;

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

app.get("/teacher-logout", (req, res) => {
    res.clearCookie("teacherToken").send();
});

app.get('/teacher-list', GetTeachers);
app.get('/teacher-list/:id', GetTeachersById);
app.post('/teacher-list', CreateTeacher);
app.patch('/teacher-list/:id', UpdateTeacher);
app.delete('/teacher-list/:id', DeleteTeacher);

export default app;