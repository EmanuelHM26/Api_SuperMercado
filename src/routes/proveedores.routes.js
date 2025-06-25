import express from 'express';
import {
    getProveedoresController,
    getProveedorByIdController,
    createProveedorController,
    updateProveedorController,
    deleteProveedorController
} from '../controllers/proveedores.controller.js';

import { Router } from 'express';
const router = Router();

// Rutas para proveedores
router.get('/proveedores', getProveedoresController);
router.get('/proveedores/:id', getProveedorByIdController);
router.post('/proveedores', createProveedorController);
router.put('/update-proveedores/:id', updateProveedorController);
router.delete('/delete-proveedores/:id', deleteProveedorController);

export default router;