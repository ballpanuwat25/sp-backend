import express from "express";
import jwt from "jsonwebtoken";
import cors from 'cors';

import axios from "axios";

import ApproveStudent from "../staff/approveStudent/models/ApproveStudentModel.js";
import Student from "./models/StudentModel.js";

import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';

import dotenv from 'dotenv';
dotenv.config();

const LINE_NOTIFY_API_TOKEN2 = process.env.LINE_TOKEN_USER;

import CreateStudent from "./controllers/CreateStudent.js";
import DeleteStudent from "./controllers/DeleteStudent.js";
import UpdateStudent from "./controllers/UpdateStudent.js";
import GetStudents from "./controllers/GetStudents.js";
import GetStudentsById from "./controllers/GetStudentsById.js";

const app = express();

app.use(
    cors({
        origin: 'http://158.108.194.8:3000',
        credentials: true,
    })
);

const verifyStudent = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const studentToken = authHeader && authHeader.split(' ')[1]; // Extract the token from the Authorization header
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

        res.cookie("studentToken", studentToken);

        res.json({ Success: "Student logged in successfully", token: studentToken });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ Error: "Internal server error" });
    }
});

app.post("/student-register", async (req, res) => {
    try {
        await ApproveStudent.create({
            Student_Id: req.body.Student_Id,
            Student_FName: req.body.Student_FName,
            Student_LName: req.body.Student_LName,
            Student_Email: req.body.Student_Email,
            Student_Password: req.body.Student_Password,
            Student_Tel: req.body.Student_Tel,
        });

        const { Student_Id } = req.body;

        const message = `นิสิตรหัส ${Student_Id}`;

        const lineNotifyURL = "https://notify-api.line.me/api/notify";
        const headers = {
            "Authorization": `Bearer ${LINE_NOTIFY_API_TOKEN2}`,
            "Content-Type": "application/x-www-form-urlencoded",
        };
        const data = new URLSearchParams();
        data.append("message", message);

        await axios.post(lineNotifyURL, data, { headers });

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

        const resetToken = uuidv4();

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: student.Student_Email,
            subject: 'Password Reset Request',
            text: `To reset your password, click the following link: http://158.108.194.8:3000/student-reset-password/${resetToken}`,
        };

        transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ Error: "Failed to send password reset email" });
            } else {
                console.log(`Password reset email sent to: ${student.Student_Email}`);
                res.json({ Success: "Password reset email sent" });
            }
        });

        const studentToken = jwt.sign(
            {
                studentId: student.Student_Id,
                studentFirstName: student.Student_FName,
                studentLastName: student.Student_LName,
                studentEmail: student.Student_Email,
                studentPassword: student.Student_Password,
                studentTel: student.Student_Tel,
            },
            "jwtSecret",
            { expiresIn: "1d" }
        );

        res.cookie("studentToken", studentToken);

        res.json({ Success: "Student logged in", token: studentToken });

    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: "Internal server error" });
    }
});

app.get("/student-logout", (req, res) => {
    res.clearCookie("studentToken").send();
});

app.get('/student-list', GetStudents);
app.get('/student-list/:id', GetStudentsById);
app.post('/student-list', CreateStudent);
app.patch('/student-list/:id', UpdateStudent);
app.delete('/student-list/:id', DeleteStudent);

export default app;