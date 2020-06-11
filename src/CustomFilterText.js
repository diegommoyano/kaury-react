import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: '8px',
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(1)
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 30,
    margin: 4
  }
}));

export function CustomFilterText(props) {
  const { onBuscar } = props;
  const classes = useStyles();
  const [value, setValue] = useState('');

  const onSubmit = event => {
    event.preventDefault();
    onBuscar(value);
    setValue('');
  };

  return (
    <Paper component="form" className={classes.root} onSubmit={onSubmit}>
      <InputBase
        variant="outlined"
        size="small"
        value={value}
        onChange={event => setValue(event.target.value)}
        className={classes.input}
        placeholder="Busqueda"
        inputProps={{ 'aria-label': 'search' }}
      />
      <IconButton onClick={onSubmit} className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default CustomFilterText;
