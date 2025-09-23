import React from 'react';

// Importa TODAS las bibliotecas que vayas a usar
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as GiIcons from 'react-icons/gi';
// ...puedes añadir más, como 'io', 'fi', 'bs', etc.

// Mapea los códigos de tu base de datos a las bibliotecas importadas
const iconLibraries = {
  fa: FaIcons,
  md: MdIcons,
  gi: GiIcons,
  // ...
};

/**
 * Este componente renderiza un ícono dinámicamente
 * @param {object} props
 * @param {string} props.library - El código de la biblioteca (ej. "fa")
 * @param {string} props.name - El nombre del ícono (ej. "FaFire")
 */
function DynamicIcon({ library, name, ...props }) {
  // 1. Encuentra la biblioteca correcta
  const lib = iconLibraries[library];

  // Si la biblioteca no existe en nuestro 'map', no renderiza nada
  if (!lib) {
    console.warn(`Biblioteca de íconos no encontrada: ${library}`);
    return null;
  }

  // 2. Encuentra el componente de ícono por su nombre (string)
  const IconComponent = lib[name];

  // Si el ícono no existe en esa biblioteca, no renderiza nada
  if (!IconComponent) {
    console.warn(`Ícono no encontrado: ${name} en la biblioteca ${library}`);
    return null;
  }

  // 3. Renderiza el ícono
  // Pasamos '...props' para poder darle estilos (ej. className, size, color)
  return <IconComponent {...props} />;
}

export default DynamicIcon;