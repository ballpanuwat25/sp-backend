import ChemicalsRequest from "../models/ChemicalsRequestModel.js";

const CreateChemicalsRequest = async(req, res) => {
    try {
        await ChemicalsRequest.create(req.body);
        res.status(201).json({msg: "Chemicals Request Created"});
    } catch (error) {
        console.log(error.message);
    }
}

export default CreateChemicalsRequest;