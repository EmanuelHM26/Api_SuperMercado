import {
    getProveedoresService,
    getProveedorByIdService,
    createProveedorService,
    updateProveedorService,
    deleteProveedorService
} from "../services/proveedores.service.js";

export const getProveedoresController = async (req, res) => {
    try {
        const proveedores = await getProveedoresService();
        res.json(proveedores);
    } catch (error) {
        console.error("Error al obtener los proveedores:", error);
        res.status(500).json({ message: "Error al obtener los proveedores" });
    }
};

export const getProveedorByIdController = async (req, res) => {
    try {
        const proveedor = await getProveedorByIdService(req.params.id);
        if (!proveedor) {
            return res.status(404).json({ message: "Proveedor no encontrado" });
        }
        res.json(proveedor);
    } catch (error) {
        console.error("Error al obtener el proveedor:", error);
        res.status(500).json({ message: "Error al obtener el proveedor" });
    }
};

export const createProveedorController = async (req, res) => {
    try {
        const nuevoProveedor = await createProveedorService(req.body);
        res.status(201).json(nuevoProveedor);
    } catch (error) {
        console.error("Error al crear el proveedor:", error);
        res.status(500).json({ message: "Error al crear el proveedor" });
    }
};

export const updateProveedorController = async (req, res) => {
    try {
        const proveedorActualizado = await updateProveedorService(req.params.id, req.body);
        if (!proveedorActualizado) {
            return res.status(404).json({ message: "Proveedor no encontrado" });
        }
        res.json(proveedorActualizado);
    } catch (error) {
        console.error("Error al actualizar el proveedor:", error);
        res.status(500).json({ message: "Error al actualizar el proveedor" });
    }
};

export const deleteProveedorController = async (req, res) => {
    try {
        const eliminado = await deleteProveedorService(req.params.id);
        if (!eliminado) {
            return res.status(404).json({ message: "Proveedor no encontrado" });
        }
        res.json({ message: "Proveedor eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el proveedor:", error);
        res.status(500).json({ message: "Error al eliminar el proveedor" });
    }
};
