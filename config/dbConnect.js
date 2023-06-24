const mongoose = require('mongoose');

async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, { authSource: 'admin' });
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Database Error");
    throw new Error(error.message);
  }
}
module.exports = dbConnect;