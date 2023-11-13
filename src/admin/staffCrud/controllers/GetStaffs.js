import Staff from "../models/StaffModel.js";

const GetStaffs = async(req, res) => {
    try {
        const staffs = await Staff.findAll();
        res.status(200).json(staffs);
    } catch (error) {
        console.log(error.message);
    }
}

export default GetStaffs;