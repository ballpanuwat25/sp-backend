import EquipmentCategory from "../models/EquipmentCategoryModel.js";

const GetEquipmentsCategoryById = async(req, res) => {
    try {
        const equipmentCategory = await EquipmentCategory.findOne({
            where: {
                Equipment_Category_Id: req.params.id
            }
        });
        res.status(200).json(equipmentCategory);
    } catch (error) {
        console.log(error.message);
    }
}

export default GetEquipmentsCategoryById;