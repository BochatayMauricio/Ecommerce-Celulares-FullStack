import { config } from 'dotenv';
import { Sequelize } from 'sequelize';

config();
const sequelize = new Sequelize(
  process.env.DB_NAME||'root',process.env.DB_USER||'root',process.env.DB_PASSWORD||'root', {
  host:process.env.DB_HOST || 'localhost',
  dialect: 'mysql'
})

async function testConection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConection();

export default sequelize;