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
    const data = await userSvc.getOne(req.params.id);
    res.send(data);
  } catch (error) {
    if (error.message === 'Data tidak ditemukan') {
      res.status(404).send({
        message: `${error.message}`
      })
    } else if (error.message === 'Data tidak ditemukan') {
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
    if (error.message === 'Email dan password tidak benar') {
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
    const data = await userSvc.update(req.body, req.params.id);
    res.status(202).send(data);
  } catch (error) {
    if (error.message === 'Data tidak ditemukan') {
      res.status(404).send({
        message: `${error.message}`
      })
    }  else {
      res.status(500).send({
        message: `${error.message}`
      })
    }
  }
}
async function destroy(req, res) {
  try {
    const data = await userSvc.destroy(req.params.id);
    res.status(204).send('Data terhapus');
  } catch (error) {
    if (error.message === 'Data tidak ditemukan') {
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
};
