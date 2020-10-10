import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(1)
  }
}));

export function SelectUnidadDeMedida(props) {
  const classes = useStyles();
  
  const { id, cargando, onChange, unidadesDeMedida, value } = props;
  let { defaultValue } = props;

  if (unidadesDeMedida === undefined || unidadesDeMedida.size === 0) defaultValue = undefined;

  const labelId = 'label-' + id;

  if (cargando === true) return 'Cargando...';

  return (
    <FormControl variant="outlined" className={classes.formControl} fullWidth>
    <InputLabel id="demo-simple-select-outlined-label">Unidad de medida</InputLabel>
    <Select
      labelId={labelId}
      defaultValue={defaultValue}
      size="small"
      id="demo-simple-select-outlined"
      onChange={event => onChange(event.target.value)}
      label="Unidad de medida"
      fullWidth
      value={value}
    >
    { unidadesDeMedida.map(unidad => (
        <MenuItem key={unidad.id} value={unidad.id}>
            {unidad.nombre}
        </MenuItem>
    ))}
    
    </Select>
  </FormControl>
  );
}

export default SelectUnidadDeMedida;