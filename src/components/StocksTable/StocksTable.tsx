import { useEffect, useState } from "react";
import { IoCaretBackCircleOutline, IoCaretForwardCircleOutline } from "react-icons/io5";
import { stockDataType } from "../../types/stockData";
import StocksTableRow from "../StockTableRow/StocksTableRow";
import { useSelector } from "react-redux";
import ShimmerUI from "../ui/StockTable/ShimmerUI";

type Props = {

}

const StocksTable = ({ }: Props) => {
    const { stocksData } = useSelector((state: any) => state.stocks)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [currentItems, setCurrentItems] = useState<stockDataType[] | null>(null);
    const itemsPerPage = 10;
    const demoArr = new Array(10).fill(undefined)
    console.log('asdgasfbafdba',demoArr);
    

    useEffect(() => {
        if (stocksData) {
            setTotalPages(Math.ceil(stocksData.length / itemsPerPage));
            const indexOfLastItem = currentPage * itemsPerPage;
            const indexOfFirstItem = indexOfLastItem - itemsPerPage;
            setCurrentItems(stocksData.slice(indexOfFirstItem, indexOfLastItem));
        }
    }, [stocksData, currentPage]);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    return (
        <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-xl mb-5">
            <h3 className="text-2xl font-bold  pb-3">Stocks Table</h3>
            <div className="min-w-full bg-white border border-gray-200 rounded-lg">
                <div className="bg-gray-100 border-b-2 border-gray-200 flex">
                    <div className="flex-1 px-4 py-2 text-left text-sm font-semibold text-gray-600">Date</div>
                    <div className="flex-1 px-4 py-2 text-left text-sm font-semibold text-gray-600">Trade Code</div>
                    <div className="flex-1 px-4 py-2 text-left text-sm font-semibold text-gray-600">High</div>
                    <div className="flex-1 px-4 py-2 text-left text-sm font-semibold text-gray-600">Low</div>
                    <div className="flex-1 px-4 py-2 text-left text-sm font-semibold text-gray-600">Open</div>
                    <div className="flex-1 px-4 py-2 text-left text-sm font-semibold text-gray-600">Close</div>
                    <div className="flex-1 px-4 py-2 text-left text-sm font-semibold text-gray-600">Volume</div>
                    <div className="flex-1 px-4 py-2 text-left text-sm font-semibold text-gray-600">Actions</div>
                </div>
                {stocksData?  <div>
                    {currentItems?.map((stock, index) => (
                        <div key={index} >
                            <StocksTableRow stock={stock} />
                        </div>
                    ))}
                </div>:
                <div>
                    {demoArr.map(()=> <ShimmerUI/>  )
                        
                    }
                </div>
                }
              
            </div>
            <div className="flex justify-end items-center  gap-4 mt-4">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-2 py-1 bg-primary bg-opacity-5 rounded-md hover:bg-opacity-15 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                    <IoCaretBackCircleOutline className="text-2xl text-primary" />
                </button>
                <div className="text-primary">
                    Page {currentPage} of {totalPages}
                </div>
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-2 py-1 bg-primary bg-opacity-5 rounded-md hover:bg-opacity-15 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                    <IoCaretForwardCircleOutline className="text-primary text-2xl" />
                </button>
            </div>
        </div>
    )
}

export default StocksTable