import Student from "../models/StudentModel.js";

const GetStudents = async(req, res) => {
    try {
        const students = await Student.findAll();
        res.status(200).json(students);
    } catch (error) {
        console.log(error.message);
    }
}

export default GetStudents;