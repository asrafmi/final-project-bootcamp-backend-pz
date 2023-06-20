const mongoose = require('mongoose');
const config = require('../../config/config')

async function connect() {
  try {
    await mongoose.connect(config.dbUrl, { authSource: 'admin' });
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}
module.exports = connect;