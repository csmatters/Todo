import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Signin() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    let values = {email, password};

    try {
      let response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(values)
      });

      const responseData = await response.json();

      if(response.ok){
        localStorage.setItem('token', responseData.token);
        window.location.reload();
        window.location.href = "/add-todo";

      }else{
        toast.error(responseData.error || "Error while login.", {
          className: "toast-message"
        });
      }

    } catch (error) {
       toast.error("Error while login.", {
          className: "toast-message"
        });
    }
  
  }

  return (
    <div className='container mx-auto py-20 my-20 align-middle'>
    <div className='grid grid-cols-2 gap-8'>
      <div className='flex flex-col text-center justify-center border-r-2 border-primaryColor'>
        <h1 className='text-3xl my-4'>Login Here.</h1>
        <p>Enter the email and password and enjoy the journey.</p>
      </div>
      <div className='signup-form'>
        <div className='form-details px-20 '>
          <h1 className='text-3xl text-center'>Sign in</h1>
          <p className='text-center mt-2'>Sign in and continue...</p>
          <form className='signin' onSubmit={handleSubmit}>
            <div className='pb-4'>
              <label htmlFor="email" className="block text-sm/6 font-medium">Email address</label>
              <div className="mt-2">
                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
              </div>
            </div>
            <div className='pb-4'>
              <label htmlFor="password" className="block text-sm/6 font-medium">Password</label>
              <div className="mt-2">
                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
              </div>
            </div>
            <div className='flex justify-end'>
              <button type="submit" class="text-primaryColor bg-backgroundColor rounded-lg text-sm px-5 py-2.5">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Signin