import Staff from "../models/StaffModel.js";

const GetStaffsById = async(req, res) => {
    try {
        const staff = await Staff.findOne({
            where: {
                Staff_Id: req.params.id
            }
        });
        res.status(200).json(staff);
    } catch (error) {
        console.log(error.message);
    }
}

export default GetStaffsById;