import './App.css';
import Show from './components/Show'
import Home from './components/Home'
import {
  BrowserRouter,
  Link,
  Switch,
  Route
} from 'react-router-dom'
import Navbar from './components/Navbar';
import { Container, Paper } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Watchlist from './components/Watchlist';


const theme = createTheme({
  palette: {
    primary: {
      main: '#172A3A',
    },
    secondary: {
      main: '#508991',
    },
    mixins: {
      toolbar: {
        minHeight: 12
      }
    },
    text: {
      primary: '#ffff',
      secondary: '#ffff'
    },
    background: {
      paper: '#172A3A'
    }

  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      
      <div className="App">
        <BrowserRouter>
          <Container maxWidth="lg">
            
            <Switch>
              <Route exact path="/">
              <Navbar />
                <Home />
              </Route>
              <Route exact path="/show/:search">
              <Navbar />
                <Show />
              </Route>
              <Route exact path="/signup">
                <SignUp/>
              </Route>
              <Route exact path='/signin'>
                <SignIn/>
              </Route>
              <Route exact path='/watchlist/:_id'>
              <Navbar />
                <Watchlist/>
              </Route>
            </Switch>
          </Container>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
