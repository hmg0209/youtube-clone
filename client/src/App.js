import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './index.scss';

import Landing from './views/Landing/Landing';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import VideoUpload from './views/VideoUpload/VideoUpload';

import Gnb from './components/Gnb/Gnb';
import Footer from './components/Footer/Footer';

import Auth from './hoc/Auth';

function App() {
  return (
    <Router>
      <Gnb />
      <div className="main">
        <Switch>
          <Route exact path="/" component={Auth(Landing, null)} />
          <Route exact path="/login" component={Auth(Login, false)} />
          <Route exact path="/register" component={Auth(Register, false)} />
          <Route exact path="/video/upload" component={Auth(VideoUpload, true)} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
