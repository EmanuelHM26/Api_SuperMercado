import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Package, Truck, ShoppingCart, TrendingUp, Award } from 'lucide-react';

const Inicio = () => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          Bienvenido a <span className="text-blue-600">SuperMercado Pro</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Sistema integral de gestión para supermercados. Administra clientes, productos y proveedores 
          de manera eficiente y profesional.
        </p>
        <div className="flex justify-center space-x-4">
          <Link 
            to="/productos" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Gestionar Productos
          </Link>
          <Link 
            to="/clientes" 
            className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Ver Clientes
          </Link>
        </div>
      </div>

      {/* Cards  */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
            <Users className="text-blue-600" size={24} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Gestión de Clientes</h3>
          <p className="text-gray-600">
            Administra tu base de clientes de forma eficiente con información completa y actualizada.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
            <Package className="text-green-600" size={24} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Control de Inventario</h3>
          <p className="text-gray-600">
            Mantén un control preciso de tus productos, precios y stock disponible.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
            <Truck className="text-purple-600" size={24} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Red de Proveedores</h3>
          <p className="text-gray-600">
            Gestiona tus proveedores y mantén relaciones comerciales sólidas y organizadas.
          </p>
        </div>
      </div>

      {/* Seccion de Features */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-12">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Características Principales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <TrendingUp className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Análisis en Tiempo Real</h3>
              <p className="text-gray-600">
                Obtén insights valiosos sobre tu negocio con reportes actualizados.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <Award className="text-green-600" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Calidad Garantizada</h3>
              <p className="text-gray-600">
                Sistema robusto y confiable para operaciones comerciales diarias.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <ShoppingCart className="text-purple-600" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Fácil de Usar</h3>
              <p className="text-gray-600">
                Interfaz intuitiva diseñada para maximizar la productividad.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Acciones */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">¿Listo para comenzar?</h2>
        <p className="text-blue-100 mb-6">
          Explora todas las funcionalidades de nuestro sistema de gestión.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link 
            to="/clientes" 
            className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Administrar Clientes
          </Link>
          <Link 
            to="/productos" 
            className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Gestionar Productos
          </Link>
          <Link 
            to="/proveedores" 
            className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Ver Proveedores
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Inicio;