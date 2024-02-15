import React from 'react'

const CreateList = () => {
  return (
    <div className='text-blue-950 dosis-dosis-500 flex flex-col res:flex-row items-center justify-center gap-5'>

      <div className='gap-3 pt-20 flex flex-col'>

        <input className='bg-blue-300 p-2 rounded' type="text" placeholder='name' />

        <textarea className='bg-blue-300 p-2 rounded' placeholder='Description' id="description" rows="1"></textarea>

        <textarea className='bg-blue-300 p-2 rounded' placeholder='Address' id="address" rows="1"></textarea>

        <div className='flex gap-24'>
          <div className='flex items-center bg-red-500 size-4 rounded after:content-["Unchecked"] after:ml-5 '><span></span></div>
          <div className='flex items-center bg-green-500 size-4 rounded after:content-["Checked"] after:ml-5 '><span></span></div>
        </div>

        <div className='flex gap-5 flex-wrap'>
          
          <label className='select-none cursor-pointer'>
            <input className='rounded bg-red-500 cursor-pointer appearance-none checked:bg-green-500 size-4' type="checkbox" name="" id="" /> Sell
          </label>

          <label className='select-none cursor-pointer'>
            <input className='rounded bg-red-500 cursor-pointer appearance-none checked:bg-green-500 size-4' type="checkbox" name="" id="" /> Rent
          </label>

          <label className='select-none cursor-pointer'>
            <input className='rounded bg-red-500 cursor-pointer appearance-none checked:bg-green-500 size-4' type="checkbox" name="" id="" /> Parking spot
          </label>

          <label className='select-none cursor-pointer'>
            <input className='rounded bg-red-500 cursor-pointer appearance-none checked:bg-green-500 size-4' type="checkbox" name="" id="" /> Furnished
          </label>

          <label className='select-none cursor-pointer'>
            <input className='rounded bg-red-500 cursor-pointer appearance-none checked:bg-green-500 size-4' type="checkbox" name="" id="" /> Offer
          </label>
          
        </div>
        <div className='flex gap-5'>
          <label>
          <input className='bg-blue-300 size-5 w-16 rounded py-4 px-2' type="number" name="" id="" /> Beds
          </label>
          <label>
          <input className='bg-blue-300 size-5 w-16 rounded py-4 px-2' type="number" name="" id="" /> Baths
          </label>
        </div>
        <label className='flex items-center gap-2'>
          <input className='bg-blue-300 size-5 w-36 rounded py-4 px-2' type="number" name="" id="" /> <div className='flex flex-col text-center'><span>Regular price</span><span className='text-xs dosis-dosis-800'>( Rs/Month )</span></div>
          </label>
        
      </div>
      <div>
          <span className='dosis-dosis-800'>Images:</span>
          <span>The first image will be the cover ( max 6 )</span>
        </div>
        <div className='flex flex-col items-center gap-4'>
          <input className='cursor-pointer border-2 p-4 rounded border-blue-300    block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-50 file:text-blue-700
      hover:file:bg-blue-100' type="file" name="" id="" />
          <button className='dosis-dosis-700 bg-blue-950 text-blue-200 active:bg-blue-950 active:text-blue-200 hover:text-blue-950 hover:bg-blue-200 rounded w-36 p-2 ' type="submit">UPLOAD</button>
        </div>

    </div>
  )
}

export default CreateList
