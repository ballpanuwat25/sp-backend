import Student from "../models/StudentModel.js";

const DeleteStudent = async(req, res) => {
    try {
        await Student.destroy({
            where: {
                Student_Id: req.params.id
            }
        });
        res.status(200).json({msg: "Student Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}

export default DeleteStudent;