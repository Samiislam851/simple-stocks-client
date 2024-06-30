
import { useEffect } from 'react';
import StocksTable from '../../components/StocksTable/StocksTable'
import './Hompage.css'
import PrimaryChart from '../../components/PrimaryChart/PrimaryChart';
import MarketSharePieChart from '../../components/MarketSharePieChart/MarketSharePieChart';
import { useQuery } from '@tanstack/react-query';
import customAxios from '../../util/axiosInstance/axiosInstance';
import { stockDataType } from '../../types/stockData';
import { useDispatch } from 'react-redux';
import { updateStocks } from '../../feature/Stocks/StocksSlice';
import { LuCalendarDays } from "react-icons/lu";
const Homepage = () => {
  const dispatch = useDispatch()

  const getStocksData = async () => {
    const res = await customAxios.get('/stocks')
    console.log('res===>', res);
    return res.data.data
  }
  const { data, isLoading } = useQuery<stockDataType[]>({
    queryKey: ['stocksData'],
    queryFn: getStocksData,
  })

  useEffect(() => {
    dispatch(updateStocks(data))
  }, [data, isLoading]);

  function getFormattedDate() {
    const today = new Date();
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    //@ts-ignore
    return today.toLocaleDateString('en-US', options);
  }
  return (
    <div className='max-w-full h-full w-full  bg-transparent pt-5 p-10 rounded-lg text-gray-700  '>
      <div className='flex justify-between items-center pr-2'>
        <h3 className='text-xl font-bold text-start pt-3 pb-5'> Welcome to Simple Stocks</h3>
        <div className='text-gray-500 text-start text-lg flex gap-2 items-center justify-center'>
          <div><LuCalendarDays className='shadow-2xl' /></div>
          <div className='shadow-text'>{getFormattedDate()}</div>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row gap-5 w-full'>
        <div className='md:basis-[60%]'>
          <PrimaryChart />
        </div>
        <div className='md:basis-[40%]'>
          <MarketSharePieChart />
        </div>
      </div>
      <div>
        <StocksTable />
      </div>

    </div>
  )
}

export default Homepage