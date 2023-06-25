const User = require("../models/user");
const jose = require('jose');

const auth = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    res.status(403).send({ message: 'Authorization needed!' });
    return;
  }
  if (!authHeader.includes('Bearer')) {
    res.status(403).send({ message: 'Bearer token needed!' });
    return;
  }
  const jwtToken = authHeader.split('Bearer ')[1];
  try {
    const decode = jose.decodeJwt(jwtToken, { complete: true });
    const user = await User.findById(decode?.id); // Assuming User.findById is asynchronous
    if (!user) {
      res.status(404).send({ message: 'User not found!' });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(403).send({ message: 'Invalid bearer token!' });
  }
};

const isSeller = async (req, res, next) => {
  const { email } = req.user;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).send({ message: 'User not found!' });
      return;
    }
    if (user.role !== "Seller") {
      res.status(403).send({ message: 'User is not a Seller!' });
      return;
    }
    next();
  } catch (error) {
    res.status(500).send({ message: 'Internal server error!' });
  }
};

module.exports = {auth, isSeller};
