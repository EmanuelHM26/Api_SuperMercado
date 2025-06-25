import { 
    getClientesService, 
    getClienteByIdService, 
    createClienteService, 
    updateClienteService,
    deleteClienteService,
} from "../services/clientes.service.js";

export const getClientesController = async (req, res) => {
    try {
        const clientes = await getClientesService();
        res.json(clientes);
    } catch (error) {
        console.error("Error al obtener los clientes:", error);
        res.status(500).json({ message: "Error al obtener los clientes" });
    }
};

export const getClienteByIdController = async (req, res) => {
    try {
        const cliente = await getClienteByIdService(req.params.id);
        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        res.json(cliente);
    } catch (error) {
        console.error("Error al obtener el cliente:", error);
        res.status(500).json({ message: "Error al obtener el cliente" });
    }
};

export const createClienteController = async (req, res) => {
    try {
        const nuevoCliente = await createClienteService(req.body);
        res.status(201).json(nuevoCliente);
    } catch (error) {
        console.error("Error al crear el cliente:", error);
        res.status(500).json({ message: "Error al crear el cliente" });
    }
};

export const updateClienteController = async (req, res) => {
    try {
        const clienteActualizado = await updateClienteService(req.params.id, req.body);
        if (!clienteActualizado) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        res.json(clienteActualizado);
    } catch (error) {
        console.error("Error al actualizar el cliente:", error);
        res.status(500).json({ message: "Error al actualizar el cliente" });
    }
};

export const deleteClienteController = async (req, res) => {
    try {
        const eliminado = await deleteClienteService(req.params.id);
        if (!eliminado) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        res.json({ message: "Cliente eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el cliente:", error);
        res.status(500).json({ message: "Error al eliminar el cliente" });
    }
};
