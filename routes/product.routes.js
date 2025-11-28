const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { verifyToken } = require('../middlewares/auth');
const { checkRole } = require('../middlewares/roles');

// Rutas accesibles según rol
router.get('/products', verifyToken, checkRole(['ADMIN_ROLE','USER_ROLE','CLIENT_ROLE']), productController.getAllProducts);
router.get('/products/:id', verifyToken, checkRole(['ADMIN_ROLE','USER_ROLE','CLIENT_ROLE']), productController.getProductById);

// Solo Admin y User pueden modificar
router.put('/products/:id', verifyToken, checkRole(['ADMIN_ROLE','USER_ROLE']), productController.updateProduct);

// Solo Admin puede crear y borrar
router.post('/products', verifyToken, checkRole(['ADMIN_ROLE']), productController.createProduct);
router.delete('/products/:id', verifyToken, checkRole(['ADMIN_ROLE']), productController.deleteProduct);

module.exports = router;