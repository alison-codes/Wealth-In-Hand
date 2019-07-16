import React from 'react';
import { Link } from 'react-router-dom';
// import Greeting from '../../components/Greeting/Greeting';
import LandingChart from '../../components/LandingChart/LandingChart';
import DebtInfo from '../../components/DebtInfo/DebtInfo';
import './LandingPage.css';
import './Bootstrap.css';
import image from '../../app-pic.png';


const LandingPage = (props) => {
  return (
    <div >
    <div className="jumbotron jumbotron-fluid feature Landing-background" id="Landing-background">
        <div className="container my-5">
            <div className="row justify-content-between text-center text-md-left">
                <div className="col-md-6">
                    <h2 className="font-weight-bold accent-text">Ready. Set. Goals.</h2>
                    <p className="my-4"> At Wealth IN HAND, we know the first step to effectively managing your debt is determining where you stand—let us help you understand the effect of your debt.</p>
                     {props.user ? 
                        <Link to="/dashboard" className="btn my-4 font-weight-bold main-cta"> DELETE YOUR DEBT</Link>
                        : <Link to="/login" className="btn my-4 font-weight-bold main-cta"> DELETE YOUR DEBT</Link>} <br />
                </div>
                <div className="col-md-6 align-self-center">
                    <img src={image}  />
                </div>
            </div>
        </div>
    </div>
           
      <DebtInfo />
     
    </div>
  );
};

export default LandingPage;