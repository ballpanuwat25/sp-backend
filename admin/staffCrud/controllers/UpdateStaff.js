import Staff from "../models/StaffModel.js";

const UpdateStaff = async(req, res) => {
    try {
        await Staff.update(req.body, {
            where: {
                Staff_Id: req.params.id
            }
        });
        res.status(200).json({msg: "Staff Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export default UpdateStaff;