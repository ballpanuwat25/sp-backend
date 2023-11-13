import ApproveStudent from "../models/ApproveStudentModel.js";

const CreateApproveStudent = async(req, res) => {
    try {
        const existingApproveStudent = await ApproveStudent.findOne({
            where: {
                Student_Id: req.body.Student_Id
            }
        });

        if (existingApproveStudent) {
            res.status(400).json({ error: "Student id already exists" });
        } else {
            await ApproveStudent.create(req.body);
            res.status(201).json({ msg: "Student Created" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export default CreateApproveStudent;