import e from 'express';
import {
    getProductosService,
    getProductoByIdService,
    createProductoService,
    updateProductoService,
    deleteProductoService
} from '../services/productos.service.js';

export const getProductosController = async (req, res) => {
    try {
        const productos = await getProductosService();
        res.json(productos);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).json({ message: "Error al obtener los productos" });
    }
};

export const getProductoByIdController = async (req, res) => {
    try {
        const producto = await getProductoByIdService(req.params.id);
        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.json(producto);
    } catch (error) {
        console.error("Error al obtener el producto:", error);
        res.status(500).json({ message: "Error al obtener el producto" });
    }
};

export const createProductoController = async (req, res) => {
    try {
        const nuevoProducto = await createProductoService(req.body);
        res.status(201).json(nuevoProducto);
    } catch (error) {
        console.error("Error al crear el producto:", error);
        res.status(500).json({ message: "Error al crear el producto" });
    }
};

export const updateProductoController = async (req, res) => {
    try {
        const productoActualizado = await updateProductoService(req.params.id, req.body);
        if (!productoActualizado) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.json(productoActualizado);
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).json({ message: "Error al actualizar el producto" });
    }
};

export const deleteProductoController = async (req, res) => {
    try {
        const eliminado = await deleteProductoService(req.params.id);
        if (!eliminado) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).json({ message: "Error al eliminar el producto" });
    }
};