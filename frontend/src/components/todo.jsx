import React from 'react'
import { toast } from "react-toastify";

function Todo() {

  const handleSubmit = (e) => {
    e.preventDefault();
     toast.error("Please login to add todo", {
      className: "toast-message",
     });
  }

  return (
   <>
      <div className='container mx-auto'>
        <div className='signup-form'>
          <div className='form-details px-20 mt-10'>
            <h1 className='text-3xl text-center mb-2'>Add New</h1>
            <div className='justify-center'>
              <form className='todo w-4/5 mx-auto' onSubmit={handleSubmit}>
                <div className='pb-4'>
                  <div className="mt-2">
                    <input type="text" name="title" required placeholder="TITLE" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                  </div>
                </div>
                <div className='pb-4'>
                  <textarea name='description' className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6' rows={3} required placeholder='DESCRIPTION'></textarea>
                </div>
                <div className='flex justify-end'>
                  <button type="submit" class="text-primaryColor bg-backgroundColor rounded-lg text-sm px-5 py-2.5">Add</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
   </>
  )
}

export default Todo;