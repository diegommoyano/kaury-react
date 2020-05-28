import React from 'react';
import {
  CircularProgress,
  withStyles,
  Grid,
  Typography,
  TablePagination,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  makeStyles
} from '@material-ui/core';

// label: Nombre que se muestra
// valueExtractor: funcion para sacar el valor de la columna, por ej: item => item.codigo
// alignRight: ...
export const Columna = (label, name, valueExtractor, weight = 'auto', alignRight = false) => ({
  label: label,
  name: name,
  valueExtractor: valueExtractor,
  weight: weight,
  alignRight: alignRight
});

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 'lg'
  },
  root: {
    flexGrow: 1,
    marginTop: '20px'
  },
  paper: {
    padding: theme.spacing(2),
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

export function TablaPaginada(props) {
  const classes = useStyles();
  const {
    columnas,
    onChangePagina,
    keyExtractor,
    items,
    pagina,
    itemsCount,
    onChangeCantidadPorPagina,
    cantidadPorPagina
  } = props;

  const alternada = props.alternanda !== null ? props.alternada === true : false;

  let visible = props.visible !== undefined && props.visible !== null ? props.visible : true;

  if (visible !== false && visible !== true) visible = true;

  if (!visible) return '';

  const cargandoDatos = props.cargandoDatos !== undefined && props.cargandoDatos !== null ? props.cargandoDatos : false;

  const getAlign = columna => (columna.alignRight ? 'right' : 'left');

  const getWeight = (columnas, columna) => {
    if (columna.weight === 'auto') return 100 / columnas.length + '%';

    return (columna.weight * 100) / 12 + '%';
  };

  const getRowClass = i => ((i + 1) % 2 === 0 ? (alternada ? classes.rowPar : classes.nada) : classes.nada);

  return (
    <Paper className={classes.root}>
      <Grid container spacing={3} style={{ heihgt: 100 }}>
        <Grid item xs={7}>
          <div className={classes.paper}>{cargandoDatos ? <CircularProgress size={14} color="secondary" /> : ''}</div>
        </Grid>
        <Grid item xs={5}>
          <TablePagination
            rowsPerPageOptions={[25, 50, 100]}
            component="div"
            count={itemsCount}
            rowsPerPage={cantidadPorPagina}
            page={pagina}
            onChangePage={(event, newPage) => onChangePagina(newPage)}
            onChangeRowsPerPage={event => onChangeCantidadPorPagina(+event.target.value)}
            labelRowsPerPage={'Items por página'}
            /*labelDisplayedRows={({ from, to, count }) => `${from}-${to === -1 ? count : to} de ${count}`}*/
            labelDisplayedRows={() => {
              return `${(pagina + 1)} de ${Math.ceil(itemsCount / cantidadPorPagina)} (${itemsCount} elementos)`;
            }}
          />
        </Grid>
      </Grid>

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
            {items.map((item, i) => (
              <TableRow key={keyExtractor(item)} className={getRowClass(i)}>
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

export default TablaPaginada;
