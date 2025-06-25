import express from "express";
import { 
    getClientesController,
    getClienteByIdController,
    createClienteController,
    updateClienteController,
    deleteClienteController,
} from "../controllers/clientes.controller.js";

import { Router } from "express";

const router = Router();

router.get("/clientes", getClientesController);
router.get("/clientes/:id", getClienteByIdController);
router.post("/clientes", createClienteController);
router.put("/update-clientes/:id", updateClienteController);
router.delete("/delete-clientes/:id", deleteClienteController);

export default router;