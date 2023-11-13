import Admin from "../models/AdminModel.js";

const DeleteAdmin = async(req, res) => {
    try {
        await Admin.destroy({
            where: {
                Admin_Id: req.params.id
            }
        });
        res.status(200).json({msg: "Admin Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}

export default DeleteAdmin;