import { useState } from "react";

function AddTodo(props){
    //using state to set the title value of todo item
    const [title, setTitle] = useState("");
    
    //To handle the form submit 
    const handleSubmit = (e) => {
        e.preventDefault();
        let todo = {
            "id":props.todos.length+1,
            "title":e.target[0].value,
            "completed":false
        }
        console.log('todo',todo)
        props.add(todo);
        setTitle("");
    }
    return(
       <div>
        <form onSubmit={handleSubmit}>
            <input type="text"
                placeholder="Enter todo item"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button className="add-btn" type="submit"> Add Todo</button>
        </form>

       </div>
    );
}
export default AddTodo;