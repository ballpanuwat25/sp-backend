import { Sequelize } from "sequelize";

const db = new Sequelize('bs9ssq5ixcbio4pdec3s', 'up4j6tz34shhjklb', 'BaQCmWDsJNjzdClEdW0O',{
    host: 'bs9ssq5ixcbio4pdec3s-mysql.services.clever-cloud.com',
    dialect: 'mysql'
});

export default db;