import {Box, Breakpoint} from '@mui/material';
import {ReactNode} from 'react';

type TypographyProp = string | Partial<Record<Breakpoint, string>>

export interface LargeAndSmallProps {
  large: ReactNode,
  small: ReactNode,
  typographyL?: TypographyProp,
  typographyS?: TypographyProp,
  opacity?: number,
  className?: string,
}

export default function LargeAndSmall(
  {
    large,
    small,
    typographyL = {
      xs: 'h5',
      md: 'h3',
    },
    typographyS = {
      xs: 'body2',
      md: 'body1',
    },
    opacity,
    className,
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
        opacity,
      }}
    >
      <Box
        sx={{
          typography: typographyL,
          marginBottom: 1
        }}
        className={className}
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
