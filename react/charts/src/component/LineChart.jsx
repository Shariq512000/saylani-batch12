import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomLineChart = () => {

    const customData = [
        {
          page: 'Page A',
          absent: 4000,
          present: 2400,
          amt: 2400,
        },
        {
            page: 'Page B',
            absent: 3000,
            present: 1398,
            amt: 2210,
        },
        {
            page: 'Page C',
            absent: 2000,
            present: 9800,
            amt: 2290,
        },
        {
            page: 'Page D',
            absent: 2780,
            present: 3908,
            amt: 2000,
        },
        {
            page: 'Page E',
            absent: 1890,
            present: 4800,
            amt: 2181,
        },
        {
            page: 'Page F',
            absent: 2390,
            present: 3800,
            amt: 2500,
        },
        {
            page: 'Page G',
            absent: 3490,
            present: 4300,
            amt: 2100,
        },
    ];

    return (
        <div className="" style={{marginTop: 50}}>
            <div style={{height: 350}}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={300}
                        data={customData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis dataKey="page" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="present" stroke="#00ff00" />
                    <Line type="monotone" dataKey="absent" stroke="#ff0000" />
                    <Line type="monotone" dataKey="amt" stroke="#0000FF" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default CustomLineChart