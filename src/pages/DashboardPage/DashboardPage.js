import React, { Component, PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, } from 'recharts';

import { Link } from 'react-router-dom';
import Dashboard from '../../components/Dashboard/Dashboard';
// import debtService from '../../utils/debtService';
import './DashboardPage.css';



class DashboardPage extends Component {

  render() {
    const COLORS = ['#6a8d5a', '#00C49F', '#FFBB28', '#FF8042'];
    const data = [
      {  },
      { },
    ];
    const debtList = this.props.debtList.map((debts, idx) => (
      <div>
        <li key={idx}>{debts.name}:${debts.balance} owed<div>Paid off {debts.monthPaidOff}  </div>
        <div className="text-center">

        <PieChart className="text-center" width={300} height={300} onMouseEnter={this.onPieEnter}>

          <Pie className="text-center"
            data={[
              { name: 'Amount paid to principal', value: debts.balance },
              { name: 'Amount paid to interest', value: debts.totalInterest },
            ]}
            cx={120}
            cy={200}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {
              data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
            }
          </Pie>
        </PieChart>
        </div>
        </li>
      </div>
    ));
    return (
      <div className="DashboardPage-component">

        <Dashboard
          onAmountChange={this.handleAmountChange} />
        {this.props.debtList.length ?
          <div>
            <div className="container">
              <div className="card card-signin my-5">
                <div className="card-body">
                  <h2> List of what you owe</h2>
                  <ol>
                    debt name: {debtList}
                  </ol>

                </div>
              </div>
            </div>
          </div>
          :
          <h4>No debts yet</h4>
        }
        {/* <div>
          <Link to='/secondpage'>Link to tell add a debt</Link>
        </div> */}
        {/* <form onSubmit={this.props.handleGoogleUpdate}>
              <div className="field-wrapper">
                <label>Name</label>
                <input
                  name='name'
                  type='text'
                  onChange={this.props.handleChange}
                  value={this.props.newDebt.name} />
                <br></br>
                <label>Balance</label>
                <input
                  name='balance'
                  type='number'
                  onChange={this.props.handleChange}
                  value={this.props.newDebt.balance} />
              </div>
              <input type='submit' value='Submit' />
            </form> */}

      </div>
    );

  };

}
export default DashboardPage;


{/* <new component {...debts} /> */ }