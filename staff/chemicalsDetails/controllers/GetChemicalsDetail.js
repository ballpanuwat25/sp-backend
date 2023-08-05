import ChemicalsDetail from "../models/ChemicalsDetailModel.js";

const GetChemicalsDetail = async(req, res) => {
    try {
        const chemicalsdetail = await ChemicalsDetail.findAll();
        res.status(200).json(chemicalsdetail);
    } catch (error) {
        console.log(error.message);
    }
}

export default GetChemicalsDetail;