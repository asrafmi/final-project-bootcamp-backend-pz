const express = require('express');
const router = express.Router();
const userCtrl = require('../controller/user.controller');
const productCtrl = require('../controller/product.controller');
const  {auth, isAdmin}  = require('../middleware/auth');

router.post('/users/register', userCtrl.create);
router.post('/users/login', userCtrl.login);
router.get('/users', auth, userCtrl.fetch);
router.get('/users/:id', auth, userCtrl.getOne);
router.put('/users/:id', auth, userCtrl.update);
router.delete('/users/:id', auth, userCtrl.destroy);

router.get('/products', productCtrl.fetch);
router.post('/products', productCtrl.create);
router.get('/products/:id', productCtrl.getOne);
router.put('/products/:id', productCtrl.update);
router.delete('/products/:id', productCtrl.destroy);

module.exports = router;