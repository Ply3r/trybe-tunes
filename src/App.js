import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Album from './pages/Album';
import Login from './pages/Login';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/trybe-tunes/" component={ Login } />
          <Route path="/trybe-tunes/search" component={ Search } />
          <Route path="/trybe-tunes/album/:id" render={ (props) => <Album { ...props } /> } />
          <Route path="/trybe-tunes/favorites" component={ Favorites } />
          <Route exact path="/trybe-tunes/profile" component={ Profile } />
          <Route path="/trybe-tunes/profile/edit" component={ ProfileEdit } />
          <Route component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
