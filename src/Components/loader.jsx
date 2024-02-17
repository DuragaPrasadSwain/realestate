import React from 'react'

export const Loader = () => {
  return (
    <div id='loader' className='hidden bg-gray-100 h-dvh absolute gap-3 w-full flex flex-col justify-center items-center'>
      <span className="loader"></span>
    </div>
  )
}

export const ImageLoader = () => {
  return(
    <div id='imgloader' className='hidden flex justify-between w-full my-5 shadow-lg bg-gray-200 rounded-lg  p-2'>
      <div className='animate-pulse flex justify-between w-full'>
      <div className='shadow size-44 rounded-lg bg-slate-100'></div>

      <div className='shadow p-2 rounded-lg w-16 bg-slate-100'></div>
      </div>
    </div>
  )
}

// export default Loader
