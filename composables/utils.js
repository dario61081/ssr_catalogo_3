// composables/utils.js

export const utils = () => {
  /**
   * Formatea un precio con separador de miles
   * @param {number} price - El precio a formatear
   * @returns {string} - El precio formateado
   */
  const formatPrecio = (price) => {
    if (!price) return '0';
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return {
    formatPrecio
  };
};
