import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './index.scss';

import GuideMap from './views/_Guide/GuideMap';
import Guide from './views/_Guide/Guide';

import Landing from './views/Landing/Landing';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import VideoUpload from './views/VideoUpload/VideoUpload';
import VideoDetail from './views/VideoDetail/VideoDetail';
import Subscription from './views/Subscription/Subscription';

import Footer from './components/Footer/Footer';
import Gnb from './components/Gnb/Gnb';

import Auth from './hoc/Auth';

function App() {
  return (
    <Router>
      <Gnb />
      <div className="main">
        <Switch>
          <Route exact path="/_guide" component={Auth(GuideMap, null)} />
          <Route exact path="/_guide/guide" component={Auth(Guide, null)} />

          <Route exact path="/" component={Auth(Landing, null)} />
          <Route exact path="/login" component={Auth(Login, false)} />
          <Route exact path="/register" component={Auth(Register, false)} />
          <Route exact path="/video/upload" component={Auth(VideoUpload, true)} />
          <Route exact path="/video/:videoId" component={Auth(VideoDetail, null)} />
          <Route exact path="/subscription" component={Auth(Subscription, true)} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
