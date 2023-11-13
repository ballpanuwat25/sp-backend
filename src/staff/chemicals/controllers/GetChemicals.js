import Chemicals from "../models/ChemicalsModel.js";

const GetChemicals = async(req, res) => {
    try {
        const chemicals = await Chemicals.findAll();
        res.status(200).json(chemicals);
    } catch (error) {
        console.log(error.message);
    }
}

export default GetChemicals;