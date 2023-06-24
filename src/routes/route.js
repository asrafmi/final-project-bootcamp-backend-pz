const express = require('express');
const router = express.Router();
const userCtrl = require('../controller/user.controller');
const productCtrl = require('../controller/product.controller');

router.get('/users', userCtrl.fetch);
router.post('/users', userCtrl.create);
router.get('/users/:id', userCtrl.getOne);
router.put('/users/:id', userCtrl.update);
router.delete('/users/:id', userCtrl.destroy);

router.get('/products', productCtrl.fetch);
router.post('/products', productCtrl.create);
router.get('/products/:id', productCtrl.getOne);
router.put('/products/:id', productCtrl.update);
router.delete('/products/:id', productCtrl.destroy);

module.exports = router;