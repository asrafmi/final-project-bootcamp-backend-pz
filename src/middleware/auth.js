const jose = require('jose');

const auth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    res.status(403).send({ message: 'authorization needed!' });
    return;
  }
  if (!authHeader.includes('Bearer')) {
    res.status(403).send({ message: 'bearer token needed!' });
    return;
  }
  const jwtToken = authHeader.split('Bearer ')[1];
  try {
    jose.decodeJwt(jwtToken, { complete: true });
    next();
  } catch (error) {
    res.status(403).send({ message: 'invalid bearer token!' });
  }
};

const isAdmin = async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email });
  if (adminUser.role !== "admin") {
    res.status(403).send({ message: 'user is not an Admin!' });
  } else {
    next();
  }
};

module.exports = {auth, isAdmin};
