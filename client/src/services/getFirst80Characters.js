export function getFirst80Characters (text) {
    // Verificamos si la longitud del texto es mayor a 20
    if (text.length > 80) {
      // Si es mayor, devolvemos solo los primeros 20 caracteres
      return text.substring(0, 80) + '...'
    } else {
      // Si es menor o igual a 20, devolvemos el texto tal cual
      return text
    }
  }