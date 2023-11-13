import ChemicalsRequest from "../models/ChemicalsRequestModel.js";

const GetChemicalsRequest = async(req, res) => {
    try {
        const chemicalsRequest = await ChemicalsRequest.findAll();
        res.status(200).json(chemicalsRequest);
    } catch (error) {
        console.log(error.message);
    }
}

export default GetChemicalsRequest;