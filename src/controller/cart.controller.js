const cart = require("../models/cart");
const cartSvc = require("../services/cart");

async function fetch(req, res) {
  const page = parseInt(req.query.page) || 1; // Current page number (default: 1)
  const limit = parseInt(req.query.limit) || 10; // Number of items per page (default: 10)

  try {
    const { data, totalPages, totalItems } = await cartSvc.fetch(page, limit);
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

async function create(req, res) {
  try {
    const cart = await cartSvc.create(req.params.id);
    res.status(201).send(cart);
  } catch (error) {
    res.status(500)
  }
}

async function remove(req, res) {
  try {
    const cart = await cartSvc.destroy(req.body._id)
    res.status(202).send(cart)
  } catch (error) {
    res.stats(500)
  }
}

module.exports = {
  fetch,
  create,
  remove
};
