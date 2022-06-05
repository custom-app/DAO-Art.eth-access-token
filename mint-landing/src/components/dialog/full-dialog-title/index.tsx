import {DialogTitle, DialogTitleProps} from '@mui/material';
import {MouseEventHandler} from 'react';
import DialogCloseButton from '../../controls/dialog-close-button';

export interface FullDialogTitleProps extends DialogTitleProps {
  onClose?: MouseEventHandler,
  buttonRight?: number,
}

export function FullDialogTitle(
  {
    children,
    onClose,
    buttonRight,
  }: FullDialogTitleProps
): JSX.Element {
  return (
    <DialogTitle
      sx={{
        paddingRight: 8,
        paddingTop: 3,
        typography: 'h6',
        color: 'text.primary',
      }}
    >
      {children}
      {onClose && (
        <DialogCloseButton
          onClick={onClose}
          buttonRight={buttonRight}
          sx={{
            color: 'text.secondary',
          }}
        />
      )}
    </DialogTitle>
  )
}
