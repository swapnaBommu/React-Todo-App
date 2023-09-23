import { useState } from "react";

function Home(props){
    // boolean state to know if we are editing 
    const [isEditing, setIsEditing] = useState(false);
    // object state to set so we know which todo item we are editing
    const [currentTodo, setCurrentTodo] = useState({});
    
    const todos = props.todos;
    
    // function to get the value of the edit input and set the new state
    function handleEditInputChange(e) {
       let obj = {
        "title":e.target.value,
        "completed":currentTodo.completed,
        "id":currentTodo.id
      }
        setCurrentTodo(obj);
    }

    // function to handle when the "Edit" button is clicked
  function handleEditClick(todo) {
    console.log('current todo in edit click',todo);
    setIsEditing(true);
    setCurrentTodo({ ...todo });
   
  }
  function handleUpdateTodo(updatedTodo) {
    console.log('updated todo in updatedtodo function ',updatedTodo)
    props.edit(updatedTodo);
    setIsEditing(false); 
  }
  function handleEditFormSubmit(e) {
    e.preventDefault();
    handleUpdateTodo(currentTodo);
  }
    return(
       <div className="home">
        {isEditing ? (

        <form onSubmit={handleEditFormSubmit}>
          <input
          className="edit-input"
            name="editTodo"
            type="text"
            placeholder="Edit todo"
            value={currentTodo.title}
            onChange={handleEditInputChange}
          />
          <button className="add-btn" type="submit">Update</button>
          <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
       null
      )}
         <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : "inProgress"}>
            <span className="text">{todo.title}</span>
            <div className="btn-div">
                       <img 
                           className="edit"
                           onClick={() => handleEditClick(todo)}
                           src="https://cdn-icons-png.flaticon.com/128/1160/1160119.png"
                           alt="edit"
                       />
                   <img 
                       className="delete"
                       onClick={() => props.delete(todo)}
                       src="https://cdn-icons-png.flaticon.com/128/1215/1215092.png"
                       alt="delete"
                   />
                   </div>
            
          </li>
        ))}
      </ul>   
       </div>
       
    );
}
export default Home;
