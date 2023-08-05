import Teacher from "../models/TeacherModel.js";

const GetTeachersById = async(req, res) => {
    try {
        const staff = await Teacher.findOne({
            where: {
                Teacher_Id: req.params.id
            }
        });
        res.status(200).json(staff);
    } catch (error) {
        console.log(error.message);
    }
}

export default GetTeachersById;