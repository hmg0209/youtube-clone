import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './index.scss';

import Landing from './views/Landing';
import Login from './views/Login';
import Register from './views/Register';

import Gnb from './components/Gnb/Gnb';
import Footer from './components/Footer/Footer';

import Auth from './hoc/Auth';

function App() {
  return (
    <Router>
      <Gnb />
      <Switch>
        <div class="main">
          <Route exact path="/" component={Auth(Landing, null)} />
          <Route exact path="/login" component={Auth(Login, false)} />
          <Route exact path="/register" component={Auth(Register, false)} />
        </div>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
