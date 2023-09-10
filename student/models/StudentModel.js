import { Sequelize } from "sequelize";
import db from "../../config/db.js"

const { DataTypes } = Sequelize;

const StudentModel = db.define('student', {
    Student_Id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    Student_FName: DataTypes.STRING,
    Student_LName: DataTypes.STRING,
    Student_Email: DataTypes.STRING,
    Student_Password: DataTypes.STRING,
    Student_Tel: DataTypes.STRING
}, {
    freezeTableName: true,
    timestamps: false
});

export default StudentModel;

(async() => {
    await db.sync();
})();