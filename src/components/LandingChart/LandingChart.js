import React, { PureComponent } from 'react';
import { RadialBarChart, RadialBar, Legend } from 'recharts';

const data = [
  {
    name: '$0', uv: 11, pv: 1000, fill: '#6a8d5a',
  },
  {
    name: '$1 - 500', uv: 29, pv:  1000, fill: '#a4de6c',
  },
  {
    name: '$501 - 2,500', uv: 32, pv: 1000, fill: '#d0ed57',
  },
  {
    name: '$2,501 - 5,000', uv: 10, pv: 1000, fill: '#ffc658',
  },
  {
    name: 'More than $5,000', uv: 17, pv: 1000, fill: '#f5e7cd',
  },
];


// {
//     name: '18-24', uv: 31.47, pv: 22000, fill: '#6a8d5a',
//   },
//   {
//     name: '25-34', uv: 26.69, pv: 42000, fill: '#a4de6c',
//   },
//   {
//     name: '35-49', uv: 15.69, pv: 39000, fill: '#d0ed57',
//   },
//   {
//     name: '50+', uv: 8.22, pv: 36000, fill: '#ffc658',
//   },

const style = {
  top: 0,
  left: 350,
  lineHeight: '24px',
};


export default class Example extends PureComponent {

  render() {
    return (
        <section className="LandingChart-rechart">
          {/* TODO edit chart details */}
            <h4>Revolving credit card debt</h4>
      <RadialBarChart width={500} height={300} cx={150} cy={150} innerRadius={20} outerRadius={140} barSize={10} data={data}>
        <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} background clockWise dataKey="uv" />
        <Legend iconSize={10} width={120} height={140} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
      </RadialBarChart>
      </section>
    );
  }
}
