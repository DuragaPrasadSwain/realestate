import React from 'react'

const Loader = () => {
  return (
    <div id='loader' className='hidden bg-gray-100 h-dvh absolute gap-3 w-full flex flex-col justify-center items-center'>
      {/* <div className='bg-slate-300 h-12 animate-pulse rounded w-96'></div>
      <div className='bg-slate-300 h-12 animate-pulse rounded w-96'></div>
      <div className='bg-slate-300 h-12 animate-pulse rounded w-96'></div>
      <div className='bg-slate-300 h-12 animate-pulse rounded w-96'></div> */}
      {/* <i class="fa-solid fa-spinner animate-spin fa-2xl"></i> */}
      <span className="loader"></span>
    </div>
  )
}

export default Loader
