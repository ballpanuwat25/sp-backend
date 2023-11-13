import ChemicalsDetail from "../models/ChemicalsDetailModel.js";

const UpdateChemicalsDetail = async(req, res) => {
    try {
        await ChemicalsDetail.update(req.body, {
            where: {
                Chem_Id: req.params.id
            }
        });
        res.status(200).json({msg: "ChemicalsDetail Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export default UpdateChemicalsDetail;