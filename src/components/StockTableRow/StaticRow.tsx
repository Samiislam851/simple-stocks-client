
import { stockDataType } from '../../types/stockData'
import { FaRegEdit } from "react-icons/fa";

type Props = {
    stock: stockDataType
    setIsEditing: any
}

const StaticRow = ({ stock, setIsEditing }: Props) => {
    return (
        <div className="flex border border-gray-200 hover:bg-gray-50 focus-within:border-primary focus-within:border-opacity-50 focus-within:bg-gray-50 transition-all ease-in-out z-10 focus-within:shadow  ">
            <div className="flex-1 px-4 py-2 text-sm text-gray-600">
                <p className='text-center mt-2'> {stock?.date}</p>
            </div>
            <div className="flex-1 px-4 py-2 text-sm text-gray-600">
                <p className='text-center mt-2'>{stock?.trade_code}</p>
            </div>
            <div className="flex-1 px-4 py-2 text-sm text-gray-600">
                <p className='text-center mt-2'>{stock?.high}</p>
            </div>
            <div className="flex-1 px-4 py-2 text-sm text-gray-600">
                <p className='text-center mt-2'>{stock?.low}</p>
            </div>
            <div className="flex-1 px-4 py-2 text-sm text-gray-600">
                <p className='text-center mt-2'>{stock?.open}</p>
            </div>
            <div className="flex-1 px-4 py-2 text-sm text-gray-600">
                <p className='text-center mt-2'>{stock?.close}</p>
            </div>
            <div className="flex-1 px-4 py-2 text-sm text-gray-600">
                <p className='text-center mt-2'>{stock?.volume}</p>
            </div>
            <div className="flex-1 px-4 py-2 text-sm text-gray-600">
                <button
                    onClick={() => setIsEditing(true)}
                    className=" px-3 py-1  border border-transparent rounded focus:outline-none bg-primary text-white flex gap-2 items-center"
                >
                    <FaRegEdit />
                    <span>Edit</span>
                </button>
            </div>
        </div>
    )
}

export default StaticRow