import Chemicals from "../models/ChemicalsModel.js";

const CreateChemicals = async(req, res) => {
    try {
        await Chemicals.create(req.body);
        res.status(201).json({msg: "Chemicals Created"});
    } catch (error) {
        console.log(error.message);
    }
}

export default CreateChemicals;