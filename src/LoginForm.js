import React, { useState, useEffect } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import { TextField, Container, CssBaseline, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export function LoginForm(props) {
  const classes = useStyles();
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [datosValidos, setDatosValidos] = useState(true);
  const [message, setMessage] = useState('');
  const history = useHistory();
  const { dispatch, fetchLogin } = props;
  let size = props.size !== undefined ? props.size : 'medium';

  const handleSubmit = event => {
    event.preventDefault();
    const data = { usuario: usuario, password: password };
    setError(false);
    setDatosValidos(true);
    console.log(data);

    dispatch(
      fetchLogin(
        data,
        (ok, msg) => {
          if (ok) history.push(props.redirect);
          else {
            setError(false);
            setDatosValidos(false);
            setMessage(msg);
          }
        },
        reason => {
          console.log('Error login: ', reason);
          setError(true);
          setMessage(reason);
        }
      )
    );
  };

  const getErrorAlert = message => (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      {message}
    </Alert>
  );

  return (
    <Container component="main" width="100%">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar sesión
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <div className="form-group">{!datosValidos ? getErrorAlert(message) : ''}</div>
          <TextField
            size={size}
            autoFocus
            fullWidth
            margin="normal"
            required
            id="usuario"
            label="Usuario"
            variant="outlined"
            value={usuario}
            name="usuario"
            autoComplete="usuario"
            onChange={event => setUsuario(event.target.value)}
          />

          <TextField
            size={size}
            required
            fullWidth
            margin="normal"
            autoComplete="current-password"
            value={password}
            type="password"
            id="password"
            name="password"
            label="Contraseña"
            variant="outlined"
            onChange={event => setPassword(event.target.value)}
          />

          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Ingresar
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default LoginForm;
