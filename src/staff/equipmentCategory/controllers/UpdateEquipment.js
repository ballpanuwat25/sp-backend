import EquipmentCategory from "../models/EquipmentCategoryModel.js";

const UpdateEquipmentCategory = async(req, res) => {
    try {
        await EquipmentCategory.update(req.body, {
            where: {
                Equipment_Category_Id: req.params.id
            }
        });
        res.status(200).json({msg: "EquipmentCategory Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export default UpdateEquipmentCategory;