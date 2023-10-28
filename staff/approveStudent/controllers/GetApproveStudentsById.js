import ApproveStudent from "../models/ApproveStudentModel.js";

const GetApproveStudentsById = async(req, res) => {
    try {
        const approveStudents = await ApproveStudent.findAll({
            where: {
                Student_Id: req.params.id
            }
        });
        res.status(200).json(approveStudents);
    } catch (error) {
        console.log(error.message);
    }
}

export default GetApproveStudentsById;