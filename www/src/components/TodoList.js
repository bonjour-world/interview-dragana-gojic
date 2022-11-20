import React,{useState,useEffect} from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import axios from 'axios';



function TodoList() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
      axios.get("/api/get").then(function(response){
        console.log(response.data);
        setTodos(response.data.items);
      });
    }, [todos.props]);


    const addTodo = (todo) => {
        if(!todo.name || /^\s*$/.test(todo.name)){
          return;
        }

        axios.post("/api/add", todo)
          .then(response => {
            console.log(todo);
            console.log(response.data);
            setTodos(response.data.items);
          });
    };

    const completeTodo = (id) => {
          axios.patch(`/api/complete/${id}`)
          .then(response => {
            console.log(id);
            console.log(response.data.items);
            setTodos(response.data.items);
          })
    };

    const updateTodo = (id, newValue) => {
      if(!newValue.name || /^\s*$/.test(newValue.name)){
        return;
      }

      axios.put(`/api/update/${id}/${newValue.name}`)
          .then(response => {
            console.log(response.data.items);
            setTodos(response.data.items);
      })
    };


    const removeTodo = id =>{
      axios.delete(`/api/delete/${id}`)
          .then(response => {
            console.log(response.data.items);
            setTodos(response.data.items);
          });
    };


  return (
    <div className="container">
      <div className="row center-align">
        <div className="col s12 center-align">
          <h1>What's the plan for today?</h1>
          <TodoForm onSubmit={addTodo} />
          <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo} />
      </div>
      </div>
    </div>
  )

  
}

export default TodoList