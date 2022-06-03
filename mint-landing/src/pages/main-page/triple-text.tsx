import {Box} from '@mui/material';
import LargeAndSmall from '../../components/data-display/large-and-small';
import {PropsWithChildren} from 'react';

function Line({children}: PropsWithChildren<{}>): JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: {
          xs: 4,
          md: 8,
        },
        marginBottom: {
          xs: 2,
          md: 3,
        },
      }}
    >
      {children}
    </Box>
  )
}

export default function TripleText(): JSX.Element {
  return (
    <>
      <Line>
        <LargeAndSmall
          large={'1000 $'}
          small={'Current price'}
        />
        <LargeAndSmall
          large={'1200 $'}
          small={'Next epoch price'}
        />
      </Line>
      <Line>
        <LargeAndSmall
          large={'700/999'}
          small={'Tokens sold'}
        />
      </Line>
    </>
  )
}
