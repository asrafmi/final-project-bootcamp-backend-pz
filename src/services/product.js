const Product = require('../model/product');

async function fetch() {
  const data = await Product.find({});
  if (data.length) {
    return data;
  } else {
    return { message: 'data is empty' };
  }
}
async function getOne(id) {
  const data = await Product.findOne({ id });
  return data;
}
async function create(body) {
  let product = new Product({ ...body });
  product = await product.save();
  return product;
}
async function update(body, id) {
  const data = await Product.findOneAndUpdate(
    { _id: id },
    { ...body },
    {
      replace: true,
    }
  );
  return data;
}
async function destroy(id) {
  const data = await Product.findOneAndDelete({ id });
  return data;
}

module.exports = {
  fetch,
  getOne,
  create,
  update,
  destroy,
};