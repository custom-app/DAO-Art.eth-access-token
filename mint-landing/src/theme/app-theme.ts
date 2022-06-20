import {createTheme} from '@mui/material';

const customFontDefaults = {
  fontWeight: 500, // Only one font is used
}

export const appTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
      contrastText: '#000000',
    },
    secondary: {
      // not supposed to be used, but just in case
      main: '#0f62fe',
      contrastText: '#ffffff',
    }
  },
  typography: {
    fontFamily: '"Source Code Pro", monospace',
    h1: customFontDefaults,
    h2: customFontDefaults,
    h3: customFontDefaults,
    h4: customFontDefaults,
    h5: customFontDefaults,
    h6: customFontDefaults,
    subtitle1: customFontDefaults,
    subtitle2: customFontDefaults,
    body1: customFontDefaults,
    body2: customFontDefaults,
    button: customFontDefaults,
    caption: customFontDefaults,
    overline: customFontDefaults,
  },
  components: {
    MuiCssBaseline: {
      // ммм, css без подсветки синтаксиса, как неожиданно и приятно
      styleOverrides: `
@font-face {
    font-family: 'Source Code Pro';
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    src: 
      local('Source Code Pro'), 
      url('${process.env.PUBLIC_URL}/fonts/SourceCodePro-Medium.ttf') format('truetype');
}
      `
    }
  }
})
