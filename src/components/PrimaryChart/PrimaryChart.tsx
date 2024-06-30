import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { VscLoading } from "react-icons/vsc";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { useSelector } from 'react-redux';

type Props = {

};

const PrimaryChart = ({ }: Props) => {
  const { stocksData } = useSelector((state: any) => state.stocks)
  const [selectedTradeCode, setSelectedTradeCode] = useState<string>('1JANATAMF');
  const [formattedData, setFormattedData] = useState<any[] | null>(null);
  const [tradeCodes, setTradeCodes] = useState<any[] | null>(null);
  const animatedComponents = makeAnimated();

  useEffect(() => {
    if (stocksData) {
      const filteredData = stocksData.filter((entry: any) => entry.trade_code === selectedTradeCode);
      setFormattedData(filteredData?.map((singleData: any) => {
        return {
          name: singleData.date,
          close: parseFloat(singleData.close),
          volume: parseInt(singleData.volume.replace(/,/g, ''), 10),
        }
      }))
      setTradeCodes([...new Set(stocksData.map((entry: any) => entry.trade_code))].map(code => {
        return { value: code, label: code };
      }))
    }

  }, [stocksData, selectedTradeCode]);


  const dataFormatter = (number: number) => {
    if (number > 1000000000) {
      return (number / 1000000000).toString() + 'B';
    } else if (number > 1000000) {
      return (number / 1000000).toString() + 'M';
    } else if (number > 1000) {
      return (number / 1000).toString() + 'K';
    } else {
      return number.toString();
    }
  }
  const dateFormatter = (date: string, type: 'axis' | 'tooltip') => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    if (type === 'axis') {
      return `${day}-${month}`;
    } else {
      return `${day}-${month}-${year}`;
    }
  }



  console.log('formattedData=====', formattedData);

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any[]; }) => {
    console.log('active', active, 'payload', payload);
    if (active && payload && payload.length) {
      return (
        <>
          <div className='bg-white px-5 py-3 border rounded-md shadow-xl'>
            <h3 className='font-bold text-gray-700'>{dateFormatter(payload[0].payload.name, 'tooltip')}</h3>
            <div className={`flex text-sm text-[#858C95]   gap-1 items-center `}>
              <div className={`w-[8px] h-[8px] rounded-[2px] bg-[#9066F6]`}></div>
              <h1 className="capitalize font-semibold">{payload[0].dataKey} </h1>
              <p className=" text-gray-600 font-medium "> - {dataFormatter(payload[0].value)}</p>
            </div>
            <div className={`flex text-sm text-[#858C95]   gap-1 items-center `}>
              <div className={`w-[8px] h-[8px] rounded-[2px] bg-[#ff7300]`}></div>
              <h1 className="capitalize font-semibold">{payload[1].dataKey} </h1>
              <p className=" text-gray-500 font-medium "> - {dataFormatter(payload[1].value)}</p>
            </div>
          </div>
        </>
      );
    }
  }

  return (
    <div className='h-[400px] min-w[300px] bg-white rounded-md mb-4 shadow-lg'>
      <div className='flex justify-between items-center py-5 px-5'>
        <h1 className='text-2xl font-bold text-gray-700  pl-5'>Performance Overview</h1>
        <div className='w-[200px] max-h-[50px]'>
          {tradeCodes ?
          
            <Select
              className="basic-single  "
              classNamePrefix="select"
              defaultValue={{ value: '1JANATAMF', label: '1JANATAMF' }}
              isClearable={false}
              isSearchable={true}
              name="tradeCode"
              onChange={(e: any) => setSelectedTradeCode(e?.value)}
              components={animatedComponents}
              options={tradeCodes}
              placeholder='Trade code'
            /> :
            <div className='w-full hover:cursor-progress h-full p-5 border-2 rounded-md shadow-sm animate-pulse'>
            </div>
          }
        </div>
      </div>
      {formattedData ? <ResponsiveContainer className={'mx-auto '} width="95%" height="80%">
        <ComposedChart
          width={500}
          height={400}
          data={formattedData.reverse()}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name"
            scale="band"
            tickFormatter={(data) => dateFormatter(data, 'axis')}
          />
          <YAxis
            yAxisId="left"
            label={{ value: 'close', angle: -90, position: 'insideLeft' }}
            tickFormatter={dataFormatter}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{ value: 'volume', angle: 90, position: 'insideRight' }}
            tickFormatter={dataFormatter}
          />
          <Tooltip content={CustomTooltip} />
          <Legend />
          <Bar yAxisId="right" dataKey="volume" barSize={20} fill="#9066F6" />
          <Line yAxisId="left" type="monotone" dataKey="close" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer> :
        <div className='w-[93%] h-[70%] cursor-wait border-2 rounded-md animate-pulse mx-5 flex justify-center items-center'>
          <VscLoading className='animate-spin text-3xl text-primary' />
        </div>
      }

    </div>
  );
};

export default PrimaryChart;
