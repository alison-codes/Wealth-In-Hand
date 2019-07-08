import React from 'react';
import { Link } from 'react-router-dom';
import Dashboard from '../../components/Dashboard/Dashboard';


const DashboardPage = (props) => {
  return (
    <div >
      <div >
        Here's your finanacial info...
        <Dashboard />
        <div>
          <Link to='/secondpage'>Link to another page</Link>
        </div>
      </div>
      <footer>
        Footer
      </footer>
    </div>
  );

};

export default DashboardPage;