import CloseButton from '../close-button'
import {SxProps, Theme} from '@mui/material';
import {MouseEventHandler} from 'react';

export interface DialogCloseButtonProps {
  onClick?: MouseEventHandler,
  sx?: SxProps<Theme>,
  buttonRight?: number,
}

export default function DialogCloseButton({onClick, sx, buttonRight = 16}: DialogCloseButtonProps): JSX.Element {
  return (
    <CloseButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        right: buttonRight,
        top: 24,
        ...sx,
      }}
    />
  )
}
