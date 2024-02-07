import React from 'react'

const Loader = () => {
  return (
    <div className='bg-gray-100 h-dvh absolute gap-3  w-full flex flex-col justify-center items-center'>
      <div className='bg-slate-300 h-12 animate-pulse rounded w-96'></div>
      <div className='bg-slate-300 h-12 animate-pulse rounded w-96'></div>
      <div className='bg-slate-300 h-12 animate-pulse rounded w-96'></div>
      <div className='bg-slate-300 h-12 animate-pulse rounded w-96'></div>
    </div>
  )
}

export default Loader
