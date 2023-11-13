import Student from "../models/StudentModel.js";

const updateStudent = async(req, res) => {
    try {
        await Student.update(req.body, {
            where: {
                Student_Id: req.params.id
            }
        });
        res.status(200).json({msg: "Student Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export default updateStudent;