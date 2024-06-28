
import { useEffect, useState } from 'react';
import StocksTable from '../../components/StocksTable/StocksTable'
import './Hompage.css'
import axios from 'axios';


const Homepage = () => {

  const [stocksData, setStocksData] = useState([]);


  return (
    <div className='max-w-full h-full w-full  bg-transparent pt-5 p-10 rounded-lg text-gray-700  '>
      <h3 className='text-xl font-bold text-start pt-3 pb-1'> Welcome to Simple Stocks</h3>
      <p className='text-gray-500 text-start text-lg'>
      </p>
      <div>
        {/* graph */}
      </div>
      <div>
        <StocksTable />
      </div>
    </div>
  )
}

export default Homepage