import ApproveStudent from "../models/ApproveStudentModel.js";

const GetApproveStudents = async(req, res) => {
    try {
        const approveStudents = await ApproveStudent.findAll();
        res.status(200).json(approveStudents);
    } catch (error) {
        console.log(error.message);
    }
}

export default GetApproveStudents;