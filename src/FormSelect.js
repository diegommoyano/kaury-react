import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';

export function FormSelect(props) {

  const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

const classes = useStyles();

  const { label, id, onChange, items, valueExtractor, optionExtractor, isReady, value, disabled, fullWidth } = props;

  let className = props.className !== undefined ? props.className : classes.formControl
  let size = props.size !== undefined ? props.size : 'medium';
  //let { defaultValue } = props;

  //if (items === undefined || items.size === 0) defaultValue = undefined;

  const labelId = 'label-' + id;

  if (isReady !== true) return <CircularProgress />

  return (
    <FormControl variant="outlined" fullWidth={fullWidth} size={size} className={className}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        size={size}
        labelId={labelId}
        id={id}
        onChange={event => onChange(event.target.value)}
        label={label}
        value={value}
        disabled={disabled}
        fullWidth>
        {items.map(item => (
          <MenuItem size={size} key={valueExtractor(item)} value={valueExtractor(item)}>
            {optionExtractor(item)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default FormSelect;
