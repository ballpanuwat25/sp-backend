import Staff from "../models/StaffModel.js";

const CreateStaff = async(req, res) => {
    try {
        await Staff.create(req.body);
        res.status(201).json({msg: "Staff Created"});
    } catch (error) {
        console.log(error.message);
    }
}

export default CreateStaff;