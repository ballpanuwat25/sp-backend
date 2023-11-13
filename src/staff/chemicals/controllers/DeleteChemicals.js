import Chemicals from "../models/ChemicalsModel.js";

const DeleteChemicals = async(req, res) => {
    try {
        await Chemicals.destroy({
            where: {
                Chem_Bottle_Id: req.params.id
            }
        });
        res.status(200).json({msg: "Chemicals Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}

export default DeleteChemicals;