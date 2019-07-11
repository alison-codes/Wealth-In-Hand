import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dashboard from '../../components/Dashboard/Dashboard';
import debtService from '../../utils/debtService';
import './DashboardPage.css';


class DashboardPage extends Component {
  // async componentDidMount() {
  //   const debts = await debtService.index();
  // }

  render() {
    const debtList = this.props.debtList.map((debts, idx) => (

      <li key={idx}>{debts.name}</li>
    ));
    return (
      <div className="DashboardPage-component">

        Here's your finanacial info...

        <Dashboard
          onAmountChange={this.handleAmountChange} />
        {this.props.debtList.length ?
          <div>
            <h2> List of what you owe</h2>
            <ol>
              debt name: {debtList}
            </ol>
          </div>
          :
          <h4>No debts yet</h4>
        }
        <div>
          <Link to='/secondpage'>Link to tell add a debt</Link>
        </div>

      </div>
    );

  };

}
export default DashboardPage;


{/* <new component {...debts} /> */ }