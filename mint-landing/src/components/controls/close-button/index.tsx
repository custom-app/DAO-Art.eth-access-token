import {Close as MatCloseIcon} from '@mui/icons-material';
import {IconButton, SxProps, Theme} from '@mui/material';
import {MouseEventHandler} from 'react';

export interface CloseButtonProps {
  onClick?: MouseEventHandler,
  sx?: SxProps<Theme>
}

export default function CloseButton({onClick, sx}: CloseButtonProps): JSX.Element {
  return (
    <IconButton
      aria-label="close"
      onClick={onClick}
      sx={{
        color: (theme) => theme.palette.primary.contrastText,
        ...sx,
      }}
    >
      <MatCloseIcon/>
    </IconButton>
  )
}
