import Admin from "../models/AdminModel.js";

const CreateAdmin = async(req, res) => {
    try {
        const existingAdmin = await Admin.findOne({
            where: {
                Admin_Username: req.body.Admin_Username
            }
        });

        if (existingAdmin) {
            res.status(400).json({ error: "Username already exists" });
        } else {
            await Admin.create(req.body);
            res.status(201).json({ msg: "Admin Created" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export default CreateAdmin;