import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Users, Package, Truck } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors">
            <ShoppingCart size={28} />
            <span className="text-xl font-bold">SuperMercado Pro</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                isActive('/') 
                  ? 'bg-blue-700 text-white' 
                  : 'text-blue-100 hover:text-white hover:bg-blue-500'
              }`}
            >
              <ShoppingCart size={18} />
              <span>Inicio</span>
            </Link>
            
            <Link 
              to="/clientes" 
              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                isActive('/clientes') 
                  ? 'bg-blue-700 text-white' 
                  : 'text-blue-100 hover:text-white hover:bg-blue-500'
              }`}
            >
              <Users size={18} />
              <span>Clientes</span>
            </Link>
            
            <Link 
              to="/productos" 
              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                isActive('/productos') 
                  ? 'bg-blue-700 text-white' 
                  : 'text-blue-100 hover:text-white hover:bg-blue-500'
              }`}
            >
              <Package size={18} />
              <span>Productos</span>
            </Link>
            
            <Link 
              to="/proveedores" 
              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                isActive('/proveedores') 
                  ? 'bg-blue-700 text-white' 
                  : 'text-blue-100 hover:text-white hover:bg-blue-500'
              }`}
            >
              <Truck size={18} />
              <span>Proveedores</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-white hover:text-blue-200">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;