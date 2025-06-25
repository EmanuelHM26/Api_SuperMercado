import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Plus,
  Edit,
  Trash2,
  Package,
  DollarSign,
  Hash,
  FileText,
  X,
} from "lucide-react";
import Swal from "sweetalert2";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProducto, setEditingProducto] = useState(null);
  const [formData, setFormData] = useState({
    Nombre: "",
    Descripcion: "",
    Precio: "",
    Stock: "",
  });

  // Cargar productos al montar el componente
  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/productos", {
        withCredentials: true,
      });
      setProductos(response.data);
      setError("");
    } catch (err) {
      setError("Error al cargar los productos");
      console.error("Error al obtener productos:", err);
    } finally {
      setLoading(false);
    }
  };

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await Swal.fire({
        title: editingProducto ? "¿Actualizar producto?" : "¿Crear producto?",
        text: editingProducto
          ? "¿Estás seguro de actualizar este producto?"
          : "¿Estás seguro de crear este producto?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: editingProducto ? "Actualizar" : "Crear",
        cancelButtonText: "Cancelar",
      });

      if (!result.isConfirmed) return;

      const productData = {
        ...formData,
        Precio: parseFloat(formData.Precio),
        Stock: parseInt(formData.Stock),
      };

      if (editingProducto) {
        await axios.put(
          `http://localhost:3000/api/update-productos/${editingProducto.id_producto}`,
          productData,
          { withCredentials: true }
        );
      } else {
        await axios.post("http://localhost:3000/api/productos", productData, {
          withCredentials: true,
        });
      }

      await fetchProductos();
      handleCloseModal();

      Swal.fire({
        title: editingProducto ? "Producto actualizado" : "Producto creado",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (err) {
      setError(
        editingProducto
          ? "Error al actualizar producto"
          : "Error al crear producto"
      );
      Swal.fire({
        title: "Error",
        text: editingProducto
          ? "Error al actualizar producto"
          : "Error al crear producto",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Error en submit:", err);
    }
  };

  const handleEdit = (producto) => {
    setEditingProducto(producto);
    setFormData({
      Nombre: producto.Nombre || "",
      Descripcion: producto.Descripcion || "",
      Precio: producto.Precio?.toString() || "",
      Stock: producto.Stock?.toString() || "",
    });
    setShowModal(true);
  };

  const handleDelete = async (id_producto) => {
    const result = await Swal.fire({
      title: "¿Eliminar producto?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(
        `http://localhost:3000/api/delete-productos/${id_producto}`,
        {
          withCredentials: true,
        }
      );
      await fetchProductos();
      Swal.fire({
        title: "Producto eliminado",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (err) {
      setError("Error al eliminar producto");
      Swal.fire({
        title: "Error",
        text: "Error al eliminar producto",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Error al eliminar producto:", err);
    }
  };

  const handleOpenModal = () => {
    setEditingProducto(null);
    setFormData({
      Nombre: "",
      Descripcion: "",
      Precio: "",
      Stock: "",
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProducto(null);
    setError("");
  };

  // Formatear el precio a moneda colombiana
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(price);
  };

  // Obtener el estado del stock
  const getStockStatus = (stock) => {
    if (stock === 0)
      return { text: "Agotado", color: "text-red-600 bg-red-100" };
    if (stock < 10)
      return { text: "Bajo Stock", color: "text-yellow-600 bg-yellow-100" };
    return { text: "En Stock", color: "text-green-600 bg-green-100" };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          <Package className="text-green-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-900">
            Gestión de Productos
          </h1>
        </div>
        <button
          onClick={handleOpenModal}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus size={20} />
          <span>Nuevo Producto</span>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Tabla de Productos */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productos.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No hay productos registrados
                  </td>
                </tr>
              ) : (
                productos.map((producto) => {
                  const stockStatus = getStockStatus(producto.Stock);
                  return (
                    <tr key={producto.id_producto} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                            <Package className="text-green-600" size={20} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {producto.Nombre}
                            </div>
                            <div className="text-sm text-gray-500">
                              {producto.Descripcion}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm font-semibold text-gray-900">
                          <DollarSign size={14} className="mr-1" />
                          {formatPrice(producto.Precio)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-600">
                          <Hash size={14} className="mr-1" />
                          {producto.Stock} unidades
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${stockStatus.color}`}
                        >
                          {stockStatus.text}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleEdit(producto)}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(producto.id_producto)}
                            className="text-red-600 hover:text-red-900 p-1 rounded"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {editingProducto ? "Editar Producto" : "Nuevo Producto"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  name="Nombre"
                  value={formData.Nombre}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  name="Descripcion"
                  value={formData.Descripcion}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Precio
                  </label>
                  <input
                    type="number"
                    name="Precio"
                    value={formData.Precio}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="Stock"
                    value={formData.Stock}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                >
                  {editingProducto ? "Actualizar" : "Crear"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Productos;
