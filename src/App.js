import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './Components/home';
import AddTodo from './Components/AddTodo';

function App(){
  //using state to set the todoList values
  const [todoList, setTodoList] = useState([]);

  //using useEffect hook to render when there is a change in todolist
  useEffect(() => {
    //fetching the todo items
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((json) => {
        setTodoList(json)
      }
          
    )
  },{todoList});
  
  //function to add todo item
  const addTodo =async (value) => {
     const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
       method: 'POST',
       body: JSON.stringify(value),
       headers: {
         'Content-Type': 'application/json'
       }
     });
     const result = await response.json();
     setTodoList([result,...todoList]);
     console.log('todos afer adding one todo',todoList);
 
   }
   
  // Function to remove todo item from todoList
  function removeTodo(todoItem){
    console.log('delete',todoItem)
    fetch(`https://jsonplaceholder.typicode.com/todos/${todoItem.id}`, {
      method: 'DELETE',
      headers: {
          'Content-Type':'application/json'
      },
      body: JSON.stringify(todoItem)
      })
      todoList.splice(todoList.indexOf(todoItem),1);
      
      setTodoList([...todoList]);
  }

  //function to update todoitem in the todoList
  function editTodo(todoItem){
    fetch(`https://jsonplaceholder.typicode.com/todos/${todoItem.id}`, {
      method: 'PUT',
      body: JSON.stringify(todoItem),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((response) => response.json())
    .then((json) => {
    let a = todoList.map((todo) => {
      console.log('todo id',todo.id);
      console.log('json id',json.id);
        return todo.id === json.id ? json : todo;
      });
      setTodoList(a);
  });
   
     
  }
    return (
      <div className="App">
        <h1>React Todo App</h1>
        <AddTodo todos = {todoList} add={addTodo}/>
        <Home 
          todos = {todoList} 
          delete = {removeTodo}
          edit = {editTodo}
        />
      </div>
    );
  }


export default App;
