import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

/* Usado para las rutas privadas.  Antes de hacer el render de Component se verifica
  la sesion.  Si no hay sesion o vencio, se redirige a la pagina de login
*/
export function PrivateRoute(props) {
  const [sesionVerificada, setSesionVerificada] = useState(false);
  const { checkToken, dispatch, component: Component, ...rest } = props;

  const [isLogged, setIsLogged] = useState(false);

  const [inicial, setInicial] = useState(true);

  useEffect(() => {
    if(inicial) {
      dispatch(checkToken(isLogged => { 
        setSesionVerificada(true);
        setIsLogged(isLogged);
      }));
      setInicial(false);
    }
  }, [inicial, dispatch, checkToken]);


  const renderRoute = props => {
    //Mientras se verifica la sesion se muetra el progreso
    if (!sesionVerificada)
      return (
        <div style={{ textAlign: 'center' }}>
          <CircularProgress />
        </div>
      );

    //Si esta logueado se hace el render de Component
    if (isLogged) return <Component {...{ ...props, rest }} />;

    //Se redirecciona a la pagina de login
    return <Redirect to={{ pathname: '/login', state: { redirect: rest.location } }} />;
  };

  return <Route {...rest} render={renderRoute} />;
}

export default PrivateRoute;
