import { Sequelize } from "sequelize";
import db from "../../../config/db.js"

const { DataTypes } = Sequelize;

const AdminModel = db.define('admin', {
    Admin_Id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    Admin_FName: DataTypes.STRING,
    Admin_LName: DataTypes.STRING,
    Admin_Email: DataTypes.STRING,
    Admin_Username: DataTypes.STRING,
    Admin_Password: DataTypes.STRING,
    Admin_Tel: DataTypes.STRING
}, {
    freezeTableName: true,
});

export default AdminModel;

(async () => {
    await db.sync();
})();