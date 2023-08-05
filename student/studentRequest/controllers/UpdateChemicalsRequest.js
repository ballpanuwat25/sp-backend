import ChemicalsRequest from "../models/ChemicalsRequestModel.js";

const UpdateChemicalsRequest = async(req, res) => {
    try {
        await ChemicalsRequest.update(req.body, {
            where: {
                Chem_Request_Id: req.params.id
            }
        });
        res.status(200).json({msg: "Chemicals Request Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export default UpdateChemicalsRequest;