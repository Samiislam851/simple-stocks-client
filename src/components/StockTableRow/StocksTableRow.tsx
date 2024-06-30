import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { stockDataType } from '../../types/stockData';
import { IoIosSave, IoMdClose } from 'react-icons/io';
import { RiDeleteBin6Fill } from "react-icons/ri";
import StaticRow from './StaticRow';
import { useDeleteStockData, useSaveStockData } from '../../hooks/useStockMutations';
import { useDispatch, useSelector } from 'react-redux';
import { updateStocks } from '../../feature/Stocks/StocksSlice';

type Props = {
    stock: stockDataType;
};

const StocksTableRow = ({ stock }: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const { stocksData } = useSelector((state: any) => state.stocks)
    const [currentState, setCurrentState] = useState(stock);
    const dispatch = useDispatch()
    if (isEditing) {
        console.log('current state===>', currentState);
        console.log('stock===>', stock);
    }

    useEffect(() => {
        setCurrentState(stock)
    }, [isEditing]);

    const resetData = () => {
        setCurrentState(stock);
    }

    const handleInputChange = (field: keyof stockDataType, value: any) => {
        setCurrentState(prevState => ({ ...prevState, [field]: value }));
    };
    const saveMutation = useSaveStockData();
    const deleteMutation = useDeleteStockData();

    const handleSave = () => {
        saveMutation.mutate(currentState, {
            onSuccess(data, variables, context) {
                console.log('success data', data);
                const otherStocks = stocksData.filter((stck: stockDataType) => stck._id !== currentState._id)
                const newStocks = [...otherStocks, currentState]
                dispatch(updateStocks(newStocks))
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Updated Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                setIsEditing(false)
            },
            onError(error, variables, context) {
                console.log('error');
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Couldn't update the data :(",
                    showConfirmButton: false,
                    timer: 1500
                });

            },
        });
    };

    const handleDelete = () => {
        console.log('deleting with Id>>>', currentState._id);

        deleteMutation.mutate(currentState._id, {
            onSuccess(data, variables, context) {
                const otherStocks = stocksData.filter((stck: stockDataType) => stck._id !== currentState._id)
                dispatch(updateStocks(otherStocks))
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Deleted successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                setIsEditing(false)
            },
            onError(error, variables, context) {
                console.log('error');
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Couldn't delete the data :(",
                    showConfirmButton: false,
                    timer: 1500
                });

            },
        });
    };

    return (
        <>
            {isEditing ? (
                <div className="flex border border-gray-200 hover:bg-gray-50 focus-within:border-primary focus-within:border-opacity-50 focus-within:bg-gray-50 transition-all ease-in-out z-10 focus-within:shadow ">
                    <div className="flex-1 px-4 py-2 text-sm text-gray-600">
                        <input
                            type="text"
                            value={currentState.date}
                            onChange={(e) => handleInputChange('date', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-400 rounded focus:border-primary bg-white focus:outline-primary"
                        />
                    </div>
                    <div className="flex-1 px-4 py-2 text-sm text-gray-600">
                        <input
                            type="text"
                            value={currentState.trade_code}
                            onChange={(e) => handleInputChange('trade_code', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-400 rounded focus:border-primary bg-white focus:outline-primary"
                        />
                    </div>
                    <div className="flex-1 px-4 py-2 text-sm text-gray-600">
                        <input
                            type="text"
                            value={currentState.high}
                            onChange={(e) => handleInputChange('high', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-400 rounded focus:border-primary bg-white focus:outline-primary"
                        />
                    </div>
                    <div className="flex-1 px-4 py-2 text-sm text-gray-600">
                        <input
                            type="text"
                            value={currentState.low}
                            onChange={(e) => handleInputChange('low', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-400 rounded focus:border-primary bg-white focus:outline-primary"
                        />
                    </div>
                    <div className="flex-1 px-4 py-2 text-sm text-gray-600">
                        <input
                            type="text"
                            value={currentState.open}
                            onChange={(e) => handleInputChange('open', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-400 rounded focus:border-primary bg-white focus:outline-primary"
                        />
                    </div>
                    <div className="flex-1 px-4 py-2 text-sm text-gray-600">
                        <input
                            type="text"
                            value={currentState.close}
                            onChange={(e) => handleInputChange('close', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-400 rounded focus:border-primary bg-white focus:outline-primary"
                        />
                    </div>
                    <div className="flex-1 px-4 py-2 text-sm text-gray-600">
                        <input
                            type="text"
                            value={currentState.volume}
                            onChange={(e) => handleInputChange('volume', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-400 rounded focus:border-primary bg-white focus:outline-primary"
                        />
                    </div>
                    <div className="flex gap-1 items-center h-full pt-3 px-1 lg:px-4 py-2 text-sm text-gray-600">
                        <button
                            title='Save'
                            onClick={handleSave}
                            className="border border-transparent rounded focus:outline-none text-white"
                        >
                            <IoIosSave className='text-green-500 text-2xl' />
                        </button>
                        <button
                            title='Delete'
                            onClick={handleDelete}
                            className="border border-transparent rounded focus:outline-none text-white"
                        >
                            <RiDeleteBin6Fill className='text-red-500 text-2xl' />
                        </button>
                        <button
                            title='Close'
                            onClick={() => { setIsEditing(false); resetData() }}
                            className="border border-transparent rounded focus:outline-none text-white"
                        >
                            <IoMdClose className='text-gray-400 text-2xl' />
                        </button>
                    </div>
                </div>
            ) : (
                <StaticRow setIsEditing={setIsEditing} stock={stock} />
            )}
        </>
    );
};

export default StocksTableRow;
