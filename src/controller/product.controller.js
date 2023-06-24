const { to } = require('await-to-js')
const productSvc = require("../services/product");

async function fetch(req, res) {
  try {
    const data = await productSvc.fetch();
    res.send(data);
  } catch (error) {
    res.status(500)
  }
}
async function getOne(req, res) {
  try {
    const [err, data] = await to(productSvc.getOne(req.params.id))
    if (err) {
      throw new Error('Data not found!')
    }
    res.send(data);
  } catch (error) {
    if (error.message === 'Data not found!') {
      res.send({
        status: 404,
        message: `${error.message}`
      })
    } else {
      res.send({
        status: 500,
        message: `${error.message}`
      })
    }
  }
}
async function create(req, res) {
  try {
    const product = await productSvc.create(req.body);
    res.send(product);
  } catch (error) {
    res.status(500)
  }
}
async function update(req, res) {
  try {
    const data = await productSvc.update(req.body, req.params.id);
    console.log('halooo');
    res.send(data);
  } catch (error) {
    res.status(500)
  }
}
async function destroy(req, res) {
  try {
    const data = await productSvc.destroy(req.params.id);
    res.send(data);
  } catch (error) {
    res.status(500)
  }
}

module.exports = {
  fetch,
  getOne,
  create,
  update,
  destroy,
};
