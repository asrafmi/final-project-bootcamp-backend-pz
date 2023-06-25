const { generateToken } = require('../../config/jwtToken');
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
  let { email, mobile } = body;
  let cariUser = await User.findOne({ email })
  let cariMobile = await User.findOne({ mobile })
  if (cariUser) {
    throw new Error('Email sudah terdaftar')
  }
  if (cariMobile) {
    throw new Error('Mobile phone sudah terdaftar')
  }
  let user = await User.create({ ...body });
  return user;
}
async function login(body) {
  let { email, password } = body;
  let cariUser = await User.findOne({ email })
  if (cariUser && (await cariUser.isPasswordMatched(password))) {
    return {
      token: generateToken(cariUser._id),
    }
  } else {
    throw new Error('Email dan password tidak benar')
  }
}
async function update(body, id) {
   const data = await User.findByIdAndUpdate(
    id,
    { 
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email,
      mobile: body.mobile,
    },
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
  const data = await User.findByIdAndDelete(id);
  if (!data) {
    throw new Error('Data tidak ditemukan')
  }
  return data;
}

module.exports = {
  fetch,
  getOne,
  login,
  create,
  update,
  destroy,
};