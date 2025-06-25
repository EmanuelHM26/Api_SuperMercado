import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Plus,
  Edit,
  Trash2,
  Truck,
  Mail,
  Phone,
  MapPin,
  X,
} from "lucide-react";
import Swal from "sweetalert2";

const Proveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProveedor, setEditingProveedor] = useState(null);
  const [formData, setFormData] = useState({
    Nombre: "",
    Email: "",
    Telefono: "",
    Direccion: "",
  });

  // Cargar proveedores al montar el componente
  useEffect(() => {
    fetchProveedores();
  }, []);

  const fetchProveedores = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/api/proveedores",
        {
          withCredentials: true,
        }
      );
      setProveedores(response.data);
      setError("");
    } catch (err) {
      setError("Error al cargar los proveedores");
      console.error("Error al obtener proveedores:", err);
    } finally {
      setLoading(false);
    }
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await Swal.fire({
        title: editingProveedor
          ? "¿Actualizar proveedor?"
          : "¿Crear proveedor?",
        text: editingProveedor
          ? "¿Estás seguro de actualizar este proveedor?"
          : "¿Estás seguro de crear este proveedor?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: editingProveedor ? "Actualizar" : "Crear",
        cancelButtonText: "Cancelar",
      });

      if (!result.isConfirmed) return;

      if (editingProveedor) {
        await axios.put(
          `http://localhost:3000/api/update-proveedores/${editingProveedor.id_proveedor}`,
          formData,
          { withCredentials: true }
        );
      } else {
        await axios.post("http://localhost:3000/api/proveedores", formData, {
          withCredentials: true,
        });
      }

      await fetchProveedores();
      handleCloseModal();

      Swal.fire({
        title: editingProveedor ? "Proveedor actualizado" : "Proveedor creado",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (err) {
      setError(
        editingProveedor
          ? "Error al actualizar proveedor"
          : "Error al crear proveedor"
      );
      Swal.fire({
        title: "Error",
        text: editingProveedor
          ? "Error al actualizar proveedor"
          : "Error al crear proveedor",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Error en submit:", err);
    }
  };

  const handleEdit = (proveedor) => {
    setEditingProveedor(proveedor);
    setFormData({
      Nombre: proveedor.Nombre || "",
      Email: proveedor.Email || "",
      Telefono: proveedor.Telefono || "",
      Direccion: proveedor.Direccion || "",
    });
    setShowModal(true);
  };

  const handleDelete = async (id_proveedor) => {
    const result = await Swal.fire({
      title: "¿Eliminar proveedor?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(
        `http://localhost:3000/api/delete-proveedores/${id_proveedor}`,
        {
          withCredentials: true,
        }
      );
      await fetchProveedores();
      Swal.fire({
        title: "Proveedor eliminado",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (err) {
      setError("Error al eliminar proveedor");
      Swal.fire({
        title: "Error",
        text: "Error al eliminar proveedor",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Error al eliminar proveedor:", err);
    }
  };

  const handleOpenModal = () => {
    setEditingProveedor(null);
    setFormData({
      Nombre: "",
      Email: "",
      Telefono: "",
      Direccion: "",
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProveedor(null);
    setError("");
  };

  // Mostrar un mensaje de error si hay uno
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          <Truck className="text-purple-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-900">
            Gestión de Proveedores
          </h1>
        </div>
        <button
          onClick={handleOpenModal}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus size={20} />
          <span>Nuevo Proveedor</span>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Tabla de Proveedores */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Proveedor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contacto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dirección
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {proveedores.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No hay proveedores registrados
                  </td>
                </tr>
              ) : (
                proveedores.map((proveedor) => (
                  <tr key={proveedor.id_proveedor} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <Truck className="text-purple-600" size={20} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {proveedor.Nombre}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail size={14} className="mr-2" />
                          {proveedor.Email}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone size={14} className="mr-2" />
                          {proveedor.Telefono}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin size={14} className="mr-2" />
                        {proveedor.Direccion}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(proveedor)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(proveedor.id_proveedor)}
                          className="text-red-600 hover:text-red-900 p-1 rounded"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
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
                {editingProveedor ? "Editar Proveedor" : "Nuevo Proveedor"}
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
                  Nombre del Contacto
                </label>
                <input
                  type="text"
                  name="Nombre"
                  value={formData.Nombre}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="Telefono"
                  value={formData.Telefono}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dirección
                </label>
                <textarea
                  name="Direccion"
                  value={formData.Direccion}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
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
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
                >
                  {editingProveedor ? "Actualizar" : "Crear"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Proveedores;
