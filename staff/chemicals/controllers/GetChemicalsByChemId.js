import Chemicals from "../models/ChemicalsModel.js";

const GetChemicalsByChemId = async(req, res) => {
    try {
        const chemicals = await Chemicals.findAll({
            where: {
                Chem_Id: req.params.id
            }
        });
        res.status(200).json(chemicals);
    } catch (error) {
        console.log(error.message);
    }
}

export default GetChemicalsByChemId;