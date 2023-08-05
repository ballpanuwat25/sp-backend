import Teacher from "../models/TeacherModel.js";

const DeleteTeacher = async(req, res) => {
    try {
        await Teacher.destroy({
            where: {
                Teacher_Id: req.params.id
            }
        });
        res.status(200).json({msg: "Teacher Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}

export default DeleteTeacher;