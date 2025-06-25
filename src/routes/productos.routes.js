import express from 'express';
import {
    getProductosController,
    getProductoByIdController,
    createProductoController,
    updateProductoController,
    deleteProductoController
} from '../controllers/productos.controller.js';
import { Router } from 'express';
const router = Router();

router.get('/productos', getProductosController);
router.get('/productos/:id', getProductoByIdController);
router.post('/productos', createProductoController);
router.put('/update-productos/:id', updateProductoController);
router.delete('/delete-productos/:id', deleteProductoController);

export default router;