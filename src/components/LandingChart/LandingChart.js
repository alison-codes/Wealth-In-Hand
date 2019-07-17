import React, { PureComponent } from 'react';
import { RadialBarChart, RadialBar, Legend } from 'recharts';

const data = [
  {
    name: '18-24 ($5,500)', uv: 5500, pv: 1000, fill: '#6a8d5a',
  },
  {
    name: '25-34 ($17,860)', uv: 17860, pv:  1000, fill: '#a4de6c',
  },
  {
    name: '35-44 ($12,440)', uv: 12440, pv: 1000, fill: '#d0ed57',
  },
  {
    name: '45-54 ($9,610)', uv: 9610, pv: 1000, fill: '#ffc658',
  },
  {
    name: '55+ ($8,200)', uv: 8200, pv: 1000, fill: '#f5e7cd',
  },
];

const style = {
  top: 0,
  left: 350,
  lineHeight: '24px',
};


export default class Example extends PureComponent {

  render() {
    return (
        <section className="LandingChart-rechart">
            <h5>Average revolving credit card debt by age</h5>
      <RadialBarChart width={400} height={300} cx={150} cy={150} innerRadius={20} outerRadius={140} barSize={10} data={data}>
        <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} background clockWise dataKey="uv" />
        <Legend iconSize={10} width={120} height={140} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
      </RadialBarChart>
      </section>
    );
  }
}
