import Student from "../models/StudentModel.js";

const GetStudentsById = async(req, res) => {
    try {
        const student = await Student.findOne({
            where: {
                Student_Id: req.params.id
            }
        });
        res.status(200).json(student);
    } catch (error) {
        console.log(error.message);
    }
}

export default GetStudentsById;