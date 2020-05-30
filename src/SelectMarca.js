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

export function SelectMarca(props) {
  const classes = useStyles();

  const { id, onChange, marcas, cargando, value } = props;

  let { defaultValue } = props;

  if (marcas === undefined || marcas.size === 0) defaultValue = undefined;

  const labelId = 'label-' + id;

  if (cargando === true) return 'Cargando...';

  return (
    <FormControl variant="outlined" className={classes.formControl} fullWidth>
      <InputLabel id={labelId}>Marca</InputLabel>
      <Select
        value={value}
        labelId={labelId}
        size="small"
        id={id}
        onChange={event => onChange(event.target.value)}
        label="Marca"
        defaultValue={defaultValue}
        fullWidth>
        {marcas.map(item => (
          <MenuItem key={item.id} value={item.id}>
            {item.nombre}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectMarca;
