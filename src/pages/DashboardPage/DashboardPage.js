import React, { Component } from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import Dashboard from '../../components/Dashboard/Dashboard';

import './DashboardPage.css';

class DashboardPage extends Component {
  render() {
    const COLORS = ['#6a8d5a', '#00C49F', '#FFBB28', '#FF8042'];
    const data = [{}, {},];
    const debtList = this.props.debtList.map((d, idx) => (
      <div className="card card-signin my-5">
        <div className="card-header" id="headingOne">
          <button
            className="accent-text btn-link"
            type="button"
            data-toggle="collapse"
            data-target={"#d" + idx}
            aria-expanded="true"
            aria-controls="collapseOne">
            {d.name} with a minimum monthly payment of ${d.minimumPayment}
          </button>
        </div>
        <div
          id={"d" + idx}
          className="collapse show"
          aria-labelledby="headingOne">
          <div className="card-body">

            <div>
              <div className="row">
                <div className="col-md-7">
                  <h2>{d.name}</h2>
                  <section key={idx}>You currently owe: ${d.balance}.
                  <h5>Your debt will be paid off by
                    <strong> {d.monthPaidOff}</strong>, which means you have {d.monthsremaining} more monthly payments if you choose to only pay the minimum.
                  </h5>
                    <div className="text-center">
                      <h2 className="alert alert-warning">{Number(d.totalInterest) ? <div className="lead">At your current payment rate, you will have paid ${d.totalInterest} in interest alone!</div>
                        :
                        'Your payments comprise a very low portion of the outstanding balance on this debt. We suggest you speak a financial adivsor to review your debt plan.'}
                      </h2>
                    </div>
                    <button className="btn" onClick={() => this.props.handleDeleteDebt(d._id)}>DELETE THIS DEBT</button>
                  </section>

                </div>
                <div className="col-md-5">
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
      </div>
    ));

    let totalDebtBurden = 0, totalInterestBurden = 0, numDebtsAdded = 0;
    this.props.debtList.forEach(d => {
      totalDebtBurden += d.balance;
      numDebtsAdded += 1;
      totalInterestBurden += d.totalInterest;
    });
    return (
      <div className="DashboardPage-component">
        <Dashboard
          onAmountChange={this.handleAmountChange} />
        {this.props.debtList.length ?
          <div>
            {this.props.debtList[1] ?
              <div className="card my-5">
                <div className="card-header" id="headingOne">
                  <button
                    className="accent-text btn-link"
                    type="button"
                    data-toggle="collapse"
                    data-target="#summary"
                    aria-expanded="true"
                    aria-controls="collapseOne">
                    Your debt summary
                </button>
                </div>
                <div
                  id="summary"
                  className="collapse show"
                  aria-labelledby="headingOne">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="text-center summary-text">
                      
                          <h2>Financial Goals: It's a Marathon, Not a Sprint.</h2>
                          <h5>Celebrating small milestones, like getting another $1,000 knocked off your debt total, starting to put money aside for retirement or paying off a credit card balance, is important.</h5>
                          <h3>You collectively owe ${totalDebtBurden} based on the {numDebtsAdded} debts you added. In the process of paying off these debts, you will pay ${totalInterestBurden} as interest.</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              : null}

            <div className="container">
              <div >
                {debtList}
              </div>
            </div>
          </div>
          :
          null
        }

      </div>
    );
  };

}
export default DashboardPage;


