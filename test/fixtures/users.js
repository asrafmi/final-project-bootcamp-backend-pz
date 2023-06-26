const usersExample = require('../../src/bin/example/user.json');
const User = require('../../src/models/user');

const usersExamples = usersExample;

const seedUser = async () => {
  try {
    await User.insertMany(usersExamples);
  } catch (e) {
    throw new Error(e.message);
  }
  return Promise.resolve(usersExamples);
};

const truncateUser = async () => {
  try {
    await User.deleteMany({});
  } catch (e) {
    throw new Error(e.message);
  }
  return Promise.resolve('deleted');
};

module.exports = {
  usersExamples,
  seedUser,
  truncateUser
};
