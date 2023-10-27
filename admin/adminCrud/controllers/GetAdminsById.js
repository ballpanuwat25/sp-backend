import Admin from "../models/AdminModel.js";

const GetAdminsById = async(req, res) => {
    try {
        const admin = await Admin.findOne({
            where: {
                Admin_Id: req.params.id
            }
        });
        res.status(200).json(admin);
    } catch (error) {
        console.log(error.message);
    }
}

export default GetAdminsById;