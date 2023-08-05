import EquipmentCategory from "../models/EquipmentCategoryModel.js";

const DeleteEquipmentCategory = async(req, res) => {
    try {
        await EquipmentCategory.destroy({
            where: {
                Equipment_Category_Id: req.params.id
            }
        });
        res.status(200).json({msg: "EquipmentCategory Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}

export default DeleteEquipmentCategory;