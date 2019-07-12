import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import userService from './utils/userService';
import { getAllDebts, createDebt, updateGoogleSheet } from './utils/debtFormService';
import SignUpPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import NavBar from './components/NavBar/NavBar';

import './App.css';

class App extends Component {
  state = {
    debtList: [],
    newDebt: {
      name: '',
      balance: '',
    },
    user: userService.getUser(),
    apr: .1,
  }

  async componentDidMount() {
    let debtList = await getAllDebts();
    this.setState({ debtList });
  }

  handleGoogleUpdate = (e) => {
    // e.preventDefault();
    createDebt(this.state.newDebt);
  }

  handleChange = (e) => {
    let newDebt = { ...this.state.newDebt }
    newDebt[e.target.name] = e.target.value;

    this.setState({
      newDebt,
    })
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() })
  }

  render() {
    const debtList = this.state.debtList.map((debts, idx) => (
      <li key={idx}>{debts.name}:${debts.balance} owed</li>
    ));
    return (
      <div className="App">
        <header className="App-header">Wealth In Hand
        <NavBar
            user={this.state.user}
            handleLogout={this.handleLogout}
          />
        </header>
        <main className="App">

          <Switch>
            <Route exact path="/signup" render={({ history }) =>
              <SignUpPage
                history={history}
                handleSignupOrLogin={this.handleSignupOrLogin}
              />
            } />
            <Route exact path="/login" render={({ history }) =>
              <LoginPage
                history={history}
                handleSignupOrLogin={this.handleSignupOrLogin}
              />
            } />
          </Switch>
          {this.state.user && debtList.length ?
            <div>
              <h2> List of what you owe</h2>
              <ol>
                {debtList}
              </ol>
            </div>
            :
            <h4>We don't know enougth about your debts to provide you with guidance</h4>
          }
          <br />


          {this.state.user &&
            <form onSubmit={this.handleGoogleUpdate}>
              <div className="field-wrapper">
                <label>Name</label>
                <input
                  name='name'
                  type='text'
                  onChange={this.handleChange}
                  value={this.state.newDebt.name} />
                <br></br>
                <label>Balance</label>
                <input
                  name='balance'
                  type='number'
                  onChange={this.handleChange}
                  value={this.state.newDebt.balance} />
              </div>
              <input type='submit' value='Submit' />
            </form>
          }

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
