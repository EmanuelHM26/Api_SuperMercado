import Proveedor from "../models/ProveedoresModel.js";

export const getProveedoresService = async () => {
    return await Proveedor.findAll();
};

export const getProveedorByIdService = async (id) => {
    return await Proveedor.findByPk(id);
};

export const createProveedorService = async (data) => {
    return await Proveedor.create(data);
};

export const updateProveedorService = async (id, data) => {
    const proveedor = await Proveedor.findByPk(id);
    if (!proveedor) return null;
    await proveedor.update(data);
    return proveedor;
};

export const deleteProveedorService = async (id) => {
    const proveedor = await Proveedor.findByPk(id);
    if (!proveedor) return null;
    await proveedor.destroy();
    return true;
};
