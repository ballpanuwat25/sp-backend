import Staff from "../models/StaffModel.js";
import { Op } from "sequelize";

const UpdateStaff = async (req, res) => {
    try {
        const updatedStaff = req.body;
        const staffId = req.params.id;

        // Check if the updated username already exists in the database
        const existingStaff = await Staff.findOne({
            where: {
                Staff_Username: updatedStaff.Staff_Username,
                Staff_Id: { [Op.not]: staffId } // Exclude the current staff by ID
            }
        });

        if (existingStaff) {
            // Username already exists, send an error response
            res.status(400).json({ error: "Username already exists" });
        } else {
            // Username is unique, proceed with the update operation
            await Staff.update(updatedStaff, {
                where: {
                    Staff_Id: staffId
                }
            });
            res.status(200).json({ msg: "Staff Updated" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export default UpdateStaff;
