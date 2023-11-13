import Equipment from "../models/EquipmentModel.js";

const GetEquipments = async(req, res) => {
    try {
        const equipment = await Equipment.findAll();
        res.status(200).json(equipment);
    } catch (error) {
        console.log(error.message);
    }
}

export default GetEquipments;