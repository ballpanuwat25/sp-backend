import ChemicalsRequest from "../models/ChemicalsRequestModel.js";

const GetChemicalsRequestById = async(req, res) => {
    try {
        const chemicalsRequest = await ChemicalsRequest.findOne({
            where: {
                Chem_Request_Id: req.params.id
            }
        });
        res.status(200).json(chemicalsRequest);
    } catch (error) {
        console.log(error.message);
    }
}

export default GetChemicalsRequestById;