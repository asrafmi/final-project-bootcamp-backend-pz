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
  let email = body.email;
  let mobile = body.mobile;
  let cariUser = await User.findOne({email})
  let cariMobile = await User.findOne({mobile})
  if(cariUser){
    throw new Error('Email sudah terdaftar')
  }
  if(cariMobile){
    throw new Error('Mobile phone sudah terdaftar')
  }
  let user = await User.create({ ...body });
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