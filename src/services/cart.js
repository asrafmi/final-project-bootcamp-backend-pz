const Cart = require('../models/cart');
const Product = require('../models/product')

async function fetch(page, limit) {
  const totalItems = await Cart.countDocuments({});
  const totalPages = Math.ceil(totalItems / limit);

  const data = await Cart.find({})
    .skip((page - 1) * limit)
    .limit(limit);

  if (data.length) {
    return { data, totalPages, totalItems };
  } else {
    return { message: 'Produk kosong', totalPages, totalItems };
  }
}

async function create(id) {
  let product = await Product.findOne({ _id: id })
  if (!product) {
    throw new Error('Produk tidak ditemukan')
  }

  console.log('product', product);
  let object = {}
  object.product = product
  // to do masukkan produk ke keranjang
  let cart = Cart.create({ products: [object] });
  return cart;
}

async function destroy(id) {
  const data = await Cart.findByIdAndDelete(id);
  if (!data) {
    throw new Error('Produk tidak ditemukan')
  }
  return data;
}

module.exports = {
  fetch,
  create,
  destroy,
};