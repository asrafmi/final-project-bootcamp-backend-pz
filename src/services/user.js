const { default: to } = require('await-to-js');
const { v4: uuidv4 } = require('uuid');
const { generateToken } = require('../../config/jwtToken');
const User = require('../models/user');
const Product = require('../models/product');
const { default: mongoose } = require('mongoose');

async function fetch() {
  const data = await User.find({});
  if (data.length) {
    return data;
  } else {
    return { message: 'Data user kosong' };
  }
}

async function getOne(id) {
  const data = await User.findOne({ _id: id });
  if (!data) {
    throw new Error('Data user tidak ditemukan')
  }
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
    throw new Error('Email dan password user tidak benar')
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
    throw new Error('Data user tidak ditemukan')
  }
  return data;
}

async function destroy(id) {
  const data = await User.findByIdAndDelete(id);
  if (!data) {
    throw new Error('Data user tidak ditemukan')
  }
  return data;
}

async function createOrder(productId, userId) {
  const [errOrder, dataOrder] = await to(Product.findOne({ _id: productId }))
  if (errOrder) {
    throw new Error('Produk tidak ditemukan')
  }
  const orderId = uuidv4();
  const { _id, ...rest } = dataOrder.toObject();
  const orderItem = { ...rest, orderId };

  const [errUpdateUserOrder, updateUserOrder] = await to(User.findByIdAndUpdate(userId, {
    $push: {
      order: orderItem
    },
  }))
  if (errUpdateUserOrder) {
    throw new Error('Terjadi kesalahannnnn')
  }
  const [errUpdateProductQuantity, updateProductQuantity] = await to(Product.findByIdAndUpdate(productId, {
    $inc: {
      terjual: 1,
      persediaan: -1
    },
  }))
  if (errUpdateProductQuantity) {
    throw new Error('Terjadi kesalahan')
  }
  const p = []
  p.push(updateUserOrder)
  p.push(updateProductQuantity)
  const data = await Promise.all(p)

  return data
}

async function removeOrder(productId, userId, orderId) {
  const [errUpdateUserOrder, removeUserOrder] = await to(User.findByIdAndUpdate(userId, {
    $pull: {
      order: { orderId }
    },
  }))

  if (errUpdateUserOrder) {
    throw new Error('Terjadi kesalahannnnn')
  }

  const [errUpdateProductQuantity, updateProductQuantity] = await to(Product.findByIdAndUpdate(productId, {
    $inc: {
      terjual: -1,
      persediaan: 1
    },
  }))

  if (errUpdateProductQuantity) {
    throw new Error('Terjadi kesalahan')
  }

  const p = []
  p.push(removeUserOrder)
  p.push(updateProductQuantity)
  const data = await Promise.all(p)

  return data
}

module.exports = {
  fetch,
  getOne,
  login,
  create,
  update,
  destroy,
  createOrder,
  removeOrder
};