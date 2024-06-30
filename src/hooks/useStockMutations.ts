import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { stockDataType } from '../types/stockData';
import customAxios from '../util/axiosInstance/axiosInstance';


// Define mutation functions
const saveStockData = async (data: stockDataType) => {
    return await customAxios.put(`/update-stock/${data._id}`, data);
};

const deleteStockData = async (id: string) => {
      return await customAxios.delete(`/delete-stock/${id}`);
};


// Custom hooks for mutations
export const useSaveStockData = () => {
    return useMutation<any,any,any,any>({mutationFn:saveStockData});
};

export const useDeleteStockData = () => {
    return useMutation<any,any,any,any>({mutationFn: deleteStockData});
};
