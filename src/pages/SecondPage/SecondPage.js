import React from 'react';
import { Link } from 'react-router-dom';
import './SecondPage.css';
var Finance = require('financejs');


class SecondPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      total: 0,
      apr: 0,
      added: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      added: true,
    });
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    //Calculate total interest charges
    let balance = this.state.value;
    let terms = 24;
    let yearlyRate = this.state.apr;
    //Use financeJS  to determine monthly payment
    let finance = new Finance();
    let payment = finance.AM(balance, yearlyRate, terms, 1)

    let totalPaid = (payment * terms).toFixed(2)
    console.log('apr', + this.state.apr)

    this.setState({
      total: totalPaid,
    });
  }

  render() {
    return (
      <div>
        Tell us what you owe
        <div>
          <label>Interest rate</label>
          <input
            type="number"
            name="apr"
            value={this.state.apr}
            onChange={this.handleChange}
            pattern="\d+" 
            step="0.01"
            max="30"
            min="0"
            />
        </div>

        <form onSubmit={this.handleSubmit}>
          <label>
            Principal:
          <input
              type="number"
              name="value"
              value={this.state.value}
              onChange={this.handleChange} 
              min="0"
              pattern="\d+" 
              max="10000000"
              />
          </label>
          <input type="submit" value="Submit"  />
        </form>
        <div>
          {this.state.added && this.state.total ?
            <div>
              <h2>With interest, you'll pay ${this.state.total} before you pay off this debt</h2>
              <Link to='/dashboard'>Continue to your dashboard</Link>
            </div>
            :
            <div></div>
          }
        </div>
      </div>
    );
  }
}


export default SecondPage;


// total={ amortization.calculateTotalPayments()}
