import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Plus,
  Edit,
  Trash2,
  Users,
  Mail,
  Phone,
  MapPin,
  X,
} from "lucide-react";
import Swal from "sweetalert2";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCliente, setEditingCliente] = useState(null);
  const [formData, setFormData] = useState({
    Nombre: "",
    Email: "",
    Telefono: "",
    Direccion: "",
  });

  // Cargar clientes al montar el componente
  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/clientes", {
        withCredentials: true,
      });
      setClientes(response.data);
      setError("");
    } catch (err) {
      setError("Error al cargar los clientes");
      console.error("Error al obtener clientes:", err);
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
        title: editingCliente ? "¿Actualizar cliente?" : "¿Crear cliente?",
        text: editingCliente
          ? "¿Estás seguro de actualizar este cliente?"
          : "¿Estás seguro de crear este cliente?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: editingCliente ? "Actualizar" : "Crear",
        cancelButtonText: "Cancelar",
      });

      if (!result.isConfirmed) return;

      if (editingCliente) {
        await axios.put(
          `http://localhost:3000/api/update-clientes/${editingCliente.id_cliente}`,
          formData,
          { withCredentials: true }
        );
      } else {
        await axios.post("http://localhost:3000/api/clientes", formData, {
          withCredentials: true,
        });
      }

      await fetchClientes();
      handleCloseModal();

      Swal.fire({
        title: editingCliente ? "Cliente actualizado" : "Cliente creado",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (err) {
      setError(
        editingCliente
          ? "Error al actualizar cliente"
          : "Error al crear cliente"
      );
      Swal.fire({
        title: "Error",
        text: editingCliente
          ? "Error al actualizar cliente"
          : "Error al crear cliente",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Error en submit:", err);
    }
  };

  const handleEdit = (cliente) => {
    setEditingCliente(cliente);
    setFormData({
      Nombre: cliente.Nombre || "",
      Email: cliente.Email || "",
      Telefono: cliente.Telefono || "",
      Direccion: cliente.Direccion || "",
    });
    setShowModal(true);
  };

  const handleDelete = async (id_cliente) => {
    const result = await Swal.fire({
      title: "¿Eliminar cliente?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(
        `http://localhost:3000/api/delete-clientes/${id_cliente}`,
        {
          withCredentials: true,
        }
      );
      await fetchClientes();
      Swal.fire({
        title: "Cliente eliminado",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (err) {
      setError("Error al eliminar cliente");
      Swal.fire({
        title: "Error",
        text: "Error al eliminar cliente",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Error al eliminar cliente:", err);
    }
  };

  const handleOpenModal = () => {
    setEditingCliente(null);
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
    setEditingCliente(null);
    setError("");
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
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          <Users className="text-blue-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-900">
            Gestión de Clientes
          </h1>
        </div>
        <button
          onClick={handleOpenModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus size={20} />
          <span>Nuevo Cliente</span>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Tabla de Clientes */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
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
              {clientes.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No hay clientes registrados
                  </td>
                </tr>
              ) : (
                clientes.map((cliente) => (
                  // Usar id_cliente como key y para identificar el registro
                  <tr key={cliente.id_cliente} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="text-blue-600" size={20} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {cliente.Nombre}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail size={14} className="mr-2" />
                          {cliente.Email}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone size={14} className="mr-2" />
                          {cliente.Telefono}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin size={14} className="mr-2" />
                        {cliente.Direccion}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(cliente)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          // Pasar id_cliente en lugar de id
                          onClick={() => handleDelete(cliente.id_cliente)}
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
                {editingCliente ? "Editar Cliente" : "Nuevo Cliente"}
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                >
                  {editingCliente ? "Actualizar" : "Crear"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clientes;
