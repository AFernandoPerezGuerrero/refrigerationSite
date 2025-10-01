import React from 'react';

import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as GiIcons from 'react-icons/gi';

const iconLibraries = {
  fa: FaIcons,
  md: MdIcons,
  gi: GiIcons,
};

/**
 * @param {object} props
 * @param {string} props.library 
 * @param {string} props.name 
 */
function DynamicIcon({ library, name, ...props }) {

  const lib = iconLibraries[library];

  if (!lib) {
    console.warn(`Biblioteca de íconos no encontrada: ${library}`);
    return null;
  }

  const IconComponent = lib[name];

  if (!IconComponent) {
    console.warn(`Ícono no encontrado: ${name} en la biblioteca ${library}`);
    return null;
  }

  return <IconComponent {...props} />;
}

export default DynamicIcon;