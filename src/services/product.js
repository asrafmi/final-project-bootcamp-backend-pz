const Product = require('../models/product');

async function fetch() {
  const data = await Product.find({});
  if (data.length) {
    return data;
  } else {
    return { message: 'Data kosong' };
  }
}
async function getOne(id) {
  const data = await Product.findOne({ _id: id });
  return data;
}
async function create(body) {
  let product = Product.create({ ...body });
  return product;
}
async function update(body, id) {
  const data = await Product.findOneAndUpdate(
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
  const data = await Product.findOneAndDelete({ _id: id });
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