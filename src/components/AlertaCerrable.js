import React from 'react';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

export function AlertaCerrable(props) {
  const { isOpen, onClose, mensaje } = props;

  return (
    <Collapse in={isOpen}>
      <Alert
        action={
          <IconButton aria-label="close" color="inherit" size="small" onClick={onClose}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }>
        {mensaje !== null ? mensaje : ''}
      </Alert>
    </Collapse>
  );
}

export default AlertaCerrable;
