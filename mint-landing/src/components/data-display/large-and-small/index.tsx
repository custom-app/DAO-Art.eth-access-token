import {Box} from '@mui/material';
import {ReactNode} from 'react';

export interface LargeAndSmallProps {
  large: ReactNode,
  small: ReactNode,
  typographyL?: string,
  typographyS?: string,
}

export default function LargeAndSmall(
  {
    large,
    small,
    typographyL = 'h2',
    typographyS = 'h6',
  }: LargeAndSmallProps
): JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          typography: typographyL,
          marginBottom: 1,
        }}
      >
        {large}
      </Box>
      <Box
        sx={{
          typography: typographyS,
        }}
      >
        {small}
      </Box>
    </Box>
  )
}
