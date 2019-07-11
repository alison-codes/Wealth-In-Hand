import React, { Component } from 'react';
import './App.css';
import DashboardPage from '../../pages/DashboardPage/DashboardPage';
import LandingPage from '../../pages/LandingPage/LandingPage';
import { Route, Switch } from 'react-router-dom';
import SecondPage from '../SecondPage/SecondPage';
import NavBar from '../../components/NavBar/NavBar';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import userService from '../../utils/userService';
// import tokenService from '../../utils/tokenService';

// import googleSheets from '../../googleSheets'
// import index from '../../../index'
// import googlesheetsapi from 'services/google-sheets-api'

// import amortization from '../../utils/amortization'
// function getCurWeatherByLatLng() {
//   console.log(`!!!!`);
//   const endpoint = `https://spreadsheets.google.com/feeds/cells/1IAClT5484iFG6ByNMRmjoSUXYByDlIIiOwKtJ5KIJq8/od6/public/values?alt=json`;
//   fetch(endpoint)
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(myJson) {
//     console.log(JSON.stringify(myJson));
//   });
// }

class App extends Component {
  constructor() {
    super();
    this.state = {
      debtList: [],
      debts: [{ name: 'app.jsTestName' }],
      user: userService.getUser(),
      sampleAPR: .1,
    };
    user: userService.getUser()

    this.handleAmountChange = this.handleAmountChange.bind(this);
    // amortization.calculateTotalPayments();
    // googleSheets.sayHelloInEnglish();
    // googleSheets.SSS();
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }
  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
  }
  handleAmountChange(debt) {
    this.setState({ debt });
  }

  //Lifecycle Methods

  async componentDidMount() {
    let debtList = await fetch('/api/debts').then(res => res.json());
    this.setState({ debtList })
  }
  render() {
    return (
      <div>
        <header className="App-header">Wealth In Hand</header>
        <main className="App">
          <NavBar
            user={this.state.user}
            handleLogout={this.handleLogout}
          />
          <Switch>
            <Route exact path='/' render={() =>
              <LandingPage />
            } />
            <Route exact path='/signup' render={({ history }) =>
              <SignupPage
                history={history}
                handleSignupOrLogin={this.handleSignupOrLogin}
              />
            } />
            <Route exact path='/login' render={({ history }) =>
              <LoginPage
                history={history}
                handleSignupOrLogin={this.handleSignupOrLogin}
              />
            } />
            <Route exact path='/dashboard' render={() =>
              <DashboardPage
                debts={this.state.debts}
                debtList={this.state.debtList} />
            } />
            <Route exact path='/secondpage' render={props =>
              <SecondPage
              />
            } />
          </Switch>
        </main>
        <footer className="App-footer">
          <a href="https://www.linkedin.com/company-beta/18112770/" target="_blank" rel="noopener noreferrer">
            <img alt="White LinkedIn Icon" data-type="image" src="https://static.wixstatic.com/media/7528824071724d12a3e6c31eee0b40d4.png/v1/fill/w_40,h_40,al_c,q_80,usm_0.66_1.00_0.01/7528824071724d12a3e6c31eee0b40d4.webp" />
          </a>
          <a href="https://www.facebook.com/wealthinhand/" target="_blank" rel="noopener noreferrer">
            <img alt="White Facebook Icon" data-type="image" src="https://static.wixstatic.com/media/23fd2a2be53141ed810f4d3dcdcd01fa.png/v1/fill/w_40,h_40,al_c,q_80,usm_0.66_1.00_0.01/23fd2a2be53141ed810f4d3dcdcd01fa.webp" />
          </a>
          <a href="https://www.instagram.com/wealthinhand/" target="_blank" rel="noopener noreferrer">
            <img alt="White Instagram Icon" data-type="image" src="https://static.wixstatic.com/media/81af6121f84c41a5b4391d7d37fce12a.png/v1/fill/w_40,h_40,al_c,q_80,usm_0.66_1.00_0.01/81af6121f84c41a5b4391d7d37fce12a.webp" />
          </a>
          &nbsp;&nbsp;&nbsp; team@wealthinhand.com | San Francisco, CA
        </footer>

      </div>
    );
  }
}

export default App;
