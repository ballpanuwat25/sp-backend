import Admin from "../models/AdminModel.js";
import { Op } from "sequelize";

const UpdateAdmin = async(req, res) => {
    try {
        const updatedAdmin = req.body;
        const adminId = req.params.id;

        const existingAdmin = await Admin.findOne({
            where: {
                Admin_Username: updatedAdmin.Admin_Username,
                Admin_Id: { [Op.not]: adminId }
            }
        });

        if (existingAdmin) {
            res.status(400).json({ error: "Username already exists" });
        } else {
            await Admin.update(updatedAdmin, {
                where: {
                    Admin_Id: adminId
                }
            });
            res.status(200).json({ msg: "Admin Updated" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export default UpdateAdmin;