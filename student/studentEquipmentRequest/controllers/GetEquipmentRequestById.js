import EquipmentRequest from "../models/EquipmentRequestModel.js";

const GetEquipmentRequestById = async(req, res) => {
    try {
        const equipmentRequest = await EquipmentRequest.findOne({
            where: {
                Equipment_Request_Id: req.params.id
            }
        });
        res.status(200).json(equipmentRequest);
    } catch (error) {
        console.log(error.message);
    }
}

export default GetEquipmentRequestById;