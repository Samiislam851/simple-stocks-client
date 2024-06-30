import React from 'react'

type Props = {}

const ShimmerUI = (props: Props) => {
    return (
        <div className="flex w-full">
        <div className="flex-1 px-4 py-2 text-sm text-gray-600">
          <div className='rounded-md animate-pulse bg-gray-300 w-full h-4 my-2'></div>
        </div>
       
        <div className="flex-1 px-4 py-2 text-sm text-gray-600">
          <div className='rounded-md animate-pulse bg-gray-300 w-full h-4 my-2'></div>
        </div>
        <div className="flex-1 px-4 py-2 text-sm text-gray-600">
          <div className='rounded-md animate-pulse bg-gray-300 w-full h-4 my-2'></div>
        </div>
        <div className="flex-1 px-4 py-2 text-sm text-gray-600">
          <div className='rounded-md animate-pulse bg-gray-300 w-full h-4 my-2'></div>
        </div>
        <div className="flex-1 px-4 py-2 text-sm text-gray-600">
          <div className='rounded-md animate-pulse bg-gray-300 w-full h-4 my-2'></div>
        </div>
       
        
      </div>
    )
}

export default ShimmerUI