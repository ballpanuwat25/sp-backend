import Teacher from "../models/TeacherModel.js";

const CreateTeacher = async (req, res) => {
    try {
        // Check if the username already exists in the database
        const existingTeacher = await Teacher.findOne({
            where: {
                Teacher_Username: req.body.Teacher_Username
            }
        });

        if (existingTeacher) {
            // Username already exists, send an error response
            res.status(400).json({ error: "Username already exists" });
        } else {
            // Username is unique, create the teacher
            await Teacher.create(req.body);
            res.status(201).json({ msg: "Teacher Created" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export default CreateTeacher;