import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
}));

export function SelectUnidadMedida(props) {
  const classes = useStyles();
  
  const { onChange, value } = props;

  return (
    <FormControl variant="outlined" className={classes.formControl} fullWidth>
    <InputLabel id="demo-simple-select-outlined-label">Unidad de medida</InputLabel>
    <Select
      labelId="demo-simple-select-outlined-label"
      size="small"
      id="demo-simple-select-outlined"
      onChange={event => onChange(event.target.value)}
      label="Unidad de medida"
      fullWidth
      value={value}
    >
        <MenuItem key={"UNIDAD"} value={"UNIDAD"}>Unidad</MenuItem>
        <MenuItem key={"METRO"} value={"METRO"}>Metro</MenuItem>
        <MenuItem key={"KILO"} value={"KILO"}>Kilo</MenuItem>
      
    </Select>
  </FormControl>
  );
}

export default SelectUnidadMedida;
