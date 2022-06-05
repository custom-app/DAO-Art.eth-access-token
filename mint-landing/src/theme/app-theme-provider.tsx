import {PropsWithChildren} from 'react'
import {CssBaseline, ThemeProvider} from '@mui/material';
import {appTheme} from './app-theme';

export default function AppThemeProvider({children}: PropsWithChildren<{}>): JSX.Element {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline/>
      {children}
    </ThemeProvider>
  )
}
