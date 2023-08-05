import Equipment from "../models/EquipmentModel.js";

const GetEquipmentsById = async(req, res) => {
    try {
        const equipment = await Equipment.findOne({
            where: {
                Equipment_Id: req.params.id
            }
        });
        res.status(200).json(equipment);
    } catch (error) {
        console.log(error.message);
    }
}

export default GetEquipmentsById;