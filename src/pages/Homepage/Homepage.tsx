
import { useEffect, useState } from 'react';
import StocksTable from '../../components/StocksTable/StocksTable'
import './Hompage.css'
import axios from 'axios';

const Homepage = () => {

  const [stocksData, setStocksData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/stock_market_data.json');
        const data = await response.json();
        setStocksData(data);
      } catch (error) {
        console.error('Error fetching the data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='max-w-full h-full w-full  bg-transparent pt-5 p-10 rounded-lg text-gray-700  '>
      <h3 className='text-xl font-bold text-start pt-3 pb-1'> Welcome to Simple Stocks</h3>
      <p className='text-gray-500 text-start text-lg'>
      </p>
      <div>
        {/* graph */}
      </div>
      <div>
        <StocksTable setStocksData={setStocksData}  stocksData={stocksData} />
      </div>
    </div>
  )
}

export default Homepage