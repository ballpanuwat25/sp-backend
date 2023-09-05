import { Sequelize } from "sequelize";

const db = new Sequelize('heroku_aaa3e2329909778', 'b31dc6ab9dc1a5', 'ab7f1437',{
    host: 'us-cdbr-east-06.cleardb.net',
    dialect: 'mysql'
});

export default db;