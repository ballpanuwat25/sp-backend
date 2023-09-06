import { Sequelize } from "sequelize";

const db = new Sequelize('specialproject', '472xknavxg70ozh51zee', 'pscale_pw_qn6Wj8TOyfkeMdImKnu7F7mZ6myxx0m5tBzyYq8COpl',{
    host: 'aws.connect.psdb.cloud',
    dialect: 'mysql'
});

export default db;