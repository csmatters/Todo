import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import UpdateTodoPopup from './updateTodoPopup';

function AddTodo() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [open, setOpen] = useState(false);
  const [pOpen, setPOpen] = useState(false);
 
  const [id, setId] = useState("");

  const token = localStorage.getItem("token");

  const handleDeletePopUp = (id) => {
     setOpen(!open);
     setId(id);
    
  }
 
   
  const handleUpdatePopup = (id) => {
    setPOpen(true);
    setId(id);
    console.log(id);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = {title, description};
    
    try {
        let response = await fetch("http://localhost:5000/api/todos/create-todo", {
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
            });
        }
        //Handling the success
        toast.success(responseData.message, {
            className: "toast-message"
        });

        setTodos(prevTodos => [responseData.todo, ...prevTodos]);

    } catch (error) {
        toast.error("There is an issue while adding the Todo.", {
            className: "toast-message",
           });
    }
     
  }

 
  const handleDelete = async (id) => {
   alert(id);
    try {
      const response = await fetch(`http://localhost:5000/api/todos/delete/${id}`, {
        method: "POST",
        headers:{
          'Authorization' : `Bearer ${token}`
        }
      });

      const responseData = await response.json();

      if(!response.ok){
        toast.error(responseData.error || "An error occured", {
          className: "toast-message"
        });
      }

      //Handling the success
      toast.success(responseData.message, {
        className: "toast-message"
      });

      setOpen(false);
      setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));

    } catch (error) {
      toast.error("An error occured", {
        className: "toast-message",
       });
    }
  }


  useEffect(() => {
    const todoList = async () => {
      try {
          const response = await fetch("http://localhost:5000/api/todos/todo-lists", {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (!response.ok) {
            throw new Error("Failed to fetch todo list");
          }
  
          const data = await response.json();
          setTodos(data.todoList); 
  
        } catch (error) {
          console.error("Error fetching todo list:", error);
        }
    };
    todoList();
  }, [token]); 


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
                    <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} required placeholder="TITLE" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                  </div>
                </div>
                <div className='pb-4'>
                  <textarea name='description' onChange={(e) => setDescription(e.target.value)} className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6' rows={3} required placeholder='DESCRIPTION'></textarea>
                </div>
                <div className='flex justify-end'>
                  <button type="submit" className="text-primaryColor bg-backgroundColor rounded-lg text-sm px-5 py-2.5">Add Todo</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-5">
        <div className="columns-2 md:columns-4 gap-4 space-y-4">
          {todos.length > 0 ? (
            todos.map((todo, index) => (
              <div 
                key={index} 
                className="break-inside-avoid bg-primaryColor p-4 rounded shadow-sm"
              >
                  <h5 className="font-bold text-lg mb-2">{todo.title}</h5>
                  <p className="text-gray-700">{todo.description}</p>
                  <div className='flex flex-row justify-between mt-7'>
                    <div>
                        <button onClick={(e) => handleUpdatePopup(todo._id)} className='text-primaryColor bg-backgroundColor rounded-lg text-sm px-4 py-1.5'><small>Update</small></button>
                    </div>
                    <div>
                      <button onClick={(e) => handleDeletePopUp(todo._id)} >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                      </button>
                    </div>
                  </div>
              </div>
            ))
          ) : (
            <p>Not found</p>
          )}
        </div>
      </div>

      <div onClick={() => setOpen(false)} className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? "visible bg-backgroundColor/20" : "invisible"}`}>
          <div onClick={(e) => e.stopPropagation()} className={`bg-backgroundColorWhite runded-xl shadow p-6 transition-all ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
            <div className='text-center w-56'>
                <button  onClick={(e) => setOpen(false)} className="absolute top-2 right-2 p-1 rounded-lg text-grey-400 bg-backgroundColorWhite hover:bg-gray-50 hover:text-gray-600">X</button>
                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto feather feather-trash">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
                <div className="mx-auto my-6 w-48">
                  <h3 className='text-lg pb-2'>Confirm Delete</h3>
                  <p className='text-sm text-gray-500'>
                    Are you sure you want to delete this item?
                  </p>
                </div>
                <div className='flex gap-4'>
                  <button className='btn text-primaryColor bg-danger w-full rounded-md' onClick={() => handleDelete(id)}>Delete</button>
                  <button className='btn btn-light w-full' onClick={(e) => setOpen(false)}>Cancel</button> 
                </div>
            </div>
          </div>
      </div>

      <UpdateTodoPopup pOpen={pOpen} pClose={() => setPOpen(false)} id={id}></UpdateTodoPopup>
   </>
  )
}

export default AddTodo;