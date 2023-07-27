import { Users } from '@UI/Users';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { COLORS } from '@/colors';
import { ModalProvider } from '@/providers/ModalProvider';

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
        <Users />
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App;
