import EquipmentRequest from "../models/EquipmentRequestModel.js";

const CreateEquipmentRequest = async(req, res) => {
    try {
        await EquipmentRequest.create(req.body);
        res.status(201).json({msg: "Equipment Request Created"});
    } catch (error) {
        console.log(error.message);
    }
}

export default CreateEquipmentRequest;