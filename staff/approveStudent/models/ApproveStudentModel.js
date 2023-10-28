import { Sequelize } from "sequelize";
import db from "../../../config/db.js"

const { DataTypes } = Sequelize;

const ApproveStudentModel = db.define('approve_student', {
    AStudent_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    Student_Id:{
        type: DataTypes.STRING,
        allowNull: false,
        foreignKey: true,
    },
    Student_FName: DataTypes.STRING,
    Student_LName: DataTypes.STRING,
    Student_Email: DataTypes.STRING,
    Student_Password: DataTypes.STRING,
    Student_Tel: DataTypes.STRING
}, {
    freezeTableName: true,
});

export default ApproveStudentModel;

(async() => {
    await db.sync();
})();