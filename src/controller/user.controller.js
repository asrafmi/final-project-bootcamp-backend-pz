const userSvc = require("../services/user");
const { to } = require('await-to-js')
const jose = require('jose');
const User = require("../models/user");

async function fetch(req, res) {
  try {
    const data = await userSvc.fetch();
    res.send(data);
  } catch (error) {
    res.status(500)
  }
}
async function getOne(req, res) {
  try {
    const [err, data] = await to(userSvc.getOne(req.params.id));
    if (err) {
      throw new Error('Data user tidak ditemukan!')
    }
    res.send(data);
  } catch (error) {
    if (error.message === 'Data user tidak ditemukan!') {
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
    const user = await userSvc.create(req.body);
    res.status(201).send(user);
  } catch (error) {
    if (error.message === 'Email sudah terdaftar') {
      res.status(409).send({
        message: `${error.message}`
      })
    } else if (error.message === 'Mobile phone sudah terdaftar') {
      res.status(409).send({
        message: `${error.message}`
      })
    } else {
      res.status(500).send({
        message: `${error.message}`
      })
    }
  }
}
async function login(req, res) {
  try {
    const user = await userSvc.login(req.body);
    res.status(200).send(user);
  } catch (error) {
    if (error.message === 'Email dan password user tidak benar') {
      res.status(401).send({
        message: `${error.message}`
      })
    } else {
      res.status(500).send({
        message: `${error.message}`
      })
    }
  }
}
async function update(req, res) {
  try {
    const [err, data] = await to(userSvc.update(req.body, req.params.id));
    if (err) {
      throw new Error('Data user tidak ditemukan!')
    }
    res.status(202).send(data);
  } catch (error) {
    if (error.message === 'Data user tidak ditemukan!') {
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
    const [err, data] = await to(userSvc.destroy(req.params.id));
    if (err) {
      throw new Error('Data user tidak ditemukan!')
    }
    res.status(204).send('Data user terhapus');
  } catch (error) {
    if (error.message === 'Data user tidak ditemukan!') {
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

async function createOrder(req, res) {
  try {
    const authHeader = req.headers['authorization'];
    const jwtToken = authHeader.split('Bearer ')[1];
    const decode = jose.decodeJwt(jwtToken, { complete: true });
    const user = await User.findById(decode?.id);

    const [errOrder, dataOrder] = await to(userSvc.createOrder(req.params.product_id, user._id))
    if (errOrder) {
      throw new Error('Produk tidak ditemukan!')
    }
    res.status(200).send(dataOrder)
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

async function removeOrder(req, res) {
  try {
    const authHeader = req.headers['authorization'];
    const jwtToken = authHeader.split('Bearer ')[1];
    const decode = jose.decodeJwt(jwtToken, { complete: true });
    const user = await User.findById(decode?.id);
    const [errOrder, dataOrder] = await to(userSvc.removeOrder(req.body.product_id, user._id, req.params.order_id))
    if (errOrder) {
      throw new Error('Produk tidak ditemukan!')
    }
    res.status(200).send(dataOrder)
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
  login,
  create,
  update,
  destroy,
  createOrder,
  removeOrder
};
