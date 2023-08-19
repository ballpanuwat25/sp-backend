import express from "express";
import mysql from "mysql";
import jwt from "jsonwebtoken";

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'special_problem'
});

app.get("/student-list", (req, res) => {
    db.query("SELECT * FROM student", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

const verifyStudent = (req, res, next) => {
    const studentToken = req.cookies.studentToken;
    if (!studentToken) {
        return res.json({ Error: "Access denied" });
    } else {
        jwt.verify(studentToken, "jwtSecret", (err, decoded) => {
            if (err) {
                return res.json({ Error: "Access denied" });
            } else {
                req.studentId = decoded.studentId;
                req.studentFirstName = decoded.studentFirstName;
                req.studentLastName = decoded.studentLastName;
                req.studentEmail = decoded.studentEmail;
                req.studentPassword = decoded.studentPassword;
                req.studentTel = decoded.studentTel;
                next();
            }
        });
    }
};

app.get("/student", verifyStudent, (req, res) => {
    res.json({
        studentId: req.studentId,
        studentFirstName: req.studentFirstName,
        studentLastName: req.studentLastName,
        studentEmail: req.studentEmail,
        studentPassword: req.studentPassword,
        studentTel: req.studentTel,
    });
});

app.post("/student-login", (req, res) => {
    const sql = "SELECT * FROM student WHERE Student_Email = ?";
    db.query(sql, [req.body.Student_Email], (err, result) => {
        if (err) return res.json({ Error: err });
        if (result.length > 0) {
            if (req.body.Student_Password === result[0].Student_Password) {
                const studentToken = jwt.sign(
                    {
                        studentId: result[0].Student_Id,
                        studentFirstName: result[0].Student_FName,
                        studentLastName: result[0].Student_LName,
                        studentEmail: result[0].Student_Email,
                        studentPassword: result[0].Student_Password,
                        studentTel: result[0].Student_Tel,
                    },
                    "jwtSecret",
                    { expiresIn: "1d" }
                );
                res.cookie("studentToken", studentToken, { httpOnly: true }).send();
            } else {
                res.json({ Error: "Password is incorrect" });
            }
        } else {
            res.json({ Error: "Email does not exist" });
        }
    });
});

app.post("/student-register", (req, res) => {
    const sql = "INSERT INTO student (Student_Id, Student_FName, Student_LName, Student_Email, Student_Password, Student_Tel) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [req.body.Student_Id ,req.body.Student_FName, req.body.Student_LName, req.body.Student_Email, req.body.Student_Password, req.body.Student_Tel], (err, result) => {
        if (err) return res.json({ Error: err });
        res.send(result);
    });
});

app.post("/student-forget-password", (req, res) => {
    const sqlSelect = "SELECT * FROM student WHERE Student_Email = ?";
    const sqlUpdate = "UPDATE student SET Student_Password = ? WHERE Student_Email = ?";

    db.query(sqlSelect, [req.body.Student_Email], (err, result) => {
        if (err) {
            return res.json({ Error: err });
        }

        if (result.length > 0) {
            const email = result[0].Student_Email;
            if (req.body.Student_Password.length < 8) {
                return res.json({ Error: "Password must be at least 8 characters" });
            }

            const newPassword = req.body.Student_Password;

            db.query(sqlUpdate, [newPassword, email], (error, result) => {
                if (error) {
                    return res.json({ Error: error });
                }

                res.send(result);
            });
        } else {
            res.json({ Error: "Email does not exist" });
        }
    });
});

app.get("/student-logout", (req, res) => {
    res.clearCookie("studentToken").send();
});

export default app;