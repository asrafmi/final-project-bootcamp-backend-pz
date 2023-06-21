const express = require('express');
const router = express.Router();
const productCtrl = require('../controller/product.controller');

router.get('/products', productCtrl.fetch);
router.post('/products', productCtrl.create);
router.get('/products/:id', productCtrl.getOne);
router.put('/products/:id', productCtrl.update);
router.delete('/products/:id', productCtrl.destroy);

module.exports = router;