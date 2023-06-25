const express = require('express');
const router = express.Router();
const userCtrl = require('../controller/user.controller');
const productCtrl = require('../controller/product.controller');
const categoryCtrl = require('../controller/productCategory.controller');
const cartCtrl = require('../controller/cart.controller');
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

router.get('/category', categoryCtrl.fetch);
router.post('/category', auth, isSeller, categoryCtrl.create);
router.get('/category/:id', categoryCtrl.getOne);
router.put('/category/:id', auth, isSeller, categoryCtrl.update);
router.delete('/category/:id', auth, isSeller, categoryCtrl.destroy);

router.get('/cart', auth, cartCtrl.fetch);
router.post('/cart/:id', auth, cartCtrl.create);
router.delete('/cart/:id', auth, cartCtrl.remove);

module.exports = router;