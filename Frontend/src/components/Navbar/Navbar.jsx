import React from 'react'

const Navbar = () => {
    const links = [
        {
            name: 'Home',
            url: '/'
        },
        {
            name: 'About',
            url: '/about'
        },
        {
            name: 'All Books',
            url: '/books'
        },
        {
            name: 'Cart',
            url: '/cart'
        },
        {
            name: 'Profile',
            url: '/profile'
        }
    ]
  return (
    <>
    <div className='flex items-center justify-between bg-zinc-800 text-white px-8 py-4 '>
        <div className='flex items-center justify-center'>
            <img className='h-10 me-4' src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png" alt="logo" />
            <h1 className='text-2xl font-semibold'>BookStore</h1>
        </div>
        <div className=' flex text-s nav-links items-center gap-4'>
            <div className='flex gap-4'>
                {links.map((link, index) => (
                    <div className=' hover:text-blue-400 transition-all duration-200' key={index}>{link.name}</div>
                ))}
            </div>
            <div className=' flex gap-4'>
                <button className='px-4 py-1 border rounded border-blue-400 hover:bg-white  '>SignIn</button>
                <button className='px-4 py-1 bg-white text-black rounded'>SignUp</button>
            </div>
            
        </div>
    </div>
    </> 
    )
}

export default Navbar