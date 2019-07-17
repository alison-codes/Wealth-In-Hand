import React from 'react';
import { Link } from 'react-router-dom';
import DebtInfo from '../../components/DebtInfo/DebtInfo';
import './Bootstrap.css';
import './LandingPage.css';
import image from '../../app-pic.png';


const LandingPage = (props) => {
  return (
    <div >
      <div className="jumbotron jumbotron-fluid feature" id="Landing-background">
        <div className="container my-5">
          <div className="row justify-content-between text-center text-md-left">
            <div className="col-md-6">
              <h2 className="font-weight-bold accent-text">Ready. Set. Goals.</h2>
              <p className="my-4"> At Wealth IN HAND, we know the first step to effectively managing your debt is determining where you stand—let us help you understand the effect of your debt.</p>
              {props.user ?
                <Link to="/dashboard" className="btn my-4 font-weight-bold main-cta"> ANALYZE YOUR DEBT</Link>
                : <Link to="/signup" className="btn my-4 font-weight-bold main-cta"> ANALYZE YOUR DEBT</Link>} <br />
            </div>
            <div className="col-md-6 align-self-center">
              <img src={image} alt="Debt tool" />
            </div>
          </div>
        </div>
      </div>
      <DebtInfo />
    </div>

  );
};

export default LandingPage;

