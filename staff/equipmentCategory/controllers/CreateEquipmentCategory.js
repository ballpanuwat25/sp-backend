import EquipmentCategory from "../models/EquipmentCategoryModel.js";

const CreateEquipmentCategory = async(req, res) => {
    try {
        await EquipmentCategory.create(req.body);
        res.status(201).json({msg: "EquipmentCategory Created"});
    } catch (error) {
        console.log(error.message);
    }
}

export default CreateEquipmentCategory;