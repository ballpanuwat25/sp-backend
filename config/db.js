import { Sequelize } from 'sequelize';

const db = new Sequelize('specialproject', '472xknavxg70ozh51zee', 'pscale_pw_qn6Wj8TOyfkeMdImKnu7F7mZ6myxx0m5tBzyYq8COpl', {
    host: 'aws.connect.psdb.cloud',
    dialect: 'mysql',
    dialectOptions: {
        ssl: 'Amazon RDS', 
    },
    ssl: true,
});

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

export default db;
