import React from 'react';
import {
  withStyles,
  Grid,
  Typography,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  makeStyles
} from '@material-ui/core';
//import { Columna as _Columna } from './components/TablaPaginada'

// label: Nombre que se muestra
// valueExtractor: funcion para sacar el valor de la columna, por ej: item => item.codigo
// alignRight: ...
/*export const Columna = (label, name, valueExtractor, weight = 'auto', alignRight = false) => ({
  label: label,
  name: name,
  valueExtractor: valueExtractor,
  weight: weight,
  alignRight: alignRight
});*/

//export const Columna = _Columna;

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 'lg'
  },
  root: {
    flexGrow: 1,
    marginTop: '20px'
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: 'center',
    verticalAlign: 'middle',
    color: theme.palette.text.secondary
  },
  rowPar: {
    backgroundColor: '#EEE'
  },
  nada: {}
}));

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);


export function Tabla(props) {
  const classes = useStyles();
  const { columnas, keyExtractor, items } = props;
  let visible = props.visible !== undefined && props.visible !== null ? props.visible : true;
  const alternada = props.alternanda !== null ? props.alternada === true : false;

  if (visible !== false && visible !== true) visible = true;

  if (!visible) return '';

  const getAlign = columna => (columna.alignRight ? 'right' : 'left');

  const getWeight = (columnas, columna) => {
    if (columna.weight === 'auto') return 100 / columnas.length + '%';

    return (columna.weight * 100) / 12 + '%';
  };

  const getRowClass = i => ((i + 1) % 2 === 0 ? (alternada ? classes.rowPar : classes.nada) : classes.nada);

  return (
    <Paper className={classes.root}>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <colgroup>
            {columnas.map(columna => (
              <col key={'col-' + columna.name} width={getWeight(columnas, columna)} />
            ))}
          </colgroup>
          <TableHead>
            <TableRow>
              {columnas.map(columna => (
                <StyledTableCell key={columna.name} align={getAlign(columna)}>
                  {columna.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, posicion) => (
              <TableRow key={keyExtractor(item)} className={getRowClass(posicion)}>
                {columnas.map((columna, j) => (
                  <TableCell key={keyExtractor(item) + j} align={getAlign(columna)}>
                    <Typography gutterBottom color="textSecondary">
                      {columna.valueExtractor(item)}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default Tabla;
