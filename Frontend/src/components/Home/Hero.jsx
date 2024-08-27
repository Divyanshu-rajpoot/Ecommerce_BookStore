import React from 'react'

const Hero = () => {
  return (
    <div className='h-[75vh] flex'>
        <div className=' w-full lg:w-3/6 flex flex-col items-center  lg:items-start justify-center '>
            <h1 className='text-4xl lg:text-6xl font-semibold text-yellow-100 text-center lg:text-left'>Discover Your Next Great Read</h1>
           <p className='mt-4 lg:text-xl text-zinc-300 lg:text-left'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo rem eaque nostrum quaerat.</p>
            <div className='mt-8'>            <button className='text-yellow-100 text-2xl font-semibold border border-yellow-100 rounded-full px-4 py-2'>Discover Books</button>
            </div>
        </div>
        <div className='w-3/6'> 
            <img src="" alt="" />
        </div>
    </div>
  )
}

export default Hero