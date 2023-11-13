import Chemicals from "../models/ChemicalsModel.js";

const UpdateChemicals = async(req, res) => {
    try {
        await Chemicals.update(req.body, {
            where: {
                Chem_Bottle_Id: req.params.id
            }
        });
        res.status(200).json({msg: "Chemicals Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export default UpdateChemicals;