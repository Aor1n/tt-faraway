import { Users } from '@UI/Users';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { COLORS } from '@/colors';

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
      <Users />
    </ThemeProvider>
  );
}

export default App;
