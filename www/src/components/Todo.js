import React,{useState} from 'react';
import TodoForm from './TodoForm';
import M from 'materialize-css';

function Todo({todos, removeTodo, completeTodo, updateTodo}) {

    const [edit, setEdit] = useState({
        id: null,
        name: ""
    });

    const submitUpdate = value => {
        updateTodo(edit.id, value);
        setEdit({
            id:null,
            name:""
        });
    };


  return todos.map((todo,index) => (
        <div className={todo.completed?'todo-row complete section':'todo-row section'} key={index}>
            <div key={todo.id} className="col s12 left-align">
                {edit.id==todo.id?
                (<TodoForm edit={edit} onSubmit={submitUpdate} />):
                (<><a className={todo.completed?"btn-floating btn-medium waves-effect waves-light green lighten-2":
                "btn-floating btn-medium waves-effect waves-light blue-grey lighten-4"} onClick={()=>completeTodo(todo.id)}>
                        <i className="small material-icons">done</i>
                    </a>
                    <span className="task-name">{todo.name}</span></>)}
            </div>
            <div className="icons">
                <button className={edit.id?'hide':''} onClick={() => setEdit({id:todo.id, name: todo.name})}><i className="small material-icons edit-icon">create</i></button>
                <button className={edit.id?'hide':''} onClick={() => removeTodo(todo.id)}><i className="small material-icons delete-icon">close</i></button>
            </div>
        </div>
  ));
}

export default Todo