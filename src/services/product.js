const Product = require('../models/product');

async function fetch(page, limit) {
  const totalItems = await Product.countDocuments({});
  const totalPages = Math.ceil(totalItems / limit);

  const data = await Product.find({})
    .skip((page - 1) * limit)
    .limit(limit);

  if (data.length) {
    return { data, totalPages, totalItems };
  } else {
    return { message: 'Produk kosong', totalPages, totalItems };
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