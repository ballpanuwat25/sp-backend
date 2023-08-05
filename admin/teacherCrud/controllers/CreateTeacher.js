import Teacher from "../models/TeacherModel.js";

const CreateTeacher = async(req, res) => {
    try {
        await Teacher.create(req.body);
        res.status(201).json({msg: "Teacher Created"});
    } catch (error) {
        console.log(error.message);
    }
}

export default CreateTeacher;