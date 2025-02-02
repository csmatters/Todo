const express = require("express");
const authenticator = require("../middlewear/authienticator");
const Todo = require("../models/todo");
const router = express.Router();


router.get("/todo-lists", authenticator, async (req, res) => {
    const { _id } = req.user;

    try {
        let todoList = await Todo.find({user: _id}).sort({ createdAt: -1});
        
        if(!todoList){
            return res.status(403).send({error: "Something went wrong"});
        }
        
        res.status(201).send({todoList});

    } catch (error) {
        res.status(403).send({error: "Something went wrong"});
    }
});

router.get("/todo/:id", authenticator, async (req, res) => {
   const id = req.params.id

    try {
        
        let todo = await Todo.findById(id);
        
        if(!todo){
            return res.status(403).send({error: "Something went wrong"});
        }
        
        res.status(201).send({todo});

    } catch (error) {
        res.status(403).send({error: "Something went wrong"});
    }
});

router.post("/create-todo", authenticator, async (req, res) => {
    
    const {title, description} = req.body;
    const { _id } = req.user; 

    if(!title){
        return res.status(403).send({error: "Title should not be empty."});
    }

    if(!description){
        return res.status(403).send({error: "Description should not be empty."});
    }
  
    try {
        let newTodo = new Todo({
            title: title,
            description: description,
            user: _id
        });

        await newTodo.save();
        res.status(201).send({message: "Todo Added Successfully.", todo: newTodo});

    } catch (error) {
        res.status(403).send({error: "Something went wrong"});
    }
});

router.post("/update/:id", authenticator, async (req, res) => {
    
    const id = req.params.id;
    const {title, description} =  req.body;

    if(!title){
        return res.status(403).send({error: "Title should not be empty"});
    }

    if(!description){
        return res.status(403).send({error: "Description should not be empty"});
    }

    try {

        let updateTodo = await Todo.findByIdAndUpdate(id, {
            $set : {
                title: title,
                description:  description
            }
        }, {new: true});

        if(!updateTodo){ 
            
            return res.status(403).send({error: "Something went wrong"});
        }

        res.status(201).send({message: "Todo updated successfully"});

    } catch (error) {

        return res.status(403).send({error: "Something went wrong"});
    }
});

router.post("/delete/:id", authenticator, async (req, res) => {
    const id = req.params.id;

    try {   
        
        let deletedTodo = await Todo.findByIdAndDelete(id);
        
        if(!deletedTodo){
            return res.status(403).send({error: "Something went Wrong"});
        }

        res.status(201).send({message: "Todo deleted Successfully"});

    } catch (error) {
        res.status(403).send({error: "Something went wrong"});
    
    }
});


module.exports = router;