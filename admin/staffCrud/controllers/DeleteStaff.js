import Staff from "../models/StaffModel.js";

const DeleteStaff = async(req, res) => {
    try {
        await Staff.destroy({
            where: {
                Staff_Id: req.params.id
            }
        });
        res.status(200).json({msg: "Staff Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}

export default DeleteStaff;