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
      xs: 'h4',
      md: 'h2',
    },
    typographyS = {
      xs: 'body1',
      md: 'h6',
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
          marginBottom: 1,
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
