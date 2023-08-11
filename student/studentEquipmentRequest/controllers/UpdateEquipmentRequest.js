import EquipmentRequest from "../models/EquipmentRequestModel.js";

const UpdateEquipmentRequest = async(req, res) => {
    try {
        await EquipmentRequest.update(req.body, {
            where: {
                Equipment_Request_Id: req.params.id
            }
        });
        res.status(200).json({msg: "Equipment Request Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export default UpdateEquipmentRequest;