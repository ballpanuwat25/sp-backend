import Equipment from "../models/EquipmentModel.js";

const CreateEquipment = async(req, res) => {
    try {
        await Equipment.create(req.body);
        res.status(201).json({msg: "Equipment Created"});
    } catch (error) {
        console.log(error.message);
    }
}

export default CreateEquipment;