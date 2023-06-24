const { to } = require('await-to-js')
const userSvc = require("../services/user");

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
    const [err, data] = await to(userSvc.getOne(req.params.id))
    if (err) {
      throw new Error('Data tidak ditemukan!')
    }
    res.send(data);
  } catch (error) {
    if (error.message === 'Data tidak ditemukan!') {
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
    res.status(500)
  }
}
async function update(req, res) {
  try {
    const [err, data] = await to(userSvc.update(req.body, req.params.id));
    if (err) {
      throw new Error('Data tidak ditemukan!')
    }
    res.status(202).send(data);
  } catch (error) {
    if (error.message === 'Data tidak ditemukan!') {
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
      throw new Error('Data tidak ditemukan!')
    }
    res.status(204).send('Data telah dihapus');
  } catch (error) {
    if (error.message === 'Data tidak ditemukan!') {
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
