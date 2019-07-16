import React, { Component } from 'react';
import { PieChart, Pie, Sector, Cell, Legend } from 'recharts';

import { Link } from 'react-router-dom';
import Dashboard from '../../components/Dashboard/Dashboard';
import Chart from '../../components/Chart/Chart';

// import debtService from '../../utils/debtService';
import './DashboardPage.css';


class DashboardPage extends Component {
  render() {
    const COLORS = ['#6a8d5a', '#00C49F', '#FFBB28', '#FF8042'];
    const data = [{}, {},];
    const debtList = this.props.debtList.map((d, idx) => (
      <div className="card card-signin my-5">
        <div className="card-body">
          <div>
            <div className="row">
              <div className="col-sm-7">
                <h2>{d.name}</h2>

                <section key={idx}>You currently owe: ${d.balance}.
                  <h5>Your debt will be paid off by
                    <strong> {d.monthPaidOff}</strong>, which means you have {d.monthsremaining} more monthly payments if you choose to only pay the minimum.
                  </h5>

                  <div className="text-center">
                    {/* <Chart 
          balance={d.balance}/> */}
                    <h2 className="alert alert-warning">{Number(d.totalInterest) ? <div className="lead">At your current payment rate, you will have paid ${d.totalInterest} in interest alone!</div>
                      : 
                      'Your payments comprise a very low portion of the outstanding balance on this debt. We suggest you speak a financial adivsor to review your debt plan.'} 
                    </h2>
                  </div>
                  <button className="btn" onClick={() => this.props.handleDeleteDebt(d._id)}>DELETE THIS DEBT</button>
                </section>


              </div>
              <div className="col-sm-5">
                <PieChart className="text-center"
                  width={300}
                  height={300}
                  onMouseEnter={this.onPieEnter}
                  margin={0}
                >
                  <Legend verticalAlign="left" height={36} />
                  <Pie className="text-center"
                    data={[
                      { name: 'Amount repaid as principal', value: d.balance },
                      { name: 'Amount paid as interest', value: d.totalInterest },
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
            </div>



          </div>
        </div>
      </div>
    ));
    return (
      <div className="DashboardPage-component">

        <Dashboard
          onAmountChange={this.handleAmountChange} />
        {this.props.debtList.length ?
          <div>
            <div className="container">

              {/* <h2> List of what you owe</h2> */}
              <div >
                {debtList}
              </div>


            </div>
          </div>
          :
          <h4></h4>
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