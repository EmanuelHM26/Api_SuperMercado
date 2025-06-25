import Cliente from "../models/ClientesModel.js";

export const getClientesService = async () => {
    return await Cliente.findAll();
};

export const getClienteByIdService = async (id) => {
    return await Cliente.findByPk(id);
};

export const createClienteService = async (data) => {
    return await Cliente.create(data);
};

export const updateClienteService = async (id, data) => {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) return null;
    await cliente.update(data);
    return cliente;
};

export const deleteClienteService = async (id) => {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) return null;
    await cliente.destroy();
    return true;
};