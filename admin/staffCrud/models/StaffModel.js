import { Sequelize } from "sequelize";
import db from "../../../config/db.js"

const { DataTypes } = Sequelize;

const StaffModel = db.define('staff', {
    Staff_Id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    Staff_FName: DataTypes.STRING,
    Staff_LName: DataTypes.STRING,
    Staff_Username: DataTypes.STRING,
    Staff_Password: DataTypes.STRING,
    Staff_Tel: DataTypes.STRING
}, {
    freezeTableName: true
});

export default StaffModel;

(async() => {
    await db.sync();
})();