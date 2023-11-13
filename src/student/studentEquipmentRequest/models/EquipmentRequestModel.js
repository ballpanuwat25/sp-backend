import { Sequelize } from "sequelize";
import db from "../../../config/db.js"

const { DataTypes } = Sequelize;

const EquipmentRequestModel = db.define('equipment_request', {
    Equipment_Request_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    Student_Id: {
        type: DataTypes.STRING,
        allowNull: false,
        foreignKey: true,
    },
    Equipment_Id: {
        type: DataTypes.STRING,
        allowNull: false,
        foreignKey: true,
    },
    Equipment_Category_Id: {
        type: DataTypes.STRING,
        foreignKey: true,
    },
    Requested_Quantity: DataTypes.FLOAT,
    Release_Quantity: DataTypes.FLOAT,
    Staff_Id: {
        type: DataTypes.STRING,
        foreignKey: true,
    },
    Teacher_Id: {
        type: DataTypes.STRING,
        foreignKey: true,
    },
    Request_Status: DataTypes.STRING,
    Request_Comment: DataTypes.STRING,
    Request_Purpose: DataTypes.STRING,
    Request_Room: DataTypes.STRING,
}, {
    freezeTableName: true
});

export default EquipmentRequestModel;

(async () => {
    await db.sync();
})();