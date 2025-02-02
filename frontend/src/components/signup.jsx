import React, {useState} from 'react';
import { toast } from "react-toastify";

function Signup() {

  const [fullname, setFullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPass, setConfirmPass] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let values = {fullname, email, password, confirmPass};

    try {
          const response = await fetch("http://localhost:5000/api/users/register", {
            method : "POST",
            headers: {
              'Content-Type' : 'application/json'
            },
            body: JSON.stringify(values)
          });

          const responseData = await response.json();

          if (!response.ok) {
            toast.error(responseData.error ||  "Something went wrong. Please try again.", {
              className: "toast-message",
            });
            return;
          }

          // Hanling the success
          toast.success(responseData.message, {
              className: "toast-message",
          });
         

        setFullName("");
        setEmail("");
        setPassword("");
        setConfirmPass("");

     } catch (err) {
      toast.error(err.message, {
        className : "toast-message"
      })
    }
   
  }


  return (
    <>
      <div className='container mx-auto py-10 my-10 align-middle'>
        <div className='grid grid-cols-2 gap-8'>
          <div className='flex flex-col text-center justify-center border-r-2 border-primaryColor'>
            <h1 className='text-3xl my-4'>Create an Account.</h1>
            <p>Enter your details to fill up the sign up form.</p>
          </div>
          <div className='signup-form'>
            <div className='form-details px-20'>
              <h1 className='text-3xl text-center'>Sign up</h1>
              <p className='text-center mt-2'>Sign up to continue</p>
              <form className='signup' onSubmit={handleSubmit}>
                <div className='pb-4'>
                  <label htmlFor="fullname" className="block text-sm/6 font-medium">Name</label>
                  <div className="mt-2">
                    <input type="text" name="fullname" onChange={(e) => setFullName(e.target.value)} required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                  </div>
                </div>
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
                <div className='pb-4'>
                  <label htmlFor="confirmPass" className="block text-sm/6 font-medium">Confirm Password</label>
                  <div className="mt-2">
                    <input type="password" name="confirmPass" onChange={(e) => setConfirmPass(e.target.value)} required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                  </div>
                </div>
                <div className='flex justify-end'>
                  <button type="submit" className="text-primaryColor bg-backgroundColor rounded-lg text-sm px-5 py-2.5">Sign up</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup