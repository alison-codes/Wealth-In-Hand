import React from 'react';
import './DebtInfo.css';
import LandingChart from '../../components/LandingChart/LandingChart';


const DebtInfo = (props) => (
    <div className="row">
        <div className="col-md-12">
            <section className="DebtInfo-text text-center">
                <h1 className="accent-text">Let's talk about debt.</h1>
                <LandingChart />
                <p>When you’re worried about money and feel your options are limited, debt can feel like a pair of handcuffs.
                    And if it feels like you can’t do what you want to do—which is to pay it all off and get yourself free—there’s the temptation to do nothing.
                    You can escape debt, of course, but unless you expect to win the lottery or inherit a large sum of money, it helps to have a solid plan for how you’ll do it.
                </p>
                <hr />
            </section>
        </div>
    </div>
);

export default DebtInfo;
