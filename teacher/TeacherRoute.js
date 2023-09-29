import express from "express";
import jwt from "jsonwebtoken";

import cors from 'cors';
import Teacher from "../admin/teacherCrud/models/TeacherModel.js"

const app = express();

app.use(
    cors({
        origin: 'https://chemical-reimbursement-system-frontend.vercel.app',
        credentials: true,
    })
);

const verifyTeacher = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const teacherToken = authHeader && authHeader.split(' ')[1];
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

app.post("/teacher-login", async (req, res) => {
    try {
        const teacher = await Teacher.findOne({
            where: { Teacher_Username: req.body.Teacher_Username },
        });

        if (!teacher) {
            return res.status(404).json({ Error: "Username does not exist" });
        }

        if (req.body.Teacher_Password !== teacher.Teacher_Password) {
            return res.status(401).json({ Error: "Password is incorrect" });
        }

        const teacherToken = jwt.sign(
            {
                teacherId: teacher.Teacher_Id,
                teacherFirstName: teacher.Teacher_FName,
                teacherLastName: teacher.Teacher_LName,
                teacherUsername: teacher.Teacher_Username,
                teacherPassword: teacher.Teacher_Password,
                teacherTel: teacher.Teacher_Tel,
            },
            "jwtSecret",
            { expiresIn: "1d" }
        );

        res.cookie("teacherToken", teacherToken)

        res.json({ Success: "Teacher logged in", token: teacherToken })
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: "Internal server error" });
    }
});

app.post("/teacher-register", async (req, res) => {
    try {
        await Teacher.create({
            Teacher_FName: req.body.Teacher_FName,
            Teacher_LName: req.body.Teacher_LName,
            Teacher_Username: req.body.Teacher_Username,
            Teacher_Password: req.body.Teacher_Password,
            Teacher_Tel: req.body.Teacher_Tel,
        });
        res.status(201).send("Teacher registered successfully");
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: "Internal server error" });
    }
});

app.post("/teacher-forget-password", async (req, res) => {
    try {
        const teacher = await Teacher.findOne({
            where: { Teacher_Username: req.body.Teacher_Username },
        });

        if (!teacher) {
            return res.status(404).json({ Error: "Username does not exist" });
        }

        if (req.body.Teacher_Password.length < 8) {
            return res
                .status(400)
                .json({ Error: "Password must be at least 8 characters" });
        }

        await teacher.update({ Teacher_Password: req.body.Teacher_Password });
        res.send("Password updated successfully");
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: "Internal server error" });
    }
});

app.get("/teacher-logout", (req, res) => {
    res.clearCookie("teacherToken").send();
});

export default app;