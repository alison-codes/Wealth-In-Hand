import React from 'react';
import { Link } from 'react-router-dom';


const LandingPage = (props) => {
  return (
    <div >
      Landing page
      <Link to="/dashboard">
      Open Dashboard
      </Link>

     
    </div>
  );
};

export default LandingPage;