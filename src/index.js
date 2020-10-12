import React from 'react';

export { AlertaCerrable  } from './AlertaCerrable';
export { ConfirmacionDialog  } from './ConfirmacionDialog';
export { CustomFilterText  } from './CustomFilterText';
export { FormSelect } from './FormSelect';
export { LoginForm  } from './LoginForm';
export { NavBar  } from './NavBar';
export { PrivateRoute } from './PrivateRoute';
export { SelectMarca  } from './SelectMarca';
export { SelectUnidadDeMedida  } from './SelectUnidadDeMedida';
export { TablaPaginada, Columna, SortOrder, COLUMN_COMPONENT, COLUMN_TEXT, ASC, DESC} from './TablaPaginada';
export { Tabla } from './Tabla'
export { useSearchParams  } from './hooks'

export const deepClone = objeto => JSON.parse(JSON.stringify(objeto));
