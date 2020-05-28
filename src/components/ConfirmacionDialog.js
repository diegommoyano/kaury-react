import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export function ConfirmacionDialog(props) {
  const { open, onSi, onNo, title, pregunta, siLabel, noLabel } = props;

  return (
    <Dialog open={open} onClose={onNo} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{pregunta}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onNo} color="primary">
          {noLabel}
        </Button>
        <Button onClick={onSi} color="primary">
          {siLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmacionDialog;
