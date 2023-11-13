import EquipmentRequest from "../models/EquipmentRequestModel.js";

const GetEquipmentRequest = async(req, res) => {
    try {
        const equipmentRequest = await EquipmentRequest.findAll();
        res.status(200).json(equipmentRequest);
    } catch (error) {
        console.log(error.message);
    }
}

export default GetEquipmentRequest;