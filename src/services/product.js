const Product = require('../models/product');

async function fetch() {
  const data = await Product.find({});
  if (data.length) {
    return data;
  } else {
    return { message: 'Produk kosong' };
  }
}
async function getOne(id) {
  const data = await Product.findOne({ _id: id });
  if (!data) {
    throw new Error('Produk tidak ditemukan')
  }
  return data;
}
async function create(body) {
  let product = Product.create({ ...body });
  return product;
}
async function update(body, id) {
  const data = await Product.findByIdAndUpdate(
    id,
    { ...body },
    {
      new: true,
    }
  );
  if (!data) {
    throw new Error('Produk tidak ditemukan')
  }
  return data;
}
async function destroy(id) {
  const data = await Product.findByIdAndDelete(id);
  if (!data) {
    throw new Error('Produk tidak ditemukan')
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