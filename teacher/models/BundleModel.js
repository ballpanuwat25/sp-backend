import { Sequelize } from "sequelize";
import db from "../../config/db.js"

const { DataTypes } = Sequelize;

const BundleModel = db.define('bundle', {
    Bundle_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    Bundle_Name: DataTypes.STRING,
    Bundle_Description: DataTypes.STRING,
    Chem_Id: {
        type: DataTypes.STRING,
        foreignKey: true,
    },
    Equipment_Id: {
        type: DataTypes.STRING,
        foreignKey: true,
    },
    Requested_Quantity: DataTypes.FLOAT,
    Counting_Unit: DataTypes.STRING,
    Request_Purpose: DataTypes.STRING,
    Request_Room: DataTypes.STRING,
    Teacher_Id: {
        type: DataTypes.STRING,
        foreignKey: true,
    },
}, {
    freezeTableName: true
});

export default BundleModel;

(async () => {
    await db.sync();
})();