import React, {useEffect, useState} from 'react'
import { toast } from "react-toastify";

function UpdateTodoPopup({id, pOpen, pClose}) {

    const[title, setTitle] = useState("");
    const[description, setDescription] = useState("");
    const[todo, setTodo] = useState({title: "", description: ""});
    const token = localStorage.getItem("token");


    const handleSubmit = async (e) =>{
        e.preventDefault();
        const values = {title, description};

        if(!title){
            toast.error("Title should not be empty", 
            {
                className: "toast-message"
            });
        }
        if(!description){
            toast.error("Description should not be empty", 
            {
                className: "toast-message"
            });
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/todos/update/${id}`, {
                method: "POST",
                headers: {
                    'Authorization' : `Bearer ${token}`,
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(values)
            });

           const responseData = await response.json();

           if(!response.ok){
                toast.error(responseData.error || "An error occured", {
                    className: "toast-message"
                })
           }

           toast.success(responseData.message, {
                className: "toast-message"
           })

        } catch (error) {
            toast.error("An error occured", {
                className: "toast-message"
            })
        }

    }



    useEffect(() => {
        const fetchTodo = async () => {
            if (!id || !token) return; // Prevent request if token or id is missing
    
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/todos/todo/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
    
                if (!response.ok) {
                    throw new Error("Failed to fetch todo");
                }
    
                const responseData = await response.json();
                setTodo(responseData.todo);

               
            } catch (error) {
                console.error("Error fetching todo:", error); // Log error instead of throwing
            }
        };
    
        fetchTodo();
    },[token, id]);


    useEffect(() => {
        if(todo){
            setTitle(todo.title || "");
            setDescription(todo.description || "");
        }
    }, [todo])

    return (
        <>
            <div onClick={pClose} className={`fixed inset-0 flex justify-center items-center transition-colors ${pOpen ? "visible bg-backgroundColor/30" : "invisible"}`}>
                <div onClick={(e) => e.stopPropagation()} className={`bg-backgroundColorWhite rounded-xl shadow p-6 transition-all ${pOpen ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
                    <div className='w-[500px]'>
                        <button onClick={pClose} className="absolute top-2 right-2 p-1 rounded lg text-grey-400">X</button>
                        <h3 className='text-xl bold pb-4'>Update Todo</h3>
                        <form className='todo mx-auto pt-2' onSubmit={handleSubmit}>
                            <div className='pb-4'>
                                <div className="mt-2">
                                    <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} value={title} required placeholder="TITLE" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                </div>
                            </div>
                            <div className='pb-4'>
                                <textarea name='description' onChange={(e) => setDescription(e.target.value)} value={description} className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6' rows={3} required placeholder='DESCRIPTION'></textarea>
                            </div>
                            <div className='flex justify-end'>
                                <button type="submit" className="text-primaryColor bg-backgroundColor rounded-lg text-sm px-5 py-2.5">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateTodoPopup;