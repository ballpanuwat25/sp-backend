import EquipmentRequest from "../models/EquipmentRequestModel.js";

const DeleteEquipmentRequest = async(req, res) => {
    try {
        await EquipmentRequest.destroy({
            where: {
                Equipment_Request_Id: req.params.id
            }
        });
        res.status(200).json({msg: "Equipment Request Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}

export default DeleteEquipmentRequest;