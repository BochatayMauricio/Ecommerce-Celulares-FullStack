import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('rrhh', 'root', 'root', {
  host: 'localhost',
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