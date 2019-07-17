import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import userService from './utils/userService';
import { getAllDebts, createDebt, deleteDebt } from './utils/debtFormService';
import SignUpPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import NavBar from './components/NavBar/NavBar';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import LandingPage from './pages/LandingPage/LandingPage';
import './App.css';


class App extends Component {
  state = {
    isLoading: false,
    debtList: [],
    newDebt: {},
    user: userService.getUser(),
  }
  async componentDidMount() {
    if (this.state.user) {
      let debtList = await getAllDebts();
      this.setState({ debtList });
    }
  }
  handleGoogleUpdate = async (e) => {
    //Updates the model data based on the Google API call
    e.preventDefault();
    this.setState({ isLoading: true });
    let newDebt = await createDebt(this.state.newDebt);
    let debtList = [...this.state.debtList];
    // With the saved result, update state
    debtList.push(newDebt);
    window.scrollTo(0, 150);
    this.setState({
      debtList,
      isLoading: false
    });
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
    this.setState({ user: userService.getUser() });
  }
  handleDeleteDebt = (debt) => {
    deleteDebt(debt);
    let debtList = [...this.state.debtList];
    debtList.pop(debt);
    this.setState({ debtList });
    getAllDebts();
  }
  isFormInvalid() {
    //Prevent user from submitting the add debt form without necessary info
    return !(this.state.newDebt.balance && this.state.newDebt.apr && this.state.newDebt.minimumPayment);
  }
  render() {
    return (
      <div className="App">
        <main>
          <header className="App-header">
            <img className="App-logo" src="https://static.wixstatic.com/media/fc6bf7_e3adb2670cbb46f4be97152ee68f8901~mv2.png/v1/crop/x_20,y_0,w_733,h_333/fill/w_352,h_160,al_c,q_80,usm_0.66_1.00_0.01/WIH-word-whit.webp" alt="WEALTH IN HAND" />
            <NavBar
              user={this.state.user}
              handleLogout={this.handleLogout}
            />
          </header>
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
            <Route exact path='/dashboard' render={() =>
              userService.getUser() ?
                <DashboardPage
                  debtList={this.state.debtList}
                  handleChange={this.handleChange}
                  handleDeleteDebt={this.handleDeleteDebt}
                />
                :
                <Redirect to='/login' />
            } />
            <Route exact path="/" render={() =>
              <LandingPage
                user={this.state.user}
              />
            } />
          </Switch>
          {this.state.user ?
            <div>
              <div className="container">
                <div className="card card-signin my-5">
                  <div className="card-body">
                    <form onSubmit={this.handleGoogleUpdate}>
                      <div className="field-wrapper">
                        {this.state.debtList[0] ? <h2 className="accent-text">Add another debt.</h2> : <h2 className="accent-text"> Don't be shy. Tell us about your debt.</h2>}
                        <h4 className="text-muted">You might have an idea of what your debt interest rate is, but by the time you’ve made payments, you may be shocked to see how much those interest payments have added onto your bill.</h4>
                        <h5 className="text-left text-sm-left">Nickname for debt</h5>
                        <input
                          className="form-control"
                          placeholder="Chase Saphire Card"
                          name='name'
                          type='text'
                          onChange={this.handleChange}
                          value={this.state.newDebt.name} />
                        <br></br>
                      </div>
                      <h5 className="text-left text-sm-left">How much do you currently owe?</h5>
                      <div className="input-group">
                        <span className="input-group-addon">$</span>
                        <input
                          className="form-control"
                          placeholder="10,000"
                          name='balance'
                          type='number'
                          step='1'
                          onChange={this.handleChange}
                          value={this.state.newDebt.balance} />
                        <span className="input-group-addon">.00</span>
                      </div>
                      <br></br>
                      <h5 className="text-left text-sm-left">What's the annual interest rate?</h5>
                      <div className="input-group">
                        <input
                          className="form-control"
                          placeholder="7.5"
                          name='apr'
                          type='number'
                          step='0.01'
                          pattern="\d+"
                          onChange={this.handleChange}
                          value={this.state.newDebt.apr} />
                        <span className="input-group-addon">%</span>
                      </div>
                      <br></br>
                      <h5 className="text-left text-sm-left">What's the minimum monthly payment on this debt?</h5>
                      <div className="input-group">
                        <span className="input-group-addon">$</span>
                        <input
                          placeholder="100"
                          className="form-control"
                          name='minimumPayment'
                          type='number'
                          onChange={this.handleChange}
                          value={this.state.newDebt.minimumPayment} />
                        <span className="input-group-addon">.00</span>
                      </div>
                      <br></br>
                      <input
                        type='submit'
                        disabled={this.isFormInvalid()}
                        className="btn btn-success"
                        value={this.state.isLoading ? 'Loading...' : 'ANALYZE THIS DEBT'}
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div> : null
          } <br />
        </main>
        <footer className="App-footer">
          <hr />
          <div className="container">
            <div className="row">
              <div className="col-6">
                <p> team@wealthinhand.com
            </p>
              </div>
              <div className="col-6">
                <ul className="social-icons">
                  <li><a href="https://www.linkedin.com/company-beta/18112770/" target="_blank" rel="noopener noreferrer">
                    <img alt="White LinkedIn Icon" data-type="image" src="https://static.wixstatic.com/media/7528824071724d12a3e6c31eee0b40d4.png/v1/fill/w_40,h_40,al_c,q_80,usm_0.66_1.00_0.01/7528824071724d12a3e6c31eee0b40d4.webp" />
                  </a></li>
                  <li><a href="https://www.facebook.com/wealthinhand/" target="_blank" rel="noopener noreferrer">
                    <img alt="White Facebook Icon" data-type="image" src="https://static.wixstatic.com/media/23fd2a2be53141ed810f4d3dcdcd01fa.png/v1/fill/w_40,h_40,al_c,q_80,usm_0.66_1.00_0.01/23fd2a2be53141ed810f4d3dcdcd01fa.webp" />
                  </a></li>
                  <li><a href="https://www.instagram.com/wealthinhand/" target="_blank" rel="noopener noreferrer">
                    <img alt="White Instagram Icon" data-type="image" src="https://static.wixstatic.com/media/81af6121f84c41a5b4391d7d37fce12a.png/v1/fill/w_40,h_40,al_c,q_80,usm_0.66_1.00_0.01/81af6121f84c41a5b4391d7d37fce12a.webp" />
                  </a></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;