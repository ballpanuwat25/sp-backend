import Teacher from "../models/TeacherModel.js";

const UpdateTeacher = async(req, res) => {
    try {
        await Teacher.update(req.body, {
            where: {
                Teacher_Id: req.params.id
            }
        });
        res.status(200).json({msg: "Teacher Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export default UpdateTeacher;