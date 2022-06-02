import {PropsWithChildren} from 'react';
import {Box, Container} from '@mui/material';
import Account from '../../web3/Account/Account';

export type MainLayoutProps = PropsWithChildren<{}>;

export default function MainLayout({children}: MainLayoutProps): JSX.Element {
  return (
    <Container
      maxWidth="lg"
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: 'auto minmax(0, 1f)',
          gridTemplateColumns: 'minmax(0, 1fr)',
          gap: 2,
        }}
      >
        <Box
          sx={{
            paddingTop: 2,
            paddingBottom: 2,
            display: 'flex',
            justifyContent: 'end',
          }}
        >
          <Account/>
        </Box>
        <Box>
          {children}
        </Box>
      </Box>
    </Container>
  )
}
