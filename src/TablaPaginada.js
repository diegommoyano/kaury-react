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
  makeStyles,
  Badge
} from '@material-ui/core';

import TableSortLabel from '@material-ui/core/TableSortLabel';

// label: Nombre que se muestra
// valueExtractor: funcion para sacar el valor de la columna, por ej: item => item.codigo
// alignRight: ...
export const Columna = (label, name, valueExtractor, weight = 'auto', alignRight = false, ordenable = true) => ({
  label: label,
  name: name,
  valueExtractor: valueExtractor,
  weight: weight,
  alignRight: alignRight,
  ordenable: ordenable
});

// fieldname = nombre del campo por el cual ordenar
// direccion: 1 = ascendente, -1 = descendente
export const ASC = 1;
export const DESC = -1;
export const SortOrder = (campo, direccion = ASC) => ({ campo: campo, direccion: direccion });

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
  nada: {} // fieldname = nombre del campo por el cual ordenar
  // direccion: 1 = ascendnete, 0 = descendente
}));

const StyledTableCell = withStyles(theme => ({
  head: {
    //backgroundColor: theme.palette.common.black,
    //color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledBadge = withStyles(theme => ({
  badge: {
    right: -3,
    top: 6,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px'
  }
}))(Badge);

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
    cantidadPorPagina,
    sortBy // Array de SortOrden por ej: [{ campo: 'codigo', direccion: 1 }, { campo: 'direccion', direccion: 0}]
  } = props;

  let { isReady } = props;

  if (isReady === null || isReady === undefined) isReady = true;

  let { onSortByChange } = props;
  if (onSortByChange === null || onSortByChange === undefined)
    onSortByChange = sortArray => {
      console.log('cambio orden: ', sortArray);
    };

  const alternada = props.alternanda !== null ? props.alternada === true : false;

  let visible = props.visible !== undefined && props.visible !== null ? props.visible : true;

  if (visible !== false && visible !== true) visible = true;

  if (!visible) return '';

  //const cargandoDatos = props.cargandoDatos !== undefined && props.cargandoDatos !== null ? props.cargandoDatos : false;

  const getAlign = columna => (columna.alignRight ? 'right' : 'left');

  const getWeight = (columnas, columna) => {
    if (columna.weight === 'auto') return 100 / columnas.length + '%';

    return (columna.weight * 100) / 12 + '%';
  };

  const agregarCampoSortBy = (campo, direccion = ASC) => {
    const sortArray = sortBy.slice();
    sortArray.push(SortOrder(campo, direccion));
    onSortByChange(sortArray);
  };

  const borrarCampoSortBy = campo => {
    const sortArray = sortBy.slice();
    let index = -1;
    sortArray.forEach((s, i) => {
      if (s.campo === campo) index = i;
    });
    if (index >= 0) {
      sortArray.splice(index, 1);
      onSortByChange(sortArray);
    }
  };

  const invertirOrden = campo => {
    const sortArray = sortBy.slice();
    sortArray.forEach(s => {
      if (s.campo === campo) s.direccion = s.direccion === ASC ? DESC : ASC;
    });
    onSortByChange(sortArray);
  };

  const getSortOrder = columnName => {
    if (sortBy === null || sortBy === undefined) return null;

    let sortByEncontrado = null;
    let indexEncontrado = -1;
    sortBy.forEach((sortOrder, i) => {
      if (sortOrder.campo === columnName) {
        sortByEncontrado = sortOrder;
        indexEncontrado = i;
      }
    });

    return sortByEncontrado !== null
      ? { posicionOrden: indexEncontrado + 1, direccion: sortByEncontrado.direccion }
      : null;
  };

  const seOrdenaPor = columnName => getSortOrder(columnName) !== null;

  const getDireccionOrden = columnaName => {
    const sortBy = getSortOrder(columnaName);
    if (sortBy === null) return 'asc';

    return sortBy.direccion === ASC ? 'asc' : 'desc'; //como lo hace material, parece que ordena al reves, por eso se invierten las flechas
  };

  const getNumeroOrden = columnaName => {
    const sortBy = getSortOrder(columnaName);
    if (sortBy === null) return 0;

    return sortBy.posicionOrden;
  };

  const getRowClass = i => ((i + 1) % 2 === 0 ? (alternada ? classes.rowPar : classes.nada) : classes.nada);

  const onClickOrden = columnaName => {
    const colOrden = getSortOrder(columnaName);
    //Los headers de las columnas se comportan como toggle buttons cambian el orden de: ninguno -> ASC -> DESC -> ninguno -> etc...
    if (colOrden === null)
      //No se estaba ordenando por esta columna: niguno -> ASC
      agregarCampoSortBy(columnaName);
    else if (colOrden.direccion === ASC)
      // SE PASA DE ASC -> DESC
      invertirOrden(columnaName);
    // DESC -> ninguno (hay que borrar el orden de la columna)
    else borrarCampoSortBy(columnaName);
  };

  const HeaderColumna = ({ columna }) => {
    if (columna.ordenable)
      return (
        <StyledTableCell key={columna.name} align={getAlign(columna)}>
          <StyledBadge badgeContent={getNumeroOrden(columna.name)}>
            <TableSortLabel
              active={seOrdenaPor(columna.name)}
              direction={getDireccionOrden(columna.name)}
              onClick={() => onClickOrden(columna.name)}>
              {columna.label}
            </TableSortLabel>
          </StyledBadge>
        </StyledTableCell>
      );
    else
      return (
        <StyledTableCell key={columna.name} align={getAlign(columna)}>
          {columna.label}
        </StyledTableCell>
      );
  };

  return (
    <Paper className={classes.root}>
      <Grid container spacing={3} style={{ heihgt: 100 }}>
        <Grid item xs={7}>
          <div className={classes.paper}>{!isReady ? <CircularProgress size={14} color="secondary" /> : ''}</div>
        </Grid>
        <Grid item xs={5}>
          <TablePagination
            rowsPerPageOptions={[25, 50, 100, 200]}
            component="div"
            count={itemsCount}
            rowsPerPage={cantidadPorPagina !== 0 ? cantidadPorPagina : 25}
            page={pagina}
            onChangePage={(event, newPage) => onChangePagina(newPage)}
            onChangeRowsPerPage={event => onChangeCantidadPorPagina(+event.target.value)}
            labelRowsPerPage={'Items por página'}
            /*labelDisplayedRows={({ from, to, count }) => `${from}-${to === -1 ? count : to} de ${count}`}*/
            labelDisplayedRows={() => {
              return `${pagina + 1} de ${Math.ceil(itemsCount / cantidadPorPagina)} (${itemsCount} elementos)`;
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
                <HeaderColumna key={columna.name} columna={columna} />
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
