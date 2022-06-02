import {Box, Button} from '@mui/material';
import {useAuthModalContext} from '../../components/web3/Account/auth-modal-context';

export default function MainPage(): JSX.Element {
  const {setIsAuthModalVisible} = useAuthModalContext()
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button
        type="button"
        onClick={() => setIsAuthModalVisible(true)}
      >
        Auth
      </Button>
    </Box>
  )
}
