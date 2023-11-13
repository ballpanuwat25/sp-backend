import ChemicalsDetail from "../models/ChemicalsDetailModel.js";

const CreateChemicalsDetail = async(req, res) => {
    try {
        await ChemicalsDetail.create(req.body);
        res.status(201).json({msg: "ChemicalsDetail Created"});
    } catch (error) {
        console.log(error.message);
    }
}

export default CreateChemicalsDetail;