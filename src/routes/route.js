const express = require('express');
const router = express.Router();
const userCtrl = require('../controller/user.controller');
const productCtrl = require('../controller/product.controller');
const { auth, isSeller } = require('../middleware/auth');

router.post('/users/register', userCtrl.create);
router.post('/users/login', userCtrl.login);
router.get('/users', auth, userCtrl.fetch);
router.get('/users/:id', auth, userCtrl.getOne);
router.put('/users/:id', auth, userCtrl.update);
router.delete('/users/:id', auth, userCtrl.destroy);

router.get('/products', productCtrl.fetch);
router.post('/products', auth, isSeller, productCtrl.create);
router.get('/products/:id', productCtrl.getOne);
router.put('/products/:id', auth, isSeller, productCtrl.update);
router.delete('/products/:id', auth, isSeller, productCtrl.destroy);

router.post('/order/:product_id', auth, userCtrl.createOrder);
router.delete('/order/:order_id', auth, userCtrl.removeOrder);

module.exports = router;