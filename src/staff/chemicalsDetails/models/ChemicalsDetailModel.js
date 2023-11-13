import { Sequelize } from "sequelize";
import db from "../../../config/db.js"

const { DataTypes } = Sequelize;

const ChemicalsDetailModel = db.define('chemicals_detail', {
    Chem_Id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    Chem_Name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Chem_CAS: DataTypes.STRING,
    Chem_UN: DataTypes.STRING,
    Chem_Type: DataTypes.STRING,
    Chem_Grade: DataTypes.STRING,
    Chem_State: DataTypes.STRING,
    Chem_MSDS: DataTypes.STRING,
    Chem_GHS: DataTypes.STRING,
}, {
    freezeTableName: true
});

export default ChemicalsDetailModel;

(async () => {
    await db.sync();
})();