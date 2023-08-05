import Equipment from "../models/EquipmentModel.js";

const UpdateEquipment = async(req, res) => {
    try {
        await Equipment.update(req.body, {
            where: {
                Equipment_Id: req.params.id
            }
        });
        res.status(200).json({msg: "Equipment Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export default UpdateEquipment;