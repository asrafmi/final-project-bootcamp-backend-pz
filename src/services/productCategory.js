const Category = require('../models/productCategory');

async function fetch() {
  const data = await Category.find({});
  if (data.length) {
    return data;
  } else {
    return { message: 'Data kosong' };
  }
}
async function getOne(id) {
  const data = await Category.findOne({ _id: id });
  return data;
}
async function create(body) {
  let category = new Category({ ...body });
  category = await category.save();
  return category;
}
async function update(body, id) {
  const data = await Category.findOneAndUpdate(
    { _id: id },
    { ...body },
    {
      new: true,
    }
  );
  if(!data){
    throw new Error('Data tidak ditemukan')
  }
  return data;
}
async function destroy(id) {
  const data = await Category.findOneAndDelete({ _id: id });
  if(!data){
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