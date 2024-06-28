import { useState } from "react";
import { IoCaretBackCircleOutline, IoCaretForwardCircleOutline } from "react-icons/io5";

type Props = {
    stocksData: any[],
    setStocksData: React.Dispatch<React.SetStateAction<any[]>>
}

const StocksTable = ({ stocksData, setStocksData }: Props) => {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(stocksData.length / itemsPerPage);
    // get first and last items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    //get current items
    const currentItems = stocksData.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleInputChange = (index: number, field: string, value: any) => {
        const updatedStocks = [...stocksData];
        updatedStocks[index][field] = value;
        setStocksData(updatedStocks);
    };

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
                </div>
                <div>
                    {currentItems.map((stock, index) => (
                        <div key={index} className="flex border border-gray-200 hover:bg-gray-50 focus-within:border-blue-300 focus-within:bg-gray-50 transition-all ease-in-out z-10 focus-within:shadow ">
                            <div className="flex-1 px-4 py-2 text-sm text-gray-600">
                                <input
                                    type="text"
                                    value={stock?.date}
                                    onChange={(e) => handleInputChange(indexOfFirstItem + index, 'date', e.target.value)}
                                    className="w-full px-2 py-1 bg-transparent border border-transparent rounded focus:outline-none focus:border-blue-400 focus:bg-white"
                                />
                            </div>
                            <div className="flex-1 px-4 py-2 text-sm text-gray-600">
                                <input
                                    type="text"
                                    value={stock?.trade_code}
                                    onChange={(e) => handleInputChange(indexOfFirstItem + index, 'trade_code', e.target.value)}
                                    className="w-full px-2 py-1 bg-transparent border border-transparent rounded focus:outline-none focus:border-blue-400 focus:bg-white"
                                />
                            </div>
                            <div className="flex-1 px-4 py-2 text-sm text-gray-600">
                                <input
                                    type="text"
                                    value={stock?.high}
                                    onChange={(e) => handleInputChange(indexOfFirstItem + index, 'high', e.target.value)}
                                    className="w-full px-2 py-1 bg-transparent border border-transparent rounded focus:outline-none focus:border-blue-400 focus:bg-white"
                                />
                            </div>
                            <div className="flex-1 px-4 py-2 text-sm text-gray-600">
                                <input
                                    type="text"
                                    value={stock?.low}
                                    onChange={(e) => handleInputChange(indexOfFirstItem + index, 'low', e.target.value)}
                                    className="w-full px-2 py-1 bg-transparent border border-transparent rounded focus:outline-none focus:border-blue-400 focus:bg-white"
                                />
                            </div>
                            <div className="flex-1 px-4 py-2 text-sm text-gray-600">
                                <input
                                    type="text"
                                    value={stock?.open}
                                    onChange={(e) => handleInputChange(indexOfFirstItem + index, 'open', e.target.value)}
                                    className="w-full px-2 py-1 bg-transparent border border-transparent rounded focus:outline-none focus:border-blue-400 focus:bg-white"
                                />
                            </div>
                            <div className="flex-1 px-4 py-2 text-sm text-gray-600">
                                <input
                                    type="text"
                                    value={stock?.close}
                                    onChange={(e) => handleInputChange(indexOfFirstItem + index, 'close', e.target.value)}
                                    className="w-full px-2 py-1 bg-transparent border border-transparent rounded focus:outline-none focus:border-blue-400 focus:bg-white"
                                />
                            </div>
                            <div className="flex-1 px-4 py-2 text-sm text-gray-600">
                                <input
                                    type="text"
                                    value={stock?.volume}
                                    onChange={(e) => handleInputChange(indexOfFirstItem + index, 'volume', e.target.value)}
                                    className="w-full px-2 py-1 bg-transparent border border-transparent rounded focus:outline-none focus:border-blue-400 focus:bg-white"
                                />
                            </div>
                        </div>

                    ))}
                </div>
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