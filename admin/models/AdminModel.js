import { Sequelize } from "sequelize";
import db from "../../config/db.js"

const { DataTypes } = Sequelize;

const AdminModel = db.define('admin', {
    Admin_Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Set auto-increment to true for the primary key
    },
    Admin_Name: DataTypes.STRING,
    Admin_Username: DataTypes.STRING,
    Admin_Password: DataTypes.STRING,
    Admin_Tel: DataTypes.STRING,

}, {
    freezeTableName: true,
    timestamps: false
});

export default AdminModel;

(async () => {
    await db.sync();
})();