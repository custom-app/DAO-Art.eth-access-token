import React from 'react'
import {Alert} from '@mui/material';

export interface ErrorDisplayProps {
  error?: React.ReactNode,
  noMargin?: boolean,
}

export default function ErrorDisplay({error, noMargin}: ErrorDisplayProps): JSX.Element | null {
  if (error) {
    return (
      <Alert
        sx={{
          marginTop: noMargin ? 0 : 2,
        }}
        severity="error"
      >
        {error}
      </Alert>
    )
  } else {
    return null
  }
}
