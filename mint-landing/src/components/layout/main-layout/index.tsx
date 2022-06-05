import {PropsWithChildren} from 'react';
import {Box, Container} from '@mui/material';
import Account from '../../web3/Account/Account';
import Web3ConnectionMessage from '../../web3/web3-connection-message';

export type MainLayoutProps = PropsWithChildren<{}>;

export default function MainLayout({children}: MainLayoutProps): JSX.Element {
  return (
    <Container
      maxWidth="lg"
      sx={{
        height: '100%',
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: 'auto minmax(0, 1fr)',
          gridTemplateColumns: 'minmax(0, 1fr)',
          height: '100%',
        }}
      >
        <Box
          sx={{
            paddingTop: 2,
            paddingBottom: 2,
            display: 'flex',
            justifyContent: 'end',
            gap: 1,
          }}
        >
          <Web3ConnectionMessage/>
          <Account/>
        </Box>
        <Box
          sx={{
            height: '100%',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              display: 'none'
            },
            scrollbarWidth: 'none',
          }}
        >
          {children}
        </Box>
      </Box>
    </Container>
  )
}
