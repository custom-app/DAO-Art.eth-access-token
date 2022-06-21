import {Box, CircularProgress, Dialog, DialogContent, DialogProps} from '@mui/material';
import {MintResult} from '../../../helpers/dao-contract';
import {FullDialogTitle} from '../../dialog/full-dialog-title';
import AddressWithExplorer from '../address-with-explorer';
import ErrorDisplay from '../../data-display/error-display';
import {defaultConfig} from '../../../helpers/networks';
import {stringifyError} from '../../../helpers/error';

export interface MintResultDialogProps extends DialogProps {
  result?: MintResult
}

export default function MintResultDialog(
  {
    open,
    onClose,
    result
  }: MintResultDialogProps
): JSX.Element {
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <FullDialogTitle
        onClose={onClose && ((event) => onClose(event, 'backdropClick'))}
      >
        {result ? (result.success ? 'Minted!' : 'Error') : 'Minting...'}
      </FullDialogTitle>
      <DialogContent>
        {
          result
            ? result.success
              ? (
                <>
                  <Box
                    sx={{
                      typography: 'body1',
                      marginBottom: 1,
                    }}
                  >
                    Check the mint transaction
                  </Box>
                  {
                    result.tx.hash && (
                      <AddressWithExplorer
                        isTx
                        address={result.tx.hash}
                      />
                    )
                  }
                </>
              )
              : (
                (
                  // errors look different in mainnet and testnet
                  (result.error?.data?.code === -32000 || result.error?.error?.code === -32000) && (
                    <ErrorDisplay
                      error={`Insufficient funds. Please, deposit ${defaultConfig.currencySymbol} to your address`}
                    />
                  )
                ) || (
                  result.error?.data?.code === 3 && (
                    <ErrorDisplay
                      error={result.error?.data?.message || stringifyError(result.error)}
                    />
                  )
                ) || (
                  result.error?.error?.code === 3 && (
                    <ErrorDisplay
                      error={result.error?.error?.message || stringifyError(result.error)}
                    />
                  )
                ) || (
                  <ErrorDisplay
                    error={stringifyError(result.error)}
                  />
                )
              )
            : (
              <Box
                sx={{
                  typography: 'body1',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  flexWrap: 'nowrap',
                }}
              >
                <CircularProgress
                  size={48}
                />
                <Box
                  sx={{
                    marginTop: 2,
                  }}
                >
                  This action may take some time.
                </Box>
              </Box>
            )
        }
      </DialogContent>
    </Dialog>
  )
}
