import Student from "../models/StudentModel.js";

const CreateStudent = async (req, res) => {
    try {
        // Check if the username already exists in the database
        const existingStudent = await Student.findOne({
            where: {
                Student_Id: req.body.Student_Id
            }
        });

        if (existingStudent) {
            res.status(400).json({ error: "Student id already exists" });
        } else {
            await Student.create(req.body);
            res.status(201).json({ msg: "Student Created" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export default CreateStudent;