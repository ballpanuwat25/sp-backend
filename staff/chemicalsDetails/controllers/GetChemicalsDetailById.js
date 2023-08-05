import ChemicalsDetail from "../models/ChemicalsDetailModel.js";

const GetChemicalsDetailById = async(req, res) => {
    try {
        const chemicalsdetail = await ChemicalsDetail.findOne({
            where: {
                Chem_Id: req.params.id
            }
        });
        res.status(200).json(chemicalsdetail);
    } catch (error) {
        console.log(error.message);
    }
}

export default GetChemicalsDetailById;