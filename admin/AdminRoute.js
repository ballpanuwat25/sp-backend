import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import cors from 'cors';
import Admin from "./models/AdminModel.js"

const salt = 10;
const app = express();

app.use(
    cors({
        origin: 'https://chem-ku-kps.vercel.app',
        credentials: true,
    })
);

app.get("/admin-list", async (req, res) => {
    try {
        const admins = await Admin.findAll();
        res.status(200).json(admins);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: "Internal server error" });
    }
});

const verifyAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract the token from the Authorization header

    if (!token) {
        return res.json({ Error: "Access denied" });
    } else {
        jwt.verify(token, "jwtSecret", (err, decoded) => {
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

app.post("/admin-login", async (req, res) => {
    try {
        const admin = await Admin.findOne({
            where: { Admin_Username: req.body.Admin_Username },
        });

        if (!admin) {
            return res.status(404).json({ Error: "Username does not exist" });
        }

        const passwordMatch = await bcrypt.compare(
            req.body.Admin_Password,
            admin.Admin_Password
        );

        if (!passwordMatch) {
            return res.status(401).json({ Error: "Password is incorrect" });
        }

        const adminToken = jwt.sign(
            {
                adminName: admin.Admin_Name,
                adminUsername: admin.Admin_Username,
                adminPassword: admin.Admin_Password,
                adminTel: admin.Admin_Tel,
            },
            "jwtSecret",
            { expiresIn: "1d" }
        );

        // Set the cookie without HttpOnly attribute
        res.cookie("adminToken", adminToken);

        // Send a success response
        res.json({ Success: "Login successful", token: adminToken });

    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: "Internal server error" });
    }
});

app.post("/admin-register", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.Admin_Password, salt);
        await Admin.create({
            Admin_Name: req.body.Admin_Name,
            Admin_Username: req.body.Admin_Username,
            Admin_Password: hashedPassword,
            Admin_Tel: req.body.Admin_Tel,
        });
        res.status(201).send("Admin registered successfully");
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: "Internal server error" });
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

        if (req.body.Admin_Password.length < 8) {
            return res
                .status(400)
                .json({ Error: "Password must be at least 8 characters" });
        }

        const hashedPassword = await bcrypt.hash(req.body.Admin_Password, salt);
        await admin.update({ Admin_Password: hashedPassword });
        res.send("Password updated successfully");
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: "Internal server error" });
    }
});


app.get("/admin-logout", (req, res) => {
    res.clearCookie("adminToken").send();
});

export default app;
