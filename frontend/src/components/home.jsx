import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
   <>
        <div className='container mx-auto h-100-vh'>
            <div className='my-80 text-center'>
                <h1 className='text-3xl'>A todo-list <br/>Keep Track of Your Daily Tasks</h1>
                <p className='mt-4'>Keep Your track of daily tasks, work events and house hold chores</p>
                <p className='mt-5'><Link to="/todo" className="text-primaryColor bg-backgroundColor rounded-lg text-sm px-5 py-2.5">Add Todo</Link></p>
            </div>
        </div>
       

   </>
  )
}

export default Home