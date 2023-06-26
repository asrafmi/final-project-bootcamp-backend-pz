const productExample = require('../../src/bin/example/products.json');
const Product = require('../../src/models/product');

const productExamples = productExample;

const seedProduct = async () => {
  try {
    await Product.insertMany(productExample);
  } catch (e) {
    throw new Error(e.message);
  }
  return Promise.resolve(productExample);
};

const truncateProduct = async () => {
  try {
    await Product.deleteMany({});
  } catch (e) {
    throw new Error(e.message);
  }
  return Promise.resolve('deleted');
};

module.exports = {
  productExamples,
  seedProduct,
  truncateProduct
};
