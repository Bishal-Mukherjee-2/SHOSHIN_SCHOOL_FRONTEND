import { useEffect } from 'react';
import { SnackbarProvider } from 'notistack';
import Slide from '@material-ui/core/Slide';

// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import AuthProvider from './contexts/AuthContext';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      TransitionComponent={Slide}
      maxSnack={3}
    >
      <AuthProvider>
        <ThemeConfig>
          <ScrollToTop />
          <Router />
        </ThemeConfig>
      </AuthProvider>
    </SnackbarProvider>
  );
}
