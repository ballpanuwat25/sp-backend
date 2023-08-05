import Teacher from "../models/TeacherModel.js";

const GetTeachers = async(req, res) => {
    try {
        const staffs = await Teacher.findAll();
        res.status(200).json(staffs);
    } catch (error) {
        console.log(error.message);
    }
}

export default GetTeachers;