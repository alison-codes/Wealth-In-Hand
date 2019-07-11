import React from 'react';
import { Link } from 'react-router-dom';
import Greeting from '../../components/Greeting/Greeting';


const LandingPage = (props) => {
  return (
    <div >
      Landing page
      <Link to="/dashboard">
      Open Dashboard
      </Link>
    <Greeting />
     
    </div>
  );
};

export default LandingPage;