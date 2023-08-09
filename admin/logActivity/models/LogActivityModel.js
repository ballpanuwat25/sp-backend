import { Sequelize } from "sequelize";
import db from "../../../config/db.js"

const { DataTypes } = Sequelize;

const LogActivityModel = db.define('log_activity', {
    LogActivity_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    LogActivity_Name: DataTypes.STRING,
    Chem_Id: DataTypes.STRING,
    Equipment_Id: DataTypes.STRING,
    Staff_Id: DataTypes.STRING,
}, {
    freezeTableName: true
});

export default LogActivityModel;

(async() => {
    await db.sync();
})();