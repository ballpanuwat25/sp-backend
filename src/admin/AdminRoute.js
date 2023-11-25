import express from "express";
import jwt from "jsonwebtoken";

import cors from 'cors';
import Admin from "./adminCrud/models/AdminModel.js"

import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(
    cors({
        origin: process.env.ORIGIN,
        credentials: true,
    })
);

const verifyAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const adminToken = authHeader && authHeader.split(' ')[1];
    if (!adminToken) {
        return res.json({ Error: "Access denied" });
    } else {
        jwt.verify(adminToken, "jwtSecret", (err, decoded) => {
            if (err) {
                return res.json({ Error: "Access denied" });
            } else {
                req.adminId = decoded.adminId;
                req.adminFirstName = decoded.adminFirstName;
                req.adminLastName = decoded.adminLastName;
                req.adminEmail = decoded.adminEmail;
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
        adminId: req.adminId,
        adminFirstName: req.adminFirstName,
        adminLastName: req.adminLastName,
        adminEmail: req.adminEmail,
        adminUsername: req.adminUsername,
        adminPassword: req.adminPassword,
        adminTel: req.adminTel,
    });
});

app.post("/admin-login", async (req, res) => {
    try {
        const admin = await Admin.findOne({
            where: { Admin_Username: req.body.Admin_Username },
        });

        if (!admin) {
            return res.status(404).json({ Error: "Username does not exist" });
        }

        if (req.body.Admin_Password !== admin.Admin_Password) {
            return res.status(401).json({ Error: "Incorrect password" });
        }

        const adminToken = jwt.sign(
            {
                adminId: admin.Admin_Id,
                adminFirstName: admin.Admin_FName,
                adminLastName: admin.Admin_LName,
                adminEmail: admin.Admin_Email,
                adminUsername: admin.Admin_Username,
                adminPassword: admin.Admin_Password,
                adminTel: admin.Admin_Tel,
            },
            "jwtSecret",
            { expiresIn: "1d" }
        );

        res.cookie("adminToken", adminToken)

        res.json({ Success: "Admin logged in", token: adminToken });
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

app.post("/admin-forget-password", async (req, res) => {
    try {
        const admin = await Admin.findOne({
            where: { Admin_Username: req.body.Admin_Username },
        });

        if (!admin) {
            return res.status(404).json({ Error: "Username does not exist" });
        }

        const resetToken = uuidv4();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: admin.Admin_Email,
            subject: 'Password Reset Request',
            text: `To reset your password, click the following link: http://158.108.194.8:3000/admin-reset-password/${resetToken}`,
        };

        transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ Error: "Failed to send password reset email" });
            } else {
                console.log(`Password reset email sent to: ${admin.Admin_Email}`);
                res.json({ Success: "Password reset email sent" });
            }
        });

        const adminToken = jwt.sign(
            {
                adminId: admin.Admin_Id,
                adminFirstName: admin.Admin_FName,
                adminLastName: admin.Admin_LName,
                adminEmail: admin.Admin_Email,
                adminUsername: admin.Admin_Username,
                adminPassword: admin.Admin_Password,
                adminTel: admin.Admin_Tel,
            },
            "jwtSecret",
            { expiresIn: "1d" }
        );

        res.cookie("adminToken", adminToken)

        res.json({ Success: "Admin logged in", token: adminToken });
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

app.get("/admin-logout", (req, res) => {
    res.clearCookie("adminToken").send();
});

export default app;