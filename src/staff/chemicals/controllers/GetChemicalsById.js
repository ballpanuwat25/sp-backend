import Chemicals from "../models/ChemicalsModel.js";

const GetChemicalsById = async(req, res) => {
    try {
        const chemicals = await Chemicals.findOne({
            where: {
                Chem_Bottle_Id: req.params.id
            }
        });
        res.status(200).json(chemicals);
    } catch (error) {
        console.log(error.message);
    }
}

export default GetChemicalsById;