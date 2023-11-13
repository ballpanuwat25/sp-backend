import { Sequelize } from "sequelize";
import db from "../../../config/db.js"

const { DataTypes } = Sequelize;

const ChemicalsModel = db.define('chemicals', {
    Chem_Bottle_Id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    Chem_Id: {
        type: DataTypes.STRING,
        allowNull: false,
        foreignKey: true,
    },
    Package_Size: DataTypes.FLOAT,
    Remaining_Quantity: DataTypes.FLOAT,
    Counting_Unit: DataTypes.STRING,
    Location: DataTypes.STRING,
    Price: DataTypes.FLOAT,
}, {
    freezeTableName: true
});

export default ChemicalsModel;

(async () => {
    await db.sync();
})();