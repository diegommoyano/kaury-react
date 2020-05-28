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

export function FormSelect(props) {
  const classes = useStyles();

  const { label, id, onChange, items, valueExtractor, optionExtractor, cargando, value, disabled } = props;

  let size = props.size !== undefined ? props.size : 'medium'
  //let { defaultValue } = props;

  //if (items === undefined || items.size === 0) defaultValue = undefined;

  const labelId = 'label-' + id;

  if (cargando === true) return 'Cargando...';

  return (
    <FormControl variant="outlined" className={classes.formControl} fullWidth>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        size={size}
        id={id}
        onChange={event => onChange(event.target.value)}
        label={label}
        value={value}
        disabled={disabled}
        fullWidth>
        {items.map(item => (
          <MenuItem key={valueExtractor(item)} value={valueExtractor(item)}>
            {optionExtractor(item)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default FormSelect;
