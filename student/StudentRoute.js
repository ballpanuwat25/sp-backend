import express from "express";
import jwt from "jsonwebtoken";
import ApproveStudent from "../staff/approveStudent/models/ApproveStudentModel.js";
import Student from "./models/StudentModel.js";
import cors from 'cors';

import axios from "axios";

const LINE_NOTIFY_API_TOKEN2 = "zDRivBRCInkQjXxLKpuTDvsM4ooDJ0B5TQYU9muqUws";

import CreateStudent from "./controllers/CreateStudent.js";
import DeleteStudent from "./controllers/DeleteStudent.js";
import UpdateStudent from "./controllers/UpdateStudent.js";
import GetStudents from "./controllers/GetStudents.js";
import GetStudentsById from "./controllers/GetStudentsById.js";

const app = express();

app.use(
    cors({
        origin: 'https://chem-ku-kps.vercel.app',
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

        if (req.body.Student_Password.length < 8) {
            return res.status(400).json({ Error: "Password must be at least 8 characters" });
        }

        await ApproveStudent.update({ Student_Password: req.body.Student_Password });
        res.json({ Success: "Password changed successfully" });
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