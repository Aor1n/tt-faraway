import { Users } from '@UI/Users';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { COLORS } from '@/colors';
import { ModalProvider } from '@/providers/ModalProvider';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.PRIMARY,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ModalProvider>
        <ToastContainer />
        <Users />
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App;
