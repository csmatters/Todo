
import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer";
import Header from "./components/header";
import Home from "./components/home";
import About from "./components/about";
import Todo from "./components/todo";
import Signin from "./components/signin";
import Signup from "./components/signup";
import { ToastContainer } from "react-toastify";
import AddTodo from "./components/add-todo";

function App() {
  return (
    <>
       <Header/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/add-todo" element={<AddTodo />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
          <ToastContainer />
       <Footer/>
    </>
   
  );
}

export default App;
