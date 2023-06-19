const productSvc = require('../services/product');

async function fetch(req, res) {
  const data = await productSvc.fetch();
  res.send(data);
}
async function getOne(req, res) {
  const data = await productSvc.getOne(req.params.id);
  res.send(data);
}
async function create(req, res) {
  const product = await productSvc.create(req.body);
  res.send(product);
}
async function update(req, res) {
  const data = await productSvc.update(req.body, req.params.id);
  res.send(data);
}
async function destroy(req, res) {
  const data = await productSvc.destroy(req.params.id);
  res.send(data);
}

module.exports = {
  fetch,
  getOne,
  create,
  update,
  destroy,
};