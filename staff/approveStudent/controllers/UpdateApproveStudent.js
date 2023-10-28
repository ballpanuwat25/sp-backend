import ApproveStudent from "../models/ApproveStudentModel.js";

const updateApproveStudent = async(req, res) => {
    try {
        await ApproveStudent.update(req.body, {
            where: {
                Student_Id: req.params.id
            }
        });
        res.status(200).json({msg: "Student Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export default updateApproveStudent;