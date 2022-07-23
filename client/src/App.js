import './App.css';
import Login from './components/Login';
import NavBar from './components/NavBar';
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';
import SearchResults from './components/SearchResults';
import Watchlist from './components/Watchlist';
import Show from './components/Show';
import Home from './components/Home';
import Register from './components/Register';
import EditShow from './components/EditShow';

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <NavBar />
            <Home/>
          </Route>
          <Route exact path="/search/:search">
            <NavBar />
            <SearchResults />
          </Route>
          <Route exact path="/register">
            <Register/>
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/watchlist/:_id'>
            <NavBar />
            <Watchlist/>
          </Route>
          <Route exact path="/show/:id">
            <NavBar/>
            <Show/>
          </Route>
          <Route exact path="/edit/:_id">
            <NavBar/>
            <EditShow/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
