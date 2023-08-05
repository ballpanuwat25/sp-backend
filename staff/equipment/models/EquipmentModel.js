import { Sequelize } from "sequelize";
import db from "../../../config/db.js"

const { DataTypes } = Sequelize;

const EquipmentModel = db.define('equipment', {
    Equipment_Id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    Equipment_Category_Id: {
        type: DataTypes.STRING,
        allowNull: false,
        foreignKey: true,
    },
    Equipment_Name: DataTypes.STRING,
    Quantity: DataTypes.INTEGER,
    Location: DataTypes.STRING,
    Price: DataTypes.FLOAT,
}, {
    freezeTableName: true
});

export default EquipmentModel;

(async() => {
    await db.sync();
})();