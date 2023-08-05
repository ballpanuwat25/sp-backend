import Equipment from "../models/EquipmentModel.js";

const DeleteEquipment = async(req, res) => {
    try {
        await Equipment.destroy({
            where: {
                Equipment_Id: req.params.id
            }
        });
        res.status(200).json({msg: "Equipment Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}

export default DeleteEquipment;