import { Sequelize } from "sequelize";
import db from "../../../config/db.js"

const { DataTypes } = Sequelize;

const TeacherModel = db.define('teacher', {
    Teacher_Id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    Teacher_FName: DataTypes.STRING,
    Teacher_LName: DataTypes.STRING,
    Teacher_Username: DataTypes.STRING,
    Teacher_Password: DataTypes.STRING,
    Teacher_Tel: DataTypes.STRING
}, {
    freezeTableName: true
});

export default TeacherModel;

(async() => {
    await db.sync();
})();