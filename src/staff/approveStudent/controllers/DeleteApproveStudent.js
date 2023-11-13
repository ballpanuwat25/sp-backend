import ApproveStudent from "../models/ApproveStudentModel.js";

const DeleteApproveStudent = async(req, res) => {
    try {
        await ApproveStudent.destroy({
            where: {
                Student_Id: req.params.id
            }
        });
        res.status(200).json({msg: "Student Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}

export default DeleteApproveStudent;