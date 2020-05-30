import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
const base64 = require('base-64');

/**
 * A partir del query string devuelve el estado searchParams con su setter
 * Cada vez que cambia searchParams actualiza automaticamente el query string
 */
export function useSearchParams(props, defaultBuscar = null, defaultSortBy = null) {
  const history = useHistory();
  const [searchParams, setSearchParams] = useState(
    decodeSearchParams(props.location.search, defaultBuscar, defaultSortBy)
  );

  //Cuando cambia searchParams se actualiza la url
  useEffect(() => {
    history.push(history.location.pathname + '?' + encodeSearchParams(searchParams));
  }, [searchParams, history]);
  
  return [searchParams, setSearchParams];
}

const encodeSearchParams = searchParams => base64.encode(JSON.stringify(searchParams));

function decodeSearchParams(base64SP, defaultBuscar, defaultSortBy) {
  try {
    const decoded = base64.decode(base64SP.slice(1)); //quito el '?' del comienzo para decodificar
    const searchParams = JSON.parse(decoded);

    return {
      pagina: searchParams.pagina !== null && searchParams !== undefined ? searchParams.pagina : 0,
      cantidadPorPagina:
        searchParams.cantidadPorPagina !== null && searchParams.cantidadPorPagina !== undefined
          ? searchParams.cantidadPorPagina
          : 25,
      sortBy: searchParams.sortBy !== undefined ? searchParams.sortBy : defaultSortBy,
      buscar: searchParams.buscar !== undefined ? searchParams.buscar : null
    };
  } catch (e) {
    const defaultSearchParam = {
      pagina: 0,
      cantidadPorPagina: 25,
      sortBy: defaultSortBy,
      buscar: defaultBuscar
    };

    return defaultSearchParam;
  }
}

export default useSearchParams;
