import Admin from "../models/AdminModel.js";

const GetAdmins = async(req, res) => {
    try {
        const admins = await Admin.findAll();
        res.status(200).json(admins);
    } catch (error) {
        console.log(error.message);
    }
}

export default GetAdmins;