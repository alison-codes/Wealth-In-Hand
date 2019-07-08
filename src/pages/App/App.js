import React, { Component } from 'react';
import './App.css';
import DashboardPage from '../../pages/DashboardPage/DashboardPage';
import LandingPage from '../../pages/LandingPage/LandingPage';
import { Route, Switch } from 'react-router-dom';
import SecondPage from '../SecondPage/SecondPage';


class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <header className="App-header">WIH Title</header>
        <Switch>
        <Route exact path='/' render={() =>
            <LandingPage />
          } />
          <Route exact path='/dashboard' render={() =>
            <DashboardPage />
          } />
          <Route exact path='/secondpage' render={props =>
            <SecondPage
            ///{...props}
            />
          } />
        </Switch>
      </div>
    );
  }
}

export default App;
