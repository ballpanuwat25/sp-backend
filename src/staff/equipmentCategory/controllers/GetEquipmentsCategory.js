import EquipmentCategory from "../models/EquipmentCategoryModel.js";

const GetEquipmentsCategory = async(req, res) => {
    try {
        const equipment = await EquipmentCategory.findAll();
        res.status(200).json(equipment);
    } catch (error) {
        console.log(error.message);
    }
}

export default GetEquipmentsCategory;