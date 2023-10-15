import express from "express";
import jwt from "jsonwebtoken";

import cors from 'cors';
import Staff from "../admin/staffCrud/models/StaffModel.js"

import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';

const app = express();

app.use(
    cors({
        origin: 'https://chem-ku-kps.vercel.app',
        credentials: true,
    })
);

const verifyStaff = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const staffToken = authHeader && authHeader.split(' ')[1];
    if (!staffToken) {
        return res.json({ Error: "Access denied" });
    } else {
        jwt.verify(staffToken, "jwtSecret", (err, decoded) => {
            if (err) {
                return res.json({ Error: "Access denied" });
            } else {
                req.staffId = decoded.staffId;
                req.staffFirstName = decoded.staffFirstName;
                req.staffLastName = decoded.staffLastName;
                req.staffEmail = decoded.staffEmail;
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
        staffEmail: req.staffEmail,
        staffUsername: req.staffUsername,
        staffPassword: req.staffPassword,
        staffTel: req.staffTel,
    });
});

app.post("/staff-login", async (req, res) => {
    try {
        const staff = await Staff.findOne({
            where: { Staff_Username: req.body.Staff_Username },
        });

        if (!staff) {
            return res.status(404).json({ Error: "Username does not exist" });
        }

        if (req.body.Staff_Password !== staff.Staff_Password) {
            return res.status(401).json({ Error: "Password is incorrect" });
        }

        const staffToken = jwt.sign(
            {
                staffId: staff.Staff_Id,
                staffFirstName: staff.Staff_FName,
                staffLastName: staff.Staff_LName,
                staffEmail: staff.Staff_Email,
                staffUsername: staff.Staff_Username,
                staffPassword: staff.Staff_Password,
                staffTel: staff.Staff_Tel,
            },
            "jwtSecret",
            { expiresIn: "1d" }
        );

        res.cookie("staffToken", staffToken)

        res.json({ Success: "Staff logged in", token: staffToken });
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

app.post("/staff-register", async (req, res) => {
    try {
        await Staff.create({
            Staff_FName: req.body.Staff_FName,
            Staff_LName: req.body.Staff_LName,
            Staff_Email: req.body.Staff_Email,
            Staff_Username: req.body.Staff_Username,
            Staff_Password: req.body.Staff_Password,
            Staff_Tel: req.body.Staff_Tel,
        });
        res.send("Staff registered");
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

app.post("/staff-forget-password", async (req, res) => {
    try {
        const staff = await Staff.findOne({
            where: { Staff_Username: req.body.Staff_Username },
        });

        if (!staff) {
            return res.status(404).json({ Error: "Username does not exist" });
        }

        const resetToken = uuidv4();

        // Create a transporter using Nodemailer to send the password reset email
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'ballpanuwat25@gmail.com',
                pass: 'qmst ubhq agvs rrnh',
            },
        });

        // Define the email message
        const mailOptions = {
            from: 'ballpanuwat25@gmail.com',
            to: staff.Staff_Email,
            subject: 'Password Reset Request',
            text: `To reset your password, click the following link: https://chem-ku-kps.vercel.app/staff-reset-password/${resetToken}`,
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ Error: "Failed to send password reset email" });
            } else {
                console.log(`Password reset email sent to: ${staff.Staff_Email}`);
                res.json({ Success: "Password reset email sent" });
            }
        });

        const staffToken = jwt.sign(
            {
                staffId: staff.Staff_Id,
                staffFirstName: staff.Staff_FName,
                staffLastName: staff.Staff_LName,
                staffEmail: staff.Staff_Email,
                staffUsername: staff.Staff_Username,
                staffPassword: staff.Staff_Password,
                staffTel: staff.Staff_Tel,
            },
            "jwtSecret",
            { expiresIn: "1d" }
        );

        res.cookie("staffToken", staffToken)

        res.json({ Success: "Staff logged in", token: staffToken })
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: "Internal server error" });
    }
});

app.get("/staff-logout", (req, res) => {
    res.clearCookie("staffToken").send();
});

export default app;