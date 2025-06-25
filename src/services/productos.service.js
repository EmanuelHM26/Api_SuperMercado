import Producto from "../models/ProductosModel.js";

export const getProductosService = async () => {
    return await Producto.findAll();
};

export const getProductoByIdService = async (id) => {
    return await Producto.findByPk(id);
};

export const createProductoService = async (data) => {
    return await Producto.create(data);
};

export const updateProductoService = async (id, data) => {
    const producto = await Producto.findByPk(id);
    if (!producto) return null;
    await producto.update(data);
    return producto;
};

export const deleteProductoService = async (id) => {
    const producto = await Producto.findByPk(id);
    if (!producto) return null;
    await producto.destroy();
    return true;
};