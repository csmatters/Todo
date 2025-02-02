import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


function Header() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const handleLogout = (e) => {
        e.preventDefault();

        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/signin", {replace: true}) 
       
    }

    useEffect(() => {
        let token = localStorage.getItem('token');
        if(token){
            setIsAuthenticated(true);
        }
    }, [])

  return (
    <>
        <header className='header border-b-2 border-primaryColor'>
            <div className='container mx-auto py-6'>
                <div className='flex flex-row'>
                    <div className='basis-1/2'>
                            <h1 className='font-bold text-xl'>TODO</h1>
                    </div>
                    <div className='basis-1/2'>
                        <ul className='flex flex-row text-lg justify-end'>
                            <li className='px-3'><Link to="/">Home</Link></li>
                            <li className='px-3'><Link to="/about">About us</Link></li>

                            {
                                isAuthenticated && (
                                    <>
                                        <li className='px-3'>
                                            <Link to="/add-todo" className="text-primaryColor bg-backgroundColor rounded-lg text-sm px-5 py-2.5">Add Todo</Link>
                                        </li>
                                        <li className='px-3'>
                                            <Link to="#" onClick={handleLogout} className="text-primaryColor bg-backgroundColor rounded-lg text-sm px-5 py-2.5">Logout</Link>
                                        </li>
                                    </>
                                )
                            }
                           
                            {
                                !isAuthenticated &&  (
                                    <>
                                        <li className='px-3'>
                                            <Link to="/todo">Todo</Link>
                                        </li>
                                        <li className='px-3'>
                                            <Link to="/signin" className="text-primaryColor bg-backgroundColor rounded-lg text-sm px-5 py-2.5">Sign In</Link>
                                        </li>
                                        <li className='px-3'>
                                            <Link to="/signup" className="text-primaryColor bg-backgroundColor rounded-lg text-sm px-5 py-2.5">Sign Up</Link>
                                        </li>
                                    </>
                                )
                            }
                            
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    </>
    
  )
}

export default Header