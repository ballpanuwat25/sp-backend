import express from "express";
import jwt from "jsonwebtoken";
import Student from "./models/StudentModel.js";
import cors from 'cors';

const app = express();

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);

app.get("/student-list", async (req, res) => {
    try {
        const students = await Student.findAll();
        res.status(200).json(students);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: "Internal server error" });
    }
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

app.post("/student-login", async (req, res) => {
    try {
        const student = await Student.findOne({
            where: { Student_Email: req.body.Student_Email },
        });

        if (!student) {
            return res.status(404).json({ Error: "Email does not exist" });
        }

        if (req.body.Student_Password !== student.Student_Password) {
            return res.status(401).json({ Error: "Password is incorrect" });
        }

        const studentToken = jwt.sign({
            studentId: student.Student_Id,
            studentFirstName: student.Student_FName,
            studentLastName: student.Student_LName,
            studentEmail: student.Student_Email,
            studentPassword: student.Student_Password,
            studentTel: student.Student_Tel,
        }, "jwtSecret");

        res.cookie("studentToken", studentToken, { httpOnly: true }).send();
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ Error: "Internal server error" });
    }
});

app.post("/student-register", async (req, res) => {
    try {
        await Student.create({
            Student_Id: req.body.Student_Id,
            Student_FName: req.body.Student_FName,
            Student_LName: req.body.Student_LName,
            Student_Email: req.body.Student_Email,
            Student_Password: req.body.Student_Password,
            Student_Tel: req.body.Student_Tel,
        });
        res.json({ Success: "Student registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: "Internal server error" });
    }
});

app.post("/student-forget-password", async (req, res) => {
    try {
        const student = await Student.findOne({
            where: { Student_Email: req.body.Student_Email },
        });

        if (!student) {
            return res.status(404).json({ Error: "Email does not exist" });
        }

        if (req.body.Student_Password.length < 8) {
            return res.status(400).json({ Error: "Password must be at least 8 characters" });
        }

        await Student.update({ Student_Password: req.body.Student_Password });
        res.json({ Success: "Password changed successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: "Internal server error" });
    }
});

app.get("/student-logout", (req, res) => {
    res.clearCookie("studentToken").send();
});

export default app;