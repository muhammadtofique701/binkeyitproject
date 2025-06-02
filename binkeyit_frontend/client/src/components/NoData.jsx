import React from 'react'
import noDataImage from '../assets/nothing here yet.webp'

const NoData = () => {
  return (
    <div className='flex flex-col items-center p-4 gap-2'>
            <img src={noDataImage} alt="No Data" className='w-52' />
            <p className='text-neutral-400'>No Data Is Available</p>
    </div>
  )
}

export default NoData
