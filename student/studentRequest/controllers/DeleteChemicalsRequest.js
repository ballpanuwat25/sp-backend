import ChemicalsRequest from "../models/ChemicalsRequestModel.js";

const DeleteChemicalsRequest = async(req, res) => {
    try {
        await ChemicalsRequest.destroy({
            where: {
                Chem_Request_Id: req.params.id
            }
        });
        res.status(200).json({msg: "Chemicals Request Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}

export default DeleteChemicalsRequest;