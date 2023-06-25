const { default: to } = require('await-to-js');
const User = require('../models/user');

async function fetch() {
  const data = await User.find({});
  if (data.length) {
    return data;
  } else {
    return { message: 'Data kosong' };
  }
}
async function getOne(id) {
  const data = await User.findOne({ _id: id });
  return data;
}
async function create(body) {
  let user = await User.insertMany({ ...body });
  return user;
}
async function update(body, id) {
  const data = await User.findOneAndUpdate(
    { _id: id },
    { ...body },
    {
      new: true,
    }
  );
  if (!data) {
    throw new Error('Data tidak ditemukan')
  }
  return data;
}
async function destroy(id) {
  const data = await User.findOneAndDelete({ _id: id });
  if (!data) {
    throw new Error('Data tidak ditemukan')
  }
  return data;
}

module.exports = {
  fetch,
  getOne,
  create,
  update,
  destroy,
};