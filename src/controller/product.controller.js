const { to } = require('await-to-js')
const productSvc = require("../services/product");

async function fetch(req, res) {
  const page = parseInt(req.query.page) || 1; // Current page number (default: 1)
  const limit = parseInt(req.query.limit) || 10; // Number of items per page (default: 10)
  const kategori = req.query.kategori;

  try {
    const { data, totalPages, totalItems } = await productSvc.fetch(page, limit, kategori);
    res.send({
      data,
      page,
      limit,
      totalPages,
      totalItems
    });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error!' });
  }
}
async function getOne(req, res) {
  try {
    const [err, data] = await to(productSvc.getOne(req.params.id))
    if (err) {
      throw new Error('Produk tidak ditemukan!')
    }
    res.send(data);
  } catch (error) {
    if (error.message === 'Produk tidak ditemukan!') {
      res.status(404).send({
        message: `${error.message}`
      })
    } else {
      res.status(500).send({
        message: `${error.message}`
      })
    }
  }
}
async function create(req, res) {
  try {
    const product = await productSvc.create(req.body);
    res.status(201).send(product);
  } catch (error) {
    res.status(500)
  }
}
async function update(req, res) {
  try {
    const [err, data] = await to(productSvc.update(req.body, req.params.id));
    if (err) {
      throw new Error('Produk tidak ditemukan!')
    }
    res.status(202).send(data);
  } catch (error) {
    if (error.message === 'Produk tidak ditemukan!') {
      res.status(404).send({
        message: `${error.message}`
      })
    } else {
      res.status(500).send({
        message: `${error.message}`
      })
    }
  }
}
async function destroy(req, res) {
  try {
    const [err, data] = await to(productSvc.destroy(req.params.id));
    if (err) {
      throw new Error('Produk tidak ditemukan!')
    }
    res.status(204).send('Produk telah dihapus');
  } catch (error) {
    if (error.message === 'Produk tidak ditemukan!') {
      res.status(404).send({
        message: `${error.message}`
      })
    } else {
      res.status(500).send({
        message: `${error.message}`
      })
    }
  }
}

module.exports = {
  fetch,
  getOne,
  create,
  update,
  destroy,
};
