// components/ui/FormComponents.js
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const BackButton = ({ 
  children = "← Regresar", 
  onClick,
  variant = "default",
  size = "md"
}) => {
  const navigate = useNavigate();
  
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    } else {
      navigate(-1); // Navegación automática hacia atrás
    }
  };

  const baseStyles = "inline-flex items-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    default: "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:ring-blue-500",
    outline: "text-blue-600 bg-transparent border border-blue-600 hover:bg-blue-50 focus:ring-blue-500",
    ghost: "text-gray-600 bg-transparent hover:bg-gray-100 focus:ring-gray-500",
    dark: "text-white bg-gray-800 border border-gray-700 hover:bg-gray-700 focus:ring-gray-500"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm", 
    lg: "px-6 py-3 text-base"
  };

  return (
    <button 
      type="button"
      onClick={handleClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]}`}
    >
      {children}
    </button>
  );
};

// Contenedor principal del formulario
export const FormContainer = ({ children, title }) => (
  <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
      {title}
    </h3>
    {children}
  </div>
);

// Formulario con espaciado estándar
export const Form = ({ children, onSubmit }) => (
  <form onSubmit={onSubmit} className="space-y-4">
    {children}
  </form>
);

// Campo de input con label
export const InputField = ({ 
  label, 
  type = "text", 
  id, 
  name, 
  required = false,
  placeholder = ""
}) => (
  <div className="space-y-2">
    <label 
      htmlFor={id} 
      className="block text-sm font-medium text-gray-700"
    >
      {label}
    </label>
    <input 
      type={type}
      id={id}
      name={name}
      required={required}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
);

export const FileInput = ({
  label,
  id,
  name,
  required = false,
  placeholder = "Selecciona un archivo",
  accept = "*/*"
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files[0];
    if (file && fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInputRef.current.files = dataTransfer.files;
      setSelectedFile(file);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleLabelClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      {!selectedFile ? (
        <div
          onClick={handleLabelClick}
          className={`flex flex-col items-center justify-center w-full px-4 py-6 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 ${
            isDragOver
              ? 'border-blue-500 bg-blue-100'
              : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
          } focus-within:ring-2 focus-within:ring-blue-500`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center">
            <svg
              className="w-8 h-8 mb-2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <span className="text-gray-600 text-sm text-center">
              {placeholder}
            </span>
            <span className="text-gray-400 text-xs mt-1">
              o arrastra y suelta aquí
            </span>
          </div>
        </div>
      ) : (
        <div className="w-full px-4 py-3 border-2 border-green-300 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <p className="text-sm font-medium text-green-800 truncate max-w-48">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-green-600">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={clearFile}
              className="text-green-600 hover:text-green-800 transition-colors"
              title="Quitar archivo"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      {/* Input real del formulario */}
      <input
        ref={fileInputRef}
        type="file"
        id={id}
        name={name}
        required={required}
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

// Campo select con label
export const SelectField = ({ 
  label, 
  id, 
  name, 
  value, 
  onChange, 
  required = false,
  children,
  placeholder = "Selecciona una opción"
}) => (
  <div className="space-y-2">
    <label 
      htmlFor={id} 
      className="block text-sm font-medium text-gray-700"
    >
      {label}
    </label>
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {children}
    </select>
  </div>
);

// Botón de submit estándar
export const SubmitButton = ({ children, loading = false }) => (
  <button 
    type="submit"
    disabled={loading}
    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {loading ? 'Procesando...' : children}
  </button>
);

// Estado de carga
export const LoadingState = ({ message = "Cargando datos..." }) => (
  <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
    <div className="text-center text-gray-600">
      {message}
    </div>
  </div>
);

// Estado de error
export const ErrorState = ({ message }) => (
  <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
    <div className="text-center text-red-600 bg-red-50 p-4 rounded-md">
      {message}
    </div>
  </div>
);