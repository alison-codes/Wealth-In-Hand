import React, { Component } from 'react';
import './App.css';
import DashboardPage from '../../pages/DashboardPage/DashboardPage';
import LandingPage from '../../pages/LandingPage/LandingPage';
import { Route, Switch } from 'react-router-dom';
import SecondPage from '../SecondPage/SecondPage';

// import amortization from '../../utils/amortization'

class App extends Component {
  constructor() {
    super();
    this.state = {
      debtList: [],
      debts: [{ name: 'app.jsTestName' }],
      user: null,
    };
    this.handleAmountChange = this.handleAmountChange.bind(this);
    // amortization.calculateTotalPayments();
  }
  handleAmountChange(debt) {
    this.setState({ debt });
  }
  // async componentDidMount(){
  //   let debtList = await fetch('/api/debts').then(res => res.json());
  //   this.setState({ debtList })
  // }
  render() {
    return (
      <div>
        <header className="App-header">Wealth In Hand</header>
        <main className="App">
          <Switch>
            <Route exact path='/' render={() =>
              <LandingPage />
            } />
            <Route exact path='/dashboard' render={() =>
              <DashboardPage
                debts={this.state.debts} 
                debtList={this.state.debts}/>
            } />
            <Route exact path='/secondpage' render={props =>
              <SecondPage
              />
            } />
          </Switch>
        </main>
        <footer className="App-footer">
          <img alt="White LinkedIn Icon" data-type="image" src="https://static.wixstatic.com/media/7528824071724d12a3e6c31eee0b40d4.png/v1/fill/w_40,h_40,al_c,q_80,usm_0.66_1.00_0.01/7528824071724d12a3e6c31eee0b40d4.webp" />
          <img alt="White Facebook Icon" data-type="image" src="https://static.wixstatic.com/media/23fd2a2be53141ed810f4d3dcdcd01fa.png/v1/fill/w_40,h_40,al_c,q_80,usm_0.66_1.00_0.01/23fd2a2be53141ed810f4d3dcdcd01fa.webp" />
          <a href="https://www.instagram.com/wealthinhand/" target="_blank" rel="noopener noreferrer" data-content="https://www.instagram.com/wealthinhand/">
            <img alt="White Instagram Icon" data-type="image" src="https://static.wixstatic.com/media/81af6121f84c41a5b4391d7d37fce12a.png/v1/fill/w_40,h_40,al_c,q_80,usm_0.66_1.00_0.01/81af6121f84c41a5b4391d7d37fce12a.webp" />
          </a>
          team@wealthinhand.com | San Francisco, CA
        </footer>

      </div>
    );
  }
}

export default App;
