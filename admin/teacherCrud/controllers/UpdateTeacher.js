import Teacher from "../models/TeacherModel.js";
import { Op } from "sequelize";

const UpdateTeacher = async (req, res) => {
    try {
        const updatedTeacher = req.body;
        const teacherId = req.params.id;

        // Check if the updated username already exists in the database
        const existingTeacher = await Teacher.findOne({
            where: {
                Teacher_Username: updatedTeacher.Teacher_Username,
                Teacher_Id: { [Op.not]: teacherId } // Exclude the current teacher by ID
            }
        });

        if (existingTeacher) {
            // Username already exists, send an error response
            res.status(400).json({ error: "Username already exists" });
        } else {
            // Username is unique, proceed with the update operation
            await Teacher.update(updatedTeacher, {
                where: {
                    Teacher_Id: teacherId
                }
            });
            res.status(200).json({ msg: "Teacher Updated" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export default UpdateTeacher;
