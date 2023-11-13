import ChemicalsDetail from "../models/ChemicalsDetailModel.js";

const DeleteChemicalsDetail = async(req, res) => {
    try {
        await ChemicalsDetail.destroy({
            where: {
                Chem_Id: req.params.id
            }
        });
        res.status(200).json({msg: "ChemicalsDetail Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}

export default DeleteChemicalsDetail;