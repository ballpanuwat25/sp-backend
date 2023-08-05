import { Sequelize } from "sequelize";
import db from "../../../config/db.js"

const { DataTypes } = Sequelize;

const EquipmentCategoryModel = db.define('equipment_category', {
    Equipment_Category_Id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    Equipment_Category_Name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    freezeTableName: true
});

export default EquipmentCategoryModel;

(async() => {
    await db.sync();
})();