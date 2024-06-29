import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const MarketSharePieChart = () => {
    // Market share data
    const data = [
        { sector: 'Technology', percentage: 30 },
        { sector: 'Healthcare', percentage: 20 },
        { sector: 'Financials', percentage: 15 },
        { sector: 'Service', percentage: 10 },
        { sector: 'Food', percentage: 5 },
        { sector: 'Other sectors', percentage: 20 }
    ];


    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#7A27F1', '#FF19AF'];

    const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any[]; }) => {
        console.log('active', active, 'payload', payload);

        if (active && payload && payload.length) {
            return (
                <>
                    <div className='bg-white px-5 py-3 rounded-md shadow-xl'>
                        <div className={`flex text-sm text-[#858C95] gap-1 items-center `}>
                            <h1 className="capitalize font-semibold " style={{ color: payload[0].payload.fill }}>{payload[0].payload.sector} </h1>
                            <p className=" text-gray-500 font-medium "> : {payload[0].payload.percentage}%</p>
                        </div>
                    </div>
                </>
            );
        }
    }

    return (
        <div className='h-[400px] w-full  bg-white rounded-md mb-4 shadow-lg'>
            <div className='flex justify-between items-center py-5 px-5'>
                <h1 className='text-2xl font-bold text-gray-700  pl-5'>Market Share Overview</h1>
            </div>
            <div className='w-full h-[90%] flex flex-col items-center  gap-5 '>
                <div className='basis-[50%]  w-[100%]  h-[100%] '>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="percentage"
                            >
                                {
                                    data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}
                                        />
                                    ))
                                }
                            </Pie>
                            <Tooltip content={CustomTooltip} formatter={(value, name, props) => `${name} : ${value}%`} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className='basis-[50%] flex flex-col items-center'>
                    <h3 className='font-bold pb-3'>Stock market</h3>
                    <div className='grid grid-cols-2 '>
                        {data.map((singleData, i) => <div key={i} className='flex gap-2 items-center '>
                            <div style={{ backgroundColor: COLORS[i] }} className={`h-[12px] w-[12px] rounded-sm`}></div>
                            <div className='text-gray-500'>
                                {singleData.sector}
                            </div>

                        </div>)}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MarketSharePieChart;